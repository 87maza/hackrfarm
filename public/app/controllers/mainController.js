angular.module('farmApp')
.controller('MainController', MainController);

MainController.$inject= ['$rootScope', '$location'];

function MainController($rootScope, $location) {

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

    function EmployerController($rootScope, $http) {
   // $http.get('/employers')
   //      .success(function(data) {
   //          $scope.employer = data;
   //      });

    }
}

