import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

import { CreateMovieDTO } from './dto/movie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  async getMovies(): Promise<Movie[]> {
    const movies: Movie[] = await this.movieModel.find().exec();
    return movies;
  }

  // get single movie
  async getMovie(MovieID: number) {
    console.log('movie id', MovieID);
    const movie = await this.movieModel.findOne({ MovieID });
    console.log(movie);
    return movie;
  }

  // post a single movie
  async createMovie(createMovieDTO: CreateMovieDTO): Promise<Movie> {
    const NewMovie = new this.movieModel(createMovieDTO);
    return NewMovie.save();
  }

  // delete movie

  async deleteMovie(MovieID: number): Promise<any> {
    const deleteMovie = await this.movieModel.findOneAndDelete({ MovieID });
    return deleteMovie;
  }

  // Put a single movie

  async updateMovie(
    MovieID: number,
    createMovieDTO: CreateMovieDTO,
  ): Promise<Movie> {
    const updateMovie = await this.movieModel.findByIdAndUpdate(
      MovieID,
      createMovieDTO,
      { new: true },
    );

    return updateMovie;
  }

  async FilterMovie(MovieID: number): Promise<Movie[]> {
    const movies: Movie[] = await this.movieModel.findOne({ MovieID });
    return movies;
  }
}
