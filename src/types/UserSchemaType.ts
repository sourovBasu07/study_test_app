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

export interface CreateTestDocument {
  _id: string;
  subject: string;
  totalQuestions: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}
