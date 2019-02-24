/* jshint indent: 2 */

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
    FamilyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
        unique: true
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
      allowNull: false,
        unique: true
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
        type: DataTypes.STRING(200),
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
    tableName: 'Transportation'
  });
};
