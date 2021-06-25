const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('objetivo', {
    id_objetivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    modelo: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    distanciaFocalMinima: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    distanciaFocalMaxima: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    aperturaMinima: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    aperturaMaxima: {
      type: DataTypes.FLOAT,
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
    tableName: 'objetivo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_objetivo" },
        ]
      },
      {
        name: "FK_objetivo_marca",
        using: "BTREE",
        fields: [
          { name: "marca_id" },
        ]
      },
      {
        name: "FK_objetivo_montura",
        using: "BTREE",
        fields: [
          { name: "montura_id" },
        ]
      },
    ]
  });
};
