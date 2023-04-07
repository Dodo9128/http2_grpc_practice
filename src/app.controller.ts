import {Controller, Get, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from "express"
import {GrpcMethod} from "@nestjs/microservices";
// import { person } from "./proto/person.proto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: Request, @Res() res: Response) {
    console.log(req)
    console.log("HEADERS :", req.headers);
    const serviceResult = await this.appService.getHello();

    if(serviceResult) {
      return res.status(200).json({message: serviceResult} );
    }
    return res.status(401).json({message: "fail"})

    // return this.appService.getHello(req, res);
  }

  // @GrpcMethod("PersonService", "FindOne")
  // async FindOne(data: PersonById, metadata: Metadata, call: ServerUnaryCall<any, any>): Person {
  //   const items = [
  //     {id: 1, name: "Tom"},
  //     {id: 2, name: "Tommy"}
  //   ];
  //   return items.find(({ id }) => id === data.id);
  // }
}
