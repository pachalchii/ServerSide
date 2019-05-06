/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Products', {
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
		GroupID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'ProductGroups',
				key: 'Id'
			}
		}
	}, {
		tableName: 'Products'
	});
};
