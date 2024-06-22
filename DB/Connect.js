import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connectDb = () => {
    try {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.MYSQL_SECRET_KEY,
            database: 'social'
        });
        db.connect((err) => {
            if (err) {
                console.error(`Error Connecting: ${err.stack}`);
                return;
            }
            console.log('Database Connected as Id: ' + db.threadId);
        });
        return db;
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

const db = connectDb();

export default db;
