exports.win = function(){
	var formView = require('ui/detail/formView');
	
	var animate = require('modules/animation');
	
	var win = Ti.UI.createWindow({
		title:L('profile'),
		backgroundColor:'white'
	});
	
	var mainView = Ti.UI.createView({backgroundColor:'blue'});
	
	win.add(mainView);
	
	return win;
}
