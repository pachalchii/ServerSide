/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller_ware_house', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    agent_family_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    agent_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    birthdate: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cell_phone_number: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password: {
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
        unique: true,

        type: DataTypes.STRING(50),
      allowNull: false
    },
    ware_house_complete_address_description: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    ware_house_google_map_address_link: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    ware_house_address_cityid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'cities',
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
    }
  }, {
    tableName: 'seller_ware_house'
  });
};
