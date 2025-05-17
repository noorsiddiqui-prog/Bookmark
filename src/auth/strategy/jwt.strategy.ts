import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET') || '',
    });
  }

  async validate(payload: {
    sub: number;
    email: string
  }) {
    // You can customize this based on your JWT payload
    console.log('validate', payload);

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    })

    if (!user) {
      return null; // or throw an UnauthorizedException
    }
    
    const { hash, ...restUser } = user
    return restUser; // this becomes `req.user`
  }
}
