app.controller('diapers_redesign', ['$scope','$http','itemData','$location','$window','$cookies','$rootScope','$route',
	function($scope,data,$http,itemData,$location,$window,$cookies,$rootScope,$route){

	$scope.sizeChart = data;
	//$scope.url = $location.url();
	//$scope.referrer = ($window.document.referrer == "") ? 'Direct' : $window.document.referrer;
	window.stuff = $scope;
	$scope.dropdown = {menu:false,size:false,brand:false,content:true};
	$scope.filter_selected = false;

	//Meta Data Such As Titles
    $rootScope.$on('$routeChangeSuccess', function (event, data) {
            document.title=$route.current.title;
    });




   





	//Cookies
	$scope.prefs = $cookies.get('prefs');
	$scope.email = $cookies.get('email');
	$scope.modal = false;
	$scope.emailAddress = {};
	$scope.prefs = {brand:null,size:null};

	//Scope Definitions
	$scope.orderSequence;
	$scope.filterSequence;

	//Order & Filter Functions
		$scope.order = function(input){
			$scope.orderSequence = input || 'pricePerUnit';
		}

		$scope.filter = function(filter_type,input){
			console.log(filter_type);
			if (filter_type == 'size'){
				$scope.filterSequence = {'size' : input};
				console.log($scope.filterSequence);
				$scope.filter_selected=true;
			} else if (filter_type == 'brand'){
				$scope.filterSequence = {'brand' : input};
				console.log($scope.filterSequence);
				$scope.filter_selected=true;
			} else {
					$scope.filterSequence = '';
					$scope.filter_selected = false;
			}
		}

	//Menu Animation
		$scope.menu_open_close = function(){
	
			if ($scope.dropdown.menu == false && $scope.dropdown.size == false && $scope.dropdown.brand == false){
				console.log('1');
				jQuery('#rd_navigation_container').animate({height:'toggle'});
				jQuery('#rd_content_holder').animate({height:'toggle'});
				$scope.dropdown.menu = true;
				$scope.dropdown.content = false;

			} else if ($scope.dropdown.menu) {
				console.log('2');
				jQuery('#rd_navigation_container').animate({height:'toggle'});
				jQuery('#rd_content_holder').animate({height:'toggle'});
				$scope.dropdown.menu = false;
				$scope.dropdown.content = true;

			} else if ($scope.dropdown.size){
				console.log('3');
				jQuery('.rd_navigation_container_2').animate({height:'toggle'});
				jQuery('#rd_content_holder').animate({height:'toggle'});
				$scope.dropdown.size = false;
				$scope.dropdown.content = true;

			} else if ($scope.dropdown.brand){
				console.log('4');
				jQuery('.rd_navigation_container_3').animate({height:'toggle'});
				jQuery('#rd_content_holder').animate({height:'toggle'});
				$scope.dropdown.brand = false;
				$scope.dropdown.content = true;
			}
		}

		$scope.menu_switch = function(menu){

			if (menu == 'size'){

				jQuery('.rd_navigation_container_2').animate({height:'toggle'});
				jQuery('.rd_navigation_container_1').animate({height:'toggle'});
				$scope.dropdown.size = true;
				$scope.dropdown.menu = false;

			} else if (menu == 'brand'){
				
				jQuery('.rd_navigation_container_3').animate({height:'toggle'});
				jQuery('.rd_navigation_container_1').animate({height:'toggle'});
				$scope.dropdown.brand = true;
				$scope.dropdown.menu = false;

			}
		}

		$scope.menu_switch_desktop = function(menu){
			
			if ($scope.dropdown.content && menu == '.rd_navigation_container_2' ){
				
				jQuery('#rd_content_holder').animate({height:'toggle'});
				jQuery(menu).animate({height:'toggle'});
				$scope.dropdown.size = true;
				$scope.dropdown.content = false;
				$scope.dropdown.brand = false;

			}else if ($scope.dropdown.content && menu == '.rd_navigation_container_3' ){
				
				jQuery('#rd_content_holder').animate({height:'toggle'});
				jQuery(menu).animate({height:'toggle'});
				$scope.dropdown.brand = true;
				$scope.dropdown.content = false;
				$scope.dropdown.size = false;

			} else if ($scope.dropdown.size && menu == '.rd_navigation_container_2'){
				
				jQuery('.rd_navigation_container_2').animate({height:'toggle'});
				jQuery('#rd_content_holder').animate({height:'toggle'});
				$scope.dropdown.size = false;
				$scope.dropdown.content = true;

			} else if ($scope.dropdown.brand && menu == '.rd_navigation_container_3'){
				
				jQuery('.rd_navigation_container_3').animate({height:'toggle'});
				jQuery('#rd_content_holder').animate({height:'toggle'});
				$scope.dropdown.brand = false;
				$scope.dropdown.content = true;

			} else if ($scope.dropdown.brand && menu == '.rd_navigation_container_2'){
				
				jQuery('.rd_navigation_container_3').animate({height:'toggle'});
				jQuery('.rd_navigation_container_2').animate({height:'toggle'});
				$scope.dropdown.brand = false;
				$scope.dropdown.size = true;
				$scope.dropdown.content = false;

			} else if ($scope.dropdown.size && menu == '.rd_navigation_container_3'){
				
				jQuery('.rd_navigation_container_2').animate({height:'toggle'});
				jQuery('.rd_navigation_container_3').animate({height:'toggle'});
				$scope.dropdown.brand = true;
				$scope.dropdown.size = false;
				$scope.dropdown.content = false;

			}
		}
	
		$scope.sub_menu_select = function(tohide,toshow){
			jQuery(tohide).animate({height:'toggle'});
			jQuery(toshow).animate({height:'toggle'});
		}
	
	//Down Arrow Scroll
		jQuery(".rd_down_arrow").click(function() {
			jQuery('html, body').animate({
    	scrollTop: $("#rd_items_container").offset().top
			}, 500);
		});

	//Scroll Up
		$scope.up_scroll = function(){
			window.scrollTo(0,0);
		}

	//Database Lookup Items
		itemData.all().then(function(result){
			window.result = result.data;
			$scope.items = result.data;
			$scope.updateTime = $scope.items[0].time;
			return;
		}).catch(function(err){
			return;
		});
	
	//Database Lookup Unique Sizes
		itemData.get_unique_field_values('size').then(function(result){
			var sizes = result.data;
			$scope.sizes = sizes.sort(function(a, b){return a-b});
			jQuery()
			return;
		}).catch(function(err){
			return;
		});

	//Database Lookup Unique Brands
		itemData.get_unique_field_values('brand').then(function(result){
			var brands = result.data;
			$scope.brands = brands.sort();
			window.prerenderReady = true;
			return;
		}).catch(function(err){
			console.log(err);
			return;
		});

	//Email Capture Tool
  	$scope.click_out = function(brand,size){
  		$scope.prefs = {brand:brand,size,size};
  		$cookies.putObject('prefs',{'brand':brand,'size':size}); 
		$scope.email = $cookies.get('email');
  		if (typeof $scope.email == 'undefined' && $scope.modal == false){
  			$scope.show();
  		}
  	}

   	$scope.close = function(){
  		jQuery('#rd_email_capture_container').fadeOut();
  		jQuery('body').css('overflow','initial');
  	}

  	$scope.show = function(){
  		jQuery('#rd_email_capture_container').fadeIn();
  		jQuery('body').css('overflow','hidden');
  		$scope.modal = true;
  	}

  	$scope.submit = function(){
  		$http({
		  method  : 'POST',
		  url     : '/api/email',
		  data    : $.param({address:$scope.emailAddress.address, brand:$scope.prefs.brand, size:$scope.prefs.size}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		}).then(function(data) {
		    if (data.data.error){
		    	console.log(data);
		    	jQuery('.rd_error_message').text('Use A Real Address & Resubmit...');
		    } else if (data.data.status) {
		    	console.log('success');
		    	var CookieDate = new Date;
				CookieDate.setFullYear(CookieDate.getFullYear( ) +1);
		    	$scope.email == true;
		    	$cookies.put('email',true, {'expires':CookieDate});
		    	$scope.close();
		    }
		});

	}

	//Conversion Tracking 
	$scope.ga_event = function(vender,url){
		ga('send', 'event', {
    		eventCategory: 'Item Click',
    		eventAction: 'Click',
    		eventLabel: vender + '_' + $scope.referrer,
    		transport: 'beacon'
  		});
  		fbq('track', 'AddToCart');
  		window.open(url);
  	}

   	$scope.bing_conversion = function(){
		window.uetq = window.uetq || []; 
		window.uetq.push({ 'ec':'null', 'ea':'click_out', 'el':'null', 'ev':'0' });
		console.log('bing conversion');
  	}
}]);

//Custom Filter
app.filter('capitalize', function() {
	return function(input, scope) {
		if (input!=null)
		input = input.toLowerCase();
		return input.substring(0,1).toUpperCase()+input.substring(1);
	}
});

console.log('controller loaded');