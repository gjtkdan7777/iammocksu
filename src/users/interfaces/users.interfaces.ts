import { Document } from 'mongoose';

export interface Users extends Document {
  readonly name: string;
  readonly password: string;
  readonly age: number;
  readonly breed: string;
}