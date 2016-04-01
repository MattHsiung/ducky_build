app.directive('editor', function (Editor, FilesFactory) {
	return {
		templateUrl: '/js/editor/editor.html',
		restrict: 'E',
		scope:{
			streamer: '='
		},
		controller: function ($scope) {

			console.log('inside directive');
			console.log('this is streamer: ',$scope.streamer);

			$scope.directory = [{
			  label: "Ducky",
			  children: [{}]
			}]
			
			FilesFactory.getFiles($scope.streamer).then(function(files){
			  $scope.directory = converter(files);
			})

			// var watch = $firebaseObject(ref.child('files').child(streamer))
			//   .$watch(function(data){load()})

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
			        if(type === $scope.currentFile) {
			          editor.setValue(obj[key].content,1)
			          selectMe = true;
			        }
			        var toPush = {
			          label: type||key,
			          data: obj[key].content || null,
			          selected: selectMe,
			          onSelect: function(branch) {
			              if(branch.data) {
			                $scope.currentFile=branch.label;
			                setEditorData(branch.data, branch.label.split('.'))
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





  
  //--------TEXT-EDITOR CONTROLS---------


			var editor = Editor.editor();
			  	editor.setTheme("ace/theme/monokai");
			  	editor.getSession().setMode("ace/mode/javascript");
			  	editor.$blockScrolling = Infinity
			  	editor.setReadOnly(true);
			  	editor.setShowPrintMargin(false);

			function setEditorData(data, label){
			    var type = label[label.length-1]
			    var syntax={
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
			    editor.getSession().setMode("ace/mode/"+syntax[type]);
			    editor.setValue(data,1)
			}


			$scope.expanded = false;
			$scope.expandWindow = function() {
				$scope.expanded = !$scope.expanded;
			}


		}
	};
});

app.service('Editor', [function () {
	this.editor = () => ace.edit('editor');
}]);