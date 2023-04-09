import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findUserByEmail(email);
    if (user && user.password == password) return user;
    if (user == undefined)
      throw new UnauthorizedException('User Not Found : ' + email);
    if (user.password != password)
      throw new UnauthorizedException('Invalid Password');
  }
}