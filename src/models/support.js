/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Support', {
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
        Image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        AuthCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Point: {
            type: DataTypes.INTEGER,
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
    }, {
        tableName: 'Support',
        timestamps: false
    });
};
