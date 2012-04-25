function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'black',
		barColor:'black'
	});
	// var LaunchWindow = require('ui/common/LaunchWindow');
	// self.add(LaunchWindow);
	return self;
};

module.exports = ApplicationWindow;
