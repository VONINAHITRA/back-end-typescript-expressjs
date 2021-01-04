import mysql from 'mysql'
import config from './config';

const params = {
    user: config.mysql.user,
    password: config.mysql.password,
    host: config.mysql.host,
    database: config.mysql.datatabse
};

const Connect = async () => new  Promise<mysql.Connection>((resolve, reject) => {
    const cnx = mysql.createConnection(params);

    cnx.connect((error) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(cnx);
    });
});

const Query = async (connection: mysql.Connection, query: string) => new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
        if (error) {
            reject(error);
            return;
            ;
        }
        resolve(result);
    });
});

export { Connect, Query };