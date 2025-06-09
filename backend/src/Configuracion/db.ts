import mysql from "mysql2/promise";
//conf base de datos
const pool = mysql.createPool({
  host: "localhost",
  user: "root", 
  password: "1234",
  database: "mesas de examen",
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4'
});

export default pool;