/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Cities', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ParentID: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'Cities'
	});
};
