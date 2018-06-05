import { ConnectionPool } from 'mssql';
import { RetType } from './model';
import {MultiPolygon} from "geojson";
import { String, StringBuilder } from 'typescript-string-operations';


//var GeoJSON = require('geojson');

const config = {
    user: 'ig2',
    password: 'ig2test',
    server: 'localhost\\SQLEXPRESS01',
    database: 'IG2DB-DEV',
  };

export async function getFromDb() {
    const pool: ConnectionPool = new ConnectionPool(config);


    const join = 'SELECT TOP 5 d.GEO_LOCATION as footprint,e.NAME as sensorName,d.SOLUTION_CSMBLOB as csm,'+
    'b.id,b.CREATION_TIME as photoTime,c.MRL as imageUrl, c.IS_STEREO as isStereo,  a.LOS_ROLL_ANGLE as roll,a.LOS_HEADING_ANGLE as azimuth '+ 
    'FROM dbo.FRAME_SOLUTIONS a , dbo.IMAGES b ' + 
    'inner join dbo.FRAMES c on c.PERSISTENT_ID = b.PERSISTENT_ID ' + 
    'inner join dbo.IMAGERY_SOLUTIONS d on b.CURRENT_SOLUTION_ID = d.PERSISTENT_ID ' + 
    'inner join dbo.IMAGERY_SENSORS e on c.IMAGERY_SENSOR_ID = e.PERSISTENT_ID ' +
    'where a.PERSISTENT_ID = b.CURRENT_SOLUTION_ID';

    await pool.connect();

    const result = await pool.request().query(join);

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
      imageUrl: splitMrl(obj.imageUrl),
      isStereo: obj.isStereo,
      sensorName: obj.sensorName
      
    }))

    // resMapped.footprint.coordinates
    pool.close();

    return polygons;
  }

  function splitMrl(path:string):string{
    return path.split("//",2)[1].split("?",2)[0];
  }


  function inStringCreate(list:Array<string>):string{
    var result = new StringBuilder('(');
    list.forEach(element => {
      result.AppendFormat("'{0}',",element);
    });
    var final = result.ToString().slice(0,-1);
    final = final+')';
    return final;

  }

  export async function getIdFromDb(ids: Array<string>) {
    const pool: ConnectionPool = new ConnectionPool(config);


    const join = 'SELECT TOP 5 d.GEO_LOCATION as footprint,e.NAME as sensorName,d.SOLUTION_CSMBLOB as csm,' +
    'b.id,b.CREATION_TIME as photoTime,c.MRL as imageUrl, c.IS_STEREO as isStereo,  a.LOS_ROLL_ANGLE as roll,a.LOS_HEADING_ANGLE as azimuth '+ 
    'FROM dbo.FRAME_SOLUTIONS a , dbo.IMAGES b ' + 
    'inner join dbo.FRAMES c on c.PERSISTENT_ID = b.PERSISTENT_ID ' + 
    'inner join dbo.IMAGERY_SOLUTIONS d on b.CURRENT_SOLUTION_ID = d.PERSISTENT_ID ' + 
    'inner join dbo.IMAGERY_SENSORS e on c.IMAGERY_SENSOR_ID = e.PERSISTENT_ID ' +
    'where a.PERSISTENT_ID = b.CURRENT_SOLUTION_ID '+
    'AND b.id in ' + inStringCreate(ids);
    ;

    await pool.connect();

    const result = await pool.request().query(join);

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
      imageUrl: splitMrl(obj.imageUrl),
      isStereo: obj.isStereo,
      sensorName: obj.sensorName
      
    }))

    // resMapped.footprint.coordinates
    pool.close();

    return polygons;
  }
