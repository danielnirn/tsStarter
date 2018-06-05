import { IsString, IsNumber } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
import {MultiPolygon} from "geojson";

export const data = {
    "paginationInfo": {
      "size": "500",
      "from": "0"
    },
    "conditions": [
      [
        {
          "matchQueries": [
            {
              "field": "sensorName",
              "value": "FreezedFrame"
            }
          ]
        },
        {
          "matchQueries": [
            {
              "field": "sensorName",
              "value": "ImportedFrame"
            }
          ]
        },
        {
          "matchQueries": [
            {
              "field": "sensorName",
              "value": "SAR"
            }
          ]
        },
        {
          "matchQueries": [
            {
              "field": "sensorName",
              "value": "CNIR"
            }
          ]
        },
        {
          "matchQueries": [
            {
              "field": "sensorName",
              "value": "Reccelite"
            }
          ]
        },
        {
          "matchQueries": [
            {
              "field": "sensorName",
              "value": "RTM"
            }
          ]
        }
      ],
      [
        {
          "rangeQueries": [
            {
              "field": "photoTime",
              "from": "2018-04-22T08:49:19.63Z",
              "to": "2018-04-22T09:19:19.63Z"
            }
          ]
        }
      ],
      [
        {
          "geoQueries": [
            {
              "field": "footprint",
              "relation": "intersects",
              "refine": 0.0,
              "polygon": {
                "coordinates": [
                  [
                    [
                      35.008159591908111,
                      32.721189303550673
                    ],
                    [
                      34.9884912952619,
                      32.544174625207
                    ],
                    [
                      34.9425986030874,
                      32.445833137238289
                    ],
                    [
                      34.798364427681811,
                      31.672213431884451
                    ],
                    [
                      35.329408437129636,
                      32.144252574134256
                    ],
                    [
                      35.434306019242776,
                      32.622847815581963
                    ],
                    [
                      35.008159591908111,
                      32.721189303550673
                    ]
                  ]
                ],
                "type": "Polygon"
              }
            }
          ]
        }
      ]
    ]
  };

  export class RetType
    {
      footprint: MultiPolygon;
      id: string;
      colorType?: string;
      sensorType?: string;
      sensorName: string;
      imageUrl: string;
      photoTime: string;
      endPhotoTime?: null;
      isStereo: boolean;
      bestResolution?: number;
      approximateTransform?: string;
      azimuth: number;
      roll: number;
      stereoType?: number;
      isCsmCached?: boolean;
      csm: string

    };

  export type Contract = typeof data;

  export interface Result{
      id:string;
      name: string;
  }


  export class IdLists{
    ids : Array<string>
  };

  export class DataDto{
    @IsString()
    @ApiModelProperty({type:String})
    id:string;
    @IsNumber()
    age:number;
  }