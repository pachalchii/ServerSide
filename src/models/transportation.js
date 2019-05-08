/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Transportation', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		WareHouseID: {
			type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SellerWareHouse',
                key: 'ID'
            }
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false
		},
        IsForgetPasswordVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
		FamilyName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Username: {
			type: DataTypes.STRING,
			allowNull: false
		},

      AuthCode: {
          type: DataTypes.STRING,
          allowNull: true},
    Point: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
		Password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Birthdate: {
			type: DataTypes.STRING,
			allowNull: true
		},
		PhoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		Point: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		Image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ModelID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'CarModel',
				key: 'ID'
			}
		},
		Color: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PelakNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		AirConditionar: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		Description: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'Transportation',
		timestamps: false
	});
};
