/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Support', {
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
		FamilyName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Image: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	}, {
		tableName: 'Support'
	});
};
