/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Addresses', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'ID'
      }
    },
    CityID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    GoogleMapAddressLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CompleteAddressDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CustomName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Addresses'
  });
};
