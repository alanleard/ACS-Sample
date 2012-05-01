/**
 * Animation module
 */

/**
 * Puff an element in
 * @param {Object} tiObject
 * @param {Object} params
 * @example {
 *      scale: 1.1 // default
 *      duration: 250 // default
 *      callback: function // optional
 *      fade: float // What this should fade out to before entire thing fades out
 *      defaultScale: float // The default scale for the object in animation
 * }
 */
exports.puffIn = function(tiObject, params) {
    params = (params) ? params : {};
    var scale = (params.scale) ? params.scale : 1.1,
        puffIn = Ti.UI.create2DMatrix().scale(scale),
   	    a = Ti.UI.createAnimation();

    tiObject.opacity = 0;
	if(!tiObject.visible){
		tiObject.show();
	}
   	a.transform = puffIn;
   	a.duration = (params.duration) ? params.duration : 250;
    a.opacity = params.fade || 1.0;
    tiObject.animate(a);
    a.addEventListener('complete', function() {
        var scaleNormal = Ti.UI.create2DMatrix().scale( params.defaultScale || 1.0);
       	var b = Ti.UI.createAnimation();
       	b.transform = scaleNormal;
       	b.duration = (params.duration) ? params.duration : 250;
        tiObject.animate(b);
        b.addEventListener('complete', function() {
            if(params.callback) { params.callback(); }
        });
    });
};

/**
 * Puff an element out
 * @param {Object} tiObject
 * @param {Object} params
 * @example {
 *      scale: 1.1 // default
 *      duration: 200 // default
 *      callback: function // optional
 *      fade: float // What this should fade out to before entire thing fades out
 *      defaultScale: float // The default scale for the object in animation
 * }
 */
exports.puffOut = function(tiObject, params) {
    params = (params) ? params : {};
    var scale = (params.scale) ? params.scale : 1.03,
        puffOut = Ti.UI.create2DMatrix().scale(scale),
   	    a = Ti.UI.createAnimation();

   	a.transform = puffOut;
   	a.duration = (params.duration) ? params.duration : 200;
    a.opacity = params.fade || 1.0;
    tiObject.animate(a);
    a.addEventListener('complete', function() {
        var scaleNormal = Ti.UI.create2DMatrix().scale(params.defaultScale || 0.9);
       	var b = Ti.UI.createAnimation();
       	b.transform = scaleNormal;
        b.opacity = 0;
       	b.duration = (params.duration) ? params.duration : 200;
        tiObject.animate(b);
        if(tiObject.visible){
		tiObject.hide();
	}
        b.addEventListener('complete', function() {
            if(params.callback) { params.callback(); }
        })
    });
};

/**
 * Fade an element in
 * @param {Object} tiObject
 * @param {Object} params
 * @example {
 *      duration: 250 // default
 *      fade: float // Opacity level when faded in
 * }
 */
exports.fadeIn = function(tiObject, params) {
    params = (params) ? params : {};
    var a = Ti.UI.createAnimation();
	tiObject.opacity = 0;
	if(!tiObject.visible){
		tiObject.show();
	}
    

   	a.duration = (params.duration) ? params.duration : 250;
    a.opacity = params.fade || 1.0;
    tiObject.animate(a);

    if(params.callback) {
        a.addEventListener('complete', params.callback);
    }
};

/**
 * Fade an element out
 * @param {Object} tiObject
 * @param {Object} params
 * @example {
 *      duration: 250 // default
 *      fade: float // What this should fade out to before entire thing fades out
 * }
 */
exports.fadeOut = function(tiObject, params) {
    params = (params) ? params : {};
    var a = Ti.UI.createAnimation();

   	a.duration = (params.duration) ? params.duration : 300;
    a.opacity = 0;
    
    tiObject.animate(a);
    if(tiObject.visible){
		tiObject.hide();
	}

    if(params.callback) {
        a.addEventListener('complete', params.callback);
    }
};

/**
 * Shake an element
 * @param {Object} tiObject
 * @param {Object} params
 * @example {
 *      shakeTimes: 3 // default
 *      duration: 75 // default
 *      offset: 5 // default
 * }
 */
exports.shake = function(tiObject, params) {
    params = params || {};
    var count = (params.shakeTimes) ? params.shakeTimes : 3 ;

    function shakeLeft() {
        if(count) {
            var a = Ti.UI.createAnimation();
           	a.duration = (params.duration) ? params.duration : 75;
            a.left = (params.offset) ? -params.offset : -5;
            tiObject.animate(a);

            a.addEventListener('complete', shakeRight);
            count--;
        } else {
            shakeComplete();
        }
    }
    function shakeRight() {
        var b = Ti.UI.createAnimation();
        b.duration = (params.duration) ? params.duration : 75;
        b.left =  (params.offset) ? -params.offset : 5;
        tiObject.animate(b);

        b.addEventListener('complete', shakeLeft);
    }
    function shakeComplete() {
        var c = Ti.UI.createAnimation();
        c.duration = (params.duration) ? params.duration : 75;
        c.left = 0;
        tiObject.animate(c);
    }

    shakeLeft();
};