import { Model, Table, Column, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Asset extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
  })
  type!: number;

  @Column({
    type: DataType.INTEGER,
  })
  level!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
  })
  address!: string;

  @BelongsTo(() => User)
  user!: User;
}
