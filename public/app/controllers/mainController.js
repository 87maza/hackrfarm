angular.module('farmApp')
.controller('MainController', MainController);

MainController.$inject= ['$scope', '$location'];

function MainController($scope, $location) {
console.log("hello im at the controller");
    var vm = this;
    // $http.get('/students')
    //     .success(function(data) {
    //         $scope.hippos = data;
    //     });

    // $scope.messages = [];

    // socket.on('new message', function(msg){
    //     $scope.$apply(function(){
    //         $scope.messages.unshift(msg);

    //     });
    // });

    vm.addStudent = function() {
        // Send a $http.post to the api with
        // the new hippo data in a js object.
        // Be sure to add the new hippo
        // to the $scope.hippos array.
    };

    function EmployerController($scope, $http) {
   // $http.get('/employers')
   //      .success(function(data) {
   //          $scope.employer = data;
   //      });

    }
}

