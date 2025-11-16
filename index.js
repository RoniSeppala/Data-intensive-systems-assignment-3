import mongoose from "mongoose";

//models
import contentSchema from "./src/models/ContentSchema.js";
import RatingSchema from "./src/models/RatingSchema.js";
import userSchema from "./src/models/UserSchema.js";
import subscriptionSchema from "./src/models/SubscriptionSchema.js";
import watchHistorySchema from "./src/models/WatchHistorySchema.js";

//datafills
import fillDemoDB1 from "./src/datafill/datafillDB1.js";
import fillDemoDB2 from "./src/datafill/datafillDB2.js";
import fillDemoDB3 from "./src/datafill/datafillDB3.js";

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