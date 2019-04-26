import { UserIUser, UserIUserCConstructor, UserIUserC } from './../interface/user_i';

function newUser(ctor: UserIUserCConstructor, user: UserIUser): UserIUserC {
  return new ctor(user);
}

function hello(user: UserIUser) {
  return user.name;
}

export const userFNewUser = newUser;
export const userFHello = hello;