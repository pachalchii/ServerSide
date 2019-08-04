/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Notification', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
            autoIncrement: true

        },
		ToRoleID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Roles',
				key: 'ID'
			}
		},
		ToID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Message: {
			type: DataTypes.STRING,
			allowNull: false
		},
		SeenStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	}, {
		tableName: 'Notification',
		timestamps: false
	});
};
