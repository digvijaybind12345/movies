import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

// NOTE: Follow naming convention
@Schema()
export class Movie {
  @Prop({ required: true })
  MovieID: number;

  @Prop({ required: true })
  ShowID: number;

  @Prop()
  MovieName: string;

  @Prop()
  Description: string;

  @Prop()
  Duration: string;

  @Prop()
  Genre: string;

  @Prop()
  Language: string;

  @Prop()
  ReleaseDate: Date;

  @Prop()
  Country: string;

  @Prop()
  StartTime: string;

  @Prop()
  EndTime: string;

  @Prop()
  createdAt: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
