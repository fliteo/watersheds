/**
 * Represent a drainage basin with a name and an array of cells
 * @param name
 * @constructor
 */
var DrainageBasin = function (name){

    this.name = name;
    this.cells = [];



};

/**
 * Add a cell to the basin cell list and update the cell
 * @param cell
 */
DrainageBasin.prototype.addCell = function(cell){
    this.cells.push(cell);
    cell.basin = this;
};

/**
 * Update basin name
 * @param name
 */
DrainageBasin.prototype.setName = function(name){
    this.name = name;
};

module.exports = DrainageBasin;