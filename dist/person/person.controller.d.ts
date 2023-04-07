import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PersonById } from './interfaces/person-by-id.interface';
import { Person } from './interfaces/person.interface';
export declare class PersonController implements OnModuleInit {
    private readonly client;
    private readonly items;
    private personService;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    getMany(): Observable<Person[]>;
    getById(id: string): Observable<Person>;
    findOne(data: PersonById): Person;
    findMany(data$: Observable<PersonById>): Observable<Person>;
}
