const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('objetivo_tipofoto', {
    id_objetivo_tipofoto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipofoto: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_objetivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'objetivo',
        key: 'id_objetivo'
      }
    }
  }, {
    sequelize,
    tableName: 'objetivo_tipofoto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_objetivo_tipofoto" },
        ]
      },
      {
        name: "FK__objetivo",
        using: "BTREE",
        fields: [
          { name: "id_objetivo" },
        ]
      },
    ]
  });
};
