exports.create = function(model, callback){
	var animate = require('modules/animation');
	
	var formModel = require('models/'+model);
	
	var listView = require('ui/detail/listView');
	
	var mainView = Ti.UI.createView({height:'fill', width:'fill'});
	
	var bgView = Ti.UI.createView({backgroundColor:'black', opacity:0.8});
	
	var formView = Ti.UI.createView({top:20, bottom: 20, left:10, right:10});
	
	var popView = Ti.UI.createView({top:20, bottom:20, left:10, right:10, borderRadius:20, visible:false});

    var content = Ti.UI.createScrollView({
        top: 10,
        contentHeight: 'auto',
        layout: 'vertical'
    });
    
    mainView.add(bgView);
    
    formView.add(content);
	
	mainView.add(formView);
	
	mainView.add(popView);
    
    var data = formModel.data;
/////////////////////////////////////////

// 
    // var picker_date = Ti.UI.createPicker({
		  // type:Ti.UI.PICKER_TYPE_DATE_AND_TIME,
		  // minDate:new Date(),
		  // minuteInterval:15
	// });
// 	
	 // var picker_time = Ti.UI.createPicker({
		  // type:Ti.UI.PICKER_TYPE_TIME,
		  // minDate:new Date(),
		  // minuteInterval:15
	// });
// 	
	// datePicker.addEventListener('change', function(){datePicker.value.toLocaleString();});
// 

////////////////////////////////////////
    
    var pop = function(model){
    	var text = Ti.UI.createTextField({
				hintText: data[i].hint,
		        top: 10 , left: 10 , right: 10 ,
		        height: 40 ,
		        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		        required:data[i].required
			});
			fields.push(text);
			content.add(text);
			var field = fields.length;
			text.addEventListener('focus', function(){
				var list = listView.list(model);
				popView.add(list);
				popView.show();
				
				list.addEventListener('click', function(e){
					fields[field-1].value = e.rowData.title;
					popView.hide();
				})
			})
    };
    
    var fields = [];
    
    for(i=0, dLen = data.length;i<dLen; i++){
	    if(data[i].type=='text'){
		    var text = Ti.UI.createTextField({
				hintText: data[i].hint,
		        top: 10 , left: 10 , right: 10 ,
		        height: 40 ,
		        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		        required:data[i].required
			});
			fields.push(text);
			content.add(text);
		} else if (data[i].type == 'picker_date'){
			var picker_date = Ti.UI.createPicker({
			  type:Ti.UI.PICKER_TYPE_DATE_AND_TIME,
			  minDate:new Date(),
			  minuteInterval:15
			});
			fields.push(picker_date);
			content.add(picker_date);
		} else if (data[i].type == 'picker_time'){
			var picker_time = Ti.UI.createPicker({
			  type:Ti.UI.PICKER_TYPE_TIME,
			  minuteInterval:15
			});
			fields.push(picker_time);
			content.add(picker_time);
		} else if (data[i].type == 'artists'){
			 pop('artists');
			
		} else if (data[i].type == 'venues'){
			
			pop('venues');
		}
		
	}
	var button = Ti.UI.createButton({
        title: 'Create',
        top: 10 , left: 10 , right: 10 , bottom: 10 ,
        height: 40 
    });
    content.add(button);
   
   	button.addEventListener('click', function(){
   		
    	for (var i = 0, fLen = fields.length; i < fLen; i++) {
    		
    		if(fields[i].required == true && fields[i].value.length==0){
        		
        		fields[i].borderWidth='3';
        		fields[i].borderColor='red';
        		fields[i].focus();
        		alert('Please enter '+fields[i].hintText);
        		return
        	}
    	}
        button.enabled = false;
        
        formModel.create(fields, function(e){
        	if(e.status == 'success'){
        		alert(e.message);
        		callback({status:'success'});
        	} else {
        		alert(e.message);
        	}
        });
	});
	
	return mainView;
	
}
