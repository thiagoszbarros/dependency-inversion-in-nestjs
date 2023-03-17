import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: IUserService) { }

  @Get()
  @ApiOperation({ summary: 'List all users' })

  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show a user' })

  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }
}
