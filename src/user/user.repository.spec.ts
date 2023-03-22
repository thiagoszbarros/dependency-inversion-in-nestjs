import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRepo } from './user.repository';



describe('UserRepository', () => {
    let userRepo: UserRepo;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepo,
                {
                    provide: getRepositoryToken(User),
                    useValue:
                    {
                        id: 1,
                        email: "test1@email.com.br",
                    }
                },
            ]
        }).compile();

        userRepo = module.get<UserRepo>(UserRepo);
    });

    describe('UserRepository', () => {
        it('should be defined', async () => {
            expect(userRepo).toBeDefined();
        });
    })

    describe('Testing findAll from UserRepository', () => {
        it('should return a list of users', async () => {
            const userRepositoryFindAllSucessResult: User[] = [
                new User(),
                new User(),
                new User(),
            ]
            jest.spyOn(userRepo, 'findAll')
            .mockResolvedValue(userRepositoryFindAllSucessResult);
            const result = await userRepo.findAll();
            expect(result).toEqual(userRepositoryFindAllSucessResult);
        })
    });

    describe('Testing findOne from UserRepository', () => {
        it('should return a single user', async () => {
            const userRepositoryFindOneBySucessResult: User = new User()
            jest.spyOn(userRepo, 'findOne')
            .mockResolvedValue(userRepositoryFindOneBySucessResult);
            const id = 1;
            const result = await userRepo.findOne(id);
            expect(result).toEqual(userRepositoryFindOneBySucessResult);
        })
    })

    describe('Testing create function from UserRepo', () => {
        it('should create a new user', async () => {
          const createUserDto = {
            name: "Test1",
            lastName: "Test1",
            email: "test1@email.com",
            password: "sosecure"
          }
          const userRepoCreateSucessResult = new User();
          jest.spyOn(userRepo, 'create')
            .mockResolvedValue(userRepoCreateSucessResult);
          const result = await userRepo.create(createUserDto);
          expect(result).toEqual(userRepoCreateSucessResult);
          expect(result.email).toEqual(userRepoCreateSucessResult.email);
          expect(result.id).toEqual(userRepoCreateSucessResult.id);
        })
      })
});
