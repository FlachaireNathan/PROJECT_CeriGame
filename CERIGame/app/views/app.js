var myApp = angular.module('myApp', ['ngRoute']);

var activeUserName;


myApp.config(function ($routeProvider) {


	$routeProvider

		.when('/', {
			templateUrl: 'login.html',
			controller: 'mainController'
		})

		.when('/home', {
			templateUrl: 'home.html',
			controller: 'homeController'
		})

		.when('/profil', {
			templateUrl: 'profil.html',
			controller: 'profilController'
		})

		.when('/quizz', {
			templateUrl: 'quizz.html',
			controller: 'quizzController'
		})

		.when('/endQuizz', {
			templateUrl: 'endQuizz.html',
			controller: 'quizzController'
		})

});




myApp.controller('mainController', function ($scope) {
	$scope.lol = "lol";
});


myApp.controller('loginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
	$scope.validation = false;
	$scope.infoLogin = {};

	$scope.login = function (user) {
		$scope.infoLogin = angular.copy(user);
		var data = angular.copy(user);

		console.log(data);

		$http.post('api/login', data)
			.then(function (response) {
				console.log(response.data);
				if (!Object.keys(response.data).length) {
					$scope.validation = false;
				} else {
					$scope.validation = true;
					activeUserName = response.data[0].identifiant;
					$scope.activeUserNameLogin = response.data[0].identifiant;
					console.log(activeUserName);
					$location.path('/home');
				}
			});
	};
}]);




myApp.controller('homeController', ['$scope', '$location', function ($scope, $location) {
	if (activeUserName == null) {
		$location.path('/');
	}

	$scope.activeUserNameHome = activeUserName;
}]);

myApp.controller('profilController', ['$scope', function ($scope) {

	if (activeUserName == null) {
		$location.path('/');
	}
}]);

myApp.controller('quizzController', ['$scope', '$location', function ($scope, $location) {

	if (activeUserName == null) {
		$location.path('/');
	}

	$scope.listQuestions = [{
			id: 1,
			text: "This is the question 1",
			listAnswer: [{
				id: 1,
				text: "Answer1 1",
				is_answer: true
			}, {
				id: 2,
				text: "Answer1 2",
				is_answer: false
			}, {
				id: 3,
				text: "Answer1 3",
				is_answer: false
			}]
		},
		{
			id: 2,
			text: "This is the question 2",
			listAnswer: [{
				id: 1,
				text: "Answer2 1",
				is_answer: true
			}, {
				id: 2,
				text: "Answer2 2",
				is_answer: false
			}, {
				id: 3,
				text: "Answer2 3",
				is_answer: false
			}]
		},
		{
			id: 3,
			text: "This is the question 3",
			listAnswer: [{
				id: 1,
				text: "Answer3 1",
				is_answer: true
			}, {
				id: 2,
				text: "Answer3 2",
				is_answer: false
			}, {
				id: 3,
				text: "Answer3 3",
				is_answer: false
			}]
		},
	]

	$scope.listAnswerOfUser = [];

	$scope.activeQuestion = 1;

	$scope.nbQuestions = $scope.listQuestions.length;

	$scope.nbGoodAnswers = 0;

	$scope.is_end = false;

	$scope.next = function (idAnswer) {
		$scope.listAnswerOfUser.push(idAnswer);
		$scope.activeQuestion++;
		console.log("Valeur de $scope.nbQuestions :" + $scope.nbQuestions);
		if ($scope.activeQuestion > $scope.listQuestions.length) {
			$scope.nbGoodAnswers = 0;
			for (var i = 0; i < $scope.nbQuestions; i++) {
				console.log("Valeur de i :" + i);
				console.log("Valeur de $scope.listAnswerOfUser[i] :" + $scope.listAnswerOfUser[i]);
				console.log("Valeur de $scope.listQuestions[i] :" + $scope.listQuestions[i]);
				console.log("Valeur de $scope.listQuestions[i].listAnswer[$scope.listAnswerOfUser[i]] :" + $scope.listQuestions[i].listAnswer[$scope.listAnswerOfUser[i]]);
				console.log("Valeur de $scope.listQuestions[i].listAnswer[$scope.listAnswerOfUser[i]].is_answer :" + $scope.listQuestions[i].listAnswer[$scope.listAnswerOfUser[i] - 1].is_answer);
				if ($scope.listQuestions[i].listAnswer[$scope.listAnswerOfUser[i] - 1].is_answer == true) {
					$scope.nbGoodAnswers++;
				}
			}
			$scope.test = "Hello ma boi";
			$scope.is_end = true;
		}
	}
}]);