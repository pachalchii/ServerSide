/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('PriceAndSupply', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		SellerProductID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'SellerProducts',
				key: 'ID'
			}
		},
		DateTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Price: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Supply: {
			type: DataTypes.STRING,
			allowNull: true
		},
		UnitIDOfSupply: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Unit',
				key: 'ID'
			}
		}
	}, {
		tableName: 'PriceAndSupply',
		timestamps: false
	});
};
