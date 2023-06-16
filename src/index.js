import app from "./app";
import useConnection from "./database";

const main = async () => {
  try {
    await app.listen(app.get("port"), "0.0.0.0", () => {
      console.log(`Server on port ${app.get("port")}`);
    });

    const connection = await useConnection();
    await connection.query("select 1 + 1;");
    console.log("Database is connected");
    await connection.end();
  } catch (error) {
    console.error("Error: ", error);
  }
};

main();
