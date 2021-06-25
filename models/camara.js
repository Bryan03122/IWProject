const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('camara', {
    id_camara: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    modelo: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    resolucion: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    isoMinimo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isoMaximo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sensor: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    nocturno: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    marca_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'marca',
        key: 'id_marca'
      }
    },
    montura_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'montura',
        key: 'id_montura'
      }
    }
  }, {
    sequelize,
    tableName: 'camara',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_camara" },
        ]
      },
      {
        name: "marca_id",
        using: "BTREE",
        fields: [
          { name: "marca_id" },
        ]
      },
      {
        name: "montura_id",
        using: "BTREE",
        fields: [
          { name: "montura_id" },
        ]
      },
    ]
  });
};
