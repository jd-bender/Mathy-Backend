import dotenv from "dotenv";
import app from "app.ts";

dotenv.config({ path: "../.env" });

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
