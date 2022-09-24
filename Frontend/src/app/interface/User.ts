export interface User {
  id: number;
  name: string;
  surname: string;
  fullname: string;
  email: string;
  iconSrc?: string;
  lastRead: { title?: string }
}
