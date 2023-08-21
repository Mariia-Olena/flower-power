export interface APIuser {
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface User {
  username: string;
  password: string;
}

export interface UserAdmin {
  id: string;
  name: string;
  created: string;
}
