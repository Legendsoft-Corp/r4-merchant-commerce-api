import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

export enum CASHIER_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

@Entity()
export class Cashier {
  @Column({ unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 50 })
  @Index({ unique: true })
  name: string;

  @Column({ length: 36 })
  @Index('uuid')
  branch: string;

  @Column()
  status: CASHIER_STATUS;
}
