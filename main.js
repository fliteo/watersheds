"use strict";
var fs = require('fs');
var watersheds = require('./watersheds.js');
var StringBuilder = require('stringbuilder');

fs.readFile('./B-small-practice.in', 'utf8', function(err, data){

    if(err) {
        return console.log(err);
    }

    parseWatershedsFile(data);

});


function parseWatershedsFile(dataString){


    var data = dataString.toString().split('\n');

    debugger;
    var nbCase = data[0];

    var lineNb = 1;

    var st = new StringBuilder();

    StringBuilder.extend('string');

    var filename = './output2';
    var stream = fs.createWriteStream(filename);

    for(let i = 0; i< nbCase; i++){
        st.append('Case #{0}:',(i+1));
        st.appendLine();
        let caseHeader = data[lineNb++].split(' ');
        let nbLine = caseHeader[0];
        let nbCol = caseHeader[1];

        let map = [];

        for(let j = 0; j<nbLine; j++){

            map[j] = data[lineNb++].split(' ');
        }

        let result = watersheds.runMap(map);

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