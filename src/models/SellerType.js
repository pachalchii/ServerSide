/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SellerType', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		Type: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'SellerType',
		timestamps: false
	});
};
