exports.list = function(model){
	var model = require('models/'+model);
	
	var animate = require('modules/animation');
	
	var table = Ti.UI.createTableView({
        backgroundColor: '#000',
        top: 0, bottom: 0,
        data: [
            { title: 'Loading, please wait...' }
        ]
    });
	
	model.query(function(e){
		var data = [];
		for (var i = 0, l = e.length; i < l; i++) {
                        data.push(Ti.UI.createTableViewRow({
                            title: e[i].title,
                            id: e[i].id,
                            backgroundColor:'#000',
                            color:'#fff'
                        }));
                 
                    }
       table.setData(data);
	});

	return table;
}
 
exports.refresh = function(model, callback){
 	var model = require('models/'+model);
 	
 	model.query(function(e){
 		callback(e)
 	});
}
