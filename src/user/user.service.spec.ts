import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { IUserRepo } from './interfaces/user-repo.interface';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepo: IUserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserRepo,
          useValue: {
            findAll: jest.fn(),
            findOneBy: jest.fn(),
          }
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepo = module.get<IUserRepo>(IUserRepo)
  });

  describe('UserService', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
    });
  })

  describe('UserRepository', () => {
    it('should be defined', () => {
      expect(userRepo).toBeDefined();
    })
  });

  describe('Testing findAll from UserService', () => {
    it('should return a list of users', async () => {
      const userServiceFindAllSucessResult: User[] = [
        new User({
          "id": 1,
          "email": "test1@email.com.br",
        }),
      ];
      jest.spyOn(userService, 'findAll')
        .mockResolvedValue(userServiceFindAllSucessResult);
      const result = await userService.findAll();
      expect(result).toEqual(userServiceFindAllSucessResult);
      expect(typeof (result)).toBe('object');
      expect(result.length).toBe(1);
    })
  });

  describe('Testing findOne from UserService', () => {
    it('should return a single user', async () => {
      const userServiceFindOneSucessResult: User = new User({
        "id": 1,
        "email": "test1@email.com.br",
      });
      jest.spyOn(userService, 'findOne')
        .mockResolvedValue(userServiceFindOneSucessResult);
      const id: number = 1;
      const result = await userService.findOne(id);
      expect(result).toEqual(userServiceFindOneSucessResult);
      expect(typeof (result)).toBe('object');
      expect(result.id).toBe(id);
    })
  });
});
