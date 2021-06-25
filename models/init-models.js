var DataTypes = require("sequelize").DataTypes;
var _camara = require("./camara");
var _marca = require("./marca");
var _montura = require("./montura");
var _objetivo = require("./objetivo");
var _objetivo_tipofoto = require("./objetivo_tipofoto");
var _users = require("./users");

function initModels(sequelize) {
  var camara = _camara(sequelize, DataTypes);
  var marca = _marca(sequelize, DataTypes);
  var montura = _montura(sequelize, DataTypes);
  var objetivo = _objetivo(sequelize, DataTypes);
  var objetivo_tipofoto = _objetivo_tipofoto(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  camara.belongsTo(marca, { as: "marca", foreignKey: "marca_id"});
  marca.hasMany(camara, { as: "camaras", foreignKey: "marca_id"});
  montura.belongsTo(marca, { as: "marca", foreignKey: "marca_id"});
  marca.hasMany(montura, { as: "monturas", foreignKey: "marca_id"});
  objetivo.belongsTo(marca, { as: "marca", foreignKey: "marca_id"});
  marca.hasMany(objetivo, { as: "objetivos", foreignKey: "marca_id"});
  camara.belongsTo(montura, { as: "montura", foreignKey: "montura_id"});
  montura.hasMany(camara, { as: "camaras", foreignKey: "montura_id"});
  objetivo.belongsTo(montura, { as: "montura", foreignKey: "montura_id"});
  montura.hasMany(objetivo, { as: "objetivos", foreignKey: "montura_id"});
  objetivo_tipofoto.belongsTo(objetivo, { as: "id_objetivo_objetivo", foreignKey: "id_objetivo"});
  objetivo.hasMany(objetivo_tipofoto, { as: "objetivo_tipofotos", foreignKey: "id_objetivo"});

  return {
    camara,
    marca,
    montura,
    objetivo,
    objetivo_tipofoto,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
