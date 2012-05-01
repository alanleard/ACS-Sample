var Cloud = require('ti.cloud');
exports.query = function(callback){
	var data = [];
        Cloud.Places.query(function (e) {
            if (e.success) {
                if (e.places.length == 0) {
                    data = [
                        { title: 'No Results!' }
                    ];
                    callback(data);
                }
                else {
                    var data = [];
                    for (var i = 0, l = e.places.length; i < l; i++) {
                        data.push({
                            title: e.places[i].name,
                            id: e.places[i].id
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
	        {field:'name', hint:'Venue Name',type:'text', required:true},
	        {field:'address', hint:'Address',type:'text', required:false},
	        {field:'city', hint:'City',type:'text', required:false},
	        {field:'state', hint:'State',type:'text', required:false},
	        {field:'zip', hint:'Postal Code',type:'text', required:false},
	        {field:'phone', hint:'Phone Number',type:'text',required:false},
	        {field:'email', hint:'Email Address',type:'text', required:false},
	        {field:'website', hint:'Website',type:'text', required:false},
	        {field:'facebook', hint:'Facebook Link',type:'text',required:false}
	        
	        ]
   
exports.create = function(data, callback){

        Cloud.Places.create({
            name: data[0].value,
            address: data[0].value,
            city: data[0].value,
            state: data[0].value,
            postal_code: data[0].value,
            phone_number:data[0].value,
            website:data[0].value
        }, function (e) {
		    if (e.success) {
		        callback({status:'success', message:data[0].value +' added!'});
		    } else {
		        callback({status:'error', message:e.error && e.message});
		    }
		});
}


