/**
 * Created by user on 9/10/2015.
 */
angular.module('finkiAsk').controller('OtherTestController', ['$scope', '$filter', 'TestService', '$routeParams', '$location',function($scope, $filter, TestService, $routeParams, $location) {

    $scope.testTypesEnum = {
        test: 'TEST',
        anonymousTest: 'ANONYMOUSTEST',
        survey: 'SURVEY'
    };

    $scope.questionTypesEnum = {
        singleChoise: 'SINGLE',
        multipleChoise: 'MULTIPLE',
        text: 'TEXT',
        range: 'RANGE'
    };

    $scope.testTypes = [
        {
            label: 'Test',
            value: $scope.testTypesEnum.test
        },
        {
            label: 'Anonymous Test',
            value: $scope.testTypesEnum.anonymousTest
        },
        {
            label: 'Survey',
            value: $scope.testTypesEnum.survey
        }
    ];

    $scope.questionTypes = [
        {
            label: 'Single Choise',
            value: $scope.questionTypesEnum.singleChoise
        },
        {
            label: 'Multiple Choise',
            value: $scope.questionTypesEnum.multipleChoise
        },
        {
            label: 'Text',
            value: $scope.questionTypesEnum.text
        },
        {
            label: 'Range',
            value: $scope.questionTypesEnum.range
        }
    ];

    $scope.hasError = false;
    $scope.error = '';
    $scope.onlyForRead = true;

    $scope.test = {};

    var id = $routeParams.id;
    if (id != undefined) {
        $scope.test.isNew = false;
        $scope.test = TestService.findById(id).then(
            function (response) {
                if (response.data.responseStatus == 'SUCCESS') {
                    $scope.hasError = false;

                    $scope.test = response.data.data;
                    $scope.test.startDate = $scope.test.start.split(' ')[0];
                    $scope.test.endDate = $scope.test.end.split(' ')[0];
                    var d = new Date();
                    d.setHours($scope.test.start.split(' ')[1].split(':')[0]);
                    d.setMinutes($scope.test.start.split(' ')[1].split(':')[1]);
                    $scope.test.startTime = d;
                    var d1 = new Date();
                    d1.setHours($scope.test.end.split(' ')[1].split(':')[0]);
                    d1.setMinutes($scope.test.end.split(' ')[1].split(':')[1]);
                    console.log(d1);
                    $scope.test.endTime = d1;

                    $scope.test.questions.forEach(function (question) {
                        if (question.type == $scope.questionTypesEnum.range) {
                            var splited =  question.answers[0].text.split(":");
                            question.answers[0].min = parseInt(splited[0]);
                            question.answers[0].max = parseInt(splited[1]);
                            question.answers[0].rangeCorrect =  parseInt(question.answers[0].correct);
                        }
                        else if (question.type == $scope.questionTypesEnum.text) {

                        }

                        if (question.type == $scope.questionTypesEnum.multipleChoise) {
                            question.inputType = 'checkbox';
                        } else if (question.type == $scope.questionTypesEnum.singleChoise) {
                            question.inputType = 'radio';
                        }
                    });

                    console.log($scope.test);
                }
                else if (response.data.responseStatus == 'ERROR') {
                    $scope.hasError = true;
                    $scope.error = response.data.description;
                }
            },
            function (response) {
                $scope.hasError = true;
                $scope.error = response.data.description;
                console.log(response);
            }
        );
    }
    else {
        $scope.test.isNew = true;
    }


    // Test methods
    $scope.isTest = function() {
        return $scope.test.type == $scope.testTypesEnum.test||
            $scope.test.type == $scope.testTypesEnum.anonymousTest;
    }

    $scope.deleteTest = function () {
        var r = confirm("Are you absolutely sure you want to delete this test?");
        if (r == false) {
            return;
        }

        if ($scope.test.id == undefined) {
            return;
        } else {
            TestService.deleteTest($scope.test.id)
                .then(function (response) {
                    if (response.data.responseStatus == 'SUCCESS') {
                        $location.path("/home");
                    }
                    else {
                        alert("Something went wrong. Try again later.");
                    }
                },
                function (response) {
                    alert("Something went wrong. Try again later.");
                });
        }
    }

    // Question methods
    $scope.addQuestion = function () {
        $scope.test.questions.push({
            text: null,
            type: $scope.questionTypesEnum.singleChoise,
            points: 0,
            inputType: 'radio',
            answers: []
        });

        $scope.addAnswer($scope.test.questions[$scope.test.questions.length - 1]);
    };

    $scope.deleteQuestion = function (question) {
        var r = confirm("Are you absolutely sure you want to delete this question?");
        if (r == false) {
            return;
        }
        $scope.test.questions.splice($scope.test.questions.indexOf(question), 1);
    };

    $scope.questionTypeChanged = function (question) {
        // rebuild array in order Materialize to process changes
        var temp = question.answers;
        question.answers = [];
        var flag = false;
        var myIsChecked = undefined;

        temp.forEach(function (element) {
            myIsChecked = element.isChecked;

            // make sure only one (first valid in the checkboxes) radio button is selected
            if ($scope.isSingleChoise(question)) {
                if (flag) {
                    myIsChecked = false;
                } else if (myIsChecked) {
                    flag = true;
                }

            }
            question.answers.push({
                id: element.id,
                text: element.text,
                isChecked: myIsChecked,
                correct: element.correct,
                min: element.min,
                max: element.max,
                rangeCorrect: element.rangeCorrect
            });
        });

        if (question.type == $scope.questionTypesEnum.multipleChoise) {
            question.inputType = 'checkbox';
        } else if (question.type == $scope.questionTypesEnum.singleChoise) {
            question.inputType = 'radio';
        }
    };

    $scope.isRange = function (question) {
        return question.type == $scope.questionTypesEnum.range;
    };

    $scope.isText = function (question) {
        return question.type == $scope.questionTypesEnum.text;
    };

    $scope.isSingleChoise = function (question) {
        return question.type == $scope.questionTypesEnum.singleChoise;
    };

    $scope.isMultipleChoise = function (question) {
        return question.type == $scope.questionTypesEnum.multipleChoise;
    };

    $scope.inputType = function (question) {
        if (question.type == $scope.questionTypesEnum.multipleChoise) {
            return 'checkbox';
        } else if (question.type == $scope.questionTypesEnum.singleChoise) {
            return 'radio';
        }
        return '';
    };

    // Answer methods
    $scope.addAnswer = function (question) {
        $scope.test.questions[$scope.test.questions.indexOf(question)].answers.push({
            text: "",
            isChecked: false,
            correct: "",
            min: 0,
            max: 0,
            rangeCorrect: 0
        });
    };

    $scope.deleteAnswer = function (question, answer) {
        var r = confirm("Are you absolutely sure you want to delete this answer?");
        if (r == false) {
            return;
        }
        var questionId = $scope.test.questions.indexOf(question);
        var answerId = $scope.test.questions[questionId].answers.indexOf(answer);
        $scope.test.questions[questionId].answers.splice(answerId, 1);
    };

    $scope.radioChanged = function (answer, question) {
        if (question.type == $scope.questionTypesEnum.singleChoise) {
            //answer.isChecked = true;
            question.answers.forEach(function (a) {
                if (a !== answer) {
                    a.isChecked = false;
                }
            });
        }
    };

}]);
