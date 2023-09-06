require('dotenv').config();
const documentListingSeeder = require("./documentListingMigration");
const documentModel = require("../api/documents-service/models/document.listing.model");
const mongoose = require("mongoose");

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dbname = process.env.DB_NAME;
const connectionString = `mongodb://${host}:${port}/${dbname}`;

// Connect to MongoDB via Mongoose

function seedDatabase() {
    mongoose.connect(connectionString)
        .then(async () => {
            await documentModel.deleteMany({});
            await documentModel.insertMany(documentListingSeeder);
            mongoose.connection.close();
        })
}

seedDatabase();

