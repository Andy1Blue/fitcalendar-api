import { Injectable, NotFoundException } from '@nestjs/common';
import { Whitelist } from './schemas/whitelist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import e = require('express');

@Injectable()
export class WhitelistsService {
  constructor(@InjectModel('Whitelist') private readonly WhitelistModel: Model<Whitelist>) {}

  async isWhitelisted(email: string): Promise<boolean> {
    const whitelistedUser = await this.WhitelistModel.findOne({ email }).exec();

    if (!whitelistedUser || !whitelistedUser.isActive) {
      return false;
    }

    return true;
  }
}
