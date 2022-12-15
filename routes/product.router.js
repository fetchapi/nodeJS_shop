import express from 'express'
import ProductController from '../controllers/product.controller.js'
const ProductRouter = express.Router()
const controller = new ProductController

ProductRouter.get('/product', (req, res) => { controller.list(req, res) })
ProductRouter.get('/product/:id([0-9]*)', (req, res) => { controller.details(req, res) })
ProductRouter.post('/product', (req, res) => { controller.create(req, res) })

export default ProductRouter