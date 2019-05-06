/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SellerProducts', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		SellerID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Seller',
				key: 'Id'
			}
		},
		ProductID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Products',
				key: 'Id'
			}
		},
		PriceDateTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Price: {
			type: DataTypes.STRING,
			allowNull: false
		},
		SupplyOfProduct: {
			type: DataTypes.STRING,
			allowNull: true
		},
		UnitOfProduct: {
			type: DataTypes.STRING,
			allowNull: false
		},
		UnitID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Unit',
				key: 'Id'
			}
		},
		Image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Description: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'SellerProducts'
	});
};
