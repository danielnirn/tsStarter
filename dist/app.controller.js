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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const model_1 = require("./model");
const appService = require("./app.service");
let AppController = class AppController {
    constructor() {
        this.config = {
            user: 'ig2',
            password: 'ig2test',
            server: 'localhost\\SQLEXPRESS01',
            database: 'IG2DB-DEV',
        };
    }
    root() {
        return appService.getFromDb();
    }
    test(poly) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: poly.id,
                name: `My age is ${poly.age}`,
            };
        });
    }
    mock(params) {
        if (+params.paginationInfo.from > 0) {
            return new Array();
        }
        else {
            return appService.getFromDb();
        }
    }
    getByIds(params) {
        if (params.ids.length > 0) {
            return appService.getIdFromDb(params.ids);
        }
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Hi', description: 'world' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, description: 'just for test' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "root", null);
__decorate([
    common_1.Post('/mutation'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, skipMissingProperties: false }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.DataDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "test", null);
__decorate([
    common_1.Post('/mock'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mock", null);
__decorate([
    common_1.Post('/api/Overlays'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.IdLists]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getByIds", null);
AppController = __decorate([
    common_1.Controller(),
    swagger_1.ApiUseTags('Our awesome')
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map