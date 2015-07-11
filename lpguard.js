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


(function() {

  function Guard() {
    this.visiting = [];
    this.visited = [];
    this.sleeping = false;
  }

  Guard.prototype.visit = function(obj) {
    if (this.sleeping) return;

    if (typeof(obj) != 'object' || obj == null)
      return;

    this.visiting.push(obj);
  }

  Guard.prototype.leave = function(obj) {
    if (this.sleeping) return;

    if (obj == null)
      throw new Error('loop-guard: Tried to leave an unspecified object [' + obj + ']');

    if (this.visiting[this.visiting.length - 1] != obj)
      throw new Error('loop-guard: Forgot to leave object [' + obj + ']');

    this.visiting.pop();
    this.visited.push(obj);
  }

  Guard.prototype.isVisiting = function(obj) {
    return !this.sleeping && ~this.visiting.indexOf(obj);
  }

  Guard.prototype.hasVisited = function(obj) {
    return this.isVisiting(obj) || this.hadVisited(obj);
  }

  Guard.prototype.hadVisited = function(obj) {
    return !this.sleeping && ~this.visited.indexOf(obj);
  }

  Guard.prototype.sleep = function() {
    this.sleeping = true;
  }

  Guard.prototype.wake = function() {
    this.sleeping = false;
  }

  Guard.createGuard = function() {
    return new Guard();
  }


  if (typeof module !== 'undefined' && module && module.exports) { // Node.js & CommonJS
    module.exports = Guard;
  } else if (typeof define === 'function' && define.amd) {
    define('loop-guard', [], function() {
      return Guard;
    });
  } else { // Browser
    window.LoopGuard = Guard;
  }


})()
