/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('OrderProduct', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		OrderID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Order',
				key: 'Id'
			}
		},
		Takhfif: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		ProductID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'TakhfifProduct',
				key: 'Id'
			}
		},
		Supply: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CustomerStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		SellerOperatorID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'SellerOperator',
				key: 'Id'
			}
		},
		SellerOperatorStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		WareHouseID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'SellerWareHouse',
				key: 'Id'
			}
		},
		WareHouseStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		TransportarID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Transportation',
				key: 'Id'
			}
		},
		TransportarStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		TrasnportarCurrentLocation: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'OrderProduct'
	});
};
