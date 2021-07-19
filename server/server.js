import appModulePath from "app-module-path";
import express from "express";
import cors from "cors";
require("./db");
const routes = require("./routes/routes");
const app = express();
appModulePath.addPath(`${__dirname}`);

app.use(cors());
app.use(routes);

app.listen(9001, () => {
    console.log("listening on *:9001");
});
