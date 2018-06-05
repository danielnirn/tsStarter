import {
  Get,
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Contract, Result, DataDto, RetType, IdLists } from './model';
import * as appService from './app.service'


@Controller()
@ApiUseTags('Our awesome')
export class AppController {
  private config = {
    user: 'ig2',
    password: 'ig2test',
    server: 'localhost\\SQLEXPRESS01',
    database: 'IG2DB-DEV',
  };

  @Get()
  @ApiOperation({ title: 'Hi', description: 'world' })
  @ApiResponse({ status: HttpStatus.OK, description: 'just for test' })
  root() {
    return appService.getFromDb();
    //return 'Hello World!';
  }

  @Post('/mutation')
  async test(
    @Body(new ValidationPipe({ transform: true, skipMissingProperties: false }))
    poly: DataDto,
  ): Promise<Result> {
    return {
      id: poly.id,
      name: `My age is ${poly.age}`,
    };
  }

  @Post('/mock')
  mock(@Body() params: Contract) {
    if(+params.paginationInfo.from > 0)
      {
        return new Array<RetType>();
      }
    else
      {
        return appService.getFromDb();
      }
  }

  @Post('/api/Overlays')
  getByIds(@Body() params: IdLists){
    if(params.ids.length > 0){
      return appService.getIdFromDb(params.ids);
    }
  }

}
