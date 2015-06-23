
var tictactoeapp = angular.module('tictactoeapp', [
	]);


tictactoeapp.controller('ttListCtrl', function($scope){
	$scope.boardType = 3;
	$scope.tileNumber = $scope.boardType*$scope.boardType;
	$scope.centerPeice = $scope.tileNumber/2 + 1; 
	$scope.tiles = [];
	$scope.HorizontalArray = [];
	$scope.VerticalArrays = [];
	$scope.DiagnalArrays = [];
	$scope.defaultValue = '-';
	$scope.tictacchars = ['X','O'];
	$scope.currentTurn = 0;
	$scope.status = '';
	$scope.turnsRemaining =0;
	$scope.isDisabled = false;

	$scope.assignValue = function (tile){
		if(tile.player != $scope.defaultValue)
			return;

    	if($scope.currentTurn == $scope.tictacchars.length - 1)
    		$scope.currentTurn = 0;
    	else
    		$scope.currentTurn+=1;

    	tile.player = $scope.tictacchars[$scope.currentTurn];
    	tile.hasbeenset = true;
    	$scope.turnsRemaining+=1;

    	if($scope.turnsRemaining >= 5)
    	{
    		var result = checkifArrayisEqual($scope.HorizontalArray, $scope.tiles);
			var result2 = checkifArrayisEqual($scope.DiagnalArrays, $scope.tiles);
			var result3 = checkifArrayisEqual($scope.VerticalArrays, $scope.tiles);

			console.log(result + " " + result2 + " " + result3);

			if(result || result2 || result3)
			{
				$scope.status = tile.player + " Wins";
				$scope.isDisabled = "disabled";
			}
			else if($scope.turnsRemaining == $scope.tileNumber)
			{
				$scope.status = "Tie Game";
				$scope.isDisabled = "disabled";
			}
    	}
	}

	$scope.createNewGame = function()
	{
		$scope.tiles = [];
		$scope.turnsRemaining = 0;
		$scope.status = "";
		$scope.isDisabled = false;

		for(var i=0; i < $scope.tileNumber; i++)
		{
			$scope.tiles.push({ 
					'player' : $scope.defaultValue, 
				    'hasbeenset': false
				});
		}

		//This is how you get away with doing a nested array without people hating you :)
		$scope.HorizontalArray = 
		{
			data: [0,1,2],
			next: {
				data: [3,4,5],
				next: {
					data: [6,7,8],
					next: null
				}
			}
		};

		$scope.VerticalArrays = 
		{
			data: [0,3,6],
			next: {
				data: [1,4,7],
				next: {
					data: [2,5,8],
					next: null
				}
			}
		};

		$scope.DiagnalArrays = 
		{
			data: [0,4,8],
			next: {
				data: [2,4,6],
				next: null
			}
		};

	}
	//creates theboxes

});

function checkifArrayisEqual(array, plane)
{
	console.log("I run");
	var istrue = true;

	if(array == null)
	{
		console.log("Null node");
		return false;
	}

	console.log(array.data);
	var tmp = plane[array.data[0]];

	if(tmp.hasbeenset)
	{
		for(var j = 1; j < array.data.length; j++)
		{
			var comparedvalue = plane[array.data[j]];
			console.log(comparedvalue.player + " vs " + tmp.player + " is equal to " + comparedvalue.hasbeenset);

			if(comparedvalue.player.localeCompare(tmp.player) != 0 || !comparedvalue.hasbeenset)
			{
				console.log("i returned false");
				istrue = false;
			}			
		}
	}
	else
	{
		console.log("First node hasn't been clicked");
		istrue = false;
	}

	return istrue || checkifArrayisEqual(array.next, plane);

}


function createMatchArray(startingvalue, iterations, increment)
{
	console.log("i start " + startingvalue);
	if(startingvalue >= iterations * iterations)
	{
		console.log("i canceled");
		return;
	}

	var exportedArray = [];
	var i = 0;
	do
	{
		console.log(i);
		var tmpArray = [];
		var j;
		for(j = startingvalue; j < iterations + i; j+=increment)
		{
			tmpArray.push(startingvalue + increment * j);
			
		}
		i =j;
		console.log(tmpArray);
		exportedArray.push(tmpArray);
	}while(i < iterations * iterations);

	/*
		exportedArray.push(tmpArray);
		exportedArray.push(createMatchArray(startingvalue + iterations * increment + 1, iterations, increment));
	*/
	return exportedArray;
}