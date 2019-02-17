/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    company_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    complete_address_description: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    enabled: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    established_date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    google_map_address_link: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    logo_image: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    owner_family_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    owner_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    owner_phone_number: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    point: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    registration_date_time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    company_address_cityid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'cities',
        key: 'id'
      }
    },
    seller_parentid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'seller',
        key: 'id'
      }
    },
    phone_numberid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'seller_phone_number',
        key: 'id'
      }
    },
    typeid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'seller_type',
        key: 'id'
      }
    }
  }, {
    tableName: 'seller'
  });
};
