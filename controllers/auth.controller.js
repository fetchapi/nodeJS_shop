import UserModel from "../Models/user.model.js"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

class AuthController {

	constructor() {
		console.log('Running authentication');
	}

	/**
	 * Metode for login
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */
	login = async (req, res) => {
		const { username, password } = req.body;
		if(username && password) {
			// pulls db users from id and password
			const data = await UserModel.findOne({
				attributes: ['id', 'password'],
				where: { email: username }
			})

			// Validerer passwords
			bcrypt.compare(password, data.password, (err, result) => {
				if(result) {
			        // creates a token from id with a cryted key
					const token = jwt.sign(data.id, process.env.PRIVATE_KEY)
					return res.json({ token: token })
				} else {
					return res.sendStatus(401) // Unauthorized error code
				}
			})

		}
	}

	/**
	 * Metode til test af protected route
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */
	protected = async (req, res) => {
		res.sendStatus(200) 
	}
}

export { AuthController }