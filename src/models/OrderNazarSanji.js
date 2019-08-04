/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('OrderNazarSanji', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		PachalChi: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Seller: {
			type: DataTypes.STRING,
			allowNull: true
		},
		SellerOperator: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Transportar: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Support: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'OrderNazarSanji',
		timestamps: false
	});
};
