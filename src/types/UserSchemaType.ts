export interface UserDocument {
  _id: string;
  email: string;
  username: string;
  password: string;
  name: string;
  phone: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
