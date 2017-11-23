const store = require("../db/dbKlasse");
const util = require("../util/security");

module.exports.showKlasse = function(req, res){
  console.log('klasseControler');
  store.getAllKlasseData(function(err, order) {
    res.json(order);
  });
};
