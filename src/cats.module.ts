import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './cat.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://hamza025:mynameisjeff786@cluster0.ns2rve7.mongodb.net/test'),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  JwtModule.register({secret: 'secret',
  signOptions: {  expiresIn: '1h'}
}),
 
  
  ],
  controllers: [CatController],
  providers: [CatsService],
})
export class CatsModule {}