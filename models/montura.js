const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('montura', {
    id_montura: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    modelo: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    marca_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'marca',
        key: 'id_marca'
      }
    }
  }, {
    sequelize,
    tableName: 'montura',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_montura" },
        ]
      },
      {
        name: "FK_montura_marca",
        using: "BTREE",
        fields: [
          { name: "marca_id" },
        ]
      },
    ]
  });
};
