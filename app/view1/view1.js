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

    vm.abilities = [];

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
            $('.error').css('display', 'none');
            console.log(data);

            vm.name = data.name;
            vm.number = data.id;
            vm.weight = data.weight
            vm.type1 = data.types[0].type.name;
            vm.img = data.sprites.front_default;

            if (data.types.length == 2) {
              vm.type2 = data.types[1].type.name;
            } else vm.type2 = null;

            $.each(data.abilities, function (index, item) {
              vm.abilities.push(item);
            })

            vm.descriptionURL = "https://pokeapi.co/api/v2/characteristic/" + vm.number + "/";

            $.ajax({
              url: vm.descriptionURL,
              type: 'GET',
              success: function (data2) {
                hideLoading();
                console.log(data2);

                $.each(data2.descriptions, function(index,item){
                  if(item.language.name == "en"){
                    vm.description = item.description;
                  }
                })
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