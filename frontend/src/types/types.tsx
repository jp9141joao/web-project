// Defines the Login type used to call the authenticate function.
export type Login = {
  email: string;
  password: string;
}

// Defines the User type used to call the register function.
export type User = {
  fullName: string;
  email: string;
  password: string;
}

// Defines the Character type used in useState to store characters returned by the API.
export type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: string;
  image: string;
}

// Defines the Info type used to call the Info function.
export type Info = {
  name?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  operation: string;
}

// Defines the Filter type used to filter the rendered characters.
export type Filter = {
  by: string;
  value: string;
}

// Defines the Navigation type used to navigate between API pages and return an error if null.
export type Navigation = {
  previous: string | null;
  next: string | null;
}
