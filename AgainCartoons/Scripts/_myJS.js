﻿var app = angular.module("Cartoons", ["ngRoute"]);
app.factory("CartoonsFactory", function () {
    return [
        //{ name: "Invader Zim", year: "The Future" },
        //{ name: "Foghorn Leghorn", year: "Ante-bellum" },
        //{ name: "Thunder Cats", year: "80s" },
        //{ name: "Futurama", year: "3000" },
        //{ name: "Harvey Birdman: Attorney at Law", year: "2013" },
        //{ name: "Sealab: 2021", year: "2021" },
        //{ name: "Aqua-teen Hunger Force", year: "2008" },
        //{ name: "Mission Hill", year: "2021" }
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

app.controller("AddController", function ($scope, CartoonsFactory, $http) {
    $scope.cartoons = CartoonsFactory;
    $scope.getCartoons = function () {
        if ($scope.cartoons.length) { }
        else {
            $http.get("https://domo.firebaseio.com/.json")
                  .success(function (data, status, headers, config) {
                      for (var x in data) {
                          data[x].key = x;
                          $scope.cartoons.push(data[x]);
                      }
                  })
                  .error(function () { })

        }
    };
    $scope.AddCartoon = function (neCartoon) {
        var c = { name: neCartoon.name, year: neCartoon.year };
        $http.post("https://domo.firebaseio.com/.json", c)
             .success(function (data) {
                 console.log("Response: "+JSON.stringify(data));
                 c.key = data.name;
                 console.log(data.name);
                 console.log(JSON.stringify(c));
                 $scope.cartoons.push(c);
                 $scope.newCartoon = "";
             })
             .error(function () { })
    };
    $scope.DeleteCartoon = function (object) {

        $http.delete("https://domo.firebaseio.com/" + object.key + "/.json")
        .success(function () {
            var targetIndex =$scope.cartoons.indexOf(object);
            $scope.cartoons.splice(targetIndex, 1);
        })
        .error(function () { });
        
    };
    $scope.getCartoons();
});