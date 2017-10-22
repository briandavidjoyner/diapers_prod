var app = angular.module('diapers_application',['ngRoute','ngAnimate']);

/*/////////////////////

Angular Routing

////////////////////*/

//Angular Routing
    app.config(function($routeProvider, $locationProvider){ 
        $routeProvider.when('/', { 
            templateUrl : '/public/views/redesign/redesign.html',
            description: '',
            controller: 'diapers_redesign',
            resolve: {
                title : function(){
                    return 'Discover The Best Diaper Deals From Amazon, Walmart, & More';
                },
                brandInfo : function(){
                    return {};
                },
                brandData : function(itemData){
                    return itemData.get_unique_field_values('brand').then(function(result){
                        return result.data.sort();
                    });
                    //return {};
                },
                itemData : function(itemData){
                    return itemData.all().then(function(result){
                        return result;
                    });
                    //return {};
                },
                sizeData : function(itemData){
                    return itemData.get_unique_field_values('size').then(function(result){
                        return result.data.sort(function(a, b){return a-b});
                    });
                    //return {}; 
                }
            }
        }).when('/about', {
            templateUrl : '/public/views/redesign/redesign_about.html',
            description : '',
            controller: 'diapers_redesign',
            resolve : {
                title : function(){
                    return 'Are We Diapers.com?  Afraid Not - But We Do Find You The Best Diaper Deals!';
                },
                brandInfo : function(){
                    return {};
                },
                brandData : function(){
                    return {};
                },
                itemData : function(){
                    return {};
                },
                sizeData : function(){
                    return {};
                }
            }
        })
        
        //Adding Guide Pages
        .when('/guide/amazon_diaper_deals', {
            templateUrl : '/public/views/redesign/guides/guide_template.html',
            description : '',
            controller: 'diapers_redesign',
            resolve : {
                title : function(){
                    return 'Finding The Best Diaper Deals On Amazon.com';
                },
                brandInfo : function(){
                    return {};
                },
                brandData : function(){
                    return {};
                },
                itemData : function(itemData){
                    return itemData.all().then(function(result){
                        return result;
                    });
                    //return {};
                },
                sizeData : function(){
                    return {};
                }
            }
        })
        //Guide Pages

        .when('/brand/:brand', {
            templateUrl : '/public/views/redesign/brand/brand_lp_template.html',
            description : '',
            controller: 'diapers_redesign',
            resolve: {
                title : function($route){
                    var _return = 'Explore The Best Prices On ' + $route.current.params.brand + ' Brand Diapers';
                    return _return;
                },
                brandInfo : function(brandInfo,$route) {
                    return brandInfo.data($route.current.params.brand).then(function(result){
                        return result;
                    });
                },
                brandData : function(){
                    return {};
                },
                itemData : function(itemData){
                    return itemData.all().then(function(result){
                        return result;
                    });
                    //return {};
                },
                sizeData : function(){
                    return {};
                }
            }
        }).when('/brand/:brand/size/:size', {
            templateUrl : '/public/views/redesign/brand/brand_lp_template.html',
            description : '',
            controller: 'diapers_redesign',
            resolve: {
                title : function($route){
                    var _return = 'Explore The Best Prices On ' + $route.current.params.brand + ' Brand Diapers';
                    return _return;
                },
                brandInfo : function(brandInfo,$route) {
                    return brandInfo.data($route.current.params.brand).then(function(result){
                        return result;
                    });
                },
                brandData : function(){
                    return {};
                },
                itemData : function(itemData,$route){
                    return itemData.brand_size($route.current.params.brand,$route.current.params.size).then(function(result){
                        return result;
                    });
                    //return {};
                },
                sizeData : function(){
                    return {};
                }
            }
        }).otherwise({
            templateUrl : '/public/views/redesign/redesign.html',
            description: '',
            controller: 'diapers_redesign',
            resolve: {
                title : function(){
                    return 'Discover The Best Diaper Deals From Amazon, Walmart, & More';
                },
                brandInfo : function(){
                    return {};
                },
                brandData : function(itemData){
                    return itemData.get_unique_field_values('brand').then(function(result){
                        return result.data.sort();
                    });
                    //return {};
                },
                itemData : function(itemData){
                    return itemData.all().then(function(result){
                        return result;
                    });
                    //return {};
                },
                sizeData : function(itemData){
                    return itemData.get_unique_field_values('size').then(function(result){
                        return result.data.sort(function(a, b){return a-b});
                    });
                    //return {}; 
                }
            }
        });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    });

/*////////////////////

Custom Componets

////////////////////*/

//Compenents
    app.directive('header', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_header.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('header2', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {test_item = 'something'},
            templateUrl: "/public/views/content/redesign_header_2.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('navigation', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_navigation.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('navigation2', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_navigation_2.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('sizefilter', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_sizeFilter.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('brandfilter', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_brandFilter.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('info', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_info.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('infopampers', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/lp_brand/pampers/redesign_brand_info.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('infotemplate', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/lp_brand/brand_template/redesign_brand_info.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('items', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_items.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('itemspampers', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/lp_brand/pampers/redesign_items_brand_pampers.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('itemstemplate', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/lp_brand/brand_template/redesign_items_brand_template.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('content', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_content.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('contentpampers', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/lp_brand/pampers/redesign_content_pampers.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('contenttemplate', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/lp_brand/brand_template/redesign_content_template.html",
            //controller: 'diapers_redesign'
        }
    });
    
    app.directive('vendortemplate', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/lp_vendor/vendor_template/redesign_vendor_info.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('about', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_about.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('emailcapture', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_emailCapture.html",
            //controller: 'diapers_redesign'
        }
    });

    app.directive('footer', function () {
        return {
            restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: "/public/views/content/redesign_footer.html",
            //controller: 'diapers_redesign'
        }
    });

/*////////////////////

Services

////////////////////*/

//Item Data
    app.factory('itemData',function($http){
        
        var service = {};
        
        service.all = function(){
            return new Promise(function(resolve,reject){
                $http.get('/api/getitems').then(function(result){
                    resolve (result);
                }).catch(function(error){
                    reject (error);
                });
            });
        };

        service.brand = function(brand){
            return new Promise(function(resolve,reject){
                $http.get('/api/getitemsbybrand/' + brand).then(function(result){
                    resolve (result);
                }).catch(function(error){
                    reject (error);
                });
            });
        };

        service.size = function(size){
            return new Promise(function(resolve,reject){
                $http.get('/api/getitemsbysize/' + size).then(function(result){
                    resolve (result);
                }).catch(function(error){
                    reject (error);
                });
            });
        };

        service.get_unique_field_values = function(query){
            return new Promise(function(resolve,reject){
                $http.get('/api/getsizes/' + query).then(function(result){
                    resolve (result);
                }).catch(function(error){
                    reject (error);
                });
            });
        };

        service.brand_size = function(brand,size){
            return new Promise(function(resolve,reject){
                $http.get('/api/getitemsbyboth/' + brand + '/' + size).then(function(result){
                    resolve (result);
                }).catch(function(error){
                    reject (error);
                });
            });
        };
        
        return service;

    });

//Brand Data
    app.factory('brandInfo', function(){
    
    var service = {}

        service.data = function(brand){
            return new Promise(function(resolve,reject){
                switch (brand) {
                    case 'Pampers' :
                    toReturn = {  
                        brand: 'Pampers',
                        header_title: 'We Find The Best Deals On Pampers Diapers',
                        header_content: 'Pampers Swaddlers, Pampers Swaddlers Sensitive Diapers, Pampers Cruisers, Pampers Baby Dry, Pampers Simply Dry, Pampers Easy Ups Training Underwear, Pampers UnderJams Absorbent Night Wear for Girls & Boys, and Pampers Splashers. Honestly, it\'s alphabet soup. What you really care about; keeping that new kid of your\'s dry and happy for the best price possible. And that\'s what we do. We search Amazon, Walmart, and some other big retailers for the best deals in Pampers diapers.',
                        section_2_full_width_title : 'We Find Hidden Pampers Diaper Deals Across The Internet.',
                        section_3_full_width_title : 'What Size Pampers\' Diaper Does Your Bundle Of Joy Need?',
                        header_post_content: 'Another Pampers headline',
                        sizes: [ 
                            {size : 'Premmie',
                            kg : '0-3',
                            lb : '0-6'},
                            
                            {size : 'Newborn',
                            kg : '0-4',
                            lb : '0-10'},

                            {size : 'Size 1',
                            kg : '3-6',
                            lb : '8-14'},

                            {size : 'Size 2',
                            kg : '5-8',
                            lb : '12-18'},
                            
                            {size : 'Size 3',
                            kg : '7-13',
                            lb : '16-28'},
                            
                            {size : 'Size 4',
                            kg : '10-17',
                            lb : '22-37'},
                            
                            {size : 'Size 5',
                            kg : '12+',
                            lb : '27+'}                            
                        ]
                    }
                    break;
                    //
                    case 'Huggies' :
                    toReturn = {  
                        brand: 'Huggies',
                        header_title: 'We Find The Best Deals On Huggies Diapers',
                        header_content: 'Huggies Little Snugglers, Huggies Little Snugglers Plus, Huggies Snug & Dry, Huggies Snug & Dry Ultra, Huggies Little Movers, Huggies Little Movers Plus, Huggies Little Movers Slip-On, Huggies Overnightes, & Huggies Little Swimmers. Honestly, it\'s alphabet soup. What you really care about; keeping that new kid of your\'s dry and happy for the best price possible. And that\'s what we do. We search Amazon, Walmart, and some other big retailers for the best deals in Huggies diapers.',
                        section_2_full_width_title : 'We Find Hidden Huggies Diaper Deals Across The Internet.',
                        section_3_full_width_title : 'What Size Huggies\' Diaper Does Your Bundle Of Joy Need?',
                        header_post_content: 'Another Huggies headline',
                        sizes: [ 
                            {size : 'Premmie',
                            kg : '<3',
                            lb : '<6'},
                            
                            {size : 'Newborn',
                            kg : '<4',
                            lb : '<10'},

                            {size : 'Size 1',
                            kg : '<6',
                            lb : '<14'},

                            {size : 'Size 2',
                            kg : '5-8',
                            lb : '12-18'},
                            
                            {size : 'Size 3',
                            kg : '7-13',
                            lb : '16-28'},
                            
                            {size : 'Size 4',
                            kg : '10-17',
                            lb : '22-37'},
                            
                            {size : 'Size 5',
                            kg : '12+',
                            lb : '27+'}                            
                        ]
                    }
                    break;
                    //
                    case 'Luvs' :
                    toReturn = {  
                        brand: 'Luvs',
                        header_title: 'We Find The Best Deals On Luvs Diapers',
                        header_content: 'Luvs Ultra Leakguard Diapers are the \'Official Diaper Of Experienced Parents\'.  Backed by Luvs own money back guarantee, Luvs brand diapers offer parents an affordable way to protect their baby from newborn age through toddlerhood.  We\'ve searched Amazon and Walmart for the best availble deals on Luvs diapers and figured out what are the best deals availible right now in realtime!',
                        section_2_full_width_title : 'We Find Hidden Luvs Diaper Deals Across The Internet.',
                        section_3_full_width_title : 'What Size Luvs\' Diaper Does Your Bundle Of Joy Need?',
                        header_post_content: 'Better Than Coupons - We Find The Best Deals On Luvs Diapers',
                        sizes: [                             
                            {size : 'Newborn',
                            kg : '<4',
                            lb : '<10'},

                            {size : 'Size 1',
                            kg : '3-6',
                            lb : '8-14'},

                            {size : 'Size 2',
                            kg : '5-8',
                            lb : '12-18'},
                            
                            {size : 'Size 3',
                            kg : '7-13',
                            lb : '16-28'},
                            
                            {size : 'Size 4',
                            kg : '10-17',
                            lb : '22-37'},
                            
                            {size : 'Size 5',
                            kg : '12+',
                            lb : '27+'},

                            {size : 'Size 6',
                            kg : '15+',
                            lb : '35+'}                               
                        ]
                    }
                    break;
                    case 'Template' :
                    toReturn = {  
                        brand: 'Template',
                        header_title: 'Template Header',
                        header_content: 'Template Content',
                        section_2_full_width_title : 'Template Header 2',
                        section_3_full_width_title : 'Template Header 3',
                        header_post_content: 'Template Content 2',
                        sizes: [ 
                            {size : 'Smallest',
                            kg : '0-3',
                            lb : '0-6'},
                            
                            {size : 'Next Size',
                            kg : '0-4',
                            lb : '0-10'},

                            {size : 'Next Size 2',
                            kg : '3-6',
                            lb : '8-14'},

                            {size : 'Next Size 3',
                            kg : '5-8',
                            lb : '12-18'}                            
                        ]
                    }
                    break;
                    //
                    default:
                    toReturn = 'This Brand Is Not Defined';
                }
                resolve (toReturn);
            }).catch(function(error){
                reject (error);
            });

        };

        return service;

    });

/*////////////////////

Controllers

////////////////////*/

    //Controllers
    app.controller('diapers_redesign', ['$scope','brandInfo','brandData','itemData','sizeData','$route','$window', 'title', 
        function($scope,brandInfo,brandData,itemData,sizeData,$route,$window,title){

    //Conversion Pixels
        $scope.referrer = ($window.document.referrer == "") ? 'Direct' : $window.document.referrer
        
        //Bing Conversion Pixel
            $scope.bing_conversion = function(){
                window.uetq = window.uetq || []; 
                window.uetq.push({ 'ec':'null', 'ea':'click_out', 'el':'null', 'ev':'0' });
                console.log('bing conversion');
            }

        //Google Conversion Pixel
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

    //Expose Scope
        window.stuff = $scope

    //Filter Methods
        $scope.filter = function(filter_type,input){
            if (filter_type == 'size'){
                $scope.filterSequence = {'size' : input};
                $scope.filter_selected=true;
            } else if (filter_type == 'brand'){
                $scope.filterSequence = {'brand' : input};
                $scope.filter_selected=true;
            } else {
                    $scope.filterSequence = '';
                    $scope.filter_selected = false;
            }
        }

    //Get Brand/Item Data
        $scope.brandInfo = brandInfo;
        $scope.brands = brandData;
        $scope.items = itemData.data;
        $scope.sizes = sizeData;
        $scope.updateTime = new Date;

    //Meta Data Updates
        //document.title = $route.current.title;
        document.title = title;

    //Menu
        $scope.dropdown = {menu:false,size:false,brand:false,content:true};
        
        $scope.menu_open_close = function(){
    
            if ($scope.dropdown.menu == false && $scope.dropdown.size == false && $scope.dropdown.brand == false){
                jQuery('#rd_navigation_container').animate({height:'toggle'});
                jQuery('#rd_content_holder').animate({height:'toggle'});
                $scope.dropdown.menu = true;
                $scope.dropdown.content = false;

            } else if ($scope.dropdown.menu) {
                jQuery('#rd_navigation_container').animate({height:'toggle'});
                jQuery('#rd_content_holder').animate({height:'toggle'});
                $scope.dropdown.menu = false;
                $scope.dropdown.content = true;

            } else if ($scope.dropdown.size){
                jQuery('.rd_navigation_container_2').animate({height:'toggle'});
                jQuery('#rd_content_holder').animate({height:'toggle'});
                $scope.dropdown.size = false;
                $scope.dropdown.content = true;

            } else if ($scope.dropdown.brand){
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

    //Scroll
        $scope.down_scroll = function(element){
            jQuery('html, body').animate({
                scrollTop: $(element).offset().top
            }, 500);
        }

        $scope.up_scroll = function(){
            jQuery('html, body').animate({
                scrollTop: $("#rd_header").offset().top
            }, 500);
        }


    }]);

/*////////////////////

Custom Filters

////////////////////*/

    app.filter('capitalize', function() {
        return function(input, scope) {
            if (input!=null)
            input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        }
    });