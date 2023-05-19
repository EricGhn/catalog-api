import { Model, Table, Column, HasOne, HasMany, DataType } from 'sequelize-typescript';
import { Asset } from './asset';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.FLOAT,
  })
  cash1!: string;

  @Column({
    type: DataType.FLOAT,
  })
  cash2!: string;

  @Column({
    type: DataType.FLOAT,
  })
  cash3!: string;

  @HasOne(() => Asset)
  asset!: Asset;
}
