import { AppService } from './app.service';
import { Request, Response } from "express";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
