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

Update State:

- Joins Queue
- Leaves Queue
- Joins Group
- Leaves Group
- Edit Group
- TA Duty

## Env File

```
DATABASE_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_URL=""
NEXTAUTH_SECRET=""
BACKEND_URL=""
```
