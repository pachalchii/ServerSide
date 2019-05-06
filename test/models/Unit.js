/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Unit', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		UnitName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Unit'
	});
};
