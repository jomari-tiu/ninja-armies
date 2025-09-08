import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    {
      id: 1,
      name: 'Ninja A',
      weapon: 'stars',
    },
    {
      id: 2,
      name: 'Ninja B',
      weapon: 'nunchucks',
    },
  ];

  getNinjas(weapon?: 'stars' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((item) => item.weapon === weapon);
    }
    return this.ninjas;
  }

  getSelectedNinja(id: number) {
    const ninja = this.ninjas.find((item) => item.id === id);
    if (!ninja) throw new Error('Ninja not found!');
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const NewNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };
    this.ninjas.push(NewNinja);
    return NewNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    const toBeUpdate = this.getSelectedNinja(id);
    if (!toBeUpdate) {
      throw new Error('Ninja not found!');
    }
    this.ninjas = this.ninjas.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...updateNinjaDto,
        };
      }
      return item;
    });
    return toBeUpdate;
  }

  deleteNinja(id: number) {
    const toBeRemoved = this.getSelectedNinja(id);
    if (!toBeRemoved) {
      throw new Error('Ninja not found!');
    }
    this.ninjas = this.ninjas.filter((item) => item.id !== toBeRemoved.id);
    return toBeRemoved;
  }
}
