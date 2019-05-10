/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Unit', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
            autoIncrement: true

        },
		UnitName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Unit',
		timestamps: false
	});
};
