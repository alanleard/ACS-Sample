var style = require('ui/common/style');

var animate = require('modules/animation');

exports.rows = function(e){
	var data = [];
	for (var i = 0, l = e.length; i < l; i++) {
		data.push(
			Ti.UI.createTableViewRow({
				backgroundColor:style.color2,
		        color:style.color3,
		        title:e[i].title,
		        id:e[i].id || null
   		 	})
   		 	
   		);

  	 }
  	 return data;
    
}

exports.list = function(data, view){
	//var model = require('models/'+model);
    
    var table = Ti.UI.createTableView({
        backgroundColor: style.color2,
        top: 0, bottom: 0,
        data:data
    });
    
	// model.query(function(e){
// 		
       // table.setData(rows(e));
	// });

	return table;
}
 
// exports.refresh = function(model, callback){
 	// var model = require('models/'+model);
//  	
 	// model.query(function(e){
//  		
 		// callback(e);
 	// });
// }
