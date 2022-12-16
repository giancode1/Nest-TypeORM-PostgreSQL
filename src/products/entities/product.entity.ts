import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Recuerda el entity es una representacion de esta clase en la db, es como la tabla
// * recuerda configuramos autoLoadEntities y synchronize en true, inmediatamente lo sincroniza con la db todo lo q estoy poniendo abajo:
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ! no todos los tipos de datos q me muestra, estan soportados por postgres, aca estan de todos: mysql, mongo, ...
  @Column('text', {
    unique: true,
  })
  title: string;

  // no es number para postgre
  @Column('float', {
    default: 0,
    // precision: 5,
    // scale: 3,
  })
  price: number;

  @Column({
    type: 'text', // otra forma, tambn puedes definir aca el tipo
    nullable: true,
  })
  description: string;

  // el slug debe ser unico, para este caso me servira para tener url friendly
  @Column('text', {
    unique: true, // * único, por lo tanto no debe ser null, entoncs es obligatorio que tenga valor
  })
  slug: string; // no 2 slug iguales porq no hay 2 productos iguales, tambn se pueden crear indices pero unique tambn crea un indice por mi

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string; // generos

  //TAGS
  //IMAGES
}
