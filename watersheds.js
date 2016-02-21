"use strict";

var Cell = require('./model/cell.js');
var DrainageBasin = require('./model/drainage-basin.js');

var exports = module.exports = {};

exports.runMap = function runMap(map){

    var height = map.length;
    var width = map[0].length;

    var cellMap = createCellMap(map);

    calculateDrainageBasin(cellMap);


    var res = [];

    for(let i = 0; i < cellMap.length; i++){
        res[i] = [];
        for(let j = 0; j < cellMap[i].length; j++)
        res[i][j] = cellMap[i][j].basin.name;
    }
    return res;
};

function createCellMap(map){

    var cellMap = [];

    for(let i = 0; i < map.length; i++){
        cellMap[i] = [];
        for(let j = 0; j < map[i].length; j++){
            cellMap[i][j] = new Cell(i, j, map[i][j]);
        }
    }
    return cellMap;
}

function calculateDrainageBasin(cellMap){

    var basins = [];

    var charIndex = 97;

    for(let i = 0; i < cellMap.length; i++){
        for(let j = 0; j < cellMap[i].length; j++){

            let cell = cellMap[i][j];

            let lowerNeighbourCell = findLowerNeighbourCell(cell, cellMap);

            // if there is a lower neighbouring cell, water flows down, so both cells are of the same drainage basin
            if (lowerNeighbourCell.altitude < cell.altitude){
                // the neighbouring cell is already part of a basin
                if(lowerNeighbourCell.basin != null){
                    // the actual cell isn't part of a basin, we can just add it the the neighbouring cell basin
                    if(cell.basin == null){
                        lowerNeighbourCell.basin.addCell(cell);
                    }
                    // the actual cell is part of a basin, we can join the 2 basins
                    else {

                        basins.splice(basins.indexOf(cell.basin), 1);
                        lowerNeighbourCell.basin.cells = lowerNeighbourCell.basin.cells.concat(cell.basin.cells);

                        for(let c in cell.basin) {
                            c.basin = lowerNeighbourCell.basin;
                        }
                    }

                }
                // the actual cell is part of a basin, lower neighbouring cell is not
                else if(cell.basin != null){
                    cell.basin.addCell(lowerNeighbourCell);
                }
                // none of the cells has a basin, we add them both in a new one
                else {
                    let basin = new DrainageBasin(String.fromCharCode(charIndex++));
                    basin.addCell(cell);
                    basin.addCell(lowerNeighbourCell);
                    basins.push(basin);
                }

            }
            // the cell is a sink, we just had it to a new basin if it doesn't have one
            else if(cell.basin == null){
                let basin = new DrainageBasin(String.fromCharCode(charIndex++));
                basin.addCell(cell);
                basins.push(basin);
            }
        }
    }

    // reset basins name
    charIndex = 97;

    basins.forEach(function (element, index, array){
        element.setName(String.fromCharCode(charIndex++));
    });

}

function findLowerNeighbourCell(cell, cellMap){

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
