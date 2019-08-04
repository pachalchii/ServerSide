/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Order', {
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
		OrderDateTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		SumTotal: {
			type: DataTypes.STRING,
			allowNull: true
		},
		OnlineFee: {
			type: DataTypes.STRING,
			allowNull: true
		},
		InplaceFee: {
			type: DataTypes.STRING,
			allowNull: true
		},
		NazarSanjiID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'OrderNazarSanji',
				key: 'ID'
			}
		},
		PardakhtID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'OrderPardakht',
				key: 'ID'
			}
		},
		OrderStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		HashCode: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Order',
		timestamps: false
	});
};
