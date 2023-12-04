import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const productRouter = Router();

const product = new ProductManager('c:/backend/src/managers/products.json');

// Probar con http://localhost:8080/products?limit=2 en el navegador
productRouter.get('/', async (req, res) => {
    const productos = await product.getProducts(req.query)
    res.json({ message: 'Productos encontrados', productos })
})

// Probar con http://localhost:8080/products/4 en el navegador
productRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const producto = await product.getProductById(parseInt(pid))
    if (producto) {
        res.json({ message: 'Producto encontrado', producto })
    } else {
        res.status(400).send('El producto no existe')
    }
})

export default productRouter;