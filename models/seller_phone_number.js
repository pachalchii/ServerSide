/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller_phone_number', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    phone_number1: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone_number2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone_number3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone_number4: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone_number5: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'seller_phone_number'
  });
};
