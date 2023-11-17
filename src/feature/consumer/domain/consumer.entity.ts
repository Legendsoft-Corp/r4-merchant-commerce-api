import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consumer {
  @Column({ unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  apiKey: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  type: string;

  @Column()
  createdBy: string;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  createdAt: string;
}
