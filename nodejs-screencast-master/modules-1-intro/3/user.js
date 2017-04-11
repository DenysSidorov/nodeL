function User(name){
    this.name = name;
}

User.prototype.hello = function(who){
    console.log("Hello, " + who.name);
};

console.log("user.js is required!");
module.exports.User = User;


var a  =5;
module.exports.a = a;
