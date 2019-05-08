/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('TakhfifProduct', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
		Start: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Finish: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PriceBefore: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PriceAfter: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Percentage: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		SupplyOFProduct: {
			type: DataTypes.STRING,
			allowNull: true
		},
		UnitOFProduct: {
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
		PachalChiStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		Enable: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		Description: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'TakhfifProduct',
		timestamps: false
	});
};
