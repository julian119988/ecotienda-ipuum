import appModulePath from "app-module-path";
import http from "http";
import express from "express";
import cors from "cors";
import "regenerator-runtime/runtime.js";
import router from "./routes/routes";
import "./db";
appModulePath.addPath(`${__dirname}`);

const Api = express();
const HTTP = http.Server(Api);

Api.use(express.urlencoded({ extended: true }));
Api.use(express.json());
Api.use(cors());
Api.use(router);

HTTP.listen(9001, () => {
    console.log("listening on *:9001");
});
