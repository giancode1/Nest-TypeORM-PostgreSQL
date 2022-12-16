import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Recuerda el entity es una representacion de esta clase en la db, es como la tabla
// * recuerda configuramos autoLoadEntities y synchronize en true, inmediatamente lo sincroniza con la db todo lo q estoy poniendo abajo:
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // ! no todos los tipos de datos q me muestra, estan soportados por postgres, aca estan de todos: mysql, mongo, ...
  @Column('text', {
    unique: true,
  })
  title: string;
}
