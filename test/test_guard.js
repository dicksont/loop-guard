/*
 * Copyright (c) 2015 Dickson Tam
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 */

(function(factory) {

  if (typeof module !== 'undefined' && module && module.exports) {
    factory(require('assert'), require('../lpguard.js'));
  } else if (typeof define === 'function' && define.amd) { // Require.js & AMD

    define([ 'chai', 'loop-guard'], function(chai, guard) {
      factory(chai.assert, guard);
    });

  } else {

    factory(window.assert, window.loopGuard);
    mocha.checkLeaks();
    mocha.run();
  }


})(function(assert, createGuard) {

  var testCases = [];

  testCases.push({
    topology: (function() {
      var a = [];
      a.label = 'a';
      a[0] = a;

      return a;
    })(),
    count: 1,
    label: 'recursive'
  });


  testCases.push({
    topology: (function() {
      var a = [];
      a.label = 'a';

      var b = [];
      b.label = 'b';
      a[0] = b;
      b[0] = a;

      return a;
    })(),
    count: 2,
    label: 'yin-yang'
  });

  function checkVisits(log, count) {
    var visited = 0;
    for(var label in log) {
      visited++;
    }
    assert.equal(visited, count);
  }

  function runTest(label, topology, count) {
    var guard = createGuard();

    function visitNode(arr, log) {
      guard.visit(arr);
      log = log || {};
      log[arr.label] = 1 + ((log[arr.label] == null)? 0 : log[arr.label]);

      for (var i=0; i < arr.length; i++) {
        if (!guard.isVisiting(arr[i])) {
          return visitNode(arr[i], log);
        }
      }

      guard.leave(arr);
      return log;
    }

    it(label, function() {
      var log = visitNode(topology);
      checkVisits(log, count);
    });
  }



  describe('Guard', function() {
    describe('should visit every node and return', function() {

      for (var i=0; i < testCases.length; i++) {
        var tc = testCases[i];
        runTest(tc.label, tc.topology, tc.count);
      }

    });
  });

})
