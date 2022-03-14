import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
  applyDecorators,
  UseGuards,
  createParamDecorator,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from './dto/interface/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) return false;
    req.user = await this.validateToken(req.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    try {
      if (auth.split(' ')[0] !== 'Bearer')
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      const token = auth.split(' ')[1];
      const decoded: any = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decoded;
    } catch (err) {
      const message = 'Token error- ' + err.message;
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard));
}

export const GetUserId = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
