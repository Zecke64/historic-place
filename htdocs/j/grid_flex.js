//--------------------------------------------------------------------------------
//	$Id: grid_flex.js,v 1.1 2017/02/26 14:06:04 wolf Exp $
//--------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/ol2/?
//--------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//--------------------------------------------------------------------------------

OpenLayers.Layer.FlexGrid = OpenLayers.Class (OpenLayers.Layer.Vector, {

	//------------------------------------------------------------------------
	//	Config
	//------------------------------------------------------------------------

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

	//---------------------------------------------------------
	//	Draw grid on move or zoom
	//---------------------------------------------------------

	moveTo: function (bounds, zoomChanged, dragging) {

		OpenLayers.Layer.Vector.prototype.moveTo.apply(this,arguments);

		//---------------------------------------------------------
		//	but not while dragging
		//---------------------------------------------------------

		if (dragging) { return; }

		//---------------------------------------------------------
		//	Remove old grid
		//---------------------------------------------------------

		this.destroyFeatures();

		//---------------------------------------------------------
		//	Check zoom
		//---------------------------------------------------------

		if (this.minZoom && this.map.getZoom() < this.minZoom) return;

		//---------------------------------------------------------
		//	Transform center and border to geogr. Coordinates
		//---------------------------------------------------------

		var mapBounds = bounds.clone().
			transform(this.map.getProjectionObject(), this.map.displayProjection);

		var x1 = Math.ceil  (Math.max(this.minLon, mapBounds.left)  / this.stepLon);
		var x2 = Math.floor (Math.min(this.maxLon, mapBounds.right) / this.stepLon);
		var y1 = Math.ceil  (Math.max(this.minLat, mapBounds.bottom)/ this.stepLat);
		var y2 = Math.floor (Math.min(this.maxLat, mapBounds.top)   / this.stepLat);

		if (x1 > x2 || y1 > y2) return;

		var features = [];

		//---------------------------------------------------------
		//	Vertical lines
		//---------------------------------------------------------

		var p1, p2, v;

		for (var x=x1; x<=x2; x++) {

			p1 = new OpenLayers.LonLat (x*this.stepLon, Math.min(this.maxLat, mapBounds.top)).
				transform(this.map.displayProjection, this.map.getProjectionObject());
			p2 = new OpenLayers.LonLat (x*this.stepLon, Math.max(this.minLat, mapBounds.bottom)).
				transform(this.map.displayProjection, this.map.getProjectionObject());

			v = new OpenLayers.Feature.Vector ( new OpenLayers.Geometry.LineString( [
				new OpenLayers.Geometry.Point (p1.lon, p1.lat),
				new OpenLayers.Geometry.Point (p2.lon, p2.lat)
			]), null, this.style);

			features.push (v);
		}

		//---------------------------------------------------------
		//	Horizontal lines
		//---------------------------------------------------------

		for (var y=y1; y<=y2; y++) {

			p1 = new OpenLayers.LonLat (Math.max(this.minLon, mapBounds.left), y*this.stepLat).
				transform(this.map.displayProjection, this.map.getProjectionObject());
			p2 = new OpenLayers.LonLat (Math.min(this.maxLon, mapBounds.right), y*this.stepLat).
				transform(this.map.displayProjection, this.map.getProjectionObject());

			v = new OpenLayers.Feature.Vector ( new OpenLayers.Geometry.LineString( [
				new OpenLayers.Geometry.Point (p1.lon, p1.lat),
				new OpenLayers.Geometry.Point (p2.lon, p2.lat)
			]), null, this.style);

			features.push (v);
		}

		//---------------------------------------------------------
		//	Add grid lines to vector layer
		//---------------------------------------------------------

		this.addFeatures(features);
	},

	CLASS_NAME: 'OpenLayers.Layer.FlexGrid'
});

//--------------------------------------------------------------------------------
//	$Id: grid_flex.js,v 1.1 2017/02/26 14:06:04 wolf Exp $
//--------------------------------------------------------------------------------
