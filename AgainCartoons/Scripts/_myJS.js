var app = angular.module("Cartoons", []);
app.factory("CartoonsFactory", function () {
    return [{name:"Invader Zim", year:"The Future"}, {name:"Foghorn Leghorn", year:"Ante-bellum"}];
})
app.controller("AddController", function ($scope, CartoonsFactory) {
    $scope.cartoons = CartoonsFactory;
    $scope.AddCartoon = function (neCartoon) {
        var c =  {name: neCartoon.name, year: neCartoon.year};
        $scope.cartoons.push(c);
        $scope.newCartoon = "";
    };
    $scope.DeleteCartoon = function (object) {
        $scope.cartoons.splice(
            $scope.cartoons.indexOf(object),
            1);
    };
});