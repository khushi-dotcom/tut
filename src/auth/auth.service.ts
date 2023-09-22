import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
//import { PrismaModule } from 'src/prisma/prisma.module'; 
//import {User,Bookmark} from '@prisma/client';
//gets service from prisma service
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt:JwtService,private config: ConfigService){

    }
    async singup(dto: AuthDto){ //generate hash for pssword
        //generate the password
        const hash=await argon.hash(dto.password);
        //save new user in db
        try{
        const user= await this.prisma.user.create({
            data:{
                email:dto.email,
                hash,
            },
            // select:{
            //     id:true,
            //     email: true,
            //     createdAt: true,
            //     updatedAt: true
            // } instead of all these, just write transformers
        });
        //return saved user
       
        return this.signToken(user.id, user.email);
    }catch(error)
    {
        if(error instanceof PrismaClientKnownRequestError)
        {
            if(error.code === 'P2002')
            {
                throw new ForbiddenException('creadentials taken')
            }
        }
        throw error;
    }

    }
    async singin(dto: AuthDto){
        //find user by mail
        const user= await this.prisma.user.findUnique({
            where:{
                email: dto.email,
            },
        });
        
        //if user does not exist throw exception
        if(!user) throw new ForbiddenException(
            'credentials incorrect',
        );
        //compare password
        const pwMatches =await argon.verify(
            user.hash,
            dto.password,
        );
        // if password incorrect throw exception
        if(!pwMatches) throw new ForbiddenException(
            'credentials incorrect',
        );

        delete user.hash;
        return this.signToken(user.id,user.email);


    }
    async signToken(
        userId: number,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
          email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwt.signAsync(
          payload,
          {
            expiresIn: '15m',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
      }
}
