import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

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
      this.handleDBExceptions(error);
    }
  }

  // TODO: paginar
  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    });
  }

  async findOne(term: string) {
    // * Buscar por UUID o slug:
    let product: Product;
    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      product = await this.productRepository.findOneBy({ slug: term });
    }

    // const product = await this.productRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`Product with id ${term} not found`);

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
