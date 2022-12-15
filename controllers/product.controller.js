import ProductModel from '../Models/product.model.js'

class ProductController {

	/**
	 * Method for List
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	list = async (req, res) => {
		// list management
		let { sortkey, sortdir, limit, attributes } = req.query
		// arrange the array in order and sorts
		const order = [sortkey ? sortkey : 'id']
		order.push(sortdir || 'ASC')
		// sets the max amount
		limit = parseInt(limit) || 1000
		// sets attributes fields and table
		const attr = attributes ? attributes.split(',') : new Array('id', 'title', 'description', 'catagori', 'rating', 'stock')

		// sequlize management methode
		const result = await ProductModel.findAll({
			attributes: attr,
			order: [order],
			limit: limit
		})
		// makes it come out as a json format
		res.json(result)
	}

	/**
	 * Method Details
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	details = async (req, res) => {
		// Destructure assignment by id. 
		const { id } = req.params || 0

		const result = await ProductModel.findOne({
			attributes: ['id', 'title', 'description', 'catagori', 'rating', 'stock', 'is_active', 'createdAt', 'updatedAt'],
			where: { id: id }
		})
		res.json(result)
	}
	create = async (req, res) => {
		const { title, img, description, price, catagori, rating, stock } = req.body;
	
		if(title && img && description && price && catagori && rating && stock) {
			const model = await ProductModel.create(req.body)
			res.json({ newId: model.id })
		} else {
			res.sendStatus(418)
		}
	}
}

export default ProductController