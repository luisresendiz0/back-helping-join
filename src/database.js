import mysql from "mysql2/promise";

const useConnection = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "db_helping_join",
  });

  return connection;
};

export default useConnection;
