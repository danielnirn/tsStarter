"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const config = {
    user: 'ig2',
    password: 'ig2test',
    server: 'localhost\\SQLEXPRESS01',
    database: 'IG2DB-DEV',
};
function getFromDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new mssql_1.ConnectionPool(config);
        const sql = 'SELECt TOP 5 b.id,c.IS_STEREO as isStereo,  a.LOS_ROLL_ANGLE as roll,a.LOS_HEADING_ANGLE as azimuth FROM dbo.FRAME_SOLUTIONS a , dbo.IMAGES b ' +
            'inner join dbo.FRAMES c on c.PERSISTENT_ID = b.PERSISTENT_ID ' +
            'where a.PERSISTENT_ID = b.CURRENT_SOLUTION_ID';
        yield pool.connect();
        const result = yield pool.request().query(sql);
        pool.close();
        return result.recordset;
    });
}
exports.getFromDb = getFromDb;
//# sourceMappingURL=app.service.js.map