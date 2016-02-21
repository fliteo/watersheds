"use strict";
var fs = require('fs');
var watersheds = require('./watersheds.js');
var StringBuilder = require('stringbuilder');


/*******************************
 * Main of program for test using file input
 * File input example can be found on https://code.google.com/codejam/contest/90101/dashboard#s=p1
 * In actual version, file must be in root project folder and named 'B-large-practice.in'
 * Output file is set into project folder and named 'output'
 */

fs.readFile('./B-large-practice.in', 'utf8', function(err, data){

    if(err) {
        return console.log(err);
    }

    parseWatershedsFile(data);

});

/**
 * Parse input file
 * In actual version no security is done on input file if it hasn't correct synthax, exceptions are uncatched
 * @param dataString
 */
function parseWatershedsFile(dataString){


    var data = dataString.toString().split('\n');

    var nbCase = data[0];

    var lineNb = 1;

    var st = new StringBuilder();

    StringBuilder.extend('string');

    var filename = './output';
    var stream = fs.createWriteStream(filename);

    // Foreach test case
    for(let i = 0; i< nbCase; i++){
        st.append('Case #{0}:',(i+1));
        st.appendLine();

        // get case header with line and column number of the map
        let caseHeader = data[lineNb++].split(' ');
        let nbLine = caseHeader[0];
        let nbCol = caseHeader[1];

        // Create input map
        let map = [];

        for(let j = 0; j<nbLine; j++){

            map[j] = data[lineNb++].split(' ');
        }

        // Run watersheds program
        let result = watersheds.runMap(map);

        // Save result in output file
        for(let x = 0; x < result.length; x++){
            result[x].forEach(function(l, index, array){
                st.append(l);
                if(index < array.length-1){
                    st.append((' '));
                }
            });
            st.appendLine();
        }
    }

    st.pipe(stream);
    st.flush();

}