var listView = require('ui/detail/listView');

var style = require('ui/common/style');

var formView = require('ui/detail/formView');

var animate = require('modules/animation');

var profile = require('ui/detail/profileView');

module.exports = function(model){
	
	var modelData = require('models/'+model);
	
	modelData.query(function(e){
		var rows = listView.rows(e);
       list.setData(rows);
	});
	
	var mainView = Ti.UI.createView({height:'fill', width:'fill'});
	
	var list = listView.list(listView.rows([{title:'Loading, please wait...', id:0}]), mainView);
	
	var winTitle = L('local')+' '+L(model);
	
	if (L(model)==L('profile')){
		winTitle = L('profile');
	}
	var win = Ti.UI.createWindow({
		title:winTitle,
		backgroundColor:'white',
		barColor:style.color1,
		color:style.color2
		
	});
	
	mainView.add(list);
	
	win.add(mainView);
	
	var refresh = function(){
		var refreshBtn = Ti.UI.createButton({
			title:'Refresh'
		});
		win.setLeftNavButton(refreshBtn);
		
		refreshBtn.addEventListener('click', function(){
			modelData.query(function(e){
			var rows = listView.rows(e);
	       list.setData(rows);
		});
		});
		
	};
	var cancel = function(view){
		if(Ti.Platform.osname != 'android'){
				var cancelBtn = Ti.UI.createButton({
					title:'Cancel'
				});
				
				win.setRightNavButton(cancelBtn);
				
				cancelBtn.addEventListener('click', function(){
					animate.fadeOut(view, 1000);
					mainView.remove(view);
					view = null;
						
					win.setRightNavButton(addBtn);
					refresh();
					
				})
			}
		
	}
	var add = function(){
			
			
			var form = formView.create(model, function(e){
			
			if(e.status == 'success'){
				animate.fadeOut(form, 1000);
				mainView.remove(form);
				form = null;
				refresh();
				
				
			} else {
				animate.fadeOut(form, 1000);
				mainView.remove(form);
				form = null;
			}
			
			if(Ti.Platform.osname != 'android'){	
					win.setRightNavButton(addBtn);
				}
			});
			cancel(form);
			form.hide();
			mainView.add(form);
			animate.puffIn(form);
			
	}	
	
	if(Ti.Platform.osname == 'android'){				
		var winMenu = win.activity; 
			winMenu.onCreateOptionsMenu = function(x) {
		   
		    var menu = x.menu;
		   
		    var addBtn = menu.add({ title: "Add" });
		    
		    //addBtn.setIcon("appicon.png");
		    
		    addBtn.addEventListener("click", add)
					
		}
	} else {
		refresh();
		var addBtn = Ti.UI.createButton({
			title:'Add'
		});
		win.setRightNavButton(addBtn);
		addBtn.addEventListener('click', add);	
	}
	
	list.addEventListener('click', function(e){
		var pop = profile.view(e.rowData);
		cancel(pop);
		win.add(pop);
		if(Ti.Platform.osname != 'android'){
			var removeBtn = Ti.UI.createButton({
				title:'Remove'
			});
			win.setLeftNavButton(removeBtn);
			
			removeBtn.addEventListener('click', function(){
				
				alert('TO DO:Remove Record');
			})
		}
	})
	
	
		
	
	
	return win;
}
