import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import {
  ClientGrpc,
    Client,
    Transport,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { PersonById } from './interfaces/person-by-id.interface';
import { Person } from './interfaces/person.interface';
import {grpcClientOptions} from "../grpc-client.options";

interface PersonService {
    findOne(data: PersonById): Observable<Person>
    findMany(upstream: Observable<PersonById>): Observable<Person>
}

@Controller("person")
export class PersonController implements OnModuleInit {
    // @Client(grpcClientOptions) private readonly client: ClientGrpc;
private readonly items: Person[] = [
      {id: 1, name: "Tom", email: "tom@tom.io"},
      {id: 2, name: "Tommy", email: "tommy@tommy.io"}
    ];
private personService: PersonService;

constructor(@Inject("PERSON_PACKAGE") private readonly client: ClientGrpc) {}

    onModuleInit() {
    this.personService = this.client.getService<PersonService>('PersonService')
    }

    @Get()
  getMany(): Observable<Person[]> {
    const ids$ = new ReplaySubject<PersonById>();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.complete();

    const stream = this.personService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

@Get(":id")
    getById(@Param('id') id: string) : Observable<Person> {
    return this.personService.findOne({id: +id});
}

@GrpcMethod("PersonService")
    findOne(data: PersonById): Person {
    return this.items.find(({id}) => id === data.id);
}

@GrpcStreamMethod('PersonService')
  findMany(data$: Observable<PersonById>): Observable<Person> {
    const person$ = new Subject<Person>();

    const onNext = (personById: PersonById) => {
      const item = this.items.find(({ id }) => id === personById.id);
      person$.next(item);
    };
    const onComplete = () => person$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return person$.asObservable();
  }


}