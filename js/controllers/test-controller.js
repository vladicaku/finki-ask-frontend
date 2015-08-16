angular.module('finkiAsk').controller('TestCtrl', ['$scope', '$filter', 'TestService', '$routeParams',function($scope, $filter, TestService, $routeParams) {
   
    $scope.testTypesEnum = {
        gradedTest: 'GRADEDTEST',
        ungradedTest: 'UNGRADEDTEST',
        survey: 'SURVEY',
        openSurvey: 'OPENSURVEY'
    };
    
    $scope.questionTypesEnum = {
        singleChoise: 'SINGLE',
        multipleChoise: 'MULTIPLE',
        text: 'TEXT',
        range: 'RANGE'
    };
    
    $scope.testTypes = [
        { 
            label: 'Graded Test',
            value: $scope.testTypesEnum.gradedTest
        },
        {
            label: 'Ungraded Test',
            value: $scope.testTypesEnum.ungradedTest
        },
        {
            label: 'Survey',
            value: $scope.testTypesEnum.survey
        },
        {
            label: 'Open Survey',
            value: $scope.testTypesEnum.openSurvey
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
 
    
    $scope.test = {};
    $scope.test.name = 'SimpleTest'; 
    $scope.test.type =  $scope.testTypes[0].value;
    $scope.test.dateCreated =  $filter('date')(new Date(), "dd.MM.yyyy HH:mm");
    $scope.test.start = null; 
    $scope.test.end = null;
    $scope.test.startDate = new Date();
    $scope.test.endDate = new Date();
    $scope.test.startTime = new Date();
    $scope.test.endTime =  new Date();
    $scope.test.duration = null; 
    $scope.test.password = null;
    $scope.test.questions = [];


    var id = $routeParams.id;
    if (id != undefined) {
        $scope.test = TestService.readTest(id);
        $scope.test.questions.forEach(function(question) {
            if (question.type == $scope.questionTypesEnum.range) {
                var text = question.answers[0].text;
                var splited = text.split(":");
                question.answers[0].min = splited[0];
                question.answers[0].max = splited[0];
                question.answers[0].correct = splited[0];
            }
        });
    }
    else {

    }

    
    (function (){
        $scope.test.questions.push({
            text: 'Kade e roden Goce Delev?',
            type: $scope.questionTypes[0].value,
            inputType:  'radio',
            answers: [
                {
                    text: 'Kukus',
                    isCorrect: true
                },
                {
                    text: 'Skopje',
                    isCorrect: false
                }
            ]
        }); 
    })();
    
    
    // Test methods
    
    $scope.isTest = function() {
        return $scope.test.type == $scope.testTypesEnum.gradedTest ||
            $scope.test.type == $scope.testTypesEnum.ungradedTest;
    }


    // Question methods
    
    $scope.addQuestion = function () {
        $scope.test.questions.push({
            text: 'New question', 
            type: $scope.questionTypesEnum.singleChoise, 
            inputType: 'radio',
            answers: []
        });
    };
    
    $scope.deleteQuestion = function (question) {
        $scope.questions.splice($scope.test.questions.indexOf(question), 1);
    };
    
    $scope.questionTypeChanged = function (question) {

        // rebuild array in order Materialize to process changes
        var temp = question.answers;
        question.answers = [];
        temp.forEach(function (element) {
            question.answers.push({
                    id: element.id,
                    text: element.text,
                    isCorrect: element.isCorrect,
                    min: element.min,
                    max: element.max,
                    correct: element.correct // correct for range
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
                text: 'New answer',
                isCorrect: false,
                min: 0,
                max: 0,
                correct: 0  // correct for range
            });
    };
    
    $scope.deleteAnswer = function (question, answer) {
        var questionId = $scope.test.questions.indexOf(question);
        var answerId = $scope.test.questions[questionId].answers.indexOf(answer);
        $scope.test.questions[questionId].answers.splice(answerId, 1);
    };
    
    $scope.radioChanged = function (answer, question) {
        if (question.type == $scope.questionTypesEnum.singleChoise) {
            question.answers.forEach(function (a) {
                    a.isCorrect = "false";
                    //console.log(a.text + " - " + a.isCorrect);
            });
            answer.isCorrect = "true";
        }
    };

    // Submit methods

    $scope.submit = function () {
        // Concatenate date and time into one string
        var date = $filter('date')($scope.test.startDate, "dd.MM.yyyy");
        var time = $filter('date')($scope.test.startTime, "HH:mm");
        $scope.test.start = date + " " + time;

        date = $filter('date')($scope.test.endDate, "dd.MM.yyyy");
        time = $filter('date')($scope.test.endTime, "HH:mm");
        $scope.test.end = date + " " + time;

        // Fix text and range answers
        $scope.test.questions.forEach(function (question) {
            if (question.type == $scope.questionTypesEnum.text) {
               question.answers.splice(1, question.answers.length - 1);
               question.answers[0].isCorrect = true;
            }

            if (question.type == $scope.questionTypesEnum.range) {
                question.answers.splice(1, question.answers.length - 1);
                question.answers[0].text  = question.answers[0].min + ":" + question.answers[0].max + ":" + question.answers[0].correct;
            }
        });

        if ($scope.test.id == undefined) {
            TestService.createTest($scope.test);
        } else {
            TestService.updateTest($scope.test);
        }

    }

    $scope.cancel = function () {

    }
    
    $scope.deleteTest = function () {
        alert("Kurac");
        var r = confirm("Are you absolutely sure you want to delete?");
        if (r == false) {
            return;
        }

        if ($scope.test.id == undefined) {
            return;
        } else {
            return TestService.deleteTest($scope.test.id);
        }

    }

}]);