import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum BRANCH_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

@Entity()
export class Branch {
  @Column({ unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 50 })
  @Index()
  name: string;

  @Column({ nullable: false, length: 70 })
  address: string;

  @Column({ nullable: false, length: 11 })
  @Index()
  phoneNumber: string;

  @Column({ nullable: false, length: 50 })
  @Index()
  email: string;

  @Column({ default: 'INACTIVE' })
  status: BRANCH_STATUS;

  @Column({ length: 36 })
  @Index('uuid')
  commerce: string;
}
