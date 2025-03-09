import dotenv from "dotenv";
dotenv.config();
const SecretJWT = process.env.SecretJWT;
const mongoUrl = process.env.mongoDbUrl;
if (!SecretJWT) {
    throw new Error('SecretJWT environment variable is required');
}
if (!mongoUrl) {
    throw new Error('mongoDbUrl is required');
}

const config = {
    jwtSecret: SecretJWT,
    mongoUrl:mongoUrl,
}

export default config