import { ConnectionPool } from 'mssql';
import { RetType } from './model';
import {MultiPolygon} from "geojson";


//var GeoJSON = require('geojson');

const config = {
    user: 'ig2',
    password: 'ig2test',
    server: 'localhost\\SQLEXPRESS01',
    database: 'IG2DB-DEV',
  };

export async function getFromDb() {
    // const client = require("mssql/msnodesqlv8");
    const pool: ConnectionPool = new ConnectionPool(config);
    // const sql = 'SELECt TOP 5 b.id,c.IS_STEREO as isStereo,  a.LOS_ROLL_ANGLE as roll,a.LOS_HEADING_ANGLE as azimuth FROM dbo.FRAME_SOLUTIONS a , dbo.IMAGES b ' +
    // 'inner join dbo.FRAMES c on c.PERSISTENT_ID = b.PERSISTENT_ID ' +
    // 'where a.PERSISTENT_ID = b.CURRENT_SOLUTION_ID  ';  

    const join = 'SELECT TOP 5 d.GEO_LOCATION as footprint,d.SOLUTION_CSMBLOB as csm, b.id,b.CREATION_TIME as photoTime,c.MRL as imageUrl, c.IS_STEREO as isStereo,  a.LOS_ROLL_ANGLE as roll,a.LOS_HEADING_ANGLE as azimuth '+ 
    'FROM dbo.FRAME_SOLUTIONS a , dbo.IMAGES b ' + 
    'inner join dbo.FRAMES c on c.PERSISTENT_ID = b.PERSISTENT_ID ' + 
    'inner join dbo.IMAGERY_SOLUTIONS d on b.CURRENT_SOLUTION_ID = d.PERSISTENT_ID ' + 
    'where a.PERSISTENT_ID = b.CURRENT_SOLUTION_ID';

    await pool.connect();

    const result = await pool.request().query(join);
    
    const resMapped:RetType = new RetType();

    const polygons = result.recordset.map<RetType>(obj => ({
      footprint: {
        type: "MultiPolygon",
        coordinates: [[obj.footprint.points.map(p => [p.x, p.y])]]
      },
      csm: obj.csm,
      id: obj.id,
      roll: obj.roll,
      azimuth: obj.azimuth,
      photoTime: obj.photoTime,
      imageUrl: obj.imageUrl,
      isStereo: obj.isStereo
    }))

    // resMapped.footprint.coordinates
    pool.close();

    return polygons;
  }