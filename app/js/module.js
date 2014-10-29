
//module.js

!function (exports) {
  
  "use strict";

  var appNamespace = {};

  /**
   * function builds dependency object
   * from dependencies array, returns only needed references
   */
  var getDependencies = function (dependencies) {
    var obj = {};
    dependencies.forEach(function (item) {      
      obj[item] = appNamespace[item];
    });
    return obj;
  };

  /**
   * function
   * @param  {[type]} moduleName    [description]
   * @param  {[type]} dependencies  [description]
   * @param  {[type]} buildFunction [description]
   * @return {[type]}               [description]
   */
  var module = function (moduleName, dependencies, buildFunction) {
    if (arguments.length === 3 && typeof arguments[0] === 'string' && typeof arguments[1] === 'array' && typeof arguments[2] === 'function') 
      appNamespace[moduleName] = buildFunction(getDependencies(dependencies));

    if (arguments.length === 2 && typeof arguments[0] === 'string' && typeof arguments[1] === 'function') 
      appNamespace[moduleName] = arguments[1]();

    if (arguments.length === 2 && typeof arguments[0] === 'array' && typeof arguments[1] === 'function') 
      arguments[1](getDependencies(arguments[0]));

    if (arguments.length === 1 && typeof arguments[0] === 'function') 
      arguments[0]();
    
  };

  exports.module = module;

} (window);