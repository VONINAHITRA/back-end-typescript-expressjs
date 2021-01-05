import dotenv from 'dotenv'

dotenv.config();

const MYSQM_HOST = process.env.MYSQM_HOST || "localhost";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'db-livres';
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;

const MYSQL = {
    host: MYSQM_HOST,
    datatabse: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
};

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mysql: MYSQL,
    server: SERVER,
}

export default config;