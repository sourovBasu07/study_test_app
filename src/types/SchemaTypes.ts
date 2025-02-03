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

export interface TestDocument {
  _id: string;
  subject: string;
  totalQuestions: number;
  duration: number;
  questions: {
    question: string;
    options: string[];
    correctAnswer: {
      number: number;
      text: string;
    };
  }[];
  createdAt: Date;
  updatedAt: Date;
}
