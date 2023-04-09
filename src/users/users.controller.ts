import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiTags, ApiSecurity } from '@nestjs/swagger/';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signUp')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get()
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll(@Req() req) {
    console.log(req.user);
    return this.usersService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    console.log(req.user);
    return this.usersService.findOne(+id);
  }

  @ApiSecurity('JWT-auth')
  @Delete(':id')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  // @Get(':email')
  // findUserByEmail(@Param('email') email: string){
  //   return this.usersService.findUserByEmail(email)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  
}
