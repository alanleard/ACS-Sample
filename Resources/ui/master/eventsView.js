exports.win = function(){
	var listView = require('ui/detail/listView');
	
	var formView = require('ui/detail/formView');
	
	var animate = require('modules/animation');
	
	
	
	var win = Ti.UI.createWindow({
		title:L('local')+' '+L('events'),
		backgroundColor:'white'
		
	});
	
	var mainView = Ti.UI.createView({height:'fill', width:'fill'});
	
	var list = listView.list('events');
	
	mainView.add(list);
	
	win.add(mainView);
	
	var add = function(){
		
			var cancelBtn = Ti.UI.createButton({
				title:'Cancel'
			});
			if(Ti.Platform.osname != 'android'){	
				win.setRightNavButton(cancelBtn);
			}
			var form = formView.create('events', function(e){
			
			if(e.status == 'success'){
				animate.fadeOut(form, 1000);
				mainView.remove(form);
				form = null;
				listView.refresh('events', function(data){
					list.setData(data);
				});
				
			} else {
				animate.fadeOut(form, 1000);
				mainView.remove(form);
				form = null;
			}
			});
			form.hide();
			mainView.add(form);
			animate.puffIn(form);
			
			cancelBtn.addEventListener('click', function(){
				animate.fadeOut(form, 1000);
				mainView.remove(form);
				form = null;
				if(Ti.Platform.osname != 'android'){	
					win.setRightNavButton(addBtn);
				}
			})
	}	
	
	if(Ti.Platform.osname == 'android'){				
		var winMenu = win.activity; 
			winMenu.onCreateOptionsMenu = function(x) {
		   
		    var menu = x.menu;
		   
		    var addBtn = menu.add({ title: "Add" });
		    
		    addBtn.setIcon("appicon.png");
		    
		    addBtn.addEventListener("click", add)
					
		}
	} else {
		var addBtn = Ti.UI.createButton({
			title:'Add'
		});
		win.setRightNavButton(addBtn)
		addBtn.addEventListener('click', add);	
	}
	
	
	
		
	
	
	return win;
}
