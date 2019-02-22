/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transportation', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    air_conditionar: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    birthdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    family_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(200),
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
    pelak_number: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone_number: {
        unique: true,
        type: DataTypes.STRING(50),
      allowNull: false
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
      allowNull: false,
        unique: true,

    },
    modelid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'car_model',
        key: 'id'
      }
    },
    ware_houseid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'seller_ware_house',
        key: 'id'
      }
    }
  }, {
    tableName: 'transportation'
  });
};
