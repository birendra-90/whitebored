angular.module('wb').controller('Toolbelt', [
  '$tape', '$scope', '$clear', '$pen', '$text',
  function($tape, $scope, $clear, $pen, $text) {
    $scope.replay = $tape.replay
    $scope.clear = $clear.execute

    var activeTool = null;

    function activate(tool) {
      if( activeTool && activeTool.deactivate ) {
        activeTool.deactivate()
      }

      tool.activate()
      activeTool = tool;
    }

    $scope.pen = function(e) {
      activate($pen)
    }

    $scope.text = function(e) {
      activate($text)
    }

    $scope.pen()
  }
])
