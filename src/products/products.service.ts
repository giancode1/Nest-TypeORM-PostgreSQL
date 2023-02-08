import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService'); // propiedad privada que no se modifica
  // dentro de Logger(), nombre de la clase en la cual uso el logger

  // Patron Repositorio
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  // productRepository me sirve para insertar, query builders, transacciones, roolbacks y mas

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto); // hay 3 formas para hacer el create()
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      // console.log(error);  // no se visualiza rapidamente el error

      //this.logger.error(error); // mas fácil ver el error
      // throw new InternalServerErrorException('!Ayuda');
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
