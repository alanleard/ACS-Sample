function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	//var Window = require('ui/common/ApplicationWindow')
	// var artists = require('ui/master/artistsView');
	// var events = require('ui/master/eventsView');
	// var venues = require('ui/master/venuesView');
	//var profile = require('ui/master/profileView');
	var win = require('ui/common/ApplicationWindow');
	// var win1 = events.win(),
		// win2 = artists.win(),
		// win3 = venues.win(),
		// win4 = profile.win();
	var win1 = win('events'),
		win2 = win('artists'),
		win3 = win('venues'),
		win4 = win('profile');
	
	var tab1 = Ti.UI.createTab({
		title: L('events'),
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('artists'),
		icon: '/images/KS_nav_views.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('venues'),
		icon: '/images/KS_nav_views.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	var tab4 = Ti.UI.createTab({
		title: L('profile'),
		icon: '/images/KS_nav_views.png',
		window: win4
	});
	win4.containingTab = tab4;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	
	return self;
};

module.exports = ApplicationTabGroup;
