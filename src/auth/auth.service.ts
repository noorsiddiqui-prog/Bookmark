import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      // hash password
      // create user in prisma
      // return user
      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      const { hash: hashedPassword, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // duplicate error
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception

    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password

    const pwMatches = await argon.verify(user.hash as string, dto.password);

    // if password incorrect throw exception

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    // send back the user
    const { hash: hashedPassword, ...safeUser } = user;
    return safeUser;
  }
}
