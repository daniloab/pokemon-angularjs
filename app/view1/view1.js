'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl as vm'
    });
  }])

  .controller('View1Ctrl', [function ($scope) {

    var vm = this;

    vm.searchPokemon = searchPokemon;

    function showLoading() {
      $('.loading').fadeIn(500);
      $('.loading').css('opacity', '1');
    }

    function hideLoading() {
      $('.loading').fadeOut(500);
    }

    function searchPokemon(pokemon) {
      showLoading();
      $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/",
        type: 'GET',
        success: function (resp) {
          if (resp) {
            hideLoading();
            console.log(resp);
          }
        },
        error: function (e) {
          hideLoading();
          $('#inputSearch').val('');
          $('.error').css('display', 'block');
          $('#inputSearch').focus();
          $('#inputSearch').attr("placeholder", "");
        }
      })
    }
  }]);