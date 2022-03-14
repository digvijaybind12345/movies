import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './auth/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/movie-nest', {
      useNewUrlParser: true,
    }),

    MovieModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
