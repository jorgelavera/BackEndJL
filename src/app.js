import express from 'express';
import productRouter from './routes/product.router.js';

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products/',productRouter);

app.listen(PORT, () => {console.log(`Servidor escuchando en localhost:${PORT}...`)})

