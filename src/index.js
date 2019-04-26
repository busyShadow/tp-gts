var user1 = window.test.userFNewUser(window.test.UserCUser, { name: 'n1' });
var user2 = window.test.userFNewUser(window.test.UserCUser, { name: 'n2' });
console.log(user1);
console.log(user2);
user1.hello(user2.getName());