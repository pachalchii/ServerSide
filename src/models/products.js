/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Products', {
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
		CategoryID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'ProductCategories',
				key: 'ID'
			}
		},
		Type: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		ParentID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Products',
				key: 'ID'
			}
		}
	}, {
		tableName: 'Products',
		timestamps: false
	});
};
