import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class User  {
  @Prop({ required: true, unique:true })
  id: String;
  
  @Prop({ required: true })
  name: String;
  
  @Prop({ required: true })
  password: String;
}

export const UserSchema = SchemaFactory.createForClass(User);