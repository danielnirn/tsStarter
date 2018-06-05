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
const typescript_string_operations_1 = require("typescript-string-operations");
const config = {
    user: 'ig2',
    password: 'ig2test',
    server: 'localhost\\SQLEXPRESS01',
    database: 'IG2DB-DEV',
};
function getFromDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new mssql_1.ConnectionPool(config);
        const join = 'SELECT TOP 5 d.GEO_LOCATION as footprint,e.NAME as sensorName,d.SOLUTION_CSMBLOB as csm,' +
            'b.id,b.CREATION_TIME as photoTime,c.MRL as imageUrl, c.IS_STEREO as isStereo,  a.LOS_ROLL_ANGLE as roll,a.LOS_HEADING_ANGLE as azimuth ' +
            'FROM dbo.FRAME_SOLUTIONS a , dbo.IMAGES b ' +
            'inner join dbo.FRAMES c on c.PERSISTENT_ID = b.PERSISTENT_ID ' +
            'inner join dbo.IMAGERY_SOLUTIONS d on b.CURRENT_SOLUTION_ID = d.PERSISTENT_ID ' +
            'inner join dbo.IMAGERY_SENSORS e on c.IMAGERY_SENSOR_ID = e.PERSISTENT_ID ' +
            'where a.PERSISTENT_ID = b.CURRENT_SOLUTION_ID';
        yield pool.connect();
        const result = yield pool.request().query(join);
        const polygons = result.recordset.map(obj => ({
            footprint: {
                type: "MultiPolygon",
                coordinates: [[obj.footprint.points.map(p => [p.x, p.y])]]
            },
            csm: obj.csm,
            id: obj.id,
            roll: obj.roll,
            azimuth: obj.azimuth,
            photoTime: obj.photoTime,
            imageUrl: splitMrl(obj.imageUrl),
            isStereo: obj.isStereo,
            sensorName: obj.sensorName
        }));
        pool.close();
        return polygons;
    });
}
exports.getFromDb = getFromDb;
function splitMrl(path) {
    return path.split("//", 2)[1].split("?", 2)[0];
}
function inStringCreate(list) {
    var result = new typescript_string_operations_1.StringBuilder('(');
    list.forEach(element => {
        result.AppendFormat("'{0}',", element);
    });
    var final = result.ToString().slice(0, -1);
    final = final + ')';
    return final;
}
function getIdFromDb(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new mssql_1.ConnectionPool(config);
        const join = 'SELECT TOP 5 d.GEO_LOCATION as footprint,e.NAME as sensorName,d.SOLUTION_CSMBLOB as csm,' +
            'b.id,b.CREATION_TIME as photoTime,c.MRL as imageUrl, c.IS_STEREO as isStereo,  a.LOS_ROLL_ANGLE as roll,a.LOS_HEADING_ANGLE as azimuth ' +
            'FROM dbo.FRAME_SOLUTIONS a , dbo.IMAGES b ' +
            'inner join dbo.FRAMES c on c.PERSISTENT_ID = b.PERSISTENT_ID ' +
            'inner join dbo.IMAGERY_SOLUTIONS d on b.CURRENT_SOLUTION_ID = d.PERSISTENT_ID ' +
            'inner join dbo.IMAGERY_SENSORS e on c.IMAGERY_SENSOR_ID = e.PERSISTENT_ID ' +
            'where a.PERSISTENT_ID = b.CURRENT_SOLUTION_ID ' +
            'AND b.id in ' + inStringCreate(ids);
        ;
        yield pool.connect();
        const result = yield pool.request().query(join);
        const polygons = result.recordset.map(obj => ({
            footprint: {
                type: "MultiPolygon",
                coordinates: [[obj.footprint.points.map(p => [p.x, p.y])]]
            },
            csm: obj.csm,
            id: obj.id,
            roll: obj.roll,
            azimuth: obj.azimuth,
            photoTime: obj.photoTime,
            imageUrl: splitMrl(obj.imageUrl),
            isStereo: obj.isStereo,
            sensorName: obj.sensorName
        }));
        pool.close();
        return polygons;
    });
}
exports.getIdFromDb = getIdFromDb;
//# sourceMappingURL=app.service.js.map