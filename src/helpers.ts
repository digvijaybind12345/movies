import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

// NOTE: No need to create an abstract class, you can use the fields inside the entity class directly
export abstract class CreatedModified {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
