/* global slabs:false, _:false, angular:false */

var testData = {
    values: ['mentions_17283728', 'mentions_17283729' ],
    categories: ['1288323623006', '19/01/2015', '20/01/2015'],
    labels: {
        'mentions_17283728':'"hate" on the dailymail.co.uk',
        'mentions_17283729':'"terror" on the dailymail.co.uk'
    },
    schema:{
       "value":"number",
       "url":"url"
    },
    data: [
        {
            'mentions_17283729' : {value: 131, url:"http://www.google.com"}
        },
        {
            'mentions_17283728' : {value:130} ,
            'mentions_17283729' : {value:35}
        },
        {
            'mentions_17283728': {value: 33},
            'mentions_17283729' : {value: 93}
        }
    ]
};

angular.module('app', []);
angular.module('app').controller('TableController', ['$scope', '$sce', function($scope, $sce){

    var vm = this;
    vm.data = [];
    vm.headers = [];
    vm.categories = [];
    vm.values = [];
    vm.schema = {};
    
    vm.output = function(obj){
        return _.keys(obj).map(function(key){
            return display(obj[key], vm.schema[key]);
        }).filter(function(val){ return val !== '' });
    };

    // display the chart
    slabs.getData().then(function (obj) {

        'use strict';

        var data = obj || testData;

        vm.data       = data.data;
        console.log(vm.data);
        vm.categories = data.categories;
        vm.values     = data.values;
        vm.schema     = data.schema;

        _.forEach(data.values, function(val){
            if(data.labels[val]){
                vm.headers.push(data.labels[val]);
            }else{
                vm.headers.push(val);
            }
        });

        $scope.$digest();


    });
    
    function display(value, type){
        switch(type){
            case 'url':
                return $sce.trustAsHtml('<a href="' + value + '">' + value + '</a>');
            default:
                return value;
        }
    }


}]);