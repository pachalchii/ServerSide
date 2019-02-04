/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addresses', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    complete_address_description: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    custom_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    google_map_address_link: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    customerid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'id'
      }
    }
  }, {
    tableName: 'addresses'
  });
};
