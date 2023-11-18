import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum RIF_TYPE {
  V = 'V',
  E = 'E',
  J = 'J',
  P = 'P',
  G = 'G',
}

export enum COMMERCE_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity()
export class Commerce {
  @Column({ unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 1 })
  rifType: RIF_TYPE;

  @Column({ length: 9 })
  @Index({ unique: true })
  rif: string;

  @Column({ length: 50 })
  @Index({ unique: true })
  name: string;

  @Column({ nullable: false, length: 70 })
  address: string;

  @Column({ nullable: false, length: 11 })
  @Index({ unique: true })
  phoneNumber: string;

  @Column({ length: 36 })
  @Index({ unique: true })
  user: string;

  @Column({ default: 'INACTIVE' })
  status: COMMERCE_STATUS;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  createdAt: string;
}
