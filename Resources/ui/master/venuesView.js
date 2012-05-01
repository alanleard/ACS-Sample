exports.win = function(){
	var listView = require('ui/detail/listView');
	
	var formView = require('ui/detail/formView');
	
	var animate = require('modules/animation');
	
	var addBtn = Ti.UI.createButton({
		title:'Add'
	});
	
	var win = Ti.UI.createWindow({
		title:L('local')+' '+L('venues'),
		backgroundColor:'white',
		rightNavButton:addBtn
	});
	
	var mainView = Ti.UI.createView({height:'fill', width:'fill'});
	
	var list = listView.list('venues');
	
	mainView.add(list);
	
	win.add(mainView);
	
	addBtn.addEventListener('click', function(){
		var form = formView.create('venues', function(e){
			if(e.status == 'success'){
				mainView.remove(form);
				form = null;
				listView.refresh('venues', function(data){
					list.setData(data);
				});
				
			} else {
				mainView.remove(form);
				form = null;
			}
		});
		mainView.add(form);
	});
	
	return win;
}
