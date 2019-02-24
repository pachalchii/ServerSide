/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SellerOperator', {
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
    Birthdate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
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
    }
  }, {
    tableName: 'SellerOperator'
  });
};
