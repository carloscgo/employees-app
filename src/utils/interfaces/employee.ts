

export interface IEmployee {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  age: number | string;
  gender: string;
}

export interface Props extends IEmployee {
  id: number;
}
