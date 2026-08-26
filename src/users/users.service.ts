import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.usersRepository.create({ ...createUserDto, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async findAllUsers() {
    return this.usersRepository.find();
  }

  async findOneUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id }
    })

    if (!user) throw new NotFoundException("Not found!");
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("Not found!");
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async removeUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("Not found!");

    return this.usersRepository.delete(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } })
  }
}
