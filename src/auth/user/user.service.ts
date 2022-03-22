import {
  BadRequestException,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dto/user.dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dto/interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private usersRepository: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({
    name,
    email,
    phoneNo,
    city,
    state,
    streetAddress,
    password,
  }: RegisterDto) {
    const newUuid = uuid();
    if (phoneNo) {
      //  if (phoneNo.match(/0{8,}/) != null) return { status: 400, message: 'PHONE NUMBER SHOULD NOT CONTAINS 8 Zeroes ' }
      const existPhoneNo = await this.usersRepository.findOne({ phoneNo });
      if (existPhoneNo)
        return { status: 200, message: 'Phone no already exists' }; // NOTE: It's a conflict that phone no exists, it shouldn't be 200, change the status to 409
    }
    if (/\d/.test(name))
      return { status: 400, message: 'NAME SHOULD NOT CONTAINS ANY NUMBER ' };
    if (password.length < 8)
      return {
        status: 400,
        message: 'PASSWORD SHOULD BE ATLEAST 8 CHARACTERS ',
      };
    const pass = await bcrypt.hash(password, 10);
    const existEmail = await this.usersRepository.findOne({ email });

    if (existEmail) return { status: 200, message: 'Email already registered' };
    //TODO if condition should be put after fetching

    // NOTE: use create method
    const user = new this.usersRepository({
      id: newUuid,
      name,
      email,
      phoneNo,
      city,
      state,
      streetAddress,
      password: pass,
    });
    const newUser = await user.save();

    // NOTE: use just id as payload, not any other info
    const token = this.jwtService.sign({
      id: newUser.id,
      name,
      email: email.toLowerCase(),
      phoneNo,
    });

    // NOTE: Use decorator
    return { status: HttpStatus.OK, token };
  }

  async getProfileData(user: User) {
    const profile = await this.usersRepository.findOne({ id: user.id });
    if (!profile) {
      return { status: 400, message: `profile does not exist` };
    }
    return { status: 200, profile };
  }
}
