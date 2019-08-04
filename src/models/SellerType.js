/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SellerType', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
            autoIncrement: true

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
