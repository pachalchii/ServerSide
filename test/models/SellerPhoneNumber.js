/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SellerPhoneNumber', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		PhoneNumber1: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PhoneNumber2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		PhoneNumber3: {
			type: DataTypes.STRING,
			allowNull: true
		},
		PhoneNumber4: {
			type: DataTypes.STRING,
			allowNull: true
		},
		PhoneNumber5: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'SellerPhoneNumber'
	});
};