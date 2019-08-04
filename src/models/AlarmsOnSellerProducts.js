/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('AlarmsOnSellerProducts', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		CustomerID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Customer',
				key: 'ID'
			}
		},
		SellerProductID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'SellerProducts',
				key: 'ID'
			}
		},
		SeenStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	}, {
		tableName: 'AlarmsOnSellerProducts',
		timestamps: false
	});
};
