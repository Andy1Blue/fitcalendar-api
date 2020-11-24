import { Injectable, NotFoundException } from '@nestjs/common';
import { Whitelist } from './schemas/whitelist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import e = require('express');

@Injectable()
export class WhitelistsService {
  constructor(@InjectModel('Whitelist') private readonly WhitelistModel: Model<Whitelist>) {}

  async isWhitelisted(userId: string): Promise<boolean> {
    const whitelistedUser = await this.WhitelistModel.findOne({ userId }).exec();

    if (!whitelistedUser || !whitelistedUser.isActive) {
      return false;
    }

    return true;
  }
}
