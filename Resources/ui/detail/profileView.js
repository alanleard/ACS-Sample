var style = require('ui/common/style');

var animate = require('modules/animation');

exports.view = function(model, id){
	var mainView = Ti.UI.createView({height:'fill', width:'fill'});
	
	var bgView = Ti.UI.createView({backgroundColor:'black', opacity:0.8});
	
	var popView = Ti.UI.createView({top:20, bottom:20, left:10, right:10, borderRadius:20, visible:false});

    var content = Ti.UI.createScrollView({
        top: 10,
        contentHeight: 'auto',
        layout: 'vertical'
    });
    
    mainView.add(bgView);
    
    popView.add(content);
	
	mainView.add(popView);
	
	return mainView;
}
