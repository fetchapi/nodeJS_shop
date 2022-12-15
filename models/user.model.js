import { sequelize } from '../config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'

class UserModel extends Model{}

UserModel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	is_active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
}, {
	sequelize, 
	modelName: 'user', 
	freezeTableName: true, 
	underscored: true, 
	// createdAt: true, 
	// updatedAt: true,
	
	hooks: {
		// Create
		beforeCreate: async (user, options) => {
			user.password = await createHash(user.password)
		},
		// Update
		beforeUpdate: async (user, options) => {
			user.password = await createHash(user.password)
		}
	}

})

/**
 * Funktion for crypting strings
 * @param {String} string 
 * @returns Hashed string
 */
 const createHash = async string => {
	const salt = await bcrypt.genSalt(10);
	const hashedString = await bcrypt.hash(string, salt)
	return hashedString;
}

export default UserModel