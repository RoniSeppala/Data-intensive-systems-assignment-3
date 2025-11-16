import mongoose from "mongoose";

const dbUris = {
    demoDB1: "mongodb://localhost:27017/demoDB1",
    demoDB2: "mongodb://localhost:27017/demoDB2",
    demoDB3: "mongodb://localhost:27017/demoDB3"
};

const connections = {};

for (const [name, uri] of Object.entries(dbUris)) {
    const connection = mongoose.createConnection(uri)
    connection.on("error", console.error.bind(console, `connection error to ${name}:`));
    connection.once("open", function() {
        console.log(`Connected successfully to ${name}`);
    });
    connections[name] = connection;
}
