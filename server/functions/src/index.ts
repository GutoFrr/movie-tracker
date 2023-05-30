import * as express from 'express';
const app = express();

// packages
import * as functions from 'firebase-functions';
import * as cors from 'cors';
import 'express-async-errors';

// routers
import reviewsRouter from './routes/reviewsRouter';

// middlewares
import errorHandlerMiddleware from './middleware/errorHandler';
import notFound from './middleware/notFound';

app.use(express.json());
app.use(cors());

app.use('/api/reviews', reviewsRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

app.get('*', (req, res) => {
  res.send('Rota não existente...');
});

exports.movieTracker = functions.https.onRequest(app);
