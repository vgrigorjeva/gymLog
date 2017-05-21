// Ionic Starter App
var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
       db = $cordovaSQLite.openDb({name : "mydb.db", location : "default"});
    }else{db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
    }
    
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS categories (id integer primary key, categoryName text)");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS exercises (id integer primary key, exerciseName text, categoryType text, measurement text)");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS workouts (id integer primary key, exerciseName text, categoryType text, date text, weight number, reps number)");
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
 .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'GymCtrl'
      }
    }
  })

  .state('app.categories', {
    url: '/categories',
    views: {
      'menuContent': {
        templateUrl: 'templates/categories.html',
        controller: 'GymCtrl'
      }
    }
  })

  .state('app.exercises', {
      url: '/exercises',
      views: {
        'menuContent': {
          templateUrl: 'templates/exercises.html',
          controller: 'GymCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/categories');
});
