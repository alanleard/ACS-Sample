function ApplicationTabGroup() {
	//create module instance
	
	
	
	
	// Include the window hierarchy.
	Ti.include(
	    'windows/chats/table.js',
	    'windows/checkins/table.js',
	    'windows/clients/table.js',
	    'windows/customObjects/table.js',
	    'windows/emails/table.js',
	    'windows/photoCollections/table.js',
	    'windows/photos/table.js',
	    'windows/places/table.js',
	    'windows/users/table.js',
	    'windows/reviews/table.js',
	    'windows/posts/table.js',
	    'windows/social/table.js',
	    'windows/events/table.js',
	    'windows/status/table.js',
	    'windows/pushNotifications/table.js',
	    'windows/artists/table.js'
	);
	
	// Define our main window.
	var table1 = Ti.UI.createTableView({
	    backgroundColor: '#fff',
	    data: createRows([
	        'List Events',
	        'Post an Event'
	        
	    ])
	});
	table1.addEventListener('click', handleOpenWindow);
	
	var table2 = Ti.UI.createTableView({
	    backgroundColor: '#fff',
	    data: createRows([
	        'List Artists',
	        'Get Listed'
	    ])
	});
	table2.addEventListener('click', handleOpenWindow);
	
	var table3 = Ti.UI.createTableView({
	    backgroundColor: '#fff',
	    data: createRows([
	        'List Venues',
	        'Add a Venue',
	        'Checkin'
	    ])
	});
	table3.addEventListener('click', handleOpenWindow);
	
	var table4 = Ti.UI.createTableView({
	    backgroundColor: '#fff',
	    data: createRows([
	        'Users',
	        'Checkins',
	        'Photo Collections',
	        'Photos',
	        'Push Notifications',
	        'Status'
	    ])
	});
	table4.addEventListener('click', handleOpenWindow);
	
	var table5 = Ti.UI.createTableView({
	    backgroundColor: '#fff',
	    data: createRows([
	        'Users',
	        'Chats',
	        'Checkins',
	        'Photo Collections',
	        'Photos',
	        'Places',
	        'Posts',
	        'Push Notifications',
	        'Reviews',
	        'Social',
	        'Status'
	    ])
	});
	table5.addEventListener('click', handleOpenWindow);
	
	
	var self = Ti.UI.createTabGroup();
	
	var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	var Window;
		if (isTablet) {
			Window = require('ui/tablet/ApplicationWindow');
		}
		else {
			// iPhone makes use of the platform-specific navigation controller,
			// all other platforms follow a similar UI pattern
			if (osname === 'iphone') {
				Window = require('ui/handheld/ios/ApplicationWindow');
			}
			else {
				Window = require('ui/handheld/android/ApplicationWindow');
			}
		}
	//create app tabs
	var win1 = new Window(L('local')+' '+L('events')),
		win2 = new Window(L('local')+' '+L('artists')),
		win3 = new Window(L('local')+' '+L('venues')),
		win4 = new Window(L('profile'));
		win5 = new Window(L('settings'));
	win1.add(table1);
	win2.add(table2);
	win3.add(table3);
	win4.add(table4);
	win5.add(table5);
	
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
	
	var tab5 = Ti.UI.createTab({
		title: L('settings'),
		icon: '/images/KS_nav_views.png',
		window: win5
	});
	win5.containingTab = tab5;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	self.addTab(tab5);
	
var Storekit = require('ti.storekit');
var tempPurchasedStore = {};

if (!Storekit.canMakePayments){
    alert('This device cannot make purchases!');
   }
function markProductAsPurchased(identifier) {
    Ti.API.info('Marking as purchased: ' + identifier);
    // Store it in an object for immediate retrieval.
    tempPurchasedStore[identifier] = true;
    // And in to Ti.App.Properties for persistent storage.
    Ti.App.Properties.setBool('Purchased-' + identifier, true);
}

function requestProduct(identifier, success) {
   // showLoading();
    Storekit.requestProducts([identifier], function (evt) {
        //hideLoading();
        if (!evt.success) {
            alert('ERROR: We failed to talk to Apple!');
        }
        else if (evt.invalid) {
            alert('ERROR: We requested an invalid product!');
        }
        else {
            success(evt.products[0]);
        }
    });
}

function purchaseProduct(product, table) {
   // showLoading();
    Storekit.purchase(product, function (evt) {
        //hideLoading();
        switch (evt.state) {
            case Storekit.FAILED:
                alert('ERROR: Buying failed!');
                break;
            case Storekit.PURCHASED:
            case Storekit.RESTORED:
                alert('Thanks!\nYou purchased '+product.description);
                
                table.appendRow(createRows([ product.title]));
                
                
                table.selectRow(table.data[0].rowCount)
                table.addEventListener('click', function(e){
					if(e.rowData.title == product.title){
					alert('Purchase has been used.');
					table.deleteRow(e.index);} 
					else {handleOpenWindow(e)};
				});
                markProductAsPurchased(product.identifier);
                break;
        }
    });
}


requestProduct('VenueDeal1', function (product) {
    var buy = Ti.UI.createButton({
        title: 'Purchase ' + product.title + ', ' + product.formattedPrice,
        bottom: 40, left: 5, right: 5, height: 40
    });
    buy.addEventListener('click', function () {
        purchaseProduct(product, table3);
    });
    win3.add(buy);
});

requestProduct('ArtistWork5', function (product) {
    var buy = Ti.UI.createButton({
        title: product.title + ' for ' + product.formattedPrice,
        bottom: 40, left: 5, right: 5, height: 40
    });
    buy.addEventListener('click', function () {
        purchaseProduct(product, table2);
    });
    win2.add(buy);
});
  
	
	
	return self;

};

module.exports = ApplicationTabGroup;
