import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

// @Controller()
// export class AuthController {
//     authService: AuthService
//     constructor(authService: AuthService){
//         this.authService = authService
//     }
// }

// @Controller()
// export class AuthController {
//     constructor(private authService: AuthService){
//         this.authService.test()
//     }
// }

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log({ dto })
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}