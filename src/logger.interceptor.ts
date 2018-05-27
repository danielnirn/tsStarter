import { NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs/Observable";

export class LoggingInterceptor implements NestInterceptor {
    intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<any>): Observable<any> | Promise<Observable<any>> {
        
        const {handler, parent} = context;

        const logName = `${parent.name}|${handler.name}`;
        const fullPath = `URL: ${dataOrRequest.baseUrl}${dataOrRequest.path}`;
        process.stdout.write(fullPath+"\r\n");
        const body = `Body: ${JSON.stringify(dataOrRequest.body,null,2)}`;
        process.stdout.write(body+"\r\n");
        return stream$;
    }
}