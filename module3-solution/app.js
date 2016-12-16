(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);
    
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'menuList.html',
            scope: {
                items: '<',
                onRemove: '&',
                showError:'<'
            },
            controller: NarrowItDownController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menuItems = this;
        
        menuItems.searchTerm = '';
        menuItems.found = [];
        menuItems.showError = false;
        
        menuItems.getItems = function () {
            var promise = MenuSearchService.getMatchedMenuItems(menuItems.searchTerm);
        
            promise.then(function (response) {
                if (response.length !== 0) {
                    menuItems.showError = false;
                    menuItems.found = response;
                }else {
                    menuItems.showError =true;
                }
            })
            .catch(function (error) {
                console.log("Something went wrong!" + error);
                menuItems.showError = true;
            });
        }
        
        menuItems.removeItem = function (itemIndex) {
            menuItems.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this;
    
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
               method: "GET",
               url:  "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                var initialItems = result.data.menu_items;
                var foundItems = [];

                if (searchTerm.length !==0) {
                    for (var i=0; i<initialItems.length; i++) {
                        if (initialItems[i].description.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1) {
                            foundItems.push(initialItems[i]);
                        }
                    }
                }

                return foundItems;
                });
            }
    }
})();

