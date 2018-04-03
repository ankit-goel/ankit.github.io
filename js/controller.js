var app = angular.module("data", ['ngRoute','ngCookies']);
app.config(function($routeProvider,$locationProvider){
$routeProvider.when("/",{
		templateUrl:"templates/home.html"
	}).when("/home",{
		templateUrl:"templates/home.html"
	}).when("/shirt",{
	    controller:"item",
	    controllerAs:"itmctrl",
		templateUrl:"templates/item.html"
	}).when("/jeans",{
	    controller:"jeans_item",
	    controllerAs:"jitctrl",
		templateUrl:"templates/jeans.html"
	}).when("/jeans_buy/:id",{
	   templateUrl:"templates/jeans_buy.html",
	    controller:"jean_buy",
	    controllerAs:"j_buyctrl"
	}).when("/buy/:id",{
	    templateUrl:"templates/buy.html",
	    controller:"buy",
	    controllerAs:"buyctrl"
	}).when("/contact",{
	    templateUrl:"templates/contact.html",
	}).when("/cart",{
	    templateUrl:"templates/cart.html",
	    controller:"cart",
	    controllerAs:"cartctrl"
	}).otherwise({
	redirectTo:"templates/404.html"
});
$locationProvider.html5Mode(true);
});

app.controller("header",function($scope,$http){
	var obj= this;
	$http({
  method: 'GET',
  url: 'fetch_data3.php'}).then(function(response){obj.srh_rst=response.data;},function(err){obj.error=err.data;});
});

app.controller("item",function($scope,$http){
	var obj= this;
$http({
  method: 'POST',
  url: 'fetch_data 1.php'}).then(function(response){obj.st_name=response.data;},function(err){obj.error=err.data;});
	
	
		$scope.datadrop= [
        { size: 'SORT BY---',value:'new' },
        { size: 'NEWEST',value:'new'},
        { size: 'PRICE (LOW TO HIGH)',value:'asc' },
		{ size: 'PRICE (HIGH TO LOW)',value:'desc'},
		{ size: 'NAME (A-Z)',value:'all'}
    ];
	$scope.abcqwe=$scope.datadrop[0];
	
	  
	
	//get sorting data
	$scope.updateData=function(){
		var need=this.mysort;
		$http({
		  method: 'GET',
		  url: 'fetch_data 1.php',
		  params:{"need":need}
		}).then(function(response){obj.st_name=response.data;},function(err){obj.error=err.data;});
	};
	
	
});

app.controller("buy",function($rootScope,$location,$routeParams,$scope,$http,$cookies){
	var obj= this;
	$scope.qty=1;
 $http({
  method: 'GET',
  url: 'fetch_data 1.php',
  params:{"product_id":$routeParams.id}
}).then(function(response){obj.b_name=response.data;},function(err){obj.error=err.data;});
	
	$scope.data= [
        {size:'SMALL', value:'small'},
        {size:'MEDIUM',value:'med'},
        {size:'LARGE',value:'large'}
    ];
	
	$scope.mysize = $scope.data[0]; // 0 -> Open
	
	$scope.fbuy="img/f,buy/download.png";
	$scope.tbuy="img/f,buy/circle-twitter-512.png";
    $scope.gbuy="img/f,buy/google.png";
	$scope.pbuy="img/f,buy/pinterest-icon-vector.png";
	
$rootScope.openNav=function(id,name,price,image_url) {
		
			var $msg;
			var $i;
		if($cookies.getObject("cart")==""){
			$cookies.remove("cart");
		}
		console.log($cookies.getObject("cart"));
		if($cookies.getObject("cart")!==undefined){
			var $cart_item=$cookies.getObject("cart");
			for($i=0;$i<$cart_item.length;$i++){
				if($cart_item[$i].id==id){
					$msg=false;
					break;
				}else{
					$msg=true;
				}
			}
			if($msg){
				var $n_p={"id":id,"qty":this.qty,"name":name,"price":price,"image_url":image_url};
				$cart_item.push($n_p);
				$cookies.putObject("cart",$cart_item);
		//		$location.url("cart");
			}else{
		//		alert("Product already exits");
			}
		}else{
			var $data=[{"id":id,"qty":this.qty,"Name":name,"price":price,"image_url":image_url}];
			$cookies.putObject("cart",$data);
		//	$location.url("cart");
		}
		
	if($cookies.getObject("cart")!==undefined){
			var cart_data=$cookies.getObject("cart");
			$scope.card_data=cart_data;
		}	
	$location.url("cart");
	
	//	document.getElementById("mSidenav").style.width = "260px";
    //	document.getElementById("main").style.marginLeft = "250px";
    //	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		};

$scope.closeNav=function() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
};
		
});

app.controller("jeans_item",function($scope,$http){
	var obj= this;
 $http({
  method: 'POST',
  url: 'fetch_data2.php'}).then(function(response){obj.jkb_name=response.data;},function(err){obj.error=err.data;});
	
	$scope.datadrop= [
        { size: 'SORT BY---',value:'new' },
        { size: 'NEWEST',value:'new'},
        { size: 'PRICE (LOW TO HIGH)',value:'asc' },
		{ size: 'PRICE (HIGH TO LOW)',value:'desc'},
		{ size: 'NAME (A-Z)',value:'all'}
    ];
	
});

app.controller("jean_buy",function($rootScope,$location,$routeParams,$scope,$http,$cookies){
	var obj= this;
	$scope.qty=1;
 $http({
  method: 'GET',
  url: 'fetch_data2.php',
  params:{"product_id":$routeParams.id}
}).then(function(response){obj.jb_name=response.data;},function(err){obj.error=err.data;});
	
	$scope.data= [
        {size:'SMALL', value:'small'},
        {size:'MEDIUM',value:'med'},
        {size:'LARGE',value:'large'}
    ];
	
	$scope.mysize = $scope.data[0]; // 0 -> Open
	
	$scope.fbuy="img/f,buy/download.png";
	$scope.tbuy="img/f,buy/circle-twitter-512.png";
    $scope.gbuy="img/f,buy/google.png";
	$scope.pbuy="img/f,buy/pinterest-icon-vector.png";
	
	$rootScope.openNav=function(id,name,price,image_url) {
		var $msg;
		var $i;
		
		if($cookies.getObject("cart")==""){
			$cookies.remove("cart");
		}
		console.log($cookies.getObject("cart"));
		if($cookies.getObject("cart")!==undefined){
			var $cart_item=$cookies.getObject("cart");
			for($i=0;$i<$cart_item.length;$i++){
				if($cart_item[$i].id==id){
					$msg=false;
					break;
				}else{
					$msg=true;
				}
			}
			if($msg){
				var $n_p={"id":id,"qty":this.qty,"name":name,"price":price,"image_url":image_url};
				$cart_item.push($n_p);
				$cookies.putObject("cart",$cart_item);
		//		$location.url("cart");
			}else{
			//	alert("Product already exits");
			}
		}else{
			var $data=[{"id":id,"qty":this.qty,"Name":name,"price":price,"image_url":image_url}];
			$cookies.putObject("cart",$data);
		//	$location.url("cart");
		}
		
	if($cookies.getObject("cart")!==undefined){
			var cart_data=$cookies.getObject("cart");
			$scope.card_data=cart_data;
		}	
		document.getElementById("mSidenav").style.width = "300px";
    	document.getElementById("main").style.marginLeft = "250px";
    	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
};

	$scope.closeNav= function(){
    document.getElementById("mSidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
};
		
	
});

app.controller("cart",function($scope,$cookies,$route){
	if($cookies.getObject("cart")!=undefined){
	var $i;
	var cart_data=$cookies.getObject("cart");
	console.log(cart_data);
	$scope.card_data=cart_data;
		
	$scope.delCookie=function(p_id){
		var $cart_item=$cookies.getObject("cart");
		for($i=0;$i<$cart_item.length;$i++){
			if($cart_item[$i].id==p_id){
				$cart_item.splice($i,1);
				if($cart_item==""){
					alert("Your Cart Is Empty");
				$scope.hidetable = true;
				}
			}
		}
		$cookies.putObject("cart",$cart_item);	
		$route.reload();
	};
		
		$scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.card_data.length; i++){
        var pro = $scope.card_data[i];
        total += (pro.price * pro.qty);
    }
    return total;
};
	}
	$scope.alertme= function(){
		alert("Thanks for Shopping With US");
	};
	
	
	
	
	
	
});

app.controller("footer",function($scope){
	
	$scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
	};

});