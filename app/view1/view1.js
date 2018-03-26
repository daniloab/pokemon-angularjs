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
        success: function (data) {
          if (data) {
            hideLoading();
            $('.error').css('display', 'none');
            console.log(data);

            vm.name = data.name;
            vm.number = data.national_id;
            vm.type1 = data.types[0].name;

            if(data.types.length == 2){
              vm.type2 = data.types[1].name;
            } else vm.type2 = null;

            vm.descriptionURI = "http://pokeapi.co" + data.description[0].resource_uri;

            $.ajax({
              url: vm.descriptionURI,
              type: 'GET',
              success: function (data2) {
                console.log(data2);
              }
            })

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