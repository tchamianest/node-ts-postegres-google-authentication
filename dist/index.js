"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./database/config/db"));
// Import the database connection function
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
(0, db_1.default)()
    .then(() => {
    console.log('Database connected successfully.');
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
})
    .catch(error => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
});
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
