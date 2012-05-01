
var Cloud = require('ti.cloud');
exports.data = [
			{field:'first_name', hint:'First Name',type:'text', required:true},
	        {field:'last_name', hint:'Last Name',type:'text', required:false},
	        {field:'email', hint:'Email Address',type:'text', required:true},
	        {field:'password', hint:'Password',type:'password', required:true},
	        {field:'password_confirmation', hint:'Confirm Password',type:'password',required:true},
	        {field:'photo', hint:'Profile Photo',type:'photo',required:false}
	        
];

exports.create = function(data, callback){
	Cloud.Users.create({
	    
	    first_name: data[0].value,
	    last_name: data[1].value,
	    email: data[2].value,
	    password: data[3].value,
	    password_confirmation: data[4].value
	}, function (e) {
	    if (e.success) {
	        //var user = e.users[0];
	       callback({status:'success', message:data[0].value +' added!'});
	    } else {
	        callback({status:'error', message:e.error && e.message});
	    }
	});
	
}

exports.login = function(data, callback){
	Cloud.Users.login({
	    login: data[2].value,
	    password: data[3].value
	}, function (e) {
	    if (e.success) {
	        callback({status:'success', message:'You are now logged in '+e.user[0].first_name +'!'});
	    } else {
	        callback({status:'error', message:'Login Failed\n'+e.error && e.message});
	    }
	});
}  

exports.update = function(data, callback){
	Cloud.Users.update({
	    first_name: data[0].value,
	    last_name: data[1].value,
	    email: data[2].value,
	    password: data[3].value,
	    password_confirmation: data[4].value,

	}, function (e) {
	    if (e.success) {
	        callback({status:'success', message:'Thanks '+e.user[0].first_name +', Your account has been updated.'});
	    } else {
	         callback({status:'error', message:'Update Failed\n'+e.error && e.message});
	    }
	});
}

exports.logout = function(callback){
	Cloud.Users.logout(function (e) {
	    if (e.success) {
	        callback({status:'success', message:'You have been logged out.'});
	    } else {
	        callback({status:'error', message:'Logout Failed\n'+e.error && e.message});
	    }
	});
}

exports.reset = function(data, callback){
	Cloud.Users.requestResetPassword({
	    email: data[2].value
	}, function (e) {
	    if (e.success) {
	        callback({status:'success', message:'Your password has been reset and an email was sent to '+ data[2].value});
	    } else {
	        callback({status:'error', message:'Reset Failed\n'+e.error && e.message});
	    }
	});
}
exports.loggedIn = function(callback){
	var data = [];
	Cloud.Users.showMe(function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        callback({status:'success',id: user.id, first_name:user.first_name, last_name:user.last_name, email:user.email});     
	        
	    } else {
	        callback({status:'error', message:'Not Logged In\n'+e.error && e.message});
	    }
	});
}

exports.search = function(data, callback){
	Cloud.Users.search({
	    //q: 'test'
	}, function (e) {
	    if (e.success) {
	           
	            for (var i = 0, l = e.users.length; i < l; i++) {
                         var user = e.users[i];
                        data.push({
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email:user.email,
                            id:user.id
                        });
                 
                    }
                    
                    callback(data);
	         
	    } else {
	        alert(e);
	    }
	});
}

exports.query = function(callback){
	var data = [];
	Cloud.Users.query({
	    page: 1,
	    per_page: 10,
	    // where: {
	        // age: { '$gt': 28 },
	        // favorite_color: 'blue',
	        // first_name: 'joe'
	    // }
	}, function (e) {
	    if (e.success) {
	    	
	        for (var i = 0, l = e.users.length; i < l; i++) {
                         var user = e.users[i];
                        data.push({
                        	title:user.first_name + ' '+user.last_name,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email:user.email,
                            id:user.id
                        });
                        
                 
                    }
                    
                    callback(data);
	    } else {
	        alert(e);
	    }
	});
}
