import app from "./app.js";
import { connectToDatabase } from "./src/db/connection.js";

const PORT = 3000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server listening to http://localhost:${PORT} and connected to database `
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });
