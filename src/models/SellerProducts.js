/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SellerProducts', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
            autoIncrement: true

        },
		SellerID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Seller',
				key: 'ID'
			}
		},
		ProductID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Products',
				key: 'ID'
			}
		},
		UnitOfProduct: {
			type: DataTypes.STRING,
			allowNull: false
		},
		UnitID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Unit',
				key: 'ID'
			}
		},
		Image: {
			type: DataTypes.STRING,
			allowNull: true
		},
        ShowStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
		Description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		DiscountFor0TO200: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		DiscountFor200TO500: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		MinToSell: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MaxToSell: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
		DiscountFor500TO1000: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		DiscountFor1000TOUpper: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'SellerProducts',
		timestamps: false
	});
};
