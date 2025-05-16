import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService {
    // test(){}

    constructor(private prisma: PrismaService){
    }

    signup(dto: AuthDto){
        return { msg: "Hello Signup" }
    }
    signin(){
        return { msg: "Hello SignIn" }

    }
}