/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SellerProductsInServiceCities', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		SellerProductID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'SellerProducts',
				key: 'ID'
			},
            unique:true

        },
		CityID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Cities',
				key: 'ID'
			},
            unique:true

        }
	}, {
		tableName: 'SellerProductsInServiceCities',
		timestamps: false
	});
};
