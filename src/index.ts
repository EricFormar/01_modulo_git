import express from 'express';
import productsRouter from './routes/product.routes'; 

const app = express();

app.use(express.json());

app.use('/api', productsRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;