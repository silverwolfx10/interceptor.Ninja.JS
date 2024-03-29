/**
 * $interceptor
 *
 * Agrupa todos os interceptors em uma onrdem pre definida
 * para manipular o objeto xhr do servico $http nos processo de
 * request e response
 *
 * @module $interceptor
 * @author Cleber de Moraes Goncalves <cleber.programmer>
 * @example
 *
 *        $interceptor('request', xhr);
 *
 */
this.Ninja.module('$interceptor', ['$curry', '$reduce'], function ($curry, $reduce) {
  
  /**
   * Hash de interceptors em uma orderm definica que tem
   * interece em manipular o objeto xhr em cada requisicao ao servidor remoto
   */
  var interceptors = [
    /* interceptors here */
  ];
  
  /**
   * Transforma o objeto xhr com o interceptor fornecido
   *
   * @private
   * @method transform
   * @param {String} method Nome do metodo que corresponde a um processo
   * @param {Object} xhr Objeto XMLHttpResquest
   * @param {Object} manipulator Manipulador do objeto xhr
   * @return {Object} Objeto xhr transformado
   * @example
   *
   *        transform('request', xhr, manipulator);
   *
   */
  function transform(method, xhr, manipulator) {
    return (manipulator[method] || function (a) { return a })(xhr);
  }
  
  /**
   * Interage com todos interceptors respeitando a sua ordem
   * que foi definido no hash
   *
   * @public
   * @method interceptor
   * @param {String} method Nome do metodo que corresponde a um processo
   * @param {Object} xhr Objeto XMLHttpResquest
   * @return {Object} Objeto xhr transformado
   * @example
   *
   *        interceptor('request', xhr);
   *
   */
  function interceptor(method, xhr) {
    return $reduce(interceptors, xhr, $curry(transform)(method));
  }
  
  /**
   * Revelacao do servico $interceptor, encapsulando a visibilidade das funcoes
   * privadas
   */
  return (function (constructor) {
    
    /**
     * Registra interceptors para serem executados
     * 
     * @static
     * @method push
     * @param {Object} a Interceptors
     * @example
     * 
     *        $interceptor.push($errorAlert);
     *
     */
    constructor.push = function (a) {
      interceptors.push(a);
    };
    
    /**
     * Retorna o construtor interceptor a funcao curry com
     * a funcao statica push
     */
    return constructor;
    
  })($curry(interceptor));
  
});