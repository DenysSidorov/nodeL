import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import passwordHash from 'password-hash';

/*index - индекс для быстрого поиска*/
const UserSchema = new Schema ({
   login: {type: String, unique: true, lowercase: true, index: true},
   password: String
});

// mongoose middleware
UserSchema.pre('save', function(next) {
    // Если пароль небыл изменен - делаем next();
    if(!this.isModified('password')){
        return next();
    }

    // Иначе записываем новый пароль
    let saltRounds = 10;  // количество символов в новой соли
    bcrypt.genSalt(saltRounds, function(err, salt) { // генерируем соль
        if (err) throw  err;
        let salt = salt; // Если все хорошо - создаем hash на основе пароля и соли
        bcrypt.hash(this.password, salt, function(err, hash) {
            if (err) throw  err;
                this.password = hash; // Теперь пароль зашифован!
                next();
        });
    });
});

// Сравнение с суествуещем паролем
UserSchema.methods.comparePassword = (password)=>{
    return password == this.password;
};

// Экспортируем User во внешний мир
export default mongoose.model('User', UserSchema);




