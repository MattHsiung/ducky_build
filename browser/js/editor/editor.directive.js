app.directive('editor', function (Editor, FilesFactory) {
	return {
		templateUrl: '/js/editor/editor.html',
		restrict: 'E',
		scope:{
			streamer: '=',
			loading: '='
		},
		controller: function ($scope) {
			console.log('this is streamer: ',$scope.streamer);
			// INITIALIZE DIRECTORY DATA
			$scope.directory = [{
			  label: "Ducky",
			  children: [{}]
			}]

			// LOAD FILES AND WATCH FOR CHANGES
			FilesFactory.getFiles($scope.streamer)
    		.$watch((data)=>{
    			FilesFactory.getFiles($scope.streamer).$loaded(function(files){
				  $scope.directory = converter(files);
				})
    		})

			function checkForDots(key, type){
			  var arr = key.split(",")
			  if(arr.length>1) arr = arr.join('.')
			  else arr = arr.join('')
			  return arr + '.'+ type
			}

			function converter(obj) {
			  // console.log(obj)
			  if (!obj.content) {
			    var final = [];
			    angular.forEach(obj, function(value, key) {
			      if (obj.hasOwnProperty(key)) {
			        var selectMe=false;
			        var type=null;
			        //parse file name
			        if(obj[key].type){
			          type = checkForDots(key, obj[key].type);
			        }
			        //check for selected file upon refresh
			        if($scope.currentFile){
				        if(type === $scope.currentFile.label) {
				          editor.setValue(obj[key].content,1)
				          selectMe = true;
				        }
			        }
			        var toPush = {
			          label: type||key,
			          data: obj[key].content || null,
			          selected: selectMe,
			          onSelect: function(branch) {
			              if(branch.data) {
			                $scope.currentFile=branch;
			                Editor.setEditorData(branch.data, branch.label.split('.'), editor)
			              }
			          }
			        }
			        toPush.children = type ? null : converter(obj[key]);
			        final.push(toPush);
			      }
			    })
			    $scope.loading = false;
			    return final;
			  }
			}
  			//--------TEXT-EDITOR---------

			var editor = Editor.editor();
			  	editor.setTheme("ace/theme/monokai");
			  	editor.getSession().setMode("ace/mode/javascript");
			  	editor.$blockScrolling = Infinity
			  	editor.setReadOnly(true);
			  	editor.setShowPrintMargin(false);

			$scope.expanded = false;
			$scope.expandWindow = function() {
				$scope.expanded = !$scope.expanded;
			}
		}
	};
});

app.service('Editor', [function () {
	this.editor = () => ace.edit('editor');
	this.syntax={
    	'js':'javascript',
    	'html':'html',
    	'css':'css',
    	'json':'json',
    	'php':'php',
    	'txt':'text',
    	'swift':'swift',
    	'scss':'scss',
    	'ruby':'ruby',
    	'md':'markdown'
    }
	this.setEditorData = function (data, label, editor){
	    var type = label[label.length-1]
	    editor.getSession().setMode("ace/mode/"+this.syntax[type]);
	    editor.setValue(data,1)
	}
}]);