import app from "./app";
import useConnection from "./database";

const main = async () => {
  try {
    await app.listen(app.get("port"), () => {
      console.log(`Server on port ${app.get("port")}`);
    });

    const connection = await useConnection();
    await connection.query("select * from beneficiado;");
    console.log("Database is connected");
  } catch (error) {
    console.error("Error: ", error);
  }
};

main();
