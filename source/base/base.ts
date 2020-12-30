import { createPool } from 'mysql';

export async function connection() {

    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password : '',
        database: 'db-livres',
        connectionLimit: 100
    });

    return connection;
    
}