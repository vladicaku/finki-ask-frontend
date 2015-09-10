/**
 * Created by User on 9/7/2015.
 */
angular.module('finkiAsk').controller('ResultsController', ['$scope', '$routeParams', '$interval', 'ResultsService', function($scope, $routeParams, $interval, ResultsService) {

    $scope.hasError = false;
    $scope.error = '';
    $scope.refreshInterval = 400;

    $scope.test = {};
    $scope.categories = [];
    $scope.correct = [];
    $scope.partialCorrect = [];
    $scope.incorrect = [];

    var id = $routeParams.id;
    if (id == undefined) {
        return;
    }

    // destroy pool loop when leave this url
    $scope.intervalPromise = null;
    $scope.$on('$destroy', function () { $interval.cancel($scope.intervalPromise); });

    $scope.chart = null;
    $scope.options = {
        chart: {
            renderTo: 'container',
            type: 'column'
        },
        title: {
            text: 'TEST'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total answers'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
                    fontSize: '17px'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black',
                        fontSize: '17px'
                    }
                }
            }
        },
        series: [{
            name: 'Incorrect',
            color: '#E00000 ',
            data: []
        }, {
            name: 'Partial correct',
            color: '#FFCC33',
            data: []
        }, {
            name: 'Correct',
            color: '#339900',
            data: []
        }]
    };


    $(document).ready(function() {
        /**
         * Grid-light theme for Highcharts JS
         * @author Torstein Honsi
         */

        // Load the fonts
        Highcharts.createElement('link', {
            href: '//fonts.googleapis.com/css?family=Dosis:400,600',
            rel: 'stylesheet',
            type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);

        Highcharts.theme = {
            colors: ["#7cb5ec", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
            chart: {
                backgroundColor: null,
                style: {
                    fontFamily: "Dosis, sans-serif"
                }
            },
            title: {
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }
            },
            tooltip: {
                borderWidth: 0,
                backgroundColor: 'rgba(219,219,216,0.8)',
                shadow: false
            },
            legend: {
                itemStyle: {
                    fontWeight: 'bold',
                    fontSize: '13px'
                }
            },
            xAxis: {
                gridLineWidth: 1,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            yAxis: {
                minorTickInterval: 'auto',
                title: {
                    style: {
                        textTransform: 'uppercase'
                    }
                },
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            plotOptions: {
                candlestick: {
                    lineColor: '#404048'
                }
            },

            // General
            background2: '#F0F0EA'
        };

        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);

        ResultsService.loadResults(id).then(
            function (response) {
            	console.log(response);
                if (response.data.responseStatus != 'SUCCESS') {
                    $scope.hasError = true;
                    //$scope.error = 'Something went wrong!';
                    $scope.error = response.status ;
                }

                $scope.test = response.data.data.test;
                if (response.data.data.correct.length > 6) {
                    $scope.options.chart.type = 'bar';
                    $scope.options.plotOptions.series = $scope.options.plotOptions.column;
                    $scope.options.plotOptions.column = null;
                }
                $scope.chart = new Highcharts.Chart($scope.options);

                $scope.chart.setTitle({text: response.data.data.test.name}, true);
                var categories = [];
                response.data.data.results.forEach(function (r){
                    categories.push(r.question.text);
                });
                $scope.chart.xAxis[0].setCategories(categories, true);
                update();
                $scope.intervalPromise = $interval(update, $scope.refreshInterval);
            },
            function (response) {
                $scope.hasError = true;
                //$scope.error = 'Something went wrong!';
                $scope.error = response.status ;
            }
        );

    });

    function update () {
        ResultsService.loadResults(id).then(
            function (response) {
                $scope.chart.series[0].setData(response.data.data.incorrect ,true);
                $scope.chart.series[1].setData(response.data.data.partialCorrect ,true);
                $scope.chart.series[2].setData(response.data.data.correct ,true);
            },
            function (response) {
            }
        );
    }
}]);