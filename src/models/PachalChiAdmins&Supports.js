/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('PachalChiAdmins&Supports', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
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
		UserName: {
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
		},
		RoleID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'PachalChiRoles',
				key: 'Id'
			}
		}
	}, {
		tableName: 'PachalChiAdmins&Supports',
		timestamps: false
	});
};
