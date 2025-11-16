import mongoose from "mongoose";

//models
import contentSchema from "./src/models/ContentSchema";
import RatingSchema from "./src/models/RatingSchema";
import userSchema from "./src/models/UserSchema";
import subscriptionSchema from "./src/models/SubscriptionSchema";
import watchHistorySchema from "./src/models/WatchHistorySchema";

//datafills
import fillDemoDB1 from "./src/datafills/fillDemoDB1";
import fillDemoDB2 from "./src/datafills/fillDemoDB2";
import fillDemoDB3 from "./src/datafills/fillDemoDB3";

//connect to multiple databases
const dbUris = {
    demoDB1: "mongodb://localhost:27017/demoDB1",
    demoDB2: "mongodb://localhost:27017/demoDB2",
    demoDB3: "mongodb://localhost:27017/demoDB3"
};

async function connectToDatabases() {
    const connections = {};
    const modelsByDb = {};

    for (const [name, uri] of Object.entries(dbUris)) {
        const connection = mongoose.createConnection(uri)

        connection.on("error", console.error.bind(console, `connection error to ${name}:`));

        await new Promise((resolve, reject) => {
            connection.once("open", () => {
                console.log(`Connected successfully to ${name}`);
                resolve();
            });
            connection.on("error", (err) => {
                console.error(`Failed to connect to ${name}:`, err);
                reject(err);
            });
        });

        //define models for each connection
        const models = {
            User: connection.model("User", userSchema),
            Content: connection.model("Content", contentSchema),
            Rating: connection.model("Rating", RatingSchema),
            Subscription: connection.model("Subscription", subscriptionSchema),
            WatchHistory: connection.model("WatchHistory", watchHistorySchema)
        };

        connections[name] = connection;
        modelsByDb[name] = models;
    }

    return { connections, modelsByDb };
}

// Verify all connections are established
if (!connections.demoDB1 || !connections.demoDB2 || !connections.demoDB3) {
    console.error("One or more database connections failed.");
    process.exit(1);
}

//fill databases with initial data

async function initializeDatabases() {
    const { connections, modelsByDb } = await connectToDatabases();

    await fillDemoDB1(modelsByDb.demoDB1);
    await fillDemoDB2(modelsByDb.demoDB2);
    await fillDemoDB3(modelsByDb.demoDB3);

    console.log("All databases have been initialized with data.");
}

async function main() {
    try {
        await initializeDatabases();
        console.log("Database initialization complete.");
        process.exit(0);
    } catch (error) {
        console.error("Error during database initialization:", error);
        process.exit(1);
    }
}

main().catch(err => {
    console.error("Unexpected error:", err);
    process.exit(1);
});