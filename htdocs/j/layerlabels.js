//------------------------------------------------------------------------------
//	$Id: layerlabels.js,v 1.19 2017/10/21 11:05:48 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	//www.netzwolf.info/ol2/labellayer.htm
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//	Layer.Labels
//------------------------------------------------------------------------------

OpenLayers.Layer.Labels = OpenLayers.Class(OpenLayers.Layer.Markers, {

	lang:    null,
	minZoom: 0,
	maxZoom: 0,
	useMercatorZoom: false,
	XXXdisplacementFactor: 0,
	enableStretching: false,
	enableRotation: false,

	defaultMarkerStyle: {

		fontFamily: 'Serif',
		color: 'black'
	},

	defaultMarkerOptions: {

		fontSizeFactor:	0.25,
		minFontSize:	5,
		maxFontSize:	60,
		minOpacity:	1.0,
		maxOpacity:	1.0,
		opacityStep:	0.25,
		opacityBase:	20
	},

	defaultMarkerOpacity: function (fontSize, markerOptions) {

		markerOptions = markerOptions || {};

		var min  = markerOptions.minOpacity  || this.defaultMarkerOptions.minOpacity;
		var max  = markerOptions.maxOpacity  || this.defaultMarkerOptions.maxOpacity;

		if (min==max) return min;

		var step = markerOptions.opacityStep || this.defaultMarkerOptions.opacityStep;
		var base = markerOptions.opacityBase || this.defaultMarkerOptions.opacityBase;

		var log = Math.log (fontSize / base) / Math.log(2);
		var opacity = Math.max (min, max - Math.max (0, step * log));

		return opacity;
	},

	defaultBaseline:	0.8,

	probeFontSize:		100,
	nPixelsZoom0:		256,	// defined by map

	//----------------------------------------------------------------------
	//	opacity
	//----------------------------------------------------------------------

	setOpacity: function(opacity) {

		this.div.style.opacity = opacity;
	},

	//----------------------------------------------------------------------
	//	display on/of controlled by visibility and zoom
	//----------------------------------------------------------------------

	display: function(display) {

		if (this.map.zoom < this.minZoom) display = false;
		if (this.maxZoom && this.map.zoom > this.maxZoom) display = false;

        	this.div.style.display = display ? "" : "none";
	},

	//----------------------------------------------------------------------
	//	draw marker
	//----------------------------------------------------------------------

	addMarker: function(marker) {

		this.markers.push(marker);

		if (this.map && this.map.getExtent()) {

			marker.map = this.map;
			this.drawMarker(marker);
		}
	},

	//----------------------------------------------------------------------
	//	draw marker
	//----------------------------------------------------------------------

	drawMarker: function(marker) {

		//--------------------------------------------------------------
		//	position
		//--------------------------------------------------------------

		var px = this.map.getLayerPxFromLonLat(marker.lonlat);
		if (px == null) {

			if (marker.div) marker.div.style.display = 'none';
			return;
		}

		//--------------------------------------------------------------
		//	measure marker size (possible only if layer visible)
		//--------------------------------------------------------------

		if (this.div.style.display=='none') return null;

		if (!marker.div) {

			//------------------------------------------------------
			//	create div with style and content
			//------------------------------------------------------

			var div = OpenLayers.Util.createDiv();

			div.style.whiteSpace = 'nowrap';
			div.style.textAlign  = 'center';

			if (marker.style) for (var tag in marker.style) {

				div.style[tag] = marker.style[tag];
			}

			div.style.position = 'absolute';
			div.style.opacity  = 0.01;
			div.style.fontSize = this.probeFontSize + 'px';

			div.appendChild (document.createTextNode(marker.name));

			this.div.appendChild(div);

			var scale = Math.min(marker.shape.width / div.clientWidth,
				marker.shape.height / div.clientHeight);

			//------------------------------------------------------
			//	get baseline position
			//------------------------------------------------------

			var img = document.createElement('img');
			img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw';
			img.style.display = 'inline-block';

			div.appendChild (img);
			marker.baseline = (img.getBoundingClientRect()||{top:0}).top / div.clientHeight
				|| this.defaultBaseline;
			div.removeChild (img);

			//------------------------------------------------------
			//	wordwrap
			//------------------------------------------------------

			var wrappedName = this.breakLine(marker.name);

			//------------------------------------------------------
			//	best fit: wrap
			//------------------------------------------------------

			if (wrappedName != marker.name) {

				var div2 = OpenLayers.Util.createDiv();
				div2.style.cssText = div.style.cssText;

				var words = wrappedName.split('\n');
				for (var w in words) {

					if (w>0) div2.appendChild(document.createElement('br'));
					div2.appendChild (document.createTextNode(words[w]));
				}

				this.div.appendChild(div2);

				var scale2 = Math.min(marker.shape.width / div2.clientWidth,
					marker.shape.height / div2.clientHeight);

				if (scale2 > scale) {

					this.div.removeChild(div);
					div   = div2;
					scale = scale2;
				} else {
					this.div.removeChild(div2);
				}
			}

			//------------------------------------------------------
			//	best fit: stretch
			//------------------------------------------------------

			if (this.enableStretching && marker.shape.width / marker.shape.height >= 2.4) {

				var div2 = OpenLayers.Util.createDiv();
				div2.style.cssText = div.style.cssText;

				var stretchedName = marker.name.split('').join('\xa0');

				div2.appendChild (document.createTextNode(stretchedName));

				this.div.appendChild(div2);

				var scale2 = Math.min(marker.shape.width / div2.clientWidth,
					marker.shape.height / div2.clientHeight);

				if (scale2 >= scale) {

					this.div.removeChild(div);
					div   = div2;
					scale = scale2;
				} else {
					this.div.removeChild(div2);
				}
			}

			//------------------------------------------------------
			//	set base fontsize
			//------------------------------------------------------

			marker.div = div;
			marker.fontSizeZoom0 = Math.min (scale * this.nPixelsZoom0 * this.probeFontSize,
				marker.shape.size * this.nPixelsZoom0 *
				(marker.options.fontSizeFactor || this.defaultMarkerOptions.fontSizeFactor));

			//------------------------------------------------------
			// Dirty hack, weil Hohlfont nur für Latin1 verfügbar
			//------------------------------------------------------

			if (marker.options.lightColor && !marker.name.match(/^[\x20-\x7e]*$/)) {

				marker.div.style.color=marker.options.lightColor;
			}
		}

		if (marker.title) marker.div.title = marker.title;

		//--------------------------------------------------------------
		//	size
		//--------------------------------------------------------------

		var zoomScale = Math.pow (2, this.map.zoom);

		var fontSize = Math.min (marker.fontSizeZoom0 * zoomScale,
				marker.options.maxFontSize || this.defaultMarkerOptions.maxFontSize);

		if (fontSize < (marker.options.minFontSize || this.defaultMarkerOptions.minFontSize)) {

			marker.div.style.display = 'none';
			return;
		}

		marker.div.style.fontSize = fontSize + 'px';

		//--------------------------------------------------------------
		//	size → opacity
		//--------------------------------------------------------------

		var opacity = marker.options.opacity || this.defaultMarkerOpacity;

		if (typeof(opacity)=='function') opacity = opacity.apply(this, [fontSize, marker.options]);

		marker.div.style.opacity = opacity;

		//--------------------------------------------------------------
		//	position
		//--------------------------------------------------------------

		marker.div.style.top  = px.y + 'px';
		marker.div.style.left = px.x + 'px';

		//--------------------------------------------------------------
		//	rotation and displacement
		//--------------------------------------------------------------

		var height = marker.shape.height * this.nPixelsZoom0 * zoomScale;
		var displacement = this.XXXdisplacementFactor * height * marker.shape.curvature;

		var transformation = 'translate(-50%,-50%) rotate(' + (-marker.shape.rotation) + 'deg) translate(0,' + displacement + 'px)';

		marker.div.style.transform = transformation;
		marker.div.style['-webkit-transform'] = transformation;

		//--------------------------------------------------------------
		//	make visible
		//--------------------------------------------------------------

		marker.div.style.display = '';
	},

	//----------------------------------------------------------------------
	//	remove marker
	//----------------------------------------------------------------------

	removeMarker: function(marker) {

		OpenLayers.Util.removeItem(this.markers, marker);

		if ((marker.div != null) && (marker.div.parentNode==this.div)) {

			this.div.removeChild(marker.div);
			marker.div = false;
		}
	},

	//----------------------------------------------------------------------
	//
	//	Auxiliary methods
	//
	//----------------------------------------------------------------------

	//----------------------------------------------------------------------
	//	loader
	//----------------------------------------------------------------------

	loadCSV: function (url, options) {

		OpenLayers.Request.GET({

			url: url,

			async: !(options.async === false),

			success: function(request) {

				this.processCSV (request.responseText, options);
			},

			failure: function(request) {

				alert ('Failure loading "' + url + '".');
			},

			scope: this
		});
	},

	//----------------------------------------------------------------------
	//	parse csv and add entries to layer
	//----------------------------------------------------------------------

	lambda: function (f, arg) {

		return typeof(f) == 'function' ? f(arg) : f;
	},

	processCSV: function (csvText, options) {

		var filter        = options.filter        || function() { return true; };
		var markerStyle   = options.markerStyle   || this.defaultStyle;
		var markerOptions = options.markerOptions || this.defaultMarkerOptions;

		//--------------------------------------------------------------
		//	parse csv into array of hashes
		//--------------------------------------------------------------

		var objects = this.parseCSV(csvText);
		if (!objects || !objects.length) return;

		//--------------------------------------------------------------
		//	name fields
		//--------------------------------------------------------------

		var nameFields = this.nameFieldsFromLanguageCode (this.lang);

		//--------------------------------------------------------------
		//	process objects
		//--------------------------------------------------------------

		for (var o in objects) {

			var data = objects[o];

			//------------------------------------------------------
			//	filter
			//------------------------------------------------------

			if (!filter(data)) continue;

			//------------------------------------------------------
			//	shapeinfo
			//------------------------------------------------------

			var shapeInfoText = data['~shape'];
			if (!shapeInfoText) continue;

			var shapeInfos = shapeInfoText.split(':');

			//------------------------------------------------------
			//	name
			//------------------------------------------------------

			var name = null;

			for (var n in nameFields) {

				name = data[nameFields[n]];
				if (name) break;
			}
			if (!name) continue;

			//------------------------------------------------------
			//	marker style
			//------------------------------------------------------

			var mStyle   = this.lambda (markerStyle, data);

			//------------------------------------------------------
			//	marker options
			//------------------------------------------------------

			var mOptions = this.lambda (markerOptions, data);

			//------------------------------------------------------
			//	iterate
			//------------------------------------------------------

			for (var s in shapeInfos) {

				var shapeInfo = shapeInfos[s];

				//----------------------------------------------
				//	lonlat
				//----------------------------------------------

				var lonlat = this.getLonLatFromShapeInfo(shapeInfo, this.map);
				if (!lonlat) continue;

				//----------------------------------------------
				//	shape
				//----------------------------------------------

				var shape = this.getShapeFromShapeInfo(shapeInfo);
				if (!shape) continue;

				//----------------------------------------------
				//	create and add marker
				//----------------------------------------------

				var marker = new OpenLayers.Marker.Label (
					lonlat, name, shape, mStyle, mOptions, data.id);

				this.addMarker (marker);
			}
		}
	},

	//----------------------------------------------------------------------
	//	wordwrap
	//----------------------------------------------------------------------

	breakLine: function (s) {

		var m = Math.floor (s.length/2);
		var b;

		for (var i=0; i<m; i++) {

			b = this.tryBreakAt(s, m+i);
			if (b) return b;

			b = this.tryBreakAt (s, m-i-1);
			if (b) return b;
		}

		if (s.indexOf('gebirge')>=0) return s.replace('gebirge','-\ngebirge');
		if (s.indexOf('gruppe' )>=0) return s.replace('gruppe','-\ngruppe');
		if (s.indexOf('kamm'   )>=0) return s.replace('kamm','-\nkamm');
		if (s.indexOf('stock'  )>=0) return s.replace('stock','-\nstock');

		return s;
	},

	tryBreakAt: function (s, pos) {

		switch (s.substring(pos, pos+1)) {

		case ' ':
			return s.substring(0, pos) + '\n' + s.substring(pos+1);

		case '-':
			return s.substring(0, pos) + '-\n' + s.substring(pos+1);

		case '/':
			return s.substring(0, pos) + '/\n' + s.substring(pos+1);
		}

		return null;
	},

	//----------------------------------------------------------------------
	//	CSV
	//----------------------------------------------------------------------

	parseCSV: function (text, options) {

		options = options || {};

		var fieldSeparator = options.fieldSeparator || '\t';
		var sourceURL      = options.sourceURL      || 'Result';
		var minNColumns    = options.minNColumns    || 2;

		var lines=this.trim(text).split('\n');

		var names = this.trim(lines.shift()).split(fieldSeparator);
		if (names.length<minNColumns) {

			alert (sourceURL + ' is not a CSV file');
			return [];
		}

		var result=[];

		while (lines.length) {

			var values = this.trim(lines.shift()).split(fieldSeparator);

			if (values.length < minNColumns) { continue; }

			var object = {};

			for (var col=0; col<names.length; col++) {

				object[names[col]] = values[col];
			}

			for (var col=names.length; col<values.length; col++) {

				var tagval = values[col];
				var pos    = tagval.indexOf('=');

				if (pos<1 || pos >= tagval.length-1) continue;

				var name = tagval.substring(0, pos);

				if (object[name]) continue;

				object[name] = tagval.substring(pos + 1);
			}

			result.push(object);
		}

		return result;
	},

	trim: function (s) {

		return s ? s.replace(/^\s+/,'').replace(/\s+$/,'') : '';
	},

	//----------------------------------------------------------------------
	//	name fields
	//----------------------------------------------------------------------

	nameFieldsFromLanguageCode: function (lang) {

		var names = [];

		if (lang instanceof Array) {

			for (var l in lang) {

				names.push('name:' + lang[l]);
			}

		} else if (typeof(lang)=='string') {

			names.push('name:' + lang);
		}

		names.push('name');

		return names;
	},

	//----------------------------------------------------------------------
	//	shape info
	//----------------------------------------------------------------------

	getLonLatFromShapeInfo: function (shapeInfo, map) {

		var s = shapeInfo.split(',');

		var lon = parseFloat(s[0]);
		var lat = parseFloat(s[1]);

		return new OpenLayers.LonLat(lon,lat).
			transform(map.displayProjection,
				map.getProjectionObject());
	},

	getShapeFromShapeInfo: function (shapeInfo) {

		var s = shapeInfo.split(',');

		var sizeKm2      = parseFloat(s[2]);
		var aspectRatio  = parseFloat(s[3]);
		var rotation     = parseFloat(s[4]);
		var curvature    = parseFloat(s[5]);

		if (isNaN(aspectRatio)) return false; 	// XXX

		var squareLength = Math.sqrt (sizeKm2) / 40000;
		var factor       = Math.sqrt (aspectRatio);
		var size         = squareLength;

		var lat = parseFloat(s[1]);
		var cosLat = Math.cos(lat * Math.PI / 180.0);
		squareLength /= cosLat;

		if (this.useMercatorZoom) size /= cosLat;

		return {
			size:        size,
			width:       squareLength * factor,
			height:      squareLength / factor,
			rotation:    rotation,
			curvature:   curvature
		};
	},

	CLASS_NAME: 'OpenLayers.Layer.Labels'
});

//------------------------------------------------------------------------------
//	Marker.Label
//------------------------------------------------------------------------------

OpenLayers.Marker.Label = OpenLayers.Class(OpenLayers.Marker, {

	lonlat:   null,
	name:     null,
	shape:    null,
	options:  null,
	style:    null,

	div:      null,
	baseline: null,

	initialize: function (lonlat, name, shape, style, options, title) {

		this.lonlat  = lonlat;
		this.name    = name;
		this.shape   = shape;
		this.style   = style   || {};
		this.options = options || {};
		this.title   = title || null;
	},

	destroy: function() {

		this.erase();
		this.map = null;
	},

	erase: function() {

		this.div     = null;

		this.lonlat  = null;
		this.shape   = null;
		this.style   = null;
		this.options = null;
	},

	CLASS_NAME: 'OpenLayers.Marker.Label'
});

//--------------------------------------------------------------------------------
//	$Id: layerlabels.js,v 1.19 2017/10/21 11:05:48 wolf Exp $
//--------------------------------------------------------------------------------
