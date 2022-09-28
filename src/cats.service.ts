import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument} from './cat.schema';
import { CatController, CreateCatDto } from './cats.controller';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(

    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>) {}

  async createCat(createCatDto:CreateCatDto): Promise<Cat> {
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
  async findOne({id,mail}:any): Promise<Cat> {
    return this.catModel.findOne({$or:[{_id:id},{mail}]}).exec();
  }
  async delete(id: string) {
    const deletedCat = await this.catModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
}








}