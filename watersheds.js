"use strict";

require('./adds/framework-adds.js');

var Cell = require('./models/cell.js');
var DrainageBasin = require('./models/drainage-basin.js');
var DrainageBasinMapService = require('./services/drainage-bassin-map-service.js');

var exports = module.exports = {};


/**
 * Launch calculation for a given map
 * @param map The map must be a 2 dimensions matrix (as array)
 * @returns {Array} 2 dimensions map of drainage basins
 */
exports.runMap = function runMap(map){

    var drainageBasinMapService = new DrainageBasinMapService();
    var cellMap = drainageBasinMapService.createCellMap(map);

    drainageBasinMapService.calculateDrainageBasin(cellMap);

    var res = drainageBasinMapService.createResultFromCellMap(cellMap);

    return res;
};