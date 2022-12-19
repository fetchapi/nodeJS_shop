import UserModel from '../Models/user.model.js'

class UserController {

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
		const attr = attributes ? attributes.split(',') : new Array('id', 'firstname', 'lastname')

		// sequlize management methode
		const result = await UserModel.findAll({
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

		const result = await UserModel.findOne({
			attributes: ['id', 'firstname', 'lastname', 'email', 'is_active', 'createdAt', 'updatedAt'],
			where: { id: id }
		})
		res.json(result)
	}
	create = async (req, res) => {
		const { firstname, lastname, email, password } = req.body;
	
		if(firstname && lastname && email && password) {
			const model = await UserModel.create(req.body)
			res.json({ newId: model.id })
		} else {
			res.sendStatus(418)
		}
	}
	update = async (req, res) => {
		const { id } = req.params || 0
		const { firstname, lastname, email, password, org_id } = req.body;

		if(id && firstname && lastname && email && password && org_id) {	
			const model = await UserModel.update(req.body, {
				where: { id: id },
				individualHooks: true
			})

			res.json({ 
				msg: 'Record update' 
			})
		} else {
			res.sendStatus(418)
		}	
	}
		/**
	 * Method delete - delete based on id (url param)
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
		delete = (req, res) => {
			res.send('delete product')
			console.log(req.params.id);
	
		}
}

export default UserController