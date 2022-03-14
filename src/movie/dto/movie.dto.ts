import { IsInt, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDTO {
  @ApiProperty({ description: '', required: true })
  @IsString()
  readonly name: string;
  @ApiProperty({ description: '', required: true })
  @IsString()
  readonly MovieName: string;
  @ApiProperty({ description: '', required: true })
  @IsString()
  readonly Description: string;
  @ApiProperty({ description: '', required: true })
  @IsString()
  readonly Duration: string;
  @ApiProperty({ description: '', required: true })
  @IsString()
  readonly Genre: string;
  @ApiProperty({ description: '', required: true })
  @IsString()
  readonly Language: string;
  @ApiProperty({ description: '', required: true })
  @IsString()
  readonly ReleaseDate: string;
  @ApiProperty({ description: '', required: true })
  @IsString()
  readonly Country: string;
  @ApiProperty({ description: '', required: true })
  @IsInt()
  readonly StartTime: number;
  @ApiProperty({ description: '', required: true })
  @IsInt()
  readonly EndTime: number;
  @ApiProperty({ description: '', required: true })
  @IsInt()
  readonly createdAt: Date;
}
