
var DrainageBasin = function (name){

    this.name = name;
    this.cells = [];



}

DrainageBasin.prototype.addCell = function(cell){
    this.cells.push(cell);
    cell.bassin = this;
}

module.exports = DrainageBasin;