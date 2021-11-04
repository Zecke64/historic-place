//------------------------------------------------------------------------------
//	$Id: jsonp.js,v 1.2 2016/01/25 17:37:29 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	TODO
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//	If used with OpenLayers, include *after* OpenLayers
//------------------------------------------------------------------------------

if (typeof(OpenLayers)=='undefined') OpenLayers = {};
if (!OpenLayers.Request) OpenLayers.Request = {};

OpenLayers.Request.JSONP = function (config) {

	//----------------------------------------------------------------------
	//	create unique request id
	//----------------------------------------------------------------------

	if (!OpenLayers.Request._jsonp_counter) OpenLayers.Request._jsonp_counter = 0;

	var id = 'JSONP_CALLBACK_' + ++OpenLayers.Request._jsonp_counter;

	//----------------------------------------------------------------------
	//	config defaults
	//----------------------------------------------------------------------

	var onComplete = config.callback|| function(){};
	var onSuccess  = config.success || function(){};
	var onFailure  = config.failure || function(){};
	var scope      = config.scope   || window;
	var timeout    = config.timeout	|| 5000;

	//----------------------------------------------------------------------
	//	prepare url
	//----------------------------------------------------------------------

	var requestUrl = (config.url || '').replace (/#/, id);

	if (config.param) {

		var list = [];

		for (var tag in config.param) {

			var uriTag = encodeURIComponent(tag);

			var value = config.param[tag];

			if (value instanceof Array) {

				for (var i in value) {

					list.push(uriTag + '=' + encodeURIComponent(value[i]));
				}

				continue;
			}

			list.push(uriTag + '=' + encodeURIComponent(value));
		}

		if (list.length) {

			requestUrl += requestUrl.indexOf('?')<0 ? '?' : '&';
			requestUrl += list.join('&');
		}
	}

	//----------------------------------------------------------------------
	//	create request
	//----------------------------------------------------------------------

	var request = {

		id:		id,
		requestUrl:	requestUrl,
		scope:		scope,

		status:		100,
		responseData:	null,
		responseText:	null,
		responseXML:	null,

		abort: function(status) {

			if (this.status != 100) return false;

			if (this.timeoutId) window.clearTimeout(this.timeoutId);
			this.timeoutId = null;
			delete window[this.id];

			var scriptNode = document.getElementById (request.requestId);
			if (scriptNode) scriptNode.parentElement.removeChild (scriptNode);

			this.status = status || -1;

			if (status) {

				onComplete.apply (scope, [request]);

				if (status >= 200 && status <= 299) {

					onSuccess.apply (scope, [request]);
				} else {
					onFailure.apply (scope, [request]);
				}
			}

			return true;
		}
	};

	if (typeof(config.url) != 'string' || config.url.indexOf('#')<0) {

		request.responseText = 'URL does not contain the callback function placeholder "#".';
		request.abort (400);
		return;
	};

	if (config.async === false) {

		request.responseText = 'JSONP does not provide sync requests.';
		request.abort (400);
		return;
	};

	if (config.method && config.method !== 'GET') {

		request.responseText = 'JSONP does only provide GET requests.';
		request.abort (405);
		return;
	};

	//--------------------------------------------------------------
	//	install timeout handler
	//--------------------------------------------------------------

	request.timeoutId = window.setTimeout(function(){

		request.timeoutId = null;
		request.responseText = 'Callback timeout';
		request.abort(504);

	}, timeout);

	//--------------------------------------------------------------
	//	install jsonp response handler
	//--------------------------------------------------------------

	window[request.id] = function (data) {

		request.responseData = data;
		request.responseText = 'JSONP-Response in "responseData"';
		request.abort(200);
	};

	//--------------------------------------------------------------
	//	install <script>
	//--------------------------------------------------------------

	var scriptNode = document.createElement ('script');

	scriptNode.setAttribute('type',  'text/javascript');
	scriptNode.setAttribute('async', 'async');
	scriptNode.setAttribute('id',    request.id);
	scriptNode.setAttribute('src',   request.requestUrl);

	document.getElementsByTagName('BODY')[0].appendChild (scriptNode);
};

//------------------------------------------------------------------------------
//	$Id: jsonp.js,v 1.2 2016/01/25 17:37:29 wolf Exp $
//------------------------------------------------------------------------------
