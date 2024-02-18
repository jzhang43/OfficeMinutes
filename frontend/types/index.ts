export enum Status {
  WAITING,
  IN_PROGRESS,
  DONE,
}

export interface OfficeHour {
  questions: Question[];
  tas: Student[];
  location: string;
}

interface Student {
  name: string;
  socketId: string;
}

interface Question {
  question: string;
  tags: string[];
  students: Student[];
  description: String;
  private: boolean;
  status: Status;
  location?: string;
}
