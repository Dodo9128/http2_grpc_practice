import {NestApplication, NestFactory} from '@nestjs/core';
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import * as http2 from "http2";
import { AppModule } from './app.module';
import {Express} from "express";
import * as fs from "fs";
import {Server, ServerOptions} from "spdy";
import * as spdy from "spdy";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import {grpcClientOptions} from "./grpc-client.options";

async function bootstrap() {
  const expressApp: Express = express();

  const spdyOpts: ServerOptions = {
    key: fs.readFileSync(__dirname + "/../key/practice_private.pem"),
    cert: fs.readFileSync(__dirname + "/../key/practice_public.pem")
  }

  const server: Server = spdy.createServer(spdyOpts, expressApp);

  const app: NestApplication = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp)
  );

  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions)

  await app.init();
  await app.startAllMicroservices();

  await server.listen(8000, () => {
    console.log(`Server is running on https://localhost:8000`)
  });
}

bootstrap();
