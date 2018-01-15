'use strict';

app.controller('CryptoController', [
	'$scope', '$rootScope', '$location', '$window', '$interval', 'DataService', 
	function CryptoController($scope, $rootScope, $location, $window, $interval, DataService){

		$scope.currPairCode = "btcusd";
		$scope.currPair = {
			"mid": null,
			"bid": null,
			"ask": null,
			"lastPrice": null,
			"low": null,
			"high": null,
			"volume": null,
			"timestamp": null
		};

		$scope.codes = null;
		$scope.bids = null;
		
		// Arrays to hold price-value pairs to be plotted 
		$scope.prices = null;
		$scope.times = null;

		$scope.getCurrPair = function(){
			var requestStr = {"pairCode": $scope.currPairCode};
			DataService.getCurrPair(requestStr).then(
				function success(res){
					if (res.status === 200 && res.data != undefined && res.data != null && JSON.parse(res.data).error == undefined){
						var data = JSON.parse(res.data);
						$scope.currPair.mid = data.mid;
						$scope.currPair.bid = data.bid;
						$scope.currPair.ask = data.ask;
						$scope.currPair.lastPrice = data.last_price;
						$scope.currPair.low = data.low;
						$scope.currPair.high = data.high;
						$scope.currPair.volume = data.volume;
						var currTime = new Date(data.timestamp * 100);
						$scope.currPair.timestamp = currTime.toLocaleTimeString();//currTime.getHours() + ":" + currTime.getMinutes() + ":" + currTime.getSeconds() + "." + currTime.getMilliseconds();

						$scope.addTimeValuePair();
					}
					else if(res.status != 200){
						console.log("Error in data retrieval. Status code: " + res.status);
					}
					else {
						console.log("Error in data retrieval. There's an issue with the response data.");
					}
				},
				function failure(res){
					console.log("Retrieval of the current pair's data failed ->" + res.data);

					// Redirect to error page here
				}
			);			
		};

		$scope.getCodes = function(){
			DataService.getCodes().then(
				function success(res){
					if (res.status === 200 && res.data != undefined && res.data != null && JSON.parse(res.data).error == undefined){
						$scope.codes = JSON.parse(res.data);
					}
					else if(res.status != 200){
						console.log("Error in code retrieval. Status code: " + res.status);
					}
					else {
						console.log("Error in code retrieval. There's an issue with the response data.");
					}
				},	
				function failure(res){
					console.log("Retrieval of the pair codes failed ->" + res.data);

					// Redirect to error page here
				}
			);
		}

		$scope.getBids = function(){
			var requestStr = {"pairCode": $scope.currPairCode};
			DataService.getBids(requestStr).then(
				function success(res){
					if (res.status === 200 && res.data != undefined && res.data != null && JSON.parse(res.data).bids != undefined){
						$scope.bids = JSON.parse(res.data).bids;
			 
						for (var i = 0; i < $scope.bids.length; i++){
							var currStamp = new Date($scope.bids[i]["timestamp"] * 100); 
							$scope.bids[i]["timestamp"] = currStamp.toLocaleTimeString();
						}
					}
					else if(res.status != 200){
						console.log("Error in bids retrieval. Status code: " + res.status);
					}
					else {
						console.log("Error in bids retrieval. There's an issue with the response data.");
					}
				},
				function failure(res){

				}
			);
		}

		$scope.addTimeValuePair = function(){
			console.log($scope.prices);
			

			if ($scope.prices === null && $scope.times === null){
				$scope.prices = [];
				$scope.times = [];				
			} else if ($scope.prices.length === 12 && $scope.times.length === 12){
				$scope.prices.splice(0, 1);
				$scope.times.splice(0, 1);
			}
			
			$scope.prices.push($scope.currPair.lastPrice);
			$scope.times.push($scope.currPair.timestamp);
		}

		$scope.getData = function(){
			$scope.getCurrPair();
			$scope.getBids();
		}

		// Main

		$interval($scope.getCurrPair, 5000);
		$interval($scope.getBids, 3000);
		$scope.getCodes();

}]);