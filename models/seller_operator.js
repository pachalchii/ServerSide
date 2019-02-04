/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller_operator', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    birthdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    family_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    point: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sellerid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'seller',
        key: 'id'
      }
    }
  }, {
    tableName: 'seller_operator'
  });
};
