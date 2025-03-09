import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs'; // Use bcrypt (not bcryptjs)


interface Iuser extends Document {
    name: String,
    password: string,
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<Iuser> = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.pre<Iuser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
    }
    next();
});

// Method to compare password with hashed password in the database
userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password); // Compare plaintext password with hashed password
};

const User = mongoose.model('user', userSchema);

export default User;