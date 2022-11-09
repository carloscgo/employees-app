

export interface IEmployee {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  age: number;
  gender: string;
}

export interface Props extends IEmployee {
  id: number;
}
