import { IsString, IsEmail, IsOptional, IsNumber, MaxLength, ValidateNested, IsNotEmpty, } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'


export class RegisterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string

  @ApiPropertyOptional()
  @IsString()
  phoneNo?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  streetAddress: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  state: string

  


  @ApiProperty()
  @IsString()
  password: string // NOTE: Try using strong regex to verify the password strength

}

export class LoginDto {
  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  password: string

}

