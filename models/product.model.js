import { sequelize } from '../config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'


class UserModel2 extends Model{}

UserModel2.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	img: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.STRING,
		allowNull: false
	},
    catagori: {
		type: DataTypes.STRING,
		allowNull: false
	},
    rating: {
		type: DataTypes.STRING,
		allowNull: false
	},
    stock: {
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
	modelName: 'product', 
	freezeTableName: true, 
	underscored: true, 
	// createdAt: true, 
	// updatedAt: true,

})


export default UserModel2