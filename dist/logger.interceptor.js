"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoggingInterceptor {
    intercept(dataOrRequest, context, stream$) {
        const { handler, parent } = context;
        const logName = `${parent.name}|${handler.name}`;
        const fullPath = `URL: ${dataOrRequest.baseUrl}${dataOrRequest.path}`;
        process.stdout.write(fullPath + "\r\n");
        const body = `Body: ${JSON.stringify(dataOrRequest.body, null, 2)}`;
        process.stdout.write(body + "\r\n");
        return stream$;
    }
}
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logger.interceptor.js.map