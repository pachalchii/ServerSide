/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Seller', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		TypeID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'SellerType',
				key: 'Id'
			}
		},
		SellerParentID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Seller',
				key: 'Id'
			}
		},
		CompanyName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		OwnerName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		OwnerFamilyName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		LogoImage: {
			type: DataTypes.STRING,
			allowNull: false
		},
		EstablishedDate: {
			type: DataTypes.STRING,
			allowNull: true
		},
		RegistrationDateTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Point: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		Enabled: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		PhoneNumberID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'SellerPhoneNumber',
				key: 'Id'
			}
		},
		CompanyAddressCityID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Cities',
				key: 'Id'
			}
		},
		CompleteAddressDescription: {
			type: DataTypes.STRING,
			allowNull: false
		},
		GoogleMapAddressLink: {
			type: DataTypes.STRING,
			allowNull: true
		},
		OwnerPhoneNumber: {
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
		}
	}, {
		tableName: 'Seller'
	});
};
