/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ProductCategories', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'ProductCategories',
		timestamps: false
	});
};
