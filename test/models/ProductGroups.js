/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ProductGroups', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ParentID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'ProductGroups',
				key: 'Id'
			}
		}
	}, {
		tableName: 'ProductGroups'
	});
};
