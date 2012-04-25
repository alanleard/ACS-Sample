/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */
var Cloud = require('ti.cloud');
Cloud.debug = true;
//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	var windowFunctions = {};
	
	
	function handleOpenWindow(evt) {
	    var target = (evt.row && evt.row.title) || evt.target;
	    if (windowFunctions[target]) {
	        windowFunctions[target](evt);
	    }
	}
	
	// Utility functions for defining windows.
	var u = Ti.Android != undefined ? 'dp' : 0;
	function createWindow() {
	    
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
		return Window;
	}
	function addBackButton(win) {
	    if (Ti.Android) {
	        return 0;
	    }
	    var back = Ti.UI.createButton({
	        title: 'Back',
	        color: '#fff', backgroundColor: '#000',
	        style: 0,
	        top: 0, left: 0, right: 0,
	        height: 40 + u
	    });
	    back.addEventListener('click', function (evt) {
	        win.close();
	    });
	    win.add(back);
	    return 40;
	}
	function createRows(rows) {
	    for (var i = 0, l = rows.length; i < l; i++) {
	        rows[i] = Ti.UI.createTableViewRow({
	            backgroundColor: '#fff',
	            title: rows[i],
	            hasChild: true
	        });
	    }
	    return rows;
	}
	
	function enumerateProperties(container, obj, offset) {
	    for (var key in obj) {
	        if (!obj.hasOwnProperty(key))
	            continue;
	        container.add(Ti.UI.createLabel({
	            text: key + ': ' + obj[key], textAlign: 'left',
	            color: '#000', backgroundColor: '#fff',
	            height: 30 + u, left: offset, right: 20 + u
	        }));
	        if (obj[key].indexOf && obj[key].indexOf('http') >= 0 
	            && (obj[key].indexOf('.jpeg') > 0 || obj[key].indexOf('.jpg') > 0 || obj[key].indexOf('.png') > 0)) {
	            container.add(Ti.UI.createImageView({
	                image: obj[key],
	                height: 120 + u, width: 120 + u,
	                left: offset
	            }));
	        }
	        if (typeof(obj[key]) == 'object') {
	            enumerateProperties(container, obj[key], offset + 20);
	        }
	    }
	}
	
	function error(e) {
	    alert((e.error && e.message) || JSON.stringify(e));
	}

	//determine platform and form factor and render approproate components
	var win = createWindow();
	

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup(win).open();
})();
