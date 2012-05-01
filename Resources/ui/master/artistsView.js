exports.win = function(){
	var listView = require('ui/detail/listView');
	
	var formView = require('ui/detail/formView');
	
	var animate = require('modules/animation');
	
	var addBtn = Ti.UI.createButton({
		title:'Add'
	});
	
	var win = Ti.UI.createWindow({
		title:L('local')+' '+L('artists'),
		backgroundColor:'white',
		rightNavButton:addBtn
	});
	
	var mainView = Ti.UI.createView({height:'fill', width:'fill'});
	
	var list = listView.list('artists');
	
	mainView.add(list);
	
	win.add(mainView);
	
	addBtn.addEventListener('click', function(){
		
			var cancelBtn = Ti.UI.createButton({
				title:'Cancel'
			});
			win.setRightNavButton(cancelBtn);
			
			var form = formView.create('artists', function(e){
			
			if(e.status == 'success'){
				animate.fadeOut(form, 1000);
				mainView.remove(form);
				form = null;
				listView.refresh('artists', function(data){
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
				win.setRightNavButton(addBtn);
			})
			
		
	});
	
	return win;
}