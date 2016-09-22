(function () {
'use strict';
    
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
    var buyList = this;
    
    buyList.items = ShoppingListCheckOffService.getBuyItems();
    buyList.updateItem = function (itemIndex) {
        ShoppingListCheckOffService.updateItem(itemIndex);  
    };
}
    
AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var boughtList = this;
    
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}
    
function ShoppingListCheckOffService() {
    var service = this;
    
    // lists of buy and bought items
    var buyItems = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        },
        {
            name: "Coffee Ice Cream",
            quantity: "20"
        }

    ];
    var boughtItems = [];
    
    // service update and get functions
    service.updateItem = function (index) {
        var item = {
            name: buyItems[index].name,
            quantity: buyItems[index].quantity
        };
        boughtItems.push(item);
        buyItems.splice(index, 1);
    };
    
    service.getBuyItems = function () {
      return buyItems;  
    };
    
    service.getBoughtItems = function () {
      return boughtItems;  
    };
    
}

}) ();