//------------------------------------------------------------------------------
//	$Id: grid_flex_gk.js,v 1.1 2017/03/05 11:38:21 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/ol2/?
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

OpenLayers.Layer.FlexGridGK = OpenLayers.Class (OpenLayers.Layer.Vector, {

	//----------------------------------------------------------------------
	//	Config
	//----------------------------------------------------------------------
	//	!!! min/max werden ignoriert !!!
	//----------------------------------------------------------------------

	minZoom: 10,

	minLon:  -180.0,
	maxLon:  +180.0,
	stepLon:    1.0,

	minLat:   -85.0,
	maxLat:   +85.0,
	stepLat:    1.0,

	style: {
		strokeColor: '#999999',
		strokeWidth: 1,
		strokeOpacity: 0.8
	},

	//----------------------------------------------------------------------
	//	Draw grid on move or zoom
	//----------------------------------------------------------------------

	moveTo: function (bounds, zoomChanged, dragging) {

		OpenLayers.Layer.Vector.prototype.moveTo.apply(this,arguments);

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
		//	Transform border to WGS84
		//--------------------------------------------------------------

		var mapBounds = bounds.clone().
			transform(this.map.getProjectionObject(), this.map.displayProjection);

		//--------------------------------------------------------------
		//	Bessel-Coordinates of corners
		//--------------------------------------------------------------

		var ol = this.toBessel (new OpenLayers.LonLat (mapBounds.left , mapBounds.top   ));
		var or = this.toBessel (new OpenLayers.LonLat (mapBounds.right, mapBounds.top   ));
		var ul = this.toBessel (new OpenLayers.LonLat (mapBounds.left , mapBounds.bottom));
		var ur = this.toBessel (new OpenLayers.LonLat (mapBounds.right, mapBounds.bottom));

		//--------------------------------------------------------------
		//	Create new grid
		//--------------------------------------------------------------

		var x1 = Math.floor (Math.min(ol.lon, ul.lon) / this.stepLon) * this.stepLon;
		var x2 = Math.ceil  (Math.max(or.lon, ur.lon) / this.stepLon) * this.stepLon;
		var y1 = Math.floor (Math.min(ul.lat, ur.lat) / this.stepLat) * this.stepLat;
		var y2 = Math.ceil  (Math.max(ol.lat, or.lat) / this.stepLat) * this.stepLat;

		var features = [];

		//--------------------------------------------------------------
		//	Vertical lines
		//--------------------------------------------------------------

		for (var x=x1; x<=x2; x+= this.stepLon) {

			var xu = (x - ul.lon) / (ur.lon-ul.lon) * (bounds.right-bounds.left) +bounds.left;
			var xo = (x - ol.lon) / (or.lon-ol.lon) * (bounds.right-bounds.left) +bounds.left;

			var v1 = new OpenLayers.Feature.Vector (new OpenLayers.Geometry.LineString([
				new OpenLayers.Geometry.Point (xo, bounds.top   ),
				new OpenLayers.Geometry.Point (xu, bounds.bottom)
			]), null, this.style);

			features.push (v1);
		}

		//--------------------------------------------------------------
		//	Horizontal lines
		//--------------------------------------------------------------

		for (var y=y1; y<=y2; y+=this.stepLat) {

			var yl = (y - ul.lat) / (ol.lat-ul.lat) * (bounds.top-bounds.bottom) +bounds.bottom;
			var yr = (y - ur.lat) / (or.lat-ur.lat) * (bounds.top-bounds.bottom) +bounds.bottom;

			var v2 = new OpenLayers.Feature.Vector (new OpenLayers.Geometry.LineString( [
				new OpenLayers.Geometry.Point (bounds.left,  yl),
				new OpenLayers.Geometry.Point (bounds.right, yr)
			]), null, this.style);

			features.push (v2);
		}

		//--------------------------------------------------------------
		//	Add grid lines to vector layer
		//--------------------------------------------------------------

		this.addFeatures(features);
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

	CLASS_NAME: 'OpenLayers.Layer.FlexGridGK'
});

//--------------------------------------------------------------------------------
//	$Id: grid_flex_gk.js,v 1.1 2017/03/05 11:38:21 wolf Exp $
//--------------------------------------------------------------------------------
