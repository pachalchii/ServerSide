/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Customer', {
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
		Username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CityID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Cities',
				key: 'Id'
			}
		},
		Status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		Enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		Point: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		BirthDate: {
			type: DataTypes.STRING,
			allowNull: true
		},
		RegistrationDateTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PhoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Theme: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		CompanyName: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'Customer'
	});
};