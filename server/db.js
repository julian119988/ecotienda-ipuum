import mongoose from 'mongoose';
mongoose
    .connect("mongodb://localhost:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((db) => console.log("MongoDB esta conectado."))
    .catch((error) => console.log(error));
