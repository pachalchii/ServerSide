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
		ForwardingDatetime: {
			type: DataTypes.STRING,
			allowNull: true
		},
		TurnOfForwarding: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		CustomerAddressID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Addresses',
				key: 'Id'
			}
		},
		FinalDiscount: {
			type: DataTypes.INTEGER,
			allowNull: true
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
			type: DataTypes.INTEGER,
			allowNull: false
		},
		UnitIDOfSupply: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Unit',
				key: 'Id'
			}
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
		SellerOperatorFinalStatus: {
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
		ProductionManagerStatus: {
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
		},
		CustomerFinalStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		ReturnedAmount: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		CustomerReason: {
			type: DataTypes.STRING,
			allowNull: true
		},
		SellerReason: {
			type: DataTypes.STRING,
			allowNull: true
		},
		DeleteStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		ReasonOFDelete: {
			type: DataTypes.STRING,
			allowNull: true
		},
		SumTotal: {
			type: DataTypes.STRING,
			allowNull: false
		},
		OnlineFee: {
			type: DataTypes.STRING,
			allowNull: true
		},
		InpalceFee: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'OrderProduct',
		timestamps: false
	});
};
