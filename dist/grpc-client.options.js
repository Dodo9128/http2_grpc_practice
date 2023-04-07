"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grpcClientOptions = void 0;
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
exports.grpcClientOptions = {
    transport: microservices_1.Transport.GRPC,
    options: {
        package: 'person',
        protoPath: (0, path_1.join)("/var/www/practice/http2_practice/src/person/person.proto"),
    },
};
//# sourceMappingURL=grpc-client.options.js.map