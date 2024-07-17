import { Injectable } from '@nestjs/common';
import { User } from 'src/Users/entities/user.entity';
import { UsersService } from 'src/Users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    console.log(email, password);
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const isPasswordValid = compareSync(password, user.password);
    return !!isPasswordValid;
  }
}
