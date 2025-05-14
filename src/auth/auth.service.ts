import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    // test(){}

    constructor(private prisma: PrismaService){
    }

    signup(){
        return { msg: "Hello Signup" }
    }
    signin(){
        return { msg: "Hello SignIn" }

    }
}