import { Injectable, NotFoundException } from '@nestjs/common';
import { Training } from './schemas/training.schema';
import { ITraining } from './interfaces/training.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import e = require('express');

@Injectable()
export class TrainingsService {
  constructor(@InjectModel('Training') private readonly trainingModel: Model<Training>) {}

  private async findTraining(training: ITraining): Promise<Training> {
    let findTraining;
    try {
      findTraining = await this.trainingModel.findOne({
        user_email: training.user_email,
        _id: training.id,
      });
    } catch (error) {
      throw new NotFoundException('Could not find training or user.');
    }

    if (!findTraining) {
      throw new NotFoundException('Could not find training or user.');
    }

    return findTraining;
  }

  async insertTraining(training: ITraining) {
    const actualDate = new Date();

    const newTraining = new this.trainingModel({
      created_date: actualDate,
      update_date: actualDate,
      user_email: training.user_email,
      sport: training.sport,
      tag_color: training.tag_color,
      source: training.source,
      start_time: training.start_time,
      end_time: training.end_time,
      duration_sec: training.duration_sec,
      distance_km: training.distance_km,
      calories_kcal: training.calories_kcal,
      description: training.description,
      heart_rate_avg_bpm: training.heart_rate_avg_bpm,
      heart_rate_max_bpm: training.heart_rate_max_bpm,
      speed_avg_kmh: training.speed_avg_kmh,
      speed_max_kmh: training.speed_max_kmh,
      points: training.points,
      effort: training.effort,
      feeling: training.feeling,
      steps: training.steps,
      hydration_ml: training.hydration_ml,
    });
    const result = await newTraining.save();
    return result.id as string;
  }

  // async getTranings() {
  //   const result = await this.trainingModel.find().exec();
  //   return result as Training[];
  // }

  async getTrainingsForUser(training: ITraining) {
    const trainingsForUser = await this.trainingModel.find({
      user_email: training.user_email,
    });

    if (!trainingsForUser) {
      throw new NotFoundException('Could not find trainings for specify user.');
    }

    return trainingsForUser as Training[];
  }

  async getLastTrainingForUser(training: ITraining) {
    const lastTrainingForUser = await this.trainingModel
      .find({ user_email: training.user_email })
      .sort({ createdDate: -1 })
      .limit(1);

    if (!lastTrainingForUser) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return lastTrainingForUser as Training[];
  }

  async getFirstTrainingForUser(training: ITraining) {
    const firstTrainingForUser = await this.trainingModel
      .find({ user_email: training.user_email })
      .sort({ createdDate: 1 })
      .limit(1);

    if (!firstTrainingForUser) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return firstTrainingForUser as Training[];
  }

  async getSingleTraining(training: ITraining) {
    const singleTraining = await this.findTraining({
      user_email: training.user_email,
      id: training.id,
    });

    if (!singleTraining) {
      throw new NotFoundException('Could not find training.');
    }

    return singleTraining as Training;
  }

  async updateTraining(training: ITraining) {
    const updatedTraining = await this.findTraining({
      user_email: training.user_email,
      id: training.id,
    });

    if (training.sport) {
      updatedTraining.sport = training.sport;
    }

    if (training.tag_color) {
      updatedTraining.tag_color = training.tag_color;
    }

    if (training.source) {
      updatedTraining.source = training.source;
    }

    if (training.start_time) {
      updatedTraining.start_time = training.start_time;
    }

    if (training.end_time) {
      updatedTraining.end_time = training.end_time;
    }

    if (training.duration_sec >= 0) {
      updatedTraining.duration_sec = training.duration_sec;
    }

    if (training.distance_km >= 0) {
      updatedTraining.distance_km = training.distance_km;
    }

    if (training.calories_kcal >= 0) {
      updatedTraining.calories_kcal = training.calories_kcal;
    }

    if (training.description) {
      updatedTraining.description = training.description;
    }

    if (training.heart_rate_avg_bpm) {
      updatedTraining.heart_rate_avg_bpm = training.heart_rate_avg_bpm;
    }

    if (training.effort) {
      updatedTraining.effort = training.effort;
    }

    if (training.feeling) {
      updatedTraining.feeling = training.feeling;
    }

    if (training.steps) {
      updatedTraining.steps = training.steps;
    }

    if (training.hydration_ml) {
      updatedTraining.hydration_ml = training.hydration_ml;
    }

    if (training.heart_rate_max_bpm) {
      updatedTraining.heart_rate_max_bpm = training.heart_rate_max_bpm;
    }

    if (training.speed_avg_kmh) {
      updatedTraining.speed_avg_kmh = training.speed_avg_kmh;
    }

    if (training.speed_max_kmh) {
      updatedTraining.speed_max_kmh = training.speed_max_kmh;
    }

    if (training.points) {
      updatedTraining.points = training.points;
    }

    updatedTraining.save();
  }

  async deleteTraining(training: ITraining) {
    const result = await this.trainingModel
      .deleteOne({ user_email: training.user_email, _id: training.id })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find training.');
    }
  }

  async getTheLargestAmountOfDistanceForUser(year, training: ITraining) {
    const theLargestAmountOfDistance = await this.trainingModel
      .find({
        $and: [
          { user_email: training.user_email },
          { start_time: { $regex: year, $options: 'i' } },
        ],
      })
      .sort({ distance_km: -1 })
      .limit(1);

    if (!theLargestAmountOfDistance) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return theLargestAmountOfDistance as Training[];
  }

  async getTheLargestAmountOfTimeForUser(year, training: ITraining) {
    const theLargestAmountOfTime = await this.trainingModel
      .find({
        $and: [
          { user_email: training.user_email },
          { start_time: { $regex: year, $options: 'i' } },
        ],
      })
      .sort({ duration_sec: -1 })
      .limit(1);

    if (!theLargestAmountOfTime) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return theLargestAmountOfTime as Training[];
  }

  async getTheLargestAmountOfCaloriesForUser(year, training: ITraining) {
    const theLargestAmountOfCalories = await this.trainingModel
      .find({
        $and: [
          { user_email: training.user_email },
          { start_time: { $regex: year, $options: 'i' } },
        ],
      })
      .sort({ calories_kcal: -1 })
      .limit(1);

    if (!theLargestAmountOfCalories) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return theLargestAmountOfCalories as Training[];
  }

  async sumTraingsDataByYear(year: string, training: ITraining) {
    let count = 0;

    this.trainingModel.countDocuments(
      {
        $and: [
          { user_email: training.user_email },
          { start_time: { $regex: year, $options: 'i' } },
          { type: { $not: { $regex: /^ABSENCE.*/ } } },
        ],
      },
      (err, c) => {
        if (!err) {
          count = c;
        }
      },
    );

    const matchTime = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { duration_sec: { $gte: 1 } },
            { start_time: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, duration_sec: { $sum: '$duration_sec' } } },
    ]);

    const matchDistance = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { distance_km: { $gte: 1 } },
            { start_time: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, distance_km: { $sum: '$distance_km' } } },
    ]);

    const matchCalories = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { calories_kcal: { $gte: 1 } },
            { start_time: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, calories_kcal: { $sum: '$calories_kcal' } } },
    ]);

    return {
      0: {
        duration_sec: matchTime && matchTime[0] ? matchTime[0].duration_sec : null,
        distance_km: matchDistance && matchDistance[0] ? matchDistance[0].distance_km : null,
        calories_kcal: matchCalories && matchCalories[0] ? matchCalories[0].calories_kcal : null,
      },
      count,
    };
  }

  async sumTraingsDataByMonth(year: string, month: string, training: ITraining) {
    let count = 0;

    this.trainingModel.countDocuments(
      {
        $and: [
          { user_email: training.user_email },
          { start_time: { $regex: year + '-' + month, $options: 'i' } },
          { type: { $not: { $regex: /^ABSENCE.*/ } } },
        ],
      },
      (err, c) => {
        if (!err) {
          count = c;
        }
      },
    );

    const matchTime = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { duration_sec: { $gte: 1 } },
            { start_time: { $regex: year + '-' + month, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, duration_sec: { $sum: '$duration_sec' } } },
    ]);

    const matchDistance = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { distance_km: { $gte: 1 } },
            { start_time: { $regex: year + '-' + month, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, distance_km: { $sum: '$distance_km' } } },
    ]);

    const matchCalories = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { calories_kcal: { $gte: 1 } },
            { start_time: { $regex: year + '-' + month, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, calories_kcal: { $sum: '$calories_kcal' } } },
    ]);

    return {
      0: {
        duration_sec: matchTime && matchTime[0] ? matchTime[0].duration_sec : null,
        distance_km: matchDistance && matchDistance[0] ? matchDistance[0].distance_km : null,
        calories_kcal: matchCalories && matchCalories[0] ? matchCalories[0].calories_kcal : null,
      },
      count,
    };
  }

  async compareSumTraingsDataByYear(
    year: string,
    training: ITraining,
    user_emailToCompare: string,
  ) {
    let countUser = 0;
    let countUserToCompare = 0;

    this.trainingModel.countDocuments(
      {
        $and: [
          { user_email: training.user_email },
          { start_time: { $regex: year, $options: 'i' } },
          { type: { $not: { $regex: /^ABSENCE.*/ } } },
        ],
      },
      (err, c) => {
        if (!err) {
          countUser = c;
        }
      },
    );

    this.trainingModel.countDocuments(
      {
        $and: [
          { user_email: user_emailToCompare },
          { start_time: { $regex: year, $options: 'i' } },
          { type: { $not: { $regex: /^ABSENCE.*/ } } },
        ],
      },
      (err, c) => {
        if (!err) {
          countUserToCompare = c;
        }
      },
    );

    const matchTimeUser = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { duration_sec: { $gte: 1 } },
            { start_time: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, duration_sec: { $sum: '$duration_sec' } } },
    ]);

    const matchDistanceUser = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { distance_km: { $gte: 1 } },
            { start_time: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, distance_km: { $sum: '$distance_km' } } },
    ]);

    const matchCaloriesUser = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { calories_kcal: { $gte: 1 } },
            { start_time: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, calories_kcal: { $sum: '$calories_kcal' } } },
    ]);

    const matchTimeUserToCompare = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: user_emailToCompare },
            { duration_sec: { $gte: 1 } },
            { start_time: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, duration_sec: { $sum: '$duration_sec' } } },
    ]);

    const matchDistanceUserToCompare = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: user_emailToCompare },
            { distance_km: { $gte: 1 } },
            { start_time: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, distance_km: { $sum: '$distance_km' } } },
    ]);

    const matchCaloriesUserToCompare = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: user_emailToCompare },
            { calories_kcal: { $gte: 1 } },
            { start_time: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, calories_kcal: { $sum: '$calories_kcal' } } },
    ]);

    const userOneData = {
      user: training.user_email,
      stats: {
        duration_sec: matchTimeUser && matchTimeUser[0] ? matchTimeUser[0].duration_sec : null,
        distance_km:
          matchTimeUser && matchDistanceUser[0] ? matchDistanceUser[0].distance_km : null,
        calories_kcal:
          matchTimeUser && matchCaloriesUser[0] ? matchCaloriesUser[0].calories_kcal : null,
      },
      count: countUser,
    };

    const userTwoData = {
      user: user_emailToCompare,
      stats: {
        duration_sec:
          matchTimeUserToCompare && matchTimeUserToCompare[0]
            ? matchTimeUserToCompare[0].duration_sec
            : null,
        distance_km:
          matchTimeUserToCompare && matchDistanceUserToCompare[0]
            ? matchDistanceUserToCompare[0].distance_km
            : null,
        calories_kcal:
          matchTimeUserToCompare && matchCaloriesUserToCompare[0]
            ? matchCaloriesUserToCompare[0].calories_kcal
            : null,
      },
      count: countUserToCompare,
    };

    const usersData = [];
    const isUsersData =
      userOneData.stats.duration_sec &&
      userOneData.stats.distance_km &&
      userOneData.stats.calories_kcal &&
      userTwoData.stats.duration_sec &&
      userTwoData.stats.distance_km &&
      userTwoData.stats.calories_kcal;

    if (isUsersData) {
      usersData.push(userOneData);
      usersData.push(userTwoData);
    }

    return {
      compare: usersData,
    };
  }

  async compareSumTraingsDataByMonth(
    month: string,
    year: string,
    training: ITraining,
    user_emailToCompare: string,
  ) {
    let countUser = 0;
    let countUserToCompare = 0;

    this.trainingModel.countDocuments(
      {
        $and: [
          { user_email: training.user_email },
          { start_time: { $regex: year + '-' + month, $options: 'i' } },
          { type: { $not: { $regex: /^ABSENCE.*/ } } },
        ],
      },
      (err, c) => {
        if (!err) {
          countUser = c;
        }
      },
    );

    this.trainingModel.countDocuments(
      {
        $and: [
          { user_email: user_emailToCompare },
          { start_time: { $regex: year + '-' + month, $options: 'i' } },
          { type: { $not: { $regex: /^ABSENCE.*/ } } },
        ],
      },
      (err, c) => {
        if (!err) {
          countUserToCompare = c;
        }
      },
    );

    const matchTimeUser = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { duration_sec: { $gte: 1 } },
            { start_time: { $regex: year + '-' + month, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, duration_sec: { $sum: '$duration_sec' } } },
    ]);

    const matchDistanceUser = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { distance_km: { $gte: 1 } },
            { start_time: { $regex: year + '-' + month, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, distance_km: { $sum: '$distance_km' } } },
    ]);

    const matchCaloriesUser = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: training.user_email },
            { calories_kcal: { $gte: 1 } },
            { start_time: { $regex: year + '-' + month, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, calories_kcal: { $sum: '$calories_kcal' } } },
    ]);

    const matchTimeUserToCompare = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: user_emailToCompare },
            { duration_sec: { $gte: 1 } },
            { start_time: { $regex: year + '-' + month, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, duration_sec: { $sum: '$duration_sec' } } },
    ]);

    const matchDistanceUserToCompare = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: user_emailToCompare },
            { distance_km: { $gte: 1 } },
            { start_time: { $regex: year + '-' + month, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, distance_km: { $sum: '$distance_km' } } },
    ]);

    const matchCaloriesUserToCompare = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { user_email: user_emailToCompare },
            { calories_kcal: { $gte: 1 } },
            { start_time: { $regex: year + '-' + month, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, calories_kcal: { $sum: '$calories_kcal' } } },
    ]);

    const userOneData = {
      user: training.user_email,
      stats: {
        duration_sec: matchTimeUser && matchTimeUser[0] ? matchTimeUser[0].duration_sec : null,
        distance_km:
          matchTimeUser && matchDistanceUser[0] ? matchDistanceUser[0].distance_km : null,
        calories_kcal:
          matchTimeUser && matchCaloriesUser[0] ? matchCaloriesUser[0].calories_kcal : null,
      },
      count: countUser,
    };

    const userTwoData = {
      user: user_emailToCompare,
      stats: {
        duration_sec:
          matchTimeUserToCompare && matchTimeUserToCompare[0]
            ? matchTimeUserToCompare[0].duration_sec
            : null,
        distance_km:
          matchTimeUserToCompare && matchDistanceUserToCompare[0]
            ? matchDistanceUserToCompare[0].distance_km
            : null,
        calories_kcal:
          matchTimeUserToCompare && matchCaloriesUserToCompare[0]
            ? matchCaloriesUserToCompare[0].calories_kcal
            : null,
      },
      count: countUserToCompare,
    };

    const usersData = [];
    const isUsersData =
      userOneData.stats.duration_sec &&
      userOneData.stats.distance_km &&
      userOneData.stats.calories_kcal &&
      userTwoData.stats.duration_sec &&
      userTwoData.stats.distance_km &&
      userTwoData.stats.calories_kcal;

    if (isUsersData) {
      usersData.push(userOneData);
      usersData.push(userTwoData);
    }

    return {
      compare: usersData,
    };
  }
}
