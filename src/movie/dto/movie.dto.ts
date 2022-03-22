import { IsInt, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

// NOTE: Follow Naming Conventions of variable naming
// NOTE: Do not use readonly on any dto variables
// NOTE: For update, create a partial type of the CreateMovieDto
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
  @IsInt() // NOTE: will be a string as the time can be 12:00 or 02:00, so make it string
  readonly StartTime: number;
  @ApiProperty({ description: '', required: true })
  @IsInt()
  readonly EndTime: number;
  @ApiProperty({ description: '', required: true })
  @IsInt()
  readonly createdAt: Date;
}
