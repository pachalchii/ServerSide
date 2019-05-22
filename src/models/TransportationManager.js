/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TransportationManager', {
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
        IsForgetPasswordVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
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
        Enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        SocketID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        AuthCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'SellerOperator',
        timestamps: false
    });
};
