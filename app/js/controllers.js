
var awesomeAppControllers = angular.module('awesomeAppControllers', []);

    // create the controller and inject angular's $scope
    awesomeAppControllers.controller('mainController',function($scope) {
        
    }); 

    awesomeAppControllers.controller('settingsController', ['$scope', '$http', function($scope, $http) {
        $scope.pageClass = 'settings-page';

        $http.get('data/navButtons.json').success(function(data) {
          $scope.navButtons = data;
        });
    }]);

    awesomeAppControllers.controller('genderController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.pageClass = 'settings-page';
        
        $http.get('data/navButtons.json').success(function(data) {
          $scope.navButtons = data;
        });

        $scope.btnClick = function(){
            console.log("btnClick");
            $scope.bool = true;
            $timeout(function(){
                $scope.bool = false
                console.log("false");
            }, 300);
        };
    }]);

    awesomeAppControllers.controller('packlistsController', ['$scope', '$routeParams', '$timeout', '$http',function($scope, $routeParams, $timeout, $http) {
        $scope.btnId = $routeParams.btnId;

        $scope.itemFilter = '';

        $scope.completedCounter = {
            clothes:0,
            toiletries:0,
            gadgets:0,
            rememberTo:0,
        };

        $scope.checkAll = {
            clothes:false,
            toiletries:false,
            gadgets:false,
            rememberTo:false,
        };

        $http.get('data/' + $routeParams.btnId + '.json').success(function(data) {
            $scope.packList = data;
        });

        // filter by done attribute 
        $scope.statusFilter = function(item) {
            if ($scope.itemFilter==='') {
                return item;
            }else{
                if(item.done===$scope.itemFilter){
                    return item;
                }
            }
        };

        //change filter status 
        $scope.changeItemStatus=function(status){
            if (typeof(status) === 'undefined') {
                $scope.itemFilter=status = ''; 
            }else{
                $scope.itemFilter=status; 
            };  
        };

        // add item to one of the sublists
        $scope.addItem = function(inputField,list){
            //reset
            $scope.showError = false;
            $scope.doFade = false;

            $scope.errorMessage = "Error: Item already in list";

            if(!$scope[inputField]==""){

                for (var index = 0; index < $scope.packList[list].length; ++index) {
                    var item = $scope.packList[list][index];
                    if(item.packListItem.toUpperCase() == $scope[inputField].toUpperCase()){
                        $scope.showError = true;
                        $timeout(function(){
                            $scope.doFade = true;
                        }, 1000);
                        break;
                    };
                };
                if(!$scope.showError){
                    $scope.packList[list].push({packListItem:$scope[inputField], done:false});
                    $scope[inputField] = "";
                };
                $scope.updateHeightOfImage();
            };
            // #change Add check if already in list. A warning label should appear and then fade slowly
        };

        /* #start here. Checl chrome console */
         $scope.updateHeightOfImage = function(){
            var bckgrndImg = document.getElementById('background-image-container');
            var overlay = document.getElementById('overlay');
            var packlistFrame = document.getElementById('packlist-frame');
            console.log("b" + bckgrndImg.clientHeight);
            console.log(overlay.clientHeight);
            console.log(packlistFrame.clientHeight);

            if(packlistFrame.clientHeight+30>bckgrndImg.clientHeight){
                bckgrndImg.setAttribute("style","height:"+(packlistFrame.clientHeight+30)+"px")
            };
        };

        // clear completed items
        $scope.clearCompleted = function() {

            clearListItems('clothes');
            clearListItems('gadgets');
            clearListItems('toiletries');
            clearListItems('rememberTo');

            function clearListItems(list){
                var oldList = $scope.packList[list];
                $scope.packList[list] = [];
                angular.forEach(oldList, function(x) {
                    if (!x.done) $scope.packList[list].push(x);
                });
            };

            //Reset counter for completed items
            angular.forEach($scope.completedCounter,function(value, key){
                $scope.completedCounter[key]=0;
            });

            //Uncheck the "Check all" boxes
            angular.forEach($scope.checkAll,function(value, key){
                $scope.checkAll[key]=false;
            });
        };

        $scope.updateCompletedCounter = function (item,list) {
            if (item.done===true) {
                $scope.completedCounter[list]++
            } else {
                $scope.completedCounter[list]--
            }
        };

        $scope.completeAll = function (selected,list) {
            var items = $scope.packList[list];
            angular.forEach(items, function (item) {
                item.done = selected;
            });
            // Update the counter
            if(selected){
                $scope.completedCounter[list] = items.length;
            } else {
                $scope.completedCounter[list] = 0;
            }
        };

        $scope.deleteSingleItem = function(item,list){
            console.log(item.packListItem + list);
            $scope.packList[list].splice($scope.packList[list].indexOf(item),1);
        };

    }]);

    awesomeAppControllers.controller('testingController', ['$scope', '$routeParams', '$http',function($scope, $routeParams, $http) {
        $scope.btnId = $routeParams.btnId;

        $scope.itemFilter = '';

        $scope.completedCounter = {
            clothes:0,
            toiletries:0,
            gadgets:0,
            rememberTo:0,
        };

        $http.get('data/' + $routeParams.btnId + '.json').success(function(data) {
            $scope.packList = data;
        });

        $http.get('data/navButtons.json').success(function(data) {
          $scope.navButtons = data;
        });

        // filter by done attribute 
        $scope.statusFilter = function(item) {
            if ($scope.itemFilter==='') {
                return item;
            }else{
                if(item.done===$scope.itemFilter){
                    return item;
                }
            }
        };

        //change filter status 
        $scope.changeItemStatus=function(status){
            if (typeof(status) === 'undefined') {
                $scope.itemFilter=status = ''; 
            }else{
                $scope.itemFilter=status; 
            };  
        };

        // add item to one of the sublists
        $scope.addItem = function(inputField,list){
            if(!$scope[inputField]==""){
                $scope.packList[list].push({packListItem:$scope[inputField], done:false});
                $scope[inputField] = "";
            };
            // #change Add check if already in list. A warning label should appear and then fade slowly
        };

        // clear completed items
        $scope.clearCompleted = function() {

            clearListItems('clothes');
            clearListItems('gadgets');
            clearListItems('toiletries');
            clearListItems('rememberTo');

            function clearListItems(list){
                var oldList = $scope.packList[list];
                $scope.packList[list] = [];
                angular.forEach(oldList, function(x) {
                    if (!x.done) $scope.packList[list].push(x);
                });
            };

            //Reset counter for completed items
            angular.forEach($scope.completedCounter,function(value, key){
                $scope.completedCounter[key]=0;
            });

            //Uncheck the "Check all" boxes
            $scope.checkAllClothes = false;
            $scope.checkAllToiletries = false;
            $scope.checkAllGadgets = false;
            $scope.checkAllRememberTo = false;
        };

        $scope.updateCompletedCounter = function (item,list) {
            if (item.done===true) {
                $scope.completedCounter[list]++
            } else {
                $scope.completedCounter[list]--
            }
            //$scope.selectedClothes = false;
            //#change : based on list, decide which check all to set to false
        };

        $scope.completeAll = function (selected,list) {
            var items = $scope.packList[list];
            angular.forEach(items, function (item) {
                item.done = selected;
            });
            // Update the counter
            if(selected){
                $scope.completedCounter[list] = items.length;
            } else {
                $scope.completedCounter[list] = 0;
            }
        };
    }]);