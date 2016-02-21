"use strict";

var Cell = require('./model/cell.js');
var DrainageBasin = require('./model/drainage-basin.js');

var exports = module.exports = {};


/**
 * Launch calculation for a given map
 * @param map The map must be a 2 dimensions matrix (as array)
 * @returns {Array} 2 dimensions map of drainage basins
 */
exports.runMap = function runMap(map){

    var cellMap = createCellMap(map);

    calculateDrainageBasin(cellMap);

    var res = createResultFromCellMap(cellMap);

    return res;
};


/**
 * Create a map of cells from a map of altitude
 * @param map Map of altitude
 * @returns {Array} Map of cells
 */
function createCellMap(map){

    var cellMap = [];

    for(let i = 0; i < map.length; i++){
        cellMap[i] = [];
        for(let j = 0; j < map[i].length; j++){
            cellMap[i][j] = new Cell(i, j, parseInt(map[i][j]));
        }
    }
    return cellMap;
}

/**
 * Format the expected result from cellMap
 * @param cellMap 2 dimensions array of cells
 * @returns {Array} 2 dimensions array of drainage basins
 */
function createResultFromCellMap(cellMap){

    var res = [];

    for(let i = 0; i < cellMap.length; i++){
        res[i] = [];
        for(let j = 0; j < cellMap[i].length; j++)
            res[i][j] = cellMap[i][j].basin.name;
    }
    return res;
}

/**
 * Calculate the drainage basins.
 * The result is included directly in the cellMap param in "basin" property of cells to help debug.
 * @param cellMap Map of cells with all "basin" property of cells to null
 */
function calculateDrainageBasin(cellMap){

    /**
     * Character to name basins
     * @type {number}
     */
    var charIndex = 97;

    /**
     * Array of existing basins
     * @type {Array}
     */
    var basins = [];


    // Calculate drainage basin relation map between cells
    for(let i = 0; i < cellMap.length; i++){
        for(let j = 0; j < cellMap[i].length; j++){

            // Actual cell
            let cell = cellMap[i][j];

            let lowerNeighboringCell = findLowerNeighboringCell(cell, cellMap);

            // the cell has no neighboring cells (usually in 1 / 1 map)
            if(lowerNeighboringCell == null){
                let basin = new DrainageBasin(String.fromCharCode(charIndex++));
                basin.addCell(cell);
            }
            // if there is a lower neighboring cell, water flows down, so both cells are of the same drainage basin
            else if (lowerNeighboringCell.altitude < cell.altitude){
                // the neighboring cell is already part of a basin
                if(lowerNeighboringCell.basin != null){
                    // the actual cell isn't part of a basin, we can just add it the the neighboring cell basin
                    if(cell.basin == null){
                        lowerNeighboringCell.basin.addCell(cell);
                    }
                    // the actual cell is part of a basin, we can join the 2 basins
                    else {
                        if(cell.basin != lowerNeighboringCell.bassin){
                            lowerNeighboringCell.basin.cells = lowerNeighboringCell.basin.cells.concat(cell.basin.cells);

                            cell.basin.cells.forEach(function (element, index, array){
                                element.setBasin(lowerNeighboringCell.basin);
                            });
                        }

                    }

                }
                // the actual cell is part of a basin, lower neighboring cell is not
                else if(cell.basin != null){
                    cell.basin.addCell(lowerNeighboringCell);
                }
                // none of the cells has a basin, we add them both in a new one
                else {
                    let basin = new DrainageBasin(String.fromCharCode(charIndex++));
                    basin.addCell(cell);
                    basin.addCell(lowerNeighboringCell);
                }

            }
            // the cell is a sink, we just add it to a new basin if it doesn't have one
            else if(cell.basin == null){
                let basin = new DrainageBasin(String.fromCharCode(charIndex++));
                basin.addCell(cell);
            }


        }
    }

    // Update bassins name to match expected result.
    // See test case 6 of watersheds-test that show logic naming

    //Begin naming to 'a'
    charIndex = 97;

    for(let i = 0; i < cellMap.length; i++) {
        for (let j = 0; j < cellMap[i].length; j++) {

            let c = cellMap[i][j];
            if(!basins.contains(c.basin)){
                c.basin.setName(String.fromCharCode(charIndex++));
                basins.push(c.basin);
            }
        }
    }
}



/**
 * Find the neighboring cell with lower altitude.
 * In case of a tie the priority is North, West, East, South
 * @param cell Original cell
 * @param cellMap Map where search neighboring cells
 * @returns {Cell} Lower altitude neighboring cell
 */
function findLowerNeighboringCell(cell, cellMap){

    var x = cell.x;
    var y = cell.y;

    var res = null;

    // North cell
    if(x>0){
        res = cellMap[x-1][y];
    }
    // west cell
    if(y>0) {
        if (res == null || cellMap[x][y-1].altitude < res.altitude) {
            res = cellMap[x][y-1];
        }
    }
    // east cell
    if(y<cellMap[x].length-1){
        if (res == null || cellMap[x][y+1].altitude < res.altitude) {
            res = cellMap[x][y+1];
        }

    }
    // south cell
    if(x<cellMap.length-1){

        if (res == null || cellMap[x+1][y].altitude < res.altitude) {
            res = cellMap[x+1][y];
        }
    }
    return res;

}

/**
 * Ubdate array to be able to use contains function
 * @param obj
 * @returns {boolean}
 */
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}