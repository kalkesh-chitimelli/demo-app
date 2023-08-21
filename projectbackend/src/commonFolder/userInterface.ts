interface Iuser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Ilogin {
  email: string;
  password: string;
}

export { Iuser, Ilogin };
