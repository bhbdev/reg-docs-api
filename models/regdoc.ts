import {DataType, Table, Column, Model, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class RegDoc extends Model<RegDoc> {

  @Column(DataType.STRING)
    uri: string;

  @Column(DataType.STRING)
    title: string;

  @Column(DataType.TEXT)
    body: string;

  @Column(DataType.BOOLEAN)
    hidden: boolean;  
 
  @CreatedAt
    @Column
    createdAt: Date;

  @UpdatedAt
    @Column
    updatedAt: Date;

}