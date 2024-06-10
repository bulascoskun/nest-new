import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    fakeUsersService = {
      findOne: (id: number) => {
        const user = {
          id,
          email: 'test@test.com',
          password: 'test',
        } as User;
        return Promise.resolve(user);
      },
      find: (email: string) => {
        const user = {
          id: Math.random(),
          email: email,
          password: 'test',
        } as User;
        return Promise.resolve([user]);
      },
      // update: (id: number, attrs: Partial<User>) => {
      //   const user = {
      //     id,
      //     ...attrs,
      //   } as User;
      //   return Promise.resolve(user);
      // },
      // remove: (id: number) => {
      //   const user = {
      //     id,
      //   } as User;
      //   return Promise.resolve(user);
      // },
    };
    // Create a fake copy of the auth service
    fakeAuthService = {
      // signup: (email: string, password: string) => Promise.resolve({} as User),
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('test@test.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com');
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'emrecan@emrecan.com', password: 'emrecan' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
