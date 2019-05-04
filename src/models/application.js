/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('application', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,      autoIncrement: true

        },
        ClientVersion: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        UpdateLink: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        UpdateMessage: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'application'
    });
};
