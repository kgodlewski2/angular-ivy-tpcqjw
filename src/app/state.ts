export interface AppStateInterface {
  global: StateInterface;
}

export interface StateInterface {
  firstName: string;
  lastName: string;
  age: number;
}

export const initialState: StateInterface = {
  firstName: 'Karol',
  lastName: 'Godlewski',
  age: 30
};

