
var Cloud = require('ti.cloud');

exports.query = function(callback){
	var data = [];
	Cloud.Events.query({
			page : 1,
			per_page : 20,
		}, function(e) {
			
			if(e.success) {
				if (e.events.length == 0) {
                   data = [
                        { title: 'No Results!' }
                    ];
                    
                    callback(data);
                } else {
                	
                    for (var i = 0, l = e.events.length; i < l; i++) {
                        data.push({
                            title: e.events[i].name,
                            id: e.events[i].id
                        });
                 
                    }
                    
                    callback(data);
                }
                }
            else {
			 	alert(e);
			}
		});
	}
exports.data = [
			{field:'title', hint:'Title',type:'text', required:true},
	        {field:'description', hint:'Description',type:'text', required:false},
	        {field:'start', hint:'Date & Start Time',type:'picker_date', required:false},
	        {field:'end', hint:'End Time',type:'picker_time', required:false},
	        {field:'location', hint:'Pick a Location',type:'venues',required:false},
	        {field:'artist', hint:'Select an Artist',type:'artists',required:false},
	        {field:'website', hint:'Event Website',type:'text', required:false},
	        {field:'facebook', hint:'Event Facebook Page',type:'text',required:false}
	        
];


exports.create = function(data,callback){
    
    Cloud.Events.create({
    	name : data[0].value,
		start_time : data[2].value.toLocaleString(),
		duration : ((data[3].value.getTime()-data[2].value.getTime())/1000),
		place_id:data[4].id,
		custom_fields:{artist:data[5].id, website:data[6].value,desciption:data[1].value, facebook:data[7].value}
    }, function(e) {
		if(e.success) {
			for(var i = 0; i < e.events.length; i++) {
				callback({status:'success', message:data[0].value +' added!'});
			}
		} else {
			callback({status:'error', message:e.error && e.message});
		}
		
	});
};

