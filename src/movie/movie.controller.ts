import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
  Query,
  Put,
  ConsoleLogger,
  SetMetadata,
} from '@nestjs/common';

import { MovieService } from './movie.service';

import { CreateMovieDTO } from './dto/movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  //add movie

  @Post('/create')
  async createMovie(@Res() res, @Body() createMovieDTO: CreateMovieDTO) {
    try {
      const movie = await this.movieService.createMovie(createMovieDTO);

      return res.status(HttpStatus.OK).json({
        message: 'Movie successfully added',
        movie,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Get Movies

  @Get('/accessMovie')
  async getMovies(@Res() res) {
    const movies = await this.movieService.getMovies();
    return res.status(HttpStatus.OK).json(movies);
  }

  // Get single movie :

  @Get('/:id')
  async getMovie(@Res() res, @Param('id') MovieID) {
    const movie = await this.movieService.getMovie(MovieID);
    if (!movie) throw new NotFoundException('Movie does not exist!');
  }

  // Delete movie

  @Delete('/delete')
  @SetMetadata('roles', ['admin'])
  async deleteMovie(@Res() res, @Query('MovieID') MovieId) {
    const movieDeleted = await this.movieService.deleteMovie(MovieId);
    if (!movieDeleted) throw new NotFoundException('Movie does not exist !');
    return res.status(HttpStatus.OK).json({
      message: 'Movie deleted Succesfully',
      movieDeleted,
    });
  }

  // update movie:/

  @Put('/update')
  async updateMovie(
    @Res() res,
    @Body() createMovieDTO: CreateMovieDTO,
    @Query('MovieID') MovieID,
  ) {
    const updateMovie = await this.movieService.updateMovie(
      MovieID,
      createMovieDTO,
    );
    if (!updateMovie) throw new NotFoundException('Movie does Not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Movie updated succesfully',
      updateMovie,
    });
  }

  //filter by movieName

  @Get('/filter')
  async FilterMovie(
    @Res() Res,
    @Body() createMovieDTO: CreateMovieDTO,
    @Query('showId') showId,
  ) {
    return this.movieService.FilterMovie(showId);
  }
}
