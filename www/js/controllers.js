angular.module('starter.controllers', [])

  .controller('GymCtrl', function ($scope, $cordovaSQLite, $filter) {
    $scope.addCategory = function (category) {
      var query = "INSERT INTO categories (categoryName) VALUES (?)";
      $cordovaSQLite.execute(db, query, [category]).then(function (res) {
        console.log("INSERT ID test-> " + res.insertId);
        $scope.showAllCategories();
      }, function (err) {
        console.log(err);
      });
    }

    $scope.showAllCategories = function () {
      $scope.allCategories = [];
      var query = "SELECT * FROM categories";
      $cordovaSQLite.execute(db, query, []).then(function (res) {

        if (res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.item(0).id);
          for (var i = 0; i < res.rows.length; i++) {

            $scope.allCategories.push({
              id: res.rows.item(i).id,
              categoryName: res.rows.item(i).categoryName,
            });

          }
        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error("error=>" + err);
      });
    }

    $scope.showAllCategories();

    $scope.addExercise = function (exerciseName, categoryType, measurement) {
      var query = "INSERT INTO exercises (exerciseName, categoryType, measurement) VALUES (?, ?, ?)";
      $cordovaSQLite.execute(db, query, [exerciseName, categoryType, measurement]).then(function (res) {
        console.log("INSERT ID test-> " + res.insertId);
        $scope.showAllExercises();
      }, function (err) {
        console.log(err);
      });
    }

    $scope.showAllExercises = function () {
      $scope.allExercises = [];
      var query = "SELECT * FROM exercises";
      $cordovaSQLite.execute(db, query, []).then(function (res) {
        if (res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.item(0).id);
          for (var i = 0; i < res.rows.length; i++) {
            $scope.allExercises.push({
              id: res.rows.item(i).id,
              exerciseName: res.rows.item(i).exerciseName,
              categoryType: res.rows.item(i).categoryType,
              measurement: res.rows.item(i).measurement
            });

          }
        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error("error=>" + err);
      });
    }

    $scope.showAllExercises();

    $scope.showExercisesByCategory = function (categoryType) {
      $scope.exercisesByCategory = [];
      var query = "SELECT * FROM exercises WHERE categoryType = ?";
      $cordovaSQLite.execute(db, query, [categoryType]).then(function (res) {
        if (res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.item(0).id);
          for (var i = 0; i < res.rows.length; i++) {
            $scope.exercisesByCategory.push({
              id: res.rows.item(i).id,
              exerciseName: res.rows.item(i).exerciseName,
              categoryType: res.rows.item(i).categoryType,
              measurement: res.rows.item(i).measurement
            });

          }
        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error("error=>" + err);
      });
    }
    $scope.showExercisesByCategory();

    $scope.addWorkout = function (exerciseName, categoryType, weight, reps) {
      $scope.date = new Date();
      $scope.myDate = new Date($scope.date.getFullYear(),
        $scope.date.getMonth(),
        $scope.date.getDate());
      $scope.myDate = $filter('date')($scope.myDate, 'yyyyMMdd');
      var date = $scope.myDate;
      var query = "INSERT INTO workouts (exerciseName, categoryType, date, weight, reps) VALUES (?, ?, ?, ?, ?)";
      $cordovaSQLite.execute(db, query, [exerciseName, categoryType, date, weight, reps]).then(function (res) {
        console.log("INSERT ID test-> " + res.insertId);
        $scope.showAllWorkouts();
      }, function (err) {
        console.log(err);
      });
    }

     $scope.showAllWorkouts = function () {
      $scope.allWorkouts = [];
      var query = "SELECT * FROM workouts";
      $cordovaSQLite.execute(db, query, []).then(function (res) {
        if (res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.item(0).id);
          for (var i = 0; i < res.rows.length; i++) {
            $scope.allWorkouts.push({
              id: res.rows.item(i).id,
              exerciseName: res.rows.item(i).exerciseName,
              categoryType: res.rows.item(i).categoryType,
              date: res.rows.item(i).date,
              weight: res.rows.item(i).weight,
              reps: res.rows.item(i).reps,
            });

          }
        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error("error=>" + err);
      });
    }
    $scope.showAllWorkouts();
  })



  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $cordovaSQLite) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    /* 
      // Form data for the login modal
      $scope.loginData = {};
    
      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
    
      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      };
    
      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };
    
      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
    
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
        
      };*/
  });



