
var Cloud = require('ti.cloud');

exports.query = function(callback){
	var data = [];
	Cloud.Objects.query({
	    classname: 'artist',
	    page: 1,
	    per_page: 10,
	    
	}, function (e) {
	   if (e.success) {
                if (e.artist.length == 0) {
                    data = [
                        { title: 'No Results!' }
                    ];
                    callback(data);
                }
                else {
                    
                    for (var i = 0, l = e.artist.length; i < l; i++) {
                        data.push({
                            title: e.artist[i].name,
                            id: e.artist[i].id
                        });
                    }
                   callback(data);
                }
	    } else {
	         alert(e);
	    }
	});
	
	
	// Cloud.Users.query({
		    // page: 1,
		    // per_page: 10,
		    // where: {
		        // admin:true
// 		        
		    // }
		// }, function (e) {
            // if (e.success) {
                // if (e.users.length == 0) {
                    // table.setData([
                        // { title: 'No Results!' }
                    // ]);
                // }
                // else {
                    // var data = [];
                    // for (var i = 0, l = e.users.length; i < l; i++) {
                        // data.push(Ti.UI.createTableViewRow({
                            // title: e.users[i].first_name + ' ' + e.users[i].last_name,
                            // id: e.users[i].id
                        // }));
                    // }
                    // table.setData(data);
                // }
            // }
            // else {
                // error(e);
            // }
        // });

};

exports.data = [
	        {field:'name', hint:'Artist Name',type:'text', required:true},
	        {field:'description', hint:'Description',type:'text', required:false},
	        {field:'email', hint:'Email Address',type:'text', required:false},
	        {field:'website', hint:'Website',type:'text', required:false},
	        {field:'facebook', hint:'Facebook Link',type:'text',required:false},
	        {field:'itunes', hint:'iTunes Link',type:'text',required:false},
	        {field:'phone', hint:'Phone Number',type:'text',required:false}
	        ]
	
exports.create = function(data, callback){
	
  Cloud.Objects.create({
	    classname: 'artist',
	    fields: {
	        name: data[0].value,
	        description: data[1].value,
	        website: data[2].value,
	        facebook: data[3].value,
	        itunes:data[4].value,
	        phone:data[5].value
	        
	    }
		}, function (e) {
		    if (e.success) {
		        callback({status:'success', message:data[0].value +' added!'});
		    } else {
		        callback({status:'error', message:e.error && e.message});
		    }
		});

};

