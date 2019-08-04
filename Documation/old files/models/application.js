/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('application', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,      autoIncrement: true

        },
        clientVersion: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'application'
    });
};
