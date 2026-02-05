
export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: Boolean;
  role: 'admin' | 'student' | 'faculty';
  status:'in-progress' | 'blocked';
  isDeleted: boolean;
}

