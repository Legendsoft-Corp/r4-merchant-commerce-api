import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

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
}
