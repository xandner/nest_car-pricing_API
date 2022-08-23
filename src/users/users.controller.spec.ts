import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUser:Partial<UsersService>;
  let fakeAuth:Partial<AuthService>

  beforeEach(async () => {
    fakeUser={
      findOne:(id:number)=>Promise.resolve({id,email:"xxxx",password:"xxx"} as User),
      findByEmail:(email:string)=>Promise.resolve({id:1,email ,password:"xxx"} as User),
      // remove:(id)=>{},
      // update:()=>{}
    }
    fakeAuth={
      // sinin:()=>{},
      // sinup:()=>{}
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {provide:UsersService,useValue:fakeUser},
        {provide:AuthService,useValue:fakeAuth},
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
