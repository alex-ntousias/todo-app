var app = angular.module("todoApp", []);

var todoKey = "TODO";
var active = "";
var completed = "list-group-item-success";

app.controller("TodoCtrl", function($scope) {
    document.addEventListener("deviceready", function() {
        $scope.tasks = loadFromLocalStorage();
        console.log("Device is ready, loaded: " + $scope.tasks);
        $scope.$apply();
    }, false);
    
    $scope.tasks = [];
    $scope.addNewTask = function(newTask) {
        if (newTask) {
            $scope.tasks.push({"text": newTask, "status": active});
            updateLocalStorage($scope.tasks);
            $scope.newTaskTextBox = "";
            $scope.tasks = loadFromLocalStorage();
        } else {
            console.log("Error while adding new task!");
        }
    };
    
    $scope.removeTask = function(taskText) {
        var taskIndex = findTaskIndex(taskText, $scope.tasks);
        
        if (taskIndex != -1) {
            $scope.tasks.splice(taskIndex, 1);
            updateLocalStorage($scope.tasks);
            $scope.tasks = loadFromLocalStorage();
        }
    };
    
    $scope.switchStatus = function(taskText) {
        var taskIndex = findTaskIndex(taskText, $scope.tasks);
        
        if (taskIndex != -1) {
            if ($scope.tasks[taskIndex].status == active) {
                $scope.tasks[taskIndex].status = completed;
            } else {
                $scope.tasks[taskIndex].status = active;
            }
            updateLocalStorage($scope.tasks);
            $scope.tasks = loadFromLocalStorage();
        }
    };
});

function updateLocalStorage(tasks) {
    window.localStorage.setItem(todoKey, JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    var data = window.localStorage.getItem(todoKey);
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

function findTaskIndex(taskText, tasks) {
    var tasksLen = tasks.length;
    for (var i = 0; i < tasksLen; i++) {
        if (tasks[i].text == taskText) {
            return i;
        }
    }
    return -1;
}