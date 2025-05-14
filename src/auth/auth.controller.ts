import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

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
    @Post('signup')
    signup() {
        return this.authService.signup()
     }

    @Post('signin')
    signin() { 
        return this.authService.signin()
    }
}