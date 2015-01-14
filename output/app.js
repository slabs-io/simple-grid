/* global Highcharts:false, slabs:false, _:false, moment:false */

var testData = {
    values: ['mentions_17283728', 'mentions_17283729' ],
    categories: ['18/01/2015', '19/01/2015', '20/01/2015'],
    labels: {
        'mentions_17283728':'"hate" on the dailymail.co.uk',
        'mentions_17283729':'"terror" on the dailymail.co.uk'
    },
    data: [
        {
            'mentions_17283728' : 131,
            'mentions_17283729' : 94
        },
        {
            'mentions_17283728' : 130,
            'mentions_17283729' : 35
        },
        {
            'mentions_17283728': 33,
            'mentions_17283729' : 93
        }
    ]
};


// display the chart
slabs.getData().then(function (obj) {
    'use strict';
    
    var grid = document.getElementById('grid');
    var data = obj || testData;
    
    var header = document.createElement('thead');
    var hr = document.createElement('tr');
    
    _.forEach([' '].concat(data.values), function(val){
        var head = document.createElement('th');
        if(data.labels[val]){
            head.innerText = data.labels[val];
        }else{
            head.innerText = val;
        }
        hr.appendChild(head);
    });

    header.appendChild(hr);
    grid.appendChild(header);
    
    var tb = document.createElement('tbody');

    var index = 0;

    _.forEach(data.categories, function(catName){

        var tr = document.createElement('tr');

        var td;
        var val;

        td = document.createElement('td');
        td.innerText = catName;
        tr.appendChild(td);

        var dataObject = data.data[index];

        _.forEach(data.values, function(valName){

            if(dataObject[valName]){
                val = dataObject[valName];
            }else{
                val = '';
            }

            td = document.createElement('td');
            td.innerText = val;
            tr.appendChild(td);

        });

        tb.appendChild(tr);

        index++;

    })


    
    grid.appendChild(tb);

});
