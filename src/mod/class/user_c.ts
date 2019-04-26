import { UserIUserC, UserIUser } from './../interface/user_i';

class User implements UserIUserC {
  user: UserIUser;
  constructor(user: UserIUser) {
    this.user = user;
  }
  getName() {
    return this.user.name;
  }
  hello(name: string) {
    console.log(`${this.user.name} say hello ${name}`);
  }
}

export const UserCUser = User;