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
    this.stack = [];
    this.sleeping = false;
  }

  Guard.prototype.visit = function(obj) {
    if (this.sleeping) return;

    if (typeof(obj) != 'object' || obj == null)
      return;

    this.stack.push(obj);
  }

  Guard.prototype.leave = function(obj) {
    if (this.sleeping) return;

    if (obj == null)
      throw new Error('loop-guard: Tried to leave an unspecified object [' + obj + ']');

    if (this.stack[this.stack.length - 1] != obj)
      throw new Error('loop-guard: Forgot to leave object [' + obj + ']');

    this.stack.pop();
  }

  Guard.prototype.canVisit = function(obj) {
    if (this.sleeping)
      return true;

    for (var i=0; i < this.stack.length; i++) {
      if (this.stack[i] == obj)
        return false;
    }

    return true;
  }

  Guard.prototype.sleep = function() {
    this.sleeping = true;
  }

  Guard.prototype.wake = function() {
    this.sleeping = false;
  }

  function createGuard() {
    return new Guard();
  }


  if (typeof module !== 'undefined' && module && module.exports) { // Node.js & CommonJS
    module.exports = createGuard;
  } else if (typeof define === 'function' && define.amd) {
    define('loop-guard', [], function() {
      return createGuard;
    });
  } else { // Browser
    window.loopGuard = createGuard;
  }


})()
