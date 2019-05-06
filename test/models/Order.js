/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Order', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		CustomerID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Customer',
				key: 'Id'
			}
		},
		OrderDateTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CustomerAddressID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Addresses',
				key: 'Id'
			}
		},
		DateTimeErsal: {
			type: DataTypes.STRING,
			allowNull: true
		},
		JameKol: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Takhfif: {
			type: DataTypes.STRING,
			allowNull: true
		},
		JameKolAfterTakhfif: {
			type: DataTypes.STRING,
			allowNull: true
		},
		NazarSanjiID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'OrderNazarSanji',
				key: 'Id'
			}
		},
		PardakhtID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'OrderPardakht',
				key: 'Id'
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
		tableName: 'Order'
	});
};
