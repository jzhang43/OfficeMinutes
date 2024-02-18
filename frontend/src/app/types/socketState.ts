export enum Status {
  WAITING,
  IN_PROGRESS,
  DONE,
}

export interface State {
  courseId: OfficeHour;
}

export interface OfficeHour {
  questions: Question[];
  tas: Student[];
  location: string;
}

export interface Student {
  name: string;
  id: string;
  socket: string;
}

export interface Question {
  question: string;
  tags: string[];
  students: Student[];
  private: boolean;
  status: Status;
}
