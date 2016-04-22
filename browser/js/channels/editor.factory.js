app.service('Editor', [function () {
  this.editor = function(){
    return ace.edit('editor');
  }
  this.setEditorData = function(editor, data, label){
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
}])
