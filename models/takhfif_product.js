/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('takhfif_product', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    finish: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pachal_chi_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    percentage: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    price_after: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price_before: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    start: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    supplyofproduct: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    unitofproduct: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    productid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    sellerid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'seller',
        key: 'id'
      }
    },
    unitid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'unit',
        key: 'id'
      }
    }
  }, {
    tableName: 'takhfif_product'
  });
};
