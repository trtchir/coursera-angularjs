(function () {
'use strict';
    
angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController ($scope) {
        $scope.items = "";
        $scope.message = "";
        
        $scope.displayMessage = function () {
            var numItems = $scope.items.split(',');
            console.log(numItems);
            
            if (numItems[0] == "" && numItems.length == 1) {
                $scope.message = "Please enter data first";
            }
            else if (numItems.length <= 3 ) {
                $scope.message = "Enjoy!";
            }
            else {
                $scope.message = "Too much";
            } 
        }
        
        /*function checkItems(string) {
            var arrayOfStrings = string.split(',');
            return arrayOfStrings.length;
        }*/
    }
}) ();