"use strict";

var test = require('unit.js');
var expect = require('chai').expect;

describe('Test on the case exemples', function(){

    var watersheds = require('../watersheds.js');

    it('Case 1', function(){

        let map;
        map = [
            [9, 6, 3],
            [5, 9, 6],
            [3, 5, 9]
        ];

        let res = [
            ['a', 'b', 'b'],
            ['a', 'a', 'b'],
            ['a', 'a', 'a']
        ];

        let test = watersheds.runMap(map);

        expect(test).to.eql(res);
    });

    it('Case 2', function(){

        let map = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 7]
        ];

        let res = [
            ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'b']
        ];

        let test = watersheds.runMap(map);

        expect(test).to.eql(res);
    });

    it('Case 3', function(){

        let map = [
            [7, 6, 7],
            [7, 6, 7]
        ];

        let res = [
            ['a', 'a', 'a'],
            ['b', 'b', 'b']
        ];

        let test= watersheds.runMap(map);

        expect(test).to.eql(res);
    });

    it('Case 4', function(){

        let map = [
            [1, 2, 3, 4, 5],
            [2, 9, 3, 9, 6],
            [3, 3, 0, 8, 7],
            [4, 9, 8, 9, 8],
            [5, 6, 7, 8, 9]
        ];

        let res = [
            ['a', 'a', 'a', 'a', 'a'],
            ['a', 'a', 'b', 'b', 'a'],
            ['a', 'b', 'b', 'b', 'a'],
            ['a', 'b', 'b', 'b', 'a'],
            ['a', 'a', 'a', 'a', 'a']
        ];

        let test= watersheds.runMap(map);

        expect(test).to.eql(res);
    });

    it('Case 6', function(){

        let map = [
            [8,8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8,8]
        ];

        let res = [
            ['a','b','c','d','e','f','g','h','i','j','k','l','m'],
            ['n','o','p','q','r','s','t','u','v','w','x','y','z']
        ];

        let test= watersheds.runMap(map);

        expect(test).to.eql(res);
    });

});