import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'generated/prisma';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
    // GET /users/test
    // @UseGuards(AuthGuard('jwt'))
    // @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }
    // getMe(@Req() req: Request){
    //     console.log({
    //         user: req.user
    //     })
    //     return req.user
    // }
}
