import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { NinjaGuard } from './ninja.guard';

@Controller('ninjas')
@UseGuards(NinjaGuard) // guard all routes
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjaService.getNinjas(weapon);
  }

  @Get(':id')
  getSelectedNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getSelectedNinja(id);
    } catch {
      throw new NotFoundException();
    }
  }

  @Post()
  @UseGuards(NinjaGuard) // guard specific route
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjaService.updateNinja(id, updateNinjaDto);
  }

  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.deleteNinja(id);
  }
}
