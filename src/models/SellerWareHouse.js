/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('SellerWareHouse', {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        AgentName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AgentFamilyName: {
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
        IsForgetPasswordVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Point: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CellPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Policy: {
            default:false,
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        WareHouseAddressCityID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Cities',
                key: 'ID'
            }
        },
        WareHouseGoogleMapAddressLink: {
            type: DataTypes.STRING,
            allowNull: false
        },
        WareHouseCompleteAddressDescription: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'SellerWareHouse',
        timestamps: false
    });
};
