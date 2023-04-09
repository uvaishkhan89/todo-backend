import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { User } from "src/users/entities/user.entity";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
@ApiTags('Login')
export class AuthController { 

    constructor(private jwtService: JwtService){}
    
    @Post('/login')
    @UseGuards(AuthGuard('local'))
    login(@Req() req, @Body() loginDto: LoginDto){
        const user: User = req.user;
        const payload = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        return {token: this.jwtService.sign(payload)};
    }

}