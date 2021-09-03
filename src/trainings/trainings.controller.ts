import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { IHeader } from './interfaces/header.interface';
import { OAuthService } from '../oauth/oauth.service';
import { IOAuth } from 'src/oauth/interfaces/oauth.interface';
import { Points, Source, Sport } from './interfaces/training.interface';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Controller('trainings')
export class TrainingsController {
  constructor(
    private readonly trainingsService: TrainingsService,
    private readonly oauthService: OAuthService,
  ) {}

  isUserAuthorization = async (headers: IHeader): Promise<boolean> => {
    const token: IOAuth = await this.oauthService.verifyToken(headers.token);

    if (token.isVerified) {
      return true;
    } else {
      return false;
    }
  };

  @Post('/user/')
  async addTraining(
    @Body('userEmail') user_email: string,
    @Body('sport') sport: Sport,
    @Body('tagColor') tag_color: string | null,
    @Body('source') source: Source | null,
    @Body('startTime') start_time: string | null,
    @Body('endTime') end_time: string | null,
    @Body('durationSec') duration_sec: number,
    @Body('distanceKm') distance_km: number,
    @Body('caloriesKcal') calories_kcal: number,
    @Body('description') description: string,
    @Body('heartRateAvgBpm') heart_rate_avg_bpm: number,
    @Body('heartRateMaxBpm') heart_rate_max_bpm: number,
    @Body('speedAvgKmh') speed_avg_kmh: number,
    @Body('speedMaxKmh') speed_max_kmh: number,
    @Body('points') points: Points[],
    @Body('effort') effort: number,
    @Body('feeling') feeling: number,
    @Body('steps') steps: number,
    @Body('hydrationMl') hydration_ml: number,
    @Headers() headers: IHeader,
  ) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const generatedId = await this.trainingsService.insertTraining({
        user_email,
        sport,
        tag_color,
        source,
        start_time,
        end_time,
        duration_sec,
        distance_km,
        calories_kcal,
        description,
        heart_rate_avg_bpm,
        heart_rate_max_bpm,
        speed_avg_kmh,
        speed_max_kmh,
        points,
        effort,
        feeling,
        steps,
        hydration_ml,
      });
      return { id: generatedId };
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Put('/user/id/:id')
  async updateTraining(
    @Param('id') id: string,
    @Body('userEmail') user_email: string,
    @Body('sport') sport: Sport,
    @Body('tagColor') tag_color: string | null,
    @Body('source') source: Source | null,
    @Body('startTime') start_time: string | null,
    @Body('endTime') end_time: string | null,
    @Body('durationSec') duration_sec: number,
    @Body('distanceKm') distance_km: number,
    @Body('caloriesKcal') calories_kcal: number,
    @Body('description') description: string,
    @Body('heartRateAvgBpm') heart_rate_avg_bpm: number,
    @Body('heartRateMaxBpm') heart_rate_max_bpm: number,
    @Body('speedAvgKmh') speed_avg_kmh: number,
    @Body('speedMaxKmh') speed_max_kmh: number,
    @Body('points') points: Points[],
    @Body('effort') effort: number,
    @Body('feeling') feeling: number,
    @Body('steps') steps: number,
    @Body('hydrationMl') hydration_ml: number,
    @Headers() headers: IHeader,
  ) {
    if (await this.isUserAuthorization(headers)) {
      await this.trainingsService.updateTraining({
        id,
        user_email,
        sport,
        tag_color,
        source,
        start_time,
        end_time,
        duration_sec,
        distance_km,
        calories_kcal,
        description,
        heart_rate_avg_bpm,
        heart_rate_max_bpm,
        speed_avg_kmh,
        speed_max_kmh,
        points,
        effort,
        feeling,
        steps,
        hydration_ml,
      });
      return id;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Delete('/user/id/:id')
  async removeTraining(@Param('id') id: string, @Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      await this.trainingsService.deleteTraining({ user_email: response.payload.email, id });
      return id;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/user/')
  async getTranings(@Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const userTranings = await this.trainingsService.getTrainingsForUser({
        user_email: response.payload.email,
      });
      return userTranings;
    } else {
      throw new BadRequestException('No authentication');
    }
  }

  @Get('/user/id/:id')
  async getTraning(@Param('id') id: string, @Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const training = await this.trainingsService.getSingleTraining({
        user_email: response.payload.email,
        id,
      });
      return training;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/user/first/')
  async getFirstTraning(@Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const training = await this.trainingsService.getFirstTrainingForUser({
        user_email: response.payload.email,
      });
      return training;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/user/last/')
  async getLastTraning(@Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const training = await this.trainingsService.getLastTrainingForUser({
        user_email: response.payload.email,
      });
      return training;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/user/calories/year/:year')
  async getTheLargestAmountOfCalories(@Param('year') year: string, @Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const training = await this.trainingsService.getTheLargestAmountOfCaloriesForUser(year, {
        user_email: response.payload.email,
      });
      return training;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/user/distance/year/:year')
  async getTheLargestAmountOfDistance(@Param('year') year: string, @Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const training = await this.trainingsService.getTheLargestAmountOfDistanceForUser(year, {
        user_email: response.payload.email,
      });
      return training;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/user/time/year/:year')
  async getTheLargestAmountOfTime(@Param('year') year: string, @Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const training = await this.trainingsService.getTheLargestAmountOfTimeForUser(year, {
        user_email: response.payload.email,
      });
      return training;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/user/sum/year/:year')
  async getSumTraningDataByYear(@Param('year') year: string, @Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const result = await this.trainingsService.sumTraingsDataByYear(year, {
        user_email: response.payload.email,
      });
      return result;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/user/sum/year/:year/month/:month')
  async getSumTraningDataByMonth(
    @Param('year') year: string,
    @Param('month') month: string,
    @Headers() headers: IHeader,
  ) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      const result = await this.trainingsService.sumTraingsDataByMonth(year, month, {
        user_email: response.payload.email,
      });
      return result;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/compare/user/:userId/to/:userIdToCompare/year/:year')
  async compareSumTraingsDataByYear(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Param('userIdToCompare') userIdToCompare: string,
    @Headers() headers: IHeader,
  ) {
    if (await this.isUserAuthorization(headers)) {
      const result = await this.trainingsService.compareSumTraingsDataByYear(
        year,
        {
          user_email: userId,
        },
        userIdToCompare,
      );
      return result;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }

  @Get('/compare/user/:userId/to/:userIdToCompare/year/:year/month/:month')
  async compareSumTraingsDataByMonth(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Param('month') month: string,
    @Param('userIdToCompare') userIdToCompare: string,
    @Headers() headers: IHeader,
  ) {
    if (await this.isUserAuthorization(headers)) {
      const result = await this.trainingsService.compareSumTraingsDataByMonth(
        month,
        year,
        {
          user_email: userId,
        },
        userIdToCompare,
      );
      return result;
    } else {
      throw new BadRequestException('No authorisation');
    }
  }
}
