/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Roles', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		Title: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Roles',
		timestamps: false
	});
};
