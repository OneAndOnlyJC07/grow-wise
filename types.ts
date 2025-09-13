export interface Student {
  enrollmentNumber: string;
  name: string;
  email: string;
}

export interface Book {
  id: string;
  title: string;
  imageFile?: File;
  imageUrl: string;
  rentPrice: number;
  description: string;
  owner: Student;
  available: boolean;
}