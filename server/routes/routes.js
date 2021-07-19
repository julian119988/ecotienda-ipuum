const express = require("express");
const router = express.Router();

router.get("/productos", (req, res) =>
    res.status(200).send({ messsage: "Productoss" })
);

module.exports = router;
