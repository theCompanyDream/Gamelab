
var tictactoeapp = angular.module('tictactoeapp', [
	]);
var tiles = 9;

tictactoeapp.controller('ttListCtrl', function($scope){
	$scope.tiles = [];
	$scope.defaultValue = ' ';
	$scope.tictacchars = ['X','O'];
	$scope.currentTurn = 0;
	$scope.status = 'You Win';

	$scope.assignValue = function (tile){

		if(tile.value != $scope.defaultValue)
			return;

    	if($scope.currentTurn == $scope.tictacchars.length - 1)
    		$scope.currentTurn = 0;
    	else
    		$scope.currentTurn+=1;

    	tile.value = $scope.tictacchars[$scope.currentTurn];
	}

	for(var i=0; i < tiles; i++)
	{
		$scope.tiles.push({ 
				'value' : $scope.defaultValue, 
			    'currentPosition': i
			});
	}

});
