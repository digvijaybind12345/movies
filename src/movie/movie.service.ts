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
    const movies: Movie[] = await this.movieModel.find().exec(); // NOTE: No need to call exec(), it gets called automatically
    return movies;
  }

  // get single movie
  async getMovie(MovieID: number) { // NOTE: varible name should be camelCase
    console.log('movie id', MovieID);
    const movie = await this.movieModel.findOne({ MovieID });
    console.log(movie);
    return movie;
  }

  // post a single movie
  async createMovie(createMovieDTO: CreateMovieDTO): Promise<Movie> {
    const NewMovie = new this.movieModel(createMovieDTO); // NOTE: Use create method
    return NewMovie.save();
  }

  // delete movie

  async deleteMovie(MovieID: number): Promise<any> { // NOTE: varible name should be camelCase
    const deleteMovie = await this.movieModel.findOneAndDelete({ MovieID });
    return deleteMovie;
  }

  // Put a single movie

  async updateMovie(
    MovieID: number, // NOTE: varible name should be camelCase
    createMovieDTO: CreateMovieDTO,
  ): Promise<Movie> {
    const updateMovie = await this.movieModel.findByIdAndUpdate(
      MovieID,
      createMovieDTO,
      { new: true },
    );

    return updateMovie;
  }

  // NOTE: There are no filter operation happening, you are fetching only the movie by the id, try to implement the filteration methods
  async FilterMovie(MovieID: number): Promise<Movie[]> {
    const movies: Movie[] = await this.movieModel.findOne({ MovieID });
    return movies;
  }
}
