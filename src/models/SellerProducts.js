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
		},
		DiscountFor0TO200: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		DiscountFor200TO500: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		DiscountFor500TO1000: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		DiscountFor1000TOUpper: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'SellerProducts',
		timestamps: false
	});
};
