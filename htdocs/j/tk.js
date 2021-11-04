//------------------------------------------------------------------------------
//	$Id: tk.js,v 1.16 2017/03/05 14:13:02 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/openlayers/tk25grid.htm
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

OpenLayers.Layer.TK = OpenLayers.Class (OpenLayers.Layer.Vector, {

	//----------------------------------------------------------------------
	//	TK25, TK50, TK100 or TK200?
	//----------------------------------------------------------------------

	factor: 1,
	prefix: '',
	minZoom: null,

	//----------------------------------------------------------------------
	//	Configuration
	//----------------------------------------------------------------------

	withLabels: true,

	xFirst: 02,
	xLast:  57,

	yFirst: 00,
	yLast:  95,

	//----------------------------------------------------------------------
	//	Style
	//----------------------------------------------------------------------

	style: ({
		strokeColor:	'blue',
		strokeOpacity:	0.7,
		strokeWidth:	2
	}),

	labelStyle: {
		// labelOutlineColor: 'white',
		// labelOutlineWidth: 3,
		// labelOutlineOpacity: 1.0  // default=fontOpacity
		// fontColor: 'black',
		// fontOpacity: 1.0,
		// fontFamily: 'Comic Sans MS',
		// fontStile: '',
		// fontWeight: ''
	},

	labelSize: 0.25,	// fraction of grid size
	labelMaxPixel: 100,

	//----------------------------------------------------------------------
	//	Constants, don't touch
	//----------------------------------------------------------------------

	lonBase: 6,
	latBase: 46.4,

	xOffset: 2,
	yOffset: 95,

	xUpper: null,

	//----------------------------------------------------------------------
	//	Init
	//----------------------------------------------------------------------

	initialize:function(){

		OpenLayers.Layer.Vector.prototype.initialize.apply(this, arguments);

		this.xUpper = Math.ceil ((this.xLast + 1 - this.xOffset) / 8) * 8;
	},

	//----------------------------------------------------------------------
	//	Draw grid on move or zoom
	//----------------------------------------------------------------------

	moveTo: function (bounds, zoomChanged, dragging) {

		//--------------------------------------------------------------
		//	but not while dragging
		//--------------------------------------------------------------

		if (dragging) { return; }

		//--------------------------------------------------------------
		//	Remove old grid
		//--------------------------------------------------------------

		this.destroyFeatures();

		//--------------------------------------------------------------
		//	Check zoom
		//--------------------------------------------------------------

		if (this.minZoom && this.map.getZoom() < this.minZoom) return;

		//--------------------------------------------------------------
		//	Transform bounds to geogr. coordinates
		//--------------------------------------------------------------

		var mapBounds = bounds.clone().
			transform(this.map.getProjectionObject(), this.map.displayProjection);

		var xFactor  =  6 / this.factor;
		var yFactor  = 10 / this.factor;
		var gridSize = this.map.getSize().h / (mapBounds.top-mapBounds.bottom) / yFactor;

		//--------------------------------------------------------------
		//	Bessel-Coordinates of corners
		//--------------------------------------------------------------

		var ol = this.toBessel (new OpenLayers.LonLat (mapBounds.left , mapBounds.top   ));
		var or = this.toBessel (new OpenLayers.LonLat (mapBounds.right, mapBounds.top   ));
		var ul = this.toBessel (new OpenLayers.LonLat (mapBounds.left , mapBounds.bottom));
		var ur = this.toBessel (new OpenLayers.LonLat (mapBounds.right, mapBounds.bottom));

		//--------------------------------------------------------------
		//	x grid (Bessel)
		//--------------------------------------------------------------

		var xl = Math.max (Math.floor ((Math.min(ol.lon,ul.lon) - this.lonBase) * xFactor), 0);
		var xr = Math.min (Math.ceil  ((Math.max(or.lon,ur.lon) - this.lonBase) * xFactor), this.xUpper / this.factor);

		if (xl > xr) return;

		//---------------------------------------------------------
		//	y grid (Bessel)
		//---------------------------------------------------------

		var yb = Math.max (Math.floor ((Math.min(ul.lat,ur.lat) - this.latBase) * yFactor), 0);
		var yt = Math.min (Math.ceil  ((Math.max(ol.lat,or.lat) - this.latBase) * yFactor), 96 / this.factor);

		if (yb > yt) return;

		//---------------------------------------------------------
		//	create new features
		//---------------------------------------------------------

		var features = [];

		//---------------------------------------------------------
		//	Vertical lines
		//---------------------------------------------------------

		for (var x=xl; x<=xr; x++) {

			var lon  = this.lonBase + x / xFactor;
			var latB = Math.max(ul.lat, this.latBase);
			var latT = Math.min(ol.lat, this.latBase+96/10);

			var pb = this.fromBessel(new OpenLayers.LonLat(lon, latB)).
				transform(this.map.displayProjection, this.map.getProjectionObject());

			var pt = this.fromBessel(new OpenLayers.LonLat(lon, latT)).
				transform(this.map.displayProjection, this.map.getProjectionObject());

			var f = new OpenLayers.Feature.Vector (new OpenLayers.Geometry.LineString( [
				new OpenLayers.Geometry.Point (pt.lon, pt.lat),
				new OpenLayers.Geometry.Point (pb.lon, pb.lat)
			]));

			features.push (f);
		}

		//---------------------------------------------------------
		//	Horizontal lines
		//---------------------------------------------------------

		for (var y=yb; y<=yt; y++) {

			var lonL = Math.max(ul.lon, this.lonBase);
			var lonR = Math.min(ur.lon, this.lonBase + this.xUpper/6);
			var lat  = this.latBase + y / yFactor;

			var pl = this.fromBessel(new OpenLayers.LonLat(lonL, lat)).
				transform(this.map.displayProjection, this.map.getProjectionObject());

			var pr = this.fromBessel(new OpenLayers.LonLat(lonR, lat)).
				transform(this.map.displayProjection, this.map.getProjectionObject());

			var f = new OpenLayers.Feature.Vector (new OpenLayers.Geometry.LineString( [
				new OpenLayers.Geometry.Point (pl.lon, pl.lat),
				new OpenLayers.Geometry.Point (pr.lon, pr.lat)
			]));

			features.push (f);
		}

		//---------------------------------------------------------
		//	Grid labels
		//---------------------------------------------------------

		if (this.withLabels) {

			for (var x=xl-1; x<=xr; x++) {

				if (x<0 || x*this.factor >= this.xUpper) continue;

				for (var y=yb-1; y<=yt; y++) {

					if (y<0 || y * this.factor >= 96) continue;

					var p = this.fromBessel (new OpenLayers.LonLat (
						this.lonBase + (x+0.5) / xFactor,
						this.latBase + (y+0.5) / yFactor)).
						transform(this.map.displayProjection, this.map.getProjectionObject());

					var label = this.prefix + this.dd(95-y*this.factor) + this.dd(2+x*this.factor);
					var size  = Math.min (this.labelMaxPixel, gridSize * this.labelSize);
					var style = {label: label, fontSize: size + 'px', pointRadius: 0};

					var f = new OpenLayers.Feature.Vector (new OpenLayers.Geometry.Point (p.lon, p.lat),
						null, OpenLayers.Util.applyDefaults(style, this.labelStyle));

					features.push (f);
				}
			}
		}

		//---------------------------------------------------------
		//	Add features to vector layer
		//---------------------------------------------------------

		this.addFeatures(features);

		//---------------------------------------------------------
		//	Superclass
		//---------------------------------------------------------

		OpenLayers.Layer.Vector.prototype.moveTo.apply(this,arguments);
	},

	//----------------------------------------------------------------------
	//	[kind of] transform coordinates from Bessel to WGS84
	//----------------------------------------------------------------------

	fromBessel: function (lonLat) {

		// Geodaeten aus aller Welt bitte kurz wegschauen...

		var bessel = this.toBessel (lonLat);
		var lon = 2 * lonLat.lon - bessel.lon;
		var lat = 2 * lonLat.lat - bessel.lat;

		// Ihr koennt wieder herschauen

		return new OpenLayers.LonLat (lon, lat);
	},

	//----------------------------------------------------------------------
	//	transform coordinates from WGS64 do Bessel
	//----------------------------------------------------------------------

	toBessel: function (lonLat) {

		//--------------------------------------------------------------
		//	Transform WGS84 ellipsoide to carthesian
		//--------------------------------------------------------------

		var phi_w = lonLat.lat / this.RHO;
		var lbd_w = lonLat.lon / this.RHO;

		var N_w = 6378137 / Math.sqrt (1 - 0.00669437998863492 * this.sqr(Math.sin(phi_w)));

		var w1 = N_w * Math.cos (phi_w) * Math.cos (lbd_w);
		var w2 = N_w * Math.cos (phi_w) * Math.sin (lbd_w);
		var w3 = N_w * Math.sin (phi_w) * 0.993305620011365;

		//--------------------------------------------------------------
		//	Transform ellipsoide (Helmert tranformation)
		//--------------------------------------------------------------

		var b1 = +0.999990181       * w1 -7.06993057967e-06 * w2 +3.56996494617e-07 * w3 -591.28;
		var b2 = +7.06993057967e-06 * w1 +0.999990181       * w2 +7.15992969596e-06 * w3 - 81.35;
		var b3 = -3.56996494617e-07 * w1 -7.15992969596e-06 * w2 +0.999990181       * w3 -396.39;

		//--------------------------------------------------------------
		//	Transform carthesian to elliposide (BESSEL)
		//--------------------------------------------------------------

		var p = Math.sqrt (b1*b1 + b2*b2);
		var theta = Math.atan2 (1.00335398479226 * b3, p);
		var lat = this.RHO * Math.atan2 (b3 + 42707.8852523705 * this.cub(Math.sin(theta)),
			p - 42565.1224788954 * this.cub(Math.cos(theta)));
		var lon = this.RHO * Math.atan2 (b2, b1);

		return {lon:lon, lat:lat};
	},

	//----------------------------------------------------------------------
	//	auxiliary constants, methods and vars
	//----------------------------------------------------------------------

	RHO: 180.0/3.14159265358979,

	sqr: function (x) { return x*x;  },
	cub: function (x) { return x*x*x;},

	//----------------------------------------------------------------------
	//	formatter
	//----------------------------------------------------------------------

	dd: function (number) {

		return number<10?'0'+number:number;
	},

	//----------------------------------------------------------------------
	//	get bounds for map sheet
	//----------------------------------------------------------------------

	sheetBounds: function (number) {

		var match = (number+'').match(/^\s*(cc?|l|)(\d\d)(\d\d)\s*$/i);
		if (!match || match[2] >= '88' || match[3] >= '58') return null;

		var factor = 1;

		switch (match[1].toUpperCase()) {

		case 'L':
			factor = 2;
			break;
		case 'C':
			factor = 4;
			break;
		case 'CC':
			factor = 8;
			break;
		}

		var bottom	= (559 - parseInt(match[2],10)) / 10;
		var left	= ( 34 + parseInt(match[3],10)) /  6;

		var top		= bottom + factor / 10;
		var right	= left   + factor /  6;

		var bounds = new OpenLayers.Bounds (left, bottom, right, top);
		bounds.factor = factor;
		return bounds;
	},

	CLASS_NAME: 'OpenLayers.Layer.TK'
});

OpenLayers.Layer.TK25 = OpenLayers.Class (OpenLayers.Layer.TK, {

	factor:	1,
	prefix:	'',
	minZoom: 9,
	CLASS_NAME: 'OpenLayers.Layer.TK25'
});

OpenLayers.Layer.TK50 = OpenLayers.Class (OpenLayers.Layer.TK, {

	factor:	2,
	prefix:	'L',
	minZoom: 8,
	CLASS_NAME: 'OpenLayers.Layer.TK50'
});

OpenLayers.Layer.TK100 = OpenLayers.Class (OpenLayers.Layer.TK, {

	factor:	4,
	prefix:	'C',
	minZoom: 7,
	CLASS_NAME: 'OpenLayers.Layer.TK100'
});

OpenLayers.Layer.TK200 = OpenLayers.Class (OpenLayers.Layer.TK, {

	factor:	8,
	prefix:	'CC',
	minZoom: 6,
	CLASS_NAME: 'OpenLayers.Layer.TK200'
});

//--------------------------------------------------------------------------------
//	$Id: tk.js,v 1.16 2017/03/05 14:13:02 wolf Exp $
//--------------------------------------------------------------------------------
