/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ChatOnOrderProduct', {
		ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		OrderProdutID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'OrderProduct',
				key: 'ID'
			}
		},
		FromRole: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		FromID: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		ToRole: {
			type: DataTypes.BOOLEAN,
			allowNull: false
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
		tableName: 'ChatOnOrderProduct',
		timestamps: false
	});
};
