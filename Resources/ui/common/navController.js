exports.add = function(e){
	var animate = require('modules/animation');
	
	var formView = require('ui/detail/formView');
	
	var model = require('models/'+e.model);

	var rightBtn = Ti.UI.createButton({
		title:e.rightMain
	});
	
	e.win.setRightNavButton(rightBtn);
	
	var leftBtn = Ti.UI.createButton({
		title:'Refresh'
	});
	
	e.win.setLeftNavButton(leftBtn);
	
	var form = formView.nav(model, function(){
		rightBtn.title = e.rightMain;
		model.query(e.view.children[0]);
	});
	
	e.view.add(form);
	
	rightBtn.addEventListener('click', function(){
		if(rightBtn.title == e.rightBack){
			
			animate.fadeOut(form);
			
			//form.hide();
			rightBtn.title = e.rightMain;
		}else{
			//form.show();
			animate.puffIn(form);
			//var win = Ti.UI.createWindow({modal:true});
			
			//win.add(form);
			
			//win.open();
			
			
			rightBtn.title = e.rightBack;
		}
	});
	
	leftBtn.addEventListener('click', function(){
		e.view.children[0].setData([
            { title: 'Loading, please wait...' }
        ]);
		model.query(e.view.children[0]);
	});

	
}