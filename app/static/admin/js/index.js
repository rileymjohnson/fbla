//array find polyfill
Array.prototype.find = Array.prototype.find || function (callback) {
    if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
    } else if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    var list = Object(this);
    // Makes sures is always has an positive integer as length.
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
        var element = list[i];
        if (callback.call(thisArg, element, i, list)) {
            return element;
        }
    }
};

Chart.defaults.global.legend = {
    enabled: false
};

// Line chart
var ctx = document.getElementById("lineChart");
var lineChart = new Chart(ctx, {
    type: 'line'
    , data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        , datasets: [{
            label: "# of reservations"
            , backgroundColor: "rgba(38, 185, 154, 0.31)"
            , borderColor: "rgba(38, 185, 154, 0.7)"
            , pointBorderColor: "rgba(38, 185, 154, 0.7)"
            , pointBackgroundColor: "rgba(38, 185, 154, 0.7)"
            , pointHoverBackgroundColor: "#fff"
            , pointHoverBorderColor: "rgba(220,220,220,1)"
            , pointBorderWidth: 1
            , data: lineChartData
              }]
    }
, });

// Bar chart
var ctx = document.getElementById("mybarChart");
var mybarChart = new Chart(ctx, {
    type: 'bar'
    , data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        , datasets: [{
            label: '# of reservations'
            , backgroundColor: "#03586A"
            , data: barChartData
              }]
    },

    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
                  }]
        }
    }
});

// Pie chart
var ctx = document.getElementById("pieChart");
var data = {
    datasets: [{
        data: pieChartData
        , backgroundColor: [
                  "#b3f0ff"
                  , "#4ddbff"
                  , "#00b8e6"
                  , "#008fb3"
                  , "#006680"
                  , "#003d4d"
                  , "#000000"
              ]
        , label: 'Packages' // for legend
          }]
    , labels: [
              "No Package"
              , "Basic Package"
              , "Deluxe Package"
              , "Ultimate Blast Package"
              , "Party Package"
              , "Holiday Package"
              , "Behind the Scenes Package"
          ]
};

var pieChart = new Chart(ctx, {
    data: data
    , type: 'pie'
    , otpions: {
        legend: false
    }
});

$(function () {

    var data = [{
        "hc-key": "us-tx-179"
        , "value": 0
    }, {
        "hc-key": "us-tx-393"
        , "value": 0
    }, {
        "hc-key": "us-tx-311"
        , "value": 0
    }, {
        "hc-key": "us-tx-131"
        , "value": 0
    }, {
        "hc-key": "us-tx-297"
        , "value": 0
    }, {
        "hc-key": "us-tx-289"
        , "value": 0
    }, {
        "hc-key": "us-tx-225"
        , "value": 0
    }, {
        "hc-key": "us-tx-279"
        , "value": 0
    }, {
        "hc-key": "us-tx-017"
        , "value": 0
    }, {
        "hc-key": "us-tx-419"
        , "value": 0
    }, {
        "hc-key": "us-tx-405"
        , "value": 0
    }, {
        "hc-key": "us-tx-463"
        , "value": 0
    }, {
        "hc-key": "us-tx-325"
        , "value": 0
    }, {
        "hc-key": "us-tx-067"
        , "value": 0
    }, {
        "hc-key": "us-tx-075"
        , "value": 0
    }, {
        "hc-key": "us-tx-501"
        , "value": 0
    }, {
        "hc-key": "us-tx-445"
        , "value": 0
    }, {
        "hc-key": "us-tx-507"
        , "value": 0
    }, {
        "hc-key": "us-tx-051"
        , "value": 0
    }, {
        "hc-key": "us-tx-331"
        , "value": 0
    }, {
        "hc-key": "us-tx-159"
        , "value": 0
    }, {
        "hc-key": "us-tx-223"
        , "value": 0
    }, {
        "hc-key": "us-tx-203"
        , "value": 0
    }, {
        "hc-key": "us-tx-423"
        , "value": 0
    }, {
        "hc-key": "us-tx-401"
        , "value": 0
    }, {
        "hc-key": "us-tx-355"
        , "value": 0
    }, {
        "hc-key": "us-tx-165"
        , "value": 0
    }, {
        "hc-key": "us-tx-125"
        , "value": 0
    }, {
        "hc-key": "us-tx-345"
        , "value": 0
    }, {
        "hc-key": "us-tx-155"
        , "value": 0
    }, {
        "hc-key": "us-tx-101"
        , "value": 0
    }, {
        "hc-key": "us-tx-461"
        , "value": 0
    }, {
        "hc-key": "us-tx-329"
        , "value": 0
    }, {
        "hc-key": "us-tx-369"
        , "value": 0
    }, {
        "hc-key": "us-tx-117"
        , "value": 0
    }, {
        "hc-key": "us-tx-359"
        , "value": 0
    }, {
        "hc-key": "us-tx-109"
        , "value": 0
    }, {
        "hc-key": "us-tx-243"
        , "value": 0
    }, {
        "hc-key": "us-tx-079"
        , "value": 0
    }, {
        "hc-key": "us-tx-377"
        , "value": 0
    }, {
        "hc-key": "us-tx-365"
        , "value": 0
    }, {
        "hc-key": "us-tx-471"
        , "value": 0
    }, {
        "hc-key": "us-tx-339"
        , "value": 0
    }, {
        "hc-key": "us-tx-201"
        , "value": 0
    }, {
        "hc-key": "us-tx-157"
        , "value": 0
    }, {
        "hc-key": "us-tx-247"
        , "value": 0
    }, {
        "hc-key": "us-tx-505"
        , "value": 0
    }, {
        "hc-key": "us-tx-239"
        , "value": 0
    }, {
        "hc-key": "us-tx-481"
        , "value": 0
    }, {
        "hc-key": "us-tx-451"
        , "value": 0
    }, {
        "hc-key": "us-tx-095"
        , "value": 0
    }, {
        "hc-key": "us-tx-361"
        , "value": 0
    }, {
        "hc-key": "us-tx-309"
        , "value": 0
    }, {
        "hc-key": "us-tx-217"
        , "value": 0
    }, {
        "hc-key": "us-tx-153"
        , "value": 0
    }, {
        "hc-key": "us-tx-189"
        , "value": 0
    }, {
        "hc-key": "us-tx-219"
        , "value": 0
    }, {
        "hc-key": "us-tx-303"
        , "value": 0
    }, {
        "hc-key": "us-tx-483"
        , "value": 0
    }, {
        "hc-key": "us-tx-107"
        , "value": 0
    }, {
        "hc-key": "us-tx-211"
        , "value": 0
    }, {
        "hc-key": "us-tx-001"
        , "value": 0
    }, {
        "hc-key": "us-tx-151"
        , "value": 0
    }, {
        "hc-key": "us-tx-253"
        , "value": 0
    }, {
        "hc-key": "us-tx-087"
        , "value": 0
    }, {
        "hc-key": "us-tx-199"
        , "value": 0
    }, {
        "hc-key": "us-tx-457"
        , "value": 0
    }, {
        "hc-key": "us-tx-347"
        , "value": 0
    }, {
        "hc-key": "us-tx-495"
        , "value": 0
    }, {
        "hc-key": "us-tx-283"
        , "value": 0
    }, {
        "hc-key": "us-tx-383"
        , "value": 0
    }, {
        "hc-key": "us-tx-173"
        , "value": 0
    }, {
        "hc-key": "us-tx-123"
        , "value": 0
    }, {
        "hc-key": "us-tx-255"
        , "value": 0
    }, {
        "hc-key": "us-tx-285"
        , "value": 0
    }, {
        "hc-key": "us-tx-099"
        , "value": 0
    }, {
        "hc-key": "us-tx-035"
        , "value": 0
    }, {
        "hc-key": "us-tx-397"
        , "value": 0
    }, {
        "hc-key": "us-tx-113"
        , "value": 0
    }, {
        "hc-key": "us-tx-275"
        , "value": 0
    }, {
        "hc-key": "us-tx-257"
        , "value": 0
    }, {
        "hc-key": "us-tx-413"
        , "value": 0
    }, {
        "hc-key": "us-tx-327"
        , "value": 0
    }, {
        "hc-key": "us-tx-403"
        , "value": 0
    }, {
        "hc-key": "us-tx-195"
        , "value": 0
    }, {
        "hc-key": "us-tx-233"
        , "value": 0
    }, {
        "hc-key": "us-tx-065"
        , "value": 0
    }, {
        "hc-key": "us-tx-047"
        , "value": 0
    }, {
        "hc-key": "us-tx-235"
        , "value": 0
    }, {
        "hc-key": "us-tx-287"
        , "value": 0
    }, {
        "hc-key": "us-tx-007"
        , "value": 0
    }, {
        "hc-key": "us-tx-073"
        , "value": 0
    }, {
        "hc-key": "us-tx-425"
        , "value": 0
    }, {
        "hc-key": "us-tx-143"
        , "value": 0
    }, {
        "hc-key": "us-tx-251"
        , "value": 0
    }, {
        "hc-key": "us-tx-185"
        , "value": 0
    }, {
        "hc-key": "us-tx-407"
        , "value": 0
    }, {
        "hc-key": "us-tx-221"
        , "value": 0
    }, {
        "hc-key": "us-tx-385"
        , "value": 0
    }, {
        "hc-key": "us-tx-167"
        , "value": 0
    }, {
        "hc-key": "us-tx-071"
        , "value": 0
    }, {
        "hc-key": "us-tx-293"
        , "value": 0
    }, {
        "hc-key": "us-tx-395"
        , "value": 0
    }, {
        "hc-key": "us-tx-313"
        , "value": 0
    }, {
        "hc-key": "us-tx-041"
        , "value": 0
    }, {
        "hc-key": "us-tx-005"
        , "value": 0
    }, {
        "hc-key": "us-tx-231"
        , "value": 0
    }, {
        "hc-key": "us-tx-147"
        , "value": 0
    }, {
        "hc-key": "us-tx-181"
        , "value": 0
    }, {
        "hc-key": "us-tx-411"
        , "value": 0
    }, {
        "hc-key": "us-tx-053"
        , "value": 0
    }, {
        "hc-key": "us-tx-119"
        , "value": 0
    }, {
        "hc-key": "us-tx-023"
        , "value": 0
    }, {
        "hc-key": "us-tx-031"
        , "value": 0
    }, {
        "hc-key": "us-tx-299"
        , "value": 0
    }, {
        "hc-key": "us-tx-019"
        , "value": 0
    }, {
        "hc-key": "us-tx-029"
        , "value": 0
    }, {
        "hc-key": "us-tx-013"
        , "value": 0
    }, {
        "hc-key": "us-tx-163"
        , "value": 0
    }, {
        "hc-key": "us-tx-315"
        , "value": 0
    }, {
        "hc-key": "us-tx-343"
        , "value": 0
    }, {
        "hc-key": "us-tx-215"
        , "value": 0
    }, {
        "hc-key": "us-tx-027"
        , "value": 0
    }, {
        "hc-key": "us-tx-269"
        , "value": 0
    }, {
        "hc-key": "us-tx-399"
        , "value": 0
    }, {
        "hc-key": "us-tx-465"
        , "value": 0
    }, {
        "hc-key": "us-tx-435"
        , "value": 0
    }, {
        "hc-key": "us-tx-271"
        , "value": 0
    }, {
        "hc-key": "us-tx-137"
        , "value": 0
    }, {
        "hc-key": "us-tx-091"
        , "value": 0
    }, {
        "hc-key": "us-tx-187"
        , "value": 0
    }, {
        "hc-key": "us-tx-477"
        , "value": 0
    }, {
        "hc-key": "us-tx-379"
        , "value": 0
    }, {
        "hc-key": "us-tx-139"
        , "value": 0
    }, {
        "hc-key": "us-tx-213"
        , "value": 0
    }, {
        "hc-key": "us-tx-111"
        , "value": 0
    }, {
        "hc-key": "us-tx-421"
        , "value": 0
    }, {
        "hc-key": "us-tx-493"
        , "value": 0
    }, {
        "hc-key": "us-tx-467"
        , "value": 0
    }, {
        "hc-key": "us-tx-057"
        , "value": 0
    }, {
        "hc-key": "us-tx-391"
        , "value": 0
    }, {
        "hc-key": "us-tx-321"
        , "value": 0
    }, {
        "hc-key": "us-tx-341"
        , "value": 0
    }, {
        "hc-key": "us-tx-499"
        , "value": 0
    }, {
        "hc-key": "us-tx-063"
        , "value": 0
    }, {
        "hc-key": "us-tx-121"
        , "value": 0
    }, {
        "hc-key": "us-tx-439"
        , "value": 0
    }, {
        "hc-key": "us-tx-273"
        , "value": 0
    }, {
        "hc-key": "us-tx-261"
        , "value": 0
    }, {
        "hc-key": "us-tx-381"
        , "value": 0
    }, {
        "hc-key": "us-tx-437"
        , "value": 0
    }, {
        "hc-key": "us-tx-389"
        , "value": 0
    }, {
        "hc-key": "us-tx-323"
        , "value": 0
    }, {
        "hc-key": "us-tx-479"
        , "value": 0
    }, {
        "hc-key": "us-tx-409"
        , "value": 0
    }, {
        "hc-key": "us-tx-249"
        , "value": 0
    }, {
        "hc-key": "us-tx-317"
        , "value": 0
    }, {
        "hc-key": "us-tx-115"
        , "value": 0
    }, {
        "hc-key": "us-tx-455"
        , "value": 0
    }, {
        "hc-key": "us-tx-191"
        , "value": 0
    }, {
        "hc-key": "us-tx-037"
        , "value": 0
    }, {
        "hc-key": "us-tx-459"
        , "value": 0
    }, {
        "hc-key": "us-tx-443"
        , "value": 0
    }, {
        "hc-key": "us-tx-105"
        , "value": 0
    }, {
        "hc-key": "us-tx-371"
        , "value": 0
    }, {
        "hc-key": "us-tx-349"
        , "value": 0
    }, {
        "hc-key": "us-tx-161"
        , "value": 0
    }, {
        "hc-key": "us-tx-353"
        , "value": 0
    }, {
        "hc-key": "us-tx-441"
        , "value": 0
    }, {
        "hc-key": "us-tx-083"
        , "value": 0
    }, {
        "hc-key": "us-tx-003"
        , "value": 0
    }, {
        "hc-key": "us-tx-491"
        , "value": 0
    }, {
        "hc-key": "us-tx-375"
        , "value": 0
    }, {
        "hc-key": "us-tx-009"
        , "value": 0
    }, {
        "hc-key": "us-tx-077"
        , "value": 0
    }, {
        "hc-key": "us-tx-237"
        , "value": 0
    }, {
        "hc-key": "us-tx-503"
        , "value": 0
    }, {
        "hc-key": "us-tx-367"
        , "value": 0
    }, {
        "hc-key": "us-tx-469"
        , "value": 0
    }, {
        "hc-key": "us-tx-169"
        , "value": 0
    }, {
        "hc-key": "us-tx-305"
        , "value": 0
    }, {
        "hc-key": "us-tx-363"
        , "value": 0
    }, {
        "hc-key": "us-tx-133"
        , "value": 0
    }, {
        "hc-key": "us-tx-059"
        , "value": 0
    }, {
        "hc-key": "us-tx-417"
        , "value": 0
    }, {
        "hc-key": "us-tx-207"
        , "value": 0
    }, {
        "hc-key": "us-tx-427"
        , "value": 0
    }, {
        "hc-key": "us-tx-043"
        , "value": 0
    }, {
        "hc-key": "us-tx-127"
        , "value": 0
    }, {
        "hc-key": "us-tx-055"
        , "value": 0
    }, {
        "hc-key": "us-tx-209"
        , "value": 0
    }, {
        "hc-key": "us-tx-337"
        , "value": 0
    }, {
        "hc-key": "us-tx-049"
        , "value": 0
    }, {
        "hc-key": "us-tx-259"
        , "value": 0
    }, {
        "hc-key": "us-tx-265"
        , "value": 0
    }, {
        "hc-key": "us-tx-171"
        , "value": 0
    }, {
        "hc-key": "us-tx-061"
        , "value": 0
    }, {
        "hc-key": "us-tx-473"
        , "value": 0
    }, {
        "hc-key": "us-tx-319"
        , "value": 0
    }, {
        "hc-key": "us-tx-085"
        , "value": 0
    }, {
        "hc-key": "us-tx-205"
        , "value": 0
    }, {
        "hc-key": "us-tx-177"
        , "value": 0
    }, {
        "hc-key": "us-tx-183"
        , "value": 0
    }, {
        "hc-key": "us-tx-145"
        , "value": 0
    }, {
        "hc-key": "us-tx-015"
        , "value": 0
    }, {
        "hc-key": "us-tx-149"
        , "value": 0
    }, {
        "hc-key": "us-tx-011"
        , "value": 0
    }, {
        "hc-key": "us-tx-045"
        , "value": 0
    }, {
        "hc-key": "us-tx-039"
        , "value": 0
    }, {
        "hc-key": "us-tx-267"
        , "value": 0
    }, {
        "hc-key": "us-tx-487"
        , "value": 0
    }, {
        "hc-key": "us-tx-485"
        , "value": 0
    }, {
        "hc-key": "us-tx-025"
        , "value": 0
    }, {
        "hc-key": "us-tx-175"
        , "value": 0
    }, {
        "hc-key": "us-tx-489"
        , "value": 0
    }, {
        "hc-key": "us-tx-241"
        , "value": 0
    }, {
        "hc-key": "us-tx-351"
        , "value": 0
    }, {
        "hc-key": "us-tx-307"
        , "value": 0
    }, {
        "hc-key": "us-tx-281"
        , "value": 0
    }, {
        "hc-key": "us-tx-193"
        , "value": 0
    }, {
        "hc-key": "us-tx-453"
        , "value": 0
    }, {
        "hc-key": "us-tx-263"
        , "value": 0
    }, {
        "hc-key": "us-tx-021"
        , "value": 0
    }, {
        "hc-key": "us-tx-229"
        , "value": 0
    }, {
        "hc-key": "us-tx-475"
        , "value": 0
    }, {
        "hc-key": "us-tx-301"
        , "value": 0
    }, {
        "hc-key": "us-tx-081"
        , "value": 0
    }, {
        "hc-key": "us-tx-069"
        , "value": 0
    }, {
        "hc-key": "us-tx-295"
        , "value": 0
    }, {
        "hc-key": "us-tx-357"
        , "value": 0
    }, {
        "hc-key": "us-tx-415"
        , "value": 0
    }, {
        "hc-key": "us-tx-373"
        , "value": 0
    }, {
        "hc-key": "us-tx-291"
        , "value": 0
    }, {
        "hc-key": "us-tx-433"
        , "value": 0
    }, {
        "hc-key": "us-tx-089"
        , "value": 0
    }, {
        "hc-key": "us-tx-135"
        , "value": 0
    }, {
        "hc-key": "us-tx-497"
        , "value": 0
    }, {
        "hc-key": "us-tx-097"
        , "value": 0
    }, {
        "hc-key": "us-tx-245"
        , "value": 0
    }, {
        "hc-key": "us-tx-227"
        , "value": 0
    }, {
        "hc-key": "us-tx-387"
        , "value": 0
    }, {
        "hc-key": "us-tx-431"
        , "value": 0
    }, {
        "hc-key": "us-tx-335"
        , "value": 0
    }, {
        "hc-key": "us-tx-033"
        , "value": 0
    }, {
        "hc-key": "us-tx-197"
        , "value": 0
    }, {
        "hc-key": "us-tx-277"
        , "value": 0
    }, {
        "hc-key": "us-tx-447"
        , "value": 0
    }, {
        "hc-key": "us-tx-129"
        , "value": 0
    }, {
        "hc-key": "us-tx-141"
        , "value": 0
    }, {
        "hc-key": "us-tx-093"
        , "value": 0
    }, {
        "hc-key": "us-tx-103"
        , "value": 0
    }, {
        "hc-key": "us-tx-333"
        , "value": 0
    }, {
        "hc-key": "us-tx-449"
        , "value": 0
    }, {
        "hc-key": "us-tx-429"
        , "value": 0
    }]

    for (var i = 0; i < counties.length; i++) {
        var key = counties[i]["hc-key"];
        var c = data.find(function (e) {
            return e["hc-key"] == key
        })
        if (c) {
            c["value"] = counties[i]["value"]
        }
    }

    // Initiate the chart
    $('#mapContainer').highcharts('Map', {

        title: {
            text: 'Texas Counties'
        },

        mapNavigation: {
            enabled: true
            , buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: data
            , mapData: Highcharts.maps['countries/us/us-tx-all']
            , joinBy: 'hc-key'
            , name: '# of reservations'
            , states: {
                hover: {
                    color: '#a4edba'
                }
            }
            , dataLabels: {
                enabled: true
                , format: '{point.name}'
            }
              }]
    });
});