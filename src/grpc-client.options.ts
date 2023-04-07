import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'person', // ['hero', 'hero2']
    protoPath: join("/var/www/practice/http2_practice/src/person/person.proto"), // ['./hero/hero.proto', './hero/hero2.proto']
  },
};