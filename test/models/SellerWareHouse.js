/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SellerWareHouse', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		AgentName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		AgentFamilyName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		SellerID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Seller',
				key: 'Id'
			}
		},
		Username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Birthdate: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PhoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CellPhoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		Point: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		Image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		WareHouseAddressCityID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Cities',
				key: 'Id'
			}
		},
		WareHouseGoogleMapAddressLink: {
			type: DataTypes.STRING,
			allowNull: false
		},
		WareHouseCompleteAddressDescription: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'SellerWareHouse'
	});
};