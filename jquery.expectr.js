var expectr = {
	json : {
		fn: $.getJSON,
		calls: []
	},
	get : {
		fn: $.get,
		calls: []
	},
	post : {
		fn: $.post,
		calls: []
	},
	fnExpectr: function(url, json, delay, fnDef){
		if (fnDef.calls === undefined){
			fnDef.calls = [];
		}
		fnDef.calls[url] = {
			json: json,
			delay: delay
		};
	},
	fnRouter: function(url, options, callback, fnDef){
		if (fnDef.calls === undefined || fnDef.calls[url] == null){
			fnDef.fn(url, options, callback);
			return;
		}
		var _fn;
		if (options != null && options instanceof Function){
			_fn = options;
		}
		if (callback != null && callback instanceof Function){
			_fn = callback;
		}
		if (_fn != null){
			var _delay = 0;
			if (fnDef.calls[url].delay != null && typeof(fnDef.calls[url].delay*1) == "number"){
				_delay = fnDef.calls[url].delay*1;
			}
			setTimeout(function(){
				_fn(fnDef.calls[url].json)
			}, _delay);
		}
	}
};

$.expectJSON = function(url, json, delay){
	expectr.fnExpectr(url, json, delay, expectr.json);
};

$.getJSON = function(url, options, callback){
	expectr.fnRouter(url, options, callback, expectr.json);
};

$.expectGet = function(url, json, delay){
	expectr.fnExpectr(url, json, delay, expectr.get);
};

$.get = function(url, options, callback){
	expectr.fnRouter(url, options, callback, expectr.get);
};

$.expectPost = function(url, json, delay){
	expectr.fnExpectr(url, json, delay, expectr.post);
};

$.post = function(url, options, callback){
	expectr.fnRouter(url, options, callback, expectr.post);
};

