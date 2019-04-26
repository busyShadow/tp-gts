export interface UserIUser {
  name: string;
}

export interface UserIUserC {
  user: UserIUser;
  getName(): string;
  hello(name: string): void;
}

export interface UserIUserCConstructor {
  new(user: UserIUser): UserIUserC;
}

