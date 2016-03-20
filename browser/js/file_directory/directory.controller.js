//MOVED ALL THIS LOGIC INTO CHANNELSCTRL (channels.controller.js)

// app.controller('AccordionDemoCtrl', function ($scope, $firebaseObject) {

//   //Ace editor Setup
//   var editor = ace.edit('editor' );
//   editor.setTheme("ace/theme/monokai");
//   editor.getSession().setMode("ace/mode/javascript");
//   editor.$blockScrolling = Infinity
//   editor.setReadOnly(true);
//   editor.setShowPrintMargin(false);

//   $scope.oneAtATime = true;

//   $scope.headers = {
//     folder:'<span>folder</span>',
//     file:'<span>file</span>'
//   }

//   var ref = new Firebase('https://ducky.firebaseio.com/users/' + $scope.streamer);

//   $scope.directory = [{
//     label: "Public",
//     children: ["One","Two","Three"],
//     classes: ["special", "blue"]
//   }]

//   var needed;
//   function load(){
//     $firebaseObject(ref).$loaded()
//     .then(function(data){
//       // console.log(converter(data));
//       $scope.directory = converter(data);
//     });
//   }

//   load()

//   var watch = $firebaseObject(ref).$watch(function(data){
//     load()
//   })


//   function converter(obj) {
//     if (obj.content) {
//       return;
//     }
//     else {
//       var final = [];

//       for (var key in obj) {
//         if (obj.hasOwnProperty(key) && String(key).indexOf("$") === -1) {
//           var content= obj[key].content || null
//           var selectMe=false;
//           if(key===$scope.currentFile){
//             editor.setValue(obj[key].content,1)
//             selectMe = true;
//           }
//           final.push({
//             label: key,
//             children: converter(obj[key]),
//             onSelect: function(branch){
//                 if(branch.data) {
//                   console.log(branch)
//                   $scope.currentFile=branch.label
//                   editor.setValue(branch.data,1)
//                 }
//             },
//             data:content,
//             selected:selectMe

//           })
//         }
//       }
//       return final;
//     }
//   }

//   $scope.status = {
//     isFirstOpen: true,
//     isFirstDisabled: false
//   };
// });
// app.controller('DirectoryCtrl', function ($scope, $firebaseObject) {
//   var ref = new Firebase('https://ducky.firebaseio.com/users/jmeeker');

//   $scope.directory = [{
//     label: "Ducky",
//     children: [{}]
//   }]

//   function load(){
//     $firebaseObject(ref).$loaded()
//     .then(function(data){
//       console.log(converter(data));
//       $scope.directory = converter(data);
//     });
//   }

//   var watch = $firebaseObject(ref).$watch(function(data){
//     load()
//   })

//   function converter(obj) {
//     if (obj.content) {
//       return;
//     }
//     else {
//       var final = [];
//       for (var key in obj) {
//         if (obj.hasOwnProperty(key) && String(key).indexOf("$") === -1) {
//           var content = obj[key].content || null
//           if(obj[key].type){
//             var type = key + '.'+ obj[key].type;
//           }
//           var selectMe=false;
//           if(key===$scope.currentFile){
//             editor.setValue(obj[key].content,1)
//             selectMe = true;
//           }
//           final.push({
//             label: type||key,
//             children: converter(obj[key]),
//             onSelect: function(branch){
//                 if(branch.data) {
//                   console.log(branch)
//                   $scope.currentFile=branch.label
//                   editor.setValue(branch.data,1)
//                 }
//             },
//             data:content,
//             selected:selectMe
//           })
//         }
//       }
//       return final;
//     }
//   }
//   load()
// });
