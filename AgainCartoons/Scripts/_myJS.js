var app = angular.module("Cartoons", ["ngRoute"]);
app.factory("CartoonsFactory", function () {
    return [
        { name: "Invader Zim", year: "The Future" },
        { name: "Foghorn Leghorn", year: "Ante-bellum" },
        { name: "Thunder Cats", year: "80s" },
        { name: "Futurama", year: "3000" },
        { name: "Harvey Birdman: Attorney at Law", year: "2013" },
        { name: "Sealab: 2021", year: "2021" },
        { name: "Aqua-teen Hunger Force", year: "2008" },
        { name: "Mission Hill", year: "2021" }
    ];
});

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "Views/home.html",
        controller:"AddController"
    });
    $routeProvider.when("/Details", {
        template: "This is the details page",
         controller:"AddController"
    })
    $routeProvider.otherwise({
        templateUrl: "Views/error.html",
        controller: "ErrorController"
    });
});

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