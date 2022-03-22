import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Patch,
  Get,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
  Render,
  Delete,
  ClassSerializerInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Auth, GetUserId } from './user.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { userTest } from './dto/interface/user.interface';
import { RegisterDto } from './dto/user.dto';
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'new user without email verified' })
  @ApiResponse({
    status: 200,
    description: 'recieves status and token if success',
  })
  async signUp(@Body() userDto: RegisterDto): Promise<userTest> {
    return await this.userService.signUp(userDto);
  }

  @Get('getUserDetails') // NOTE: Make "getUserDetails" te function name and "me" in the endpoint
  @ApiBearerAuth()
  @Auth() // NOTE: Use guards
  @ApiOperation({ summary: 'get profile data using token' })
  @ApiResponse({
    status: 200,
    description: 'return status and profile Object if success',
  })
  async me(@GetUserId() user) {
    return await this.userService.getProfileData(user);
  }
}
