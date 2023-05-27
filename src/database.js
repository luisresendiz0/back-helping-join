import mysql from "mysql2/promise";

const useConnection = async () => {
  const connection = await mysql.createPool({
    host: process.env.MYSQLHOST || "0.0.0.0",
    port: process.env.MYSQLPORT || 3306,
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "root",
    database: process.env.MYSQLDATABASE || "db_helping_join",
  });

  return connection;
};

export default useConnection;
