"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
exports.data = {
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
class RetType {
}
exports.RetType = RetType;
;
class DataDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty({ type: String }),
    __metadata("design:type", String)
], DataDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], DataDto.prototype, "age", void 0);
exports.DataDto = DataDto;
//# sourceMappingURL=model.js.map