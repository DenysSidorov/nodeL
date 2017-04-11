// тут user это обьект со всеми свойствами, которые можно читать
var user = require('./user');

var vasya = new user.User("Вася");
var petya = new user.User("Петя");

vasya.hello(petya);
console.log(user.a);