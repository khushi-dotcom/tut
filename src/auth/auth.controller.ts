import { Controller,Post, Body, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Req } from '@nestjs/common/decorators';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signup')
    singup(@Body() dto:AuthDto) {
        console.log({dto,});
        return this.authService.singup(dto);
    }
    // singup(@Body('email') email:string, 
    // @Body('password', ParseIntPipe) password:string ,
    // ) // dto:any not good //@Body dto:AuthDto
    // {
    //     console.log({
    //         email,
    //         typeOfEmail: typeof email,
    //         password,
    //         typeOfPassword: typeof password
    //     });
    //     return this.authService.singup();

    //benefit that  express will get right body depending on framework for you
    // singup(@Req() req:Request){
    //     console.log(req.body);
    //     return this.authService.singup();

    // }

    @Post('signin')
    singin(@Body() dto:AuthDto){
    
        return this.authService.singin(dto);

    }

}
