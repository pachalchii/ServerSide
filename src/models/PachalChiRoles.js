/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('PachalChiRoles', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		Role: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'PachalChiRoles',
		timestamps: false
	});
};
