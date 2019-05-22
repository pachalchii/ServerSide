/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SellerProductionManager', {
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
		FamilyName: {
			type: DataTypes.STRING,
			allowNull: false
		},
        IsForgetPasswordVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        SocketID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
		SellerID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Seller',
				key: 'ID'
			}
		},
		Username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		BirthDate: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PhoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CellPhoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		Image: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'SellerProductionManager',
		timestamps: false
	});
};
