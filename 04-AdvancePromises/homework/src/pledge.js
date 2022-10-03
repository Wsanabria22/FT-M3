'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

var $Promise = function(executor){
  if (typeof executor !== 'function') throw new TypeError('Must specify an executor function as parameter');
  this._state = 'pending';
  this._value = undefined;
  this._handlerGroups = [];
  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function(someData) { 
  if (this._state === 'pending') {
      this._state = 'fulfilled';
      this._value = someData;
      this._callHandlers();
  };
 };

 $Promise.prototype._internalReject = function(myReason) { 
  if( this._state === 'pending') {
    this._state = 'rejected';
    this._value = myReason;
    this._callHandlers();
  };
};

$Promise.prototype.then = function(successCb, errorCb) {
  if(typeof successCb !== 'function') successCb = false;
  if(typeof errorCb !== 'function') errorCb = false;
  let downstreamPromise = new $Promise(executor);

  this._handlerGroups.push({ successCb, errorCb, downstreamPromise });
 
  if (this._state !== 'pending') this._callHandlers();

  return downstreamPromise;
}

$Promise.prototype._callHandlers = function() {
  while (this._handlerGroups.length > 0) {
    var handlersCb = this._handlerGroups.shift();

    if (this._state === 'fulfilled') {
      if (handlersCb.successCb) { 
        try {
          let successData = handlersCb.successCb(this._value);
          if ( successData instanceof $Promise ) {
            successData.then(data => handlersCb.downstreamPromise._internalResolve(data),
              error => handlersCb.downstreamPromise._internalReject(error))
          } else if ( successData ) handlersCb.downstreamPromise._internalResolve(successData)
        } catch(error) {
            handlersCb.downstreamPromise._internalReject(error)
        }
      } else {
          handlersCb.downstreamPromise._internalResolve(this._value)
      }
    }

    if (this._state === 'rejected') {
      if (handlersCb.errorCb) {
        try {
          let errorData = handlersCb.errorCb(this._value);
          if ( errorData instanceof $Promise ) {
            errorData.then(data => handlersCb.downstreamPromise._internalResolve(data),
              error => handlersCb.downstreamPromise._internalReject(error))
          } else if ( errorData ) handlersCb.downstreamPromise._internalResolve(errorData)
        } catch(error) {
          handlersCb.downstreamPromise._internalReject(error)
        }
      } else {
        handlersCb.downstreamPromise._internalReject(this._value)
      }
    }
  }
  
}

$Promise.prototype.catch = function(errorCb){
  return this.then(null, errorCb);
}

var executor = function(resolve, reject){ }


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
