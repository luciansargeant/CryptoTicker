app.controller('NavbarController', [
	'$scope', '$location', 
	function NavbarController($scope, $location){
		$scope.menuItems = [
			{"title": "Overview", "link": "/"}
		];
	}
]);