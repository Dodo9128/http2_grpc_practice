"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const app_module_1 = require("./app.module");
const fs = require("fs");
const spdy = require("spdy");
const grpc_client_options_1 = require("./grpc-client.options");
async function bootstrap() {
    const expressApp = express();
    const spdyOpts = {
        key: fs.readFileSync(__dirname + "/../key/practice_private.pem"),
        cert: fs.readFileSync(__dirname + "/../key/practice_public.pem")
    };
    const server = spdy.createServer(spdyOpts, expressApp);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.connectMicroservice(grpc_client_options_1.grpcClientOptions);
    await app.init();
    await app.startAllMicroservices();
    await server.listen(8000, () => {
        console.log(`Server is running on https://localhost:8000`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map