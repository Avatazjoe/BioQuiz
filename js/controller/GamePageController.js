/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('GamePageController', ['$scope', '$http', 'InitService', function ($scope, $http, InitService) {
	'use strict';
  
	var cc= ["Wilms_tumor","Bone_marrow", "Nephrones", "Hematopoietic_tissue","Lymphoid_follicle", "Osteon", "Adipose_tissue", "Osteoporotic_tissue", "Sinusoid_and_bile_canuliculi", "Stromal_&_glands", "Sarcoma_soft_tissue","Hodgkin_lymphoma","Mycosis_fungoides","Thymic_hyperplasia", "Aversian_canal","Lymph_node_antracosis"];
	var camps = ["Wilms tumor", "Bone marrow", "Nephrons", "Hematopoietic tissue","Lymphoid follicle", "Osteon", "Adipose tissue", "Osteoporotic tissue", "Sinusoid and bile canuliculi", "Stromal conective and glands", "Sarcoma soft tissue","Hodgkin lymphoma","Mycosis fungoides","Thymic hyperplasia", "Haversian canal","Lymph node anthracosis"];
	//var picCounter = [4,7,8,9,9,7,11,8,2,3,2,8,6,4,7,5,7,8,6,3,9,7,3,4,5,9,9,5,6,6,8,7,4,10,7,6,6,2,6,7,7,10,4,2,4,3,6,6,6,9,8,7,4,2,9,6,7,6,4,4,6,7,9,6,7,6,9,6,7,4,7,5,9,6,8,6,7,8,7,4,8,3,8,4,7,4,10,7,8,7,6,8,6,8,5,8,7,4,5,3,5,4,9,5,7,5,9,10,8,5,4,6,7,9,4,5,4,8,5,9,0,5,7,4,3,3,4,6,6,4];
	
  
	var origArr = shuffle(cc.slice())
	var shuffledArr = origArr.slice().splice(0,10);
	var leftArr = origArr.slice().splice(10,origArr.length-10);
	var dataArr = [];
	for (var i = shuffledArr.length - 1; i >= 0; i--) {
		var otherOpts = shuffle(leftArr.slice());
		var options = shuffle([shuffledArr[i], otherOpts[0], otherOpts[1], otherOpts[2]]);
		if(i>0)
			dataArr.push({"id":"card-" + i, "display":"none", "img":shuffledArr[i], t:camps[cc.indexOf(shuffledArr[i])], "a":camps[cc.indexOf(options[0])], "b":camps[cc.indexOf(options[1])], "c":camps[cc.indexOf(options[2])], "d":camps[cc.indexOf(options[3])] });
		else{
			dataArr.push({"id":"card-" + i, "display":"block", "img":shuffledArr[i], t:camps[cc.indexOf(shuffledArr[i])], "a":camps[cc.indexOf(options[0])], "b":camps[cc.indexOf(options[1])], "c":camps[cc.indexOf(options[2])], "d":camps[cc.indexOf(options[3])] });
		}
	}

	$scope.currentQuestion = 0;
	$scope.busy = false;
	$scope.cards = dataArr;
	$scope.questions = [1,2,3,4,5,6,7,8,9,10];
	$scope.correct = 0;
	

	$scope.checkAnswer = function(button, a, b, p, cid) {
		if($scope.busy)return
		$scope.busy = true;

		if(a == b){
			$scope.correct++;
			$("#"+p+"-"+cid).removeClass("color-lightblue")
			$("#"+p+"-"+cid).addClass("color-green");
			$("#numbers-"+($scope.currentQuestion+1)).css("backgroundColor","#4cd964");
		} else {
			$("#"+p+"-"+cid).removeClass("color-lightblue")
			$("#"+p+"-"+cid).addClass("color-red") 
			$("#numbers-"+($scope.currentQuestion+1)).css("backgroundColor","#ff3b30");
		}

		setTimeout(function(){

			$("#card-"+$scope.currentQuestion).fadeOut(250, function() {
    			$scope.currentQuestion++;
				if($scope.currentQuestion==10){
					$("#cholder").fadeOut(250, function() {

						if($scope.correct == 10)
							$("#message-text").html("Perfect");
						else if($scope.correct == 8 || $scope.correct == 9)
							$("#message-text").html("Excellent");
						else if($scope.correct == 6 || $scope.correct == 7)
							$("#message-text").html("Good");
						else if($scope.correct == 4 || $scope.correct == 5)
							$("#message-text").html("Average");
						else if($scope.correct < 4)
							$("#message-text").html("You can do better, try again!");

						$("#score-text").html($scope.correct+"/10");
						$("#result").fadeIn();
					});

				}
				else{
					$("#numbers-"+($scope.currentQuestion+1)).css("backgroundColor","#CCC");
					$("#card-"+$scope.currentQuestion).fadeIn(250);
					$scope.busy = false;	
				}
				
			});
			
		},500)

	};

	$scope.resetGame = function(){
		location.reload();
	}

	
	InitService.addEventListener('ready', function () {
		
		$("#numbers-"+($scope.currentQuestion+1)).css("backgroundColor","#CCC");
	});
	

}]);
