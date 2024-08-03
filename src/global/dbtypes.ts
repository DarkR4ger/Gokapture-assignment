export interface UserData {
  id: number;
  username: string;
  email: string;
  isAdmin: string;
}

export interface TaskFullData {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: boolean
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: UserData
}
