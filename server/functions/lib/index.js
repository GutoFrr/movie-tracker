"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
// packages
const functions = require("firebase-functions");
const cors = require("cors");
require("express-async-errors");
// routers
const reviewsRouter_1 = require("./routes/reviewsRouter");
// middlewares
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
app.use(express.json());
app.use(cors());
app.use('/api/reviews', reviewsRouter_1.default);
app.use(errorHandler_1.default);
app.use(notFound_1.default);
app.get('*', (req, res) => {
    res.send('Rota não existente...');
});
exports.movieTracker = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map