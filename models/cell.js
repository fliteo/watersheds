/**
 * Represent a cell with latitude, longitude, altitude and corresponding drainage basin
 * @param x latitude
 * @param y longitude
 * @param altitude
 */
var Cell = function(x, y, altitude){

    this.x = x;
    this.y = y;
    this.altitude = altitude;
    this.basin = null;

};

/**
 * Update basin
 * @param basin
 */
Cell.prototype.setBasin = function(basin){
    this.basin = basin;
};


module.exports = Cell;