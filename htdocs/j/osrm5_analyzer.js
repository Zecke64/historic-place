//------------------------------------------------------------------------------
//	$Id: osrm5_analyzer.js,v 1.6 2019/07/22 23:08:51 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	https://www.netzwolf.info/ol2/measure_tool_osrm.html
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//
//	OSRM Routing API
//
//	https://github.com/Project-OSRM/osrm-backend/wiki/Server-api
//	https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#service-route
//
//------------------------------------------------------------------------------

/*jsl:option explicit*/

'use strict';

//------------------------------------------------------------------------------
//	OpenLayers.Request adds pointless "X-Requested-With" to "XMLHttpRequest.
//	This additional Header requires Prefligt (Option) per CORS spec.
//	But OSRM-Server does not implement Option.
//------------------------------------------------------------------------------
//	Yes, we are surrounded by idiots.
//------------------------------------------------------------------------------

OpenLayers.Request.issue = function(config) {

	// apply default config - proxy host may have changed
	var defaultConfig = OpenLayers.Util.extend(
		this.DEFAULT_CONFIG,
		{proxy: OpenLayers.ProxyHost}
	);
	config = config || {};
	config.headers = config.headers || {};
	config = OpenLayers.Util.applyDefaults(config, defaultConfig);
	config.headers = OpenLayers.Util.applyDefaults(config.headers, defaultConfig.headers);

	// create request, open, and set headers
	var request = new OpenLayers.Request.XMLHttpRequest();
	var url = OpenLayers.Util.urlAppend(config.url,
		OpenLayers.Util.getParameterString(config.params || {}));
	url = OpenLayers.Request.makeSameOrigin(url, config.proxy);
	request.open(
		config.method, url, config.async, config.user, config.password);
	for(var header in config.headers) {
		request.setRequestHeader(header, config.headers[header]);
	}

	var events = this.events;

	// we want to execute runCallbacks with "this" as the
	// execution scope
	var self = this;

	request.onreadystatechange = function() {
		if(request.readyState == OpenLayers.Request.XMLHttpRequest.DONE) {
			var proceed = events.triggerEvent(
				"complete",
				{request: request, config: config, requestUrl: url}
			);
			if(proceed !== false) {
				self.runCallbacks(
					{request: request, config: config, requestUrl: url}
				);
			}
		}
	};

	// send request (optionally with data) and return
	// call in a timeout for asynchronous requests so the return is
	// available before readyState == 4 for cached docs
	if(config.async === false) {
		request.send(config.data);
	} else {
		window.setTimeout(function(){
			if (request.readyState !== 0) { // W3C: 0-UNSENT
				request.send(config.data);
			}
		}, 0);
	}
	return request;
};

var OSRM_ANALYZER = {

	attribution: 'Routing &#xa9; <a rel="external" target="_blank" href="http://project-osrm.org/">OSRM v5</a>',

	projection: new OpenLayers.Projection('EPSG:4326'),

	baseURL: '//router.project-osrm.org/route/v1/car/',
	showAlternatives: false,

	resultCache: [],
	resultCacheMaxSize: 10,

	analyze: function (lonlats, onSuccess, onFailure) {

		if (lonlats.length<2) {

			onFailure ('Warte auf Ziel...');
			return;
		}

		//--------------------------------------------------------------
		//	prepare url
		//--------------------------------------------------------------

		var points = [];

		for (var i in lonlats) {

			var lonlat = lonlats[i];

			points.push(lonlat.lon + ',' + lonlat.lat);
		}

		var url = this.baseURL + points.join(';') + '?geometries=polyline6' + '&alternatives=' + this.showAlternatives;

		//--------------------------------------------------------------
		//	cache lookup
		//--------------------------------------------------------------

		for (i in this.resultCache) {

			var cacheEntry = this.resultCache[i];
			if (cacheEntry.url != url) continue;

			if (i>0) {
				this.resultCache.splice(i,1);
				this.resultCache.unshift(cacheEntry);
			}

			this.processResult (cacheEntry.result, onSuccess, onFailure);
			return;
		}

		//--------------------------------------------------------------
		//	start request
		//--------------------------------------------------------------

		var control = this;	// closure

		//--------------------------------------------------------------
		//	request from api
		//--------------------------------------------------------------

		OpenLayers.Request.GET({

			async:	true,
			url:	url,

			success: function(request) {

				var result = new OpenLayers.Format.JSON().read(request.responseText);

				//----------------------------------------------
				//	cache result
				//----------------------------------------------

				if ((result.status||200) < 500) {

					control.resultCache.unshift({url:url,result:result});
					control.resultCache.splice(control.resultCacheMaxSize);
				}

				control.processResult (result, onSuccess, onFailure);
			},

			failure: function(request) {

				onFailure ('Status: ' + request.status + '\n' + request.responseText);
			}
		});
	},

	processResult: function (result, onSuccess, onFailure) {

		if (result.status && result.status != 200) {

			onFailure ('OSRM: ' + result.status_message + ' [status ' + result.status + ']');
			return;
		}

		if (result.code != 'Ok') {

			onFailure ('OSRM: code="' +  result.code + '"');
			return;
		}

		var info = null;
		var features = [];

		for (var r=result.routes.length-1; r>=0; r--) {

			var route = result.routes[r];
			var name  = null;
			var header= r>0? 'Alternative ' + r : null;
			var style = r>0? this.alternativeStyle : this.routeStyle;

			info = this.createRouteInfo(route, name, header);

			features.push(this.createRouteFeature(route, info, style));
		}

		onSuccess (info, features);
	},

	routeStyle: {
		strokeColor: 'red',
		strokeWidth: 5,
		strokeOpacity: 0.7,
		graphicZIndex: 3
	},

	alternativeStyle: {
		strokeColor: 'red',
		strokeWidth: 3,
		strokeOpacity: 0.7,
		graphicZIndex: 3
	},

	createRouteInfo: function (route, name, header) {

		var distance= this.formatSummary (route.distance, route.duration);

		var info = [];
		if (header) info.push (header+':');
		if (name) info.push (name.join(', '));
		if (distance) info.push (distance);

		return info.length? info.join('\n') : null;
	},

	formatSummary: function(meters, seconds) {

		var mins = Math.ceil (seconds/60);
		var h_mm = Math.floor(mins/60)+':'+((mins%60/100).toFixed(2)+'').substring(2);
		var km = (meters / 1000).toFixed(2);
		return km + String.fromCharCode(8198) + 'km, ' +
			h_mm + String.fromCharCode(8198) + 'h';
	},

	createRouteFeature: function (route, info, style) {

		var lonLats = this.decodeOSRMGeometry(route.geometry);

		if (info) {

			style=OpenLayers.Util.extend(null, style);
			style.graphicTitle = info;
		}

		var points=[];

		for (var i in lonLats) {

			var p = new OpenLayers.Geometry.Point(lonLats[i][0],lonLats[i][1]);
			points.push(p);
		}

		return new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.LineString(points), null, style);
	},

	decodeOSRMGeometry: function (encoded) {

		var lat=0, lon=0, result=[];

		for (var index=0; index<encoded.length;) {

			var value = 0;

			for (var shift=0;;shift+=5) {

				var digit = encoded.charCodeAt(index) - 63;
				index++;
				value |= (digit & 0x1f) << shift;
				if (digit<0x20) break;
			}

			lat += ((value & 1) ? ~(value >> 1) : (value >> 1));

			value = 0;

			for (shift=0;;shift+=5) {

				digit = encoded.charCodeAt(index) - 63;
				index++;
				value |= (digit & 0x1f) << shift;
				if (digit<0x20) break;
			}

			lon += ((value & 1) ? ~(value >> 1) : (value >> 1));

			result.push([lon * 1e-6, lat * 1e-6]);
		}

		return result;
	}
};

//------------------------------------------------------------------------------
//	$Id: osrm5_analyzer.js,v 1.6 2019/07/22 23:08:51 wolf Exp $
//------------------------------------------------------------------------------
