/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Cities', {
		ID: {
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
			allowNull: true,
			references: {
				model: 'Cities',
				key: 'ID'
			}
		}
	}, {
		tableName: 'Cities',
		timestamps: false
	});
};
