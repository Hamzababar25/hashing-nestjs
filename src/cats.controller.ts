import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {CatsService} from "./cats.service";
import { Cat } from './/cat.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";




export class CreateCatDto {
    name?: string;
    mail: string;
    password?: string;
   
  
  }

  @Controller('cats')
export class CatController {
    constructor(private jwtService: JwtService,
      private readonly catsService: CatsService) {}
     @Post()
async create(@Body() createCatDto: CreateCatDto) {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(createCatDto.password, saltOrRounds);

  createCatDto.password=hash;
   return this.catsService.createCat(createCatDto)

}
@Post('signin')
async createe(@Body() createCatDto: CreateCatDto) {
  
  
   const u= await this.catsService.findOne(createCatDto) as any;
   if(u){
    const jwt=await this.jwtService.signAsync({id:u.mail});
    const result=bcrypt.compareSync(createCatDto?.password,u.password)
    return result?{...u?._doc,token:jwt}:{message:"Invalid Password!"}
   }
   else{
   return  {
    message:"Mail Not Found",
   };
  }
  
}

@Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  /* @Get(':id')
  
  async findOne(@Param('id') id: string): Promise<Cat> {
    
    const u= this.catsService.findOne({id});
    bcrypt.compare(CreateCatDto.password, (await u).password).then(function(result) {
       return "true"
  }); */

    
   
/* }
@Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  } */
}