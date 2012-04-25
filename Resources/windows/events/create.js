	windowFunctions['Post an Event'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var content = Ti.UI.createScrollView({
        top: offset + u,
        contentHeight: 'auto',
        layout: 'vertical'
    });
    win.add(content);
	
	var view = Ti.UI.createView({
		height:'fill',
		width:'fill',
		backgroundColor:'black',
		opacity:0.8,
		visible:false
	});
	var table = Ti.UI.createTableView({
	    backgroundColor: '#fff',
	    top: 20, bottom: 100,left:20, right:20, borderRadius:20,
	    height:'fill',
	    width:'fill',
	    data: [
	        { title: 'Loading, please wait...' }
	    ],
	    visible:false
	});
	view.add(table);
    var done = Ti.UI.createButton({
    	title:'Done',
    	width:'80%',
    	height:40,
     	bottom:40
    });
    view.add(done);
    win.add(view);
    var title = Ti.UI.createTextField({
        hintText: 'Title',
        top: 10 + u, left: 10 + u, right: 10 + u,
        height: 40 + u,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    content.add(title);
	var startTime = Ti.UI.createTextField({
		hintText: 'Date & Start Time',
        top: 10 + u, left: 10 + u, right: 10 + u,
        height: 40 + u,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	content.add(startTime);
    var startPicker = Ti.UI.createPicker({
	  type:Ti.UI.PICKER_TYPE_DATE_AND_TIME,
	  minDate:new Date(),
	  top:40,
	  minuteInterval:15,
	  visible:false
	});
    view.add(startPicker);
	var dPicker = function(){
		var picker =Ti.UI.createPicker({
		  top:40,
		  visible:false
		});
		picker.selectionIndicator = true;
		
		var column1 = Ti.UI.createPickerColumn();
		
		for(var i=0; i<25; i++){
			var x;
			if(i==0){
				x='Hours'
			} else {
				x=i
			}
		  var row = Ti.UI.createPickerRow({
		    title: ''+x+''
		  });
		  column1.addRow(row);
		}
		
		var column2 = Ti.UI.createPickerColumn();
		var minutes = ['Minutes', '00','15','30','45'];
		for(var i=0, ilen=minutes.length; i<ilen; i++){
		  var row = Ti.UI.createPickerRow({ title: ''+minutes[i]+''});
		  column2.addRow(row);
		}
		
		picker.add([column1,column2]);
		
		return picker;
	}
	var durationPicker = dPicker();
	view.add(durationPicker);
	
    startTime.addEventListener('focus', function(){
    	startPicker.show();
    	view.show();
    	startTime.blur();
    	startPicker.addEventListener('change', function(){});
    	var listener = function(){
    		
    		startTime.value = startPicker.value.toLocaleString();
    		startPicker.hide();
    		view.hide();
    		done.removeEventListener('click', listener);
    	}
    	done.addEventListener('click', listener);
    	
    });
    var duration = Ti.UI.createTextField({
        hintText: 'Duration',
        top: 10 + u, left: 10 + u, right: 10 + u,
        height: 40 + u,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        minutes:0
    });
    content.add(duration);
    
    duration.addEventListener('focus', function(){
    	durationPicker.show();
    	view.show();
    	duration.blur();
    	var durationValue = 0;
    	durationPicker.addEventListener('change', function(e){
    		durationValue = (e.selectedValue[0]*60)+(e.selectedValue[1]*1);
    		durationTime = e.selectedValue[0]+':'+e.selectedValue[1] + ' hour(s)';
    	});
    	var listener = function(){
    		if(durationValue>10){
	    		duration.value = durationTime;
	    		duration.minutes = durationValue;
	    		durationPicker.hide();
	    		view.hide();
	    		done.removeEventListener('click', listener);
    		} else {
    			alert('Please select hours and minutes.');
    		}
    	}
    	done.addEventListener('click', listener);
    	
    });

	var place = Ti.UI.createTextField({
		hintText: 'Pick a Location',
        top: 10 + u, left: 10 + u, right: 10 + u,
        height: 40 + u,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	content.add(place);
	
	var artist = Ti.UI.createTextField({
		hintText: 'Select an Artist',
        top: 10 + u, left: 10 + u, right: 10 + u,
        height: 40 + u,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED, 
        id:0
	});
	content.add(artist);
	artist.addEventListener('focus', function(){
		artist.blur();
		table.show();
		view.show();
		var listener = function(e){
	    	if (e.rowData.id) {
	          
	            artist.value = e.rowData.title;
	            artist.id = e.rowData.id;
	            view.hide();
	            table.hide();
	            table.removeEventListener('click', listener);
	        }
	     }
	    table.addEventListener('click', listener);
	   
		Cloud.Users.query({
		    where: {
		        artist:true
		    }
		}, function (e) {
            if (e.success) {
                if (e.users.length == 0) {
                    table.setData([
                        { title: 'No Results!' }
                    ]);
                }
                else {
                    var data = [];
                    for (var i = 0, l = e.users.length; i < l; i++) {
                        data.push(Ti.UI.createTableViewRow({
                            title: e.users[i].first_name + ' ' + e.users[i].last_name,
                            id: e.users[i].id
                        }));
                    }
                    table.setData(data);
                }
            }
            else {
                error(e);
            }
        });
	});
	place.addEventListener('focus', function(){
		place.blur();
		table.show();
		view.show();
		var listener = function(e){
	    	if (e.rowData.id) {
	          
	            place.value = e.rowData.title;
	            place.id = e.rowData.id;
	            view.hide();
	            table.hide();
	            table.removeEventListener('click', listener);
	        }
	    }
	    table.addEventListener('click', listener);
	   
		Cloud.Places.query(function (e) {
            if (e.success) {
                if (e.places.length == 0) {
                    table.setData([
                        { title: 'No Results!' }
                    ]);
                }
                else {
                    var data = [];
                    for (var i = 0, l = e.places.length; i < l; i++) {
                        data.push(Ti.UI.createTableViewRow({
                            title: e.places[i].name,
                            id: e.places[i].id
                        }));
                    }
                    table.setData(data);
                }
            }
            else {
                error(e);
            }
        });
	});
    var button = Ti.UI.createButton({
        title: 'Create',
        top: 10 + u, left: 10 + u, right: 10 + u, bottom: 10 + u,
        height: 40 + u
    });
    content.add(button);
	
	var fields = [ startTime, duration, title, place, artist ];
    // for (var i = 0; i < fields.length; i++) {
        // fields[i].addEventListener('return', submitForm);
    // }

    function submitForm() {
    	for (var i = 0; i < fields.length; i++) {
    		if(fields[i].length==0){
        		alert('Error:\n Please fill out all fields');
        		return
        	}
    	}
        button.hide();
		var data = {
			start_time : startTime.value.toLocaleString(),
			duration : duration.minutes*60,
			name : title.value,
			place_id:place.id,
			custom_fields:{artist:artist.id}
		};
        Cloud.Events.create(data, function(e) {
			if(e.success) {
				for(var i = 0; i < e.events.length; i++) {
					var event = e.events[i];
					Ti.API.info('id: ' + event.id + ' event: ' + event.name +  ' event details: ' + event.details +  ' event duration: ' + event.duration +  ' updated_at: ' + event.updated_at + ' user: ' + event.user.first_name + ' ' + event.user.last_name);
					title.value = startTime.value = place.value = duration.value = artist.value = '';
					button.show();
				}
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				button.show();
			}
			//next();
		});
		
       
    }

    button.addEventListener('click', submitForm);
    
    win.addEventListener('open', function () {
        //title.focus();
    });
    win.open();
};