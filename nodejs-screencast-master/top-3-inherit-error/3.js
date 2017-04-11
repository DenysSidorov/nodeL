var util = require('util');

class myError extends Error{
    constructor(name, message){
        super(name, message);
        this.name = name;
        this.message = message;
    }
}
// function myError(name, message  ) {
//     this.name = name;
//     this.message = message;
//     Error.captureStackTrace(this, myError);
// }
//
//
// util.inherits(myError, Error);
try {
    throw new myError ('nammmmme', 'typoy');
} catch (Error) {
    // if (Error instanceof myError){

        console.log( Error.name);
        console.log( Error.message);
        console.log( Error.stack);
    // }

}
