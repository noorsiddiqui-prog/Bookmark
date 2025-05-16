import { Body, Controller, ParseIntPipe, Post, Req } from "@nestjs/common";
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
    constructor(private authService: AuthService){}

    // auth/signup
    // @Post('signup')
    // // signup(@Req() req: Request) {
    //     // signup(@Body('email') email: string, @Body('password', ParseIntPipe) password: string) {
    //     signup(@Body() dto: AuthDto) {
    //     // console.log(req.body)
    //     console.log({dto})
    //     // console.log({ email, typeOfEmail: typeof email, password, typeOfPassword: typeof password })
    //     return this.authService.signup()
    //  }

    @Post('signup')
        signup(@Body() dto: AuthDto) {
        console.log({dto})
        return this.authService.signup(dto)
     }

    @Post('signin')
    signin() { 
        return this.authService.signin()
    }
}