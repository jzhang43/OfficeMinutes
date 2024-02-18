# OfficeMinutes

JumboHacks 2024

## Server State

```ts
enum Status {
  WAITING,
  IN_PROGRESS,
  DONE,
}

interface State {
  courseId: OfficeHour;
}

interface OfficeHour {
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
  private: boolean;
  status: Status;
  location?: string;
}
```
