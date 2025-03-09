import mongoose from 'mongoose';
import config from "../config/config";
const mongoUrl = config.mongoUrl

const connectDB = () => {
    try {
        mongoose.connect(mongoUrl,{})
            .then(() => {
                console.log('connect to mongodb')
            }).catch((err) => {
                console.log('connect error', err)
            })
    } catch (err) {
        console.log('err', err)
    }

}
export default connectDB;