import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { UserController } from './user.controller';


describe('UserController', () => {
  let userController: UserController;
  let userService: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: IUserService,
        useValue: {
          findAll: () => jest.fn(),
          findOne: () => jest.fn(),
        },
      }]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<IUserService>(IUserService);
  });

  describe('UserController', () => {
    it('should be defined', () => {
      expect(userController).toBeDefined();
    });
  })

  describe('UserService', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
    });
  })

  describe('Testing findAll function from UserController', () => {
    it('should return a list of users', async () => {
      const userControllerFindAllSucessResult: User[] = [
        new User({
          id: 1,
          email: "test1@email.com.br",
        }),
      ];
      jest.spyOn(userService, 'findAll')
        .mockResolvedValue(userControllerFindAllSucessResult);
      const result = await userController.findAll();
      expect(result).toEqual(userControllerFindAllSucessResult);
      expect(typeof (result)).toBe('object');
      expect(result.length).toBe(1);
    })
  });

  describe('Testing findOne function from UserController', () => {
    it('should return a single user', async () => {
      const userControllerFindOneSucessResult: User = new User({
        id: 1,
        email: "test1@email.com.br",
      })
      jest.spyOn(userController, 'findOne')
        .mockResolvedValue(userControllerFindOneSucessResult);
      const result = await userController.findOne(userControllerFindOneSucessResult.id);
      expect(result).toEqual(userControllerFindOneSucessResult);
      expect(result.id).toEqual(id);
    })
  });
});