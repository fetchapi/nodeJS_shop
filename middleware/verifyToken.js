import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Middleware  to confirme the jsonwebtoken string
 * @param {Object} req Request 
 * @param {Object} res Response 
 * @param {Object} next Control Function
 */
const verifyToken = (req, res, next) => {
	// calls bearer token from authorization header
	const bearerHeader = req.headers['authorization']
	// Checks if it's valid
	if(typeof bearerHeader !== 'undefined') {

		const requestToken = bearerHeader.substr(7) 

		// calidatens token against the env 
		jwt.verify(requestToken, process.env.PRIVATE_KEY, (err, data) => {
			if(!err) {
				// calls the next control
				next()
			} else {
				// relays the status
				res.sendStatus(403)
			}
		})
	} else {
		// relays error
		res.sendStatus(401)
	}
}

export default verifyToken