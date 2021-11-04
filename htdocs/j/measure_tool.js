//------------------------------------------------------------------------------
//	$Id: measure_tool.js,v 1.24 2019/07/19 22:35:01 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	https://www.netzwolf.info/ol2/measure_tool.html
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

/*jsl:option explicit*/

'use strict';

OpenLayers.Control.MeasureTool = OpenLayers.Class (OpenLayers.Control, {

	title: 'Measurement',
	layerTitle: 'Measurement features',
	layerAttribution: null,

	//----------------------------------------------------------------------
	//
	//	config
	//
	//----------------------------------------------------------------------

	displayInLayerSwitcher:	true,
	displayLayerInSwitcher:	false,
	activationKeyCode:	null,
	autoActivate:		false,

	resetOnDeactivate:	false,

	resetKeyCode:		null,
	clearKeyCode:		null,
	deleteLastKeyCode:	null,
	reverseKeyCode:		null,
	analyzerKeyCode:	null,
	toggleLineKeyCode:	null,
	zoomToExtentKeyCode:	null,

	infoDivId:		null,

	clickTolerance:		4,
	catchMargin:		3,

	enableAnalyzer:		false,
	analyzer:		null,

	//----------------------------------------------------------------------
	//	translation hook
	//----------------------------------------------------------------------

	textLength:		'Distance: ${value}',
	textNoWay:		'No way selected',
	textAnalyzing:		'Analyzing ...',
	textAnalyzingFailed:	'Analyse failed',

	//----------------------------------------------------------------------
	//	cursors
	//----------------------------------------------------------------------

	cursor: 'crosshair',

	//----------------------------------------------------------------------
	//	markers
	//----------------------------------------------------------------------
	// graphicName:	circle, square, star, x, cross, triangle
	//----------------------------------------------------------------------

	/*
	markerStyle: {
		externalGraphic: 'i/nadel_gruen_27x25.png',
		graphicWidth:	27,
		graphicHeight:	25,
		graphicXOffset:	0,
		graphicYOffset:	-25,
		cursor: 'move'
	},
	*/

	markerStyleFirst: {
		graphicName: 'circle',
		pointRadius: 6,
		strokeWidth: 3,
		strokeColor: 'black',
		fillOpacity: 0,
		title: 'Click to select, Strg-Click to delete',
		cursor: 'move'
	},

	markerStyle: {
		graphicName: 'circle',
		pointRadius: 6,
		strokeWidth: 3,
		strokeColor: 'blue',
		fillOpacity: 0,
		title: 'Strg-Click to delete',
		cursor: 'move'
	},

	markerStyleLast: {
		graphicName: 'circle',
		pointRadius: 6,
		strokeWidth: 3,
		strokeColor: 'red',
		fillOpacity: 0,
		title: 'Strg-Click to delete',
		cursor: 'move'
	},

	markerStyleAux: {
		graphicName: 'circle',
		pointRadius: 4,
		strokeWidth: 1,
		strokeColor: 'black',
		fillColor: 'white',
		fillOpacity: 1,
		cursor: 'move'
	},

	lineStyle: {
		strokeColor: 'blue',
		strokeWidth: 9,
		strokeOpacity: 0.5
	},

	//----------------------------------------------------------------------
	//	result
	//----------------------------------------------------------------------

	formatValue: function (value) {

		if (value===null) return null;

		return value>=1000?
			(value/1000).toFixed(3).replace(/\./, ',') + ' km' :
			value.toFixed(0) + ' m';
	},

	formatOutput: function (value) {

		return OpenLayers.String.format (this.textLength, {value: this.formatValue(value || 0)});
	},

	resultHandler: function(value) {

		if (this.enableAnalyzer) this.setText (this.analyzerDiv, null);
		this.setText (this.resultDiv, this.formatOutput(value));
	},

	//----------------------------------------------------------------------
	//
	//	local vars
	//
	//----------------------------------------------------------------------

	layer:	null,
	documentOnKeydown: null,

	infoDiv:	null,
	analyzerDiv:	null,
	resultDiv:	null,
	downloadElement: null,

	markers:	null,
	auxMarkers:	null,
	lineFeatures:	[],
	extraFeatures:	null,

	oldMarkers:	null,
	oldAuxMarkers:	null,

	currentValue:	null,

	//----------------------------------------------------------------------
	//
	//	OpenLayers.Control
	//
	//----------------------------------------------------------------------

	//----------------------------------------------------------------------
	//	OpenLayers.Control:	constructor
	//----------------------------------------------------------------------

	initialize: function(options) {

		OpenLayers.Control.prototype.initialize.apply(this, arguments);

		this.markers    = [];
		this.auxMarkers = [];
	},

	//----------------------------------------------------------------------
	//	OpenLayers.Control:	draw
	//----------------------------------------------------------------------

	draw: function () {

		OpenLayers.Control.prototype.draw.apply(this,arguments);

		var control = this; // for closure

		//--------------------------------------------------------------
		//	create layer
		//--------------------------------------------------------------

		this.layer = new OpenLayers.Layer.Vector(this.layerTitle, {

			attribution: this.layerAttribution ||
				this.analyzer && this.analyzer.attribution || null,
			displayInLayerSwitcher: this.displayLayerInSwitcher,
			rendererOptions: {zIndexing: true},
			visibility: false
		});

		this.map.addLayer(this.layer);

		//--------------------------------------------------------------
		//	result container
		//--------------------------------------------------------------

		this.resultDiv	= document.createElement('div');
		this.resultDiv.className = 'measureToolResult';

		//--------------------------------------------------------------
		//	extended result container
		//--------------------------------------------------------------

		this.analyzerDiv = document.createElement('div');
		this.analyzerDiv.className = 'measureToolAnalyzer';
		this.analyzerDiv.style.display = 'none';
		this.analyzerDiv.onclick = function() {this.style.display='none'; };

		//--------------------------------------------------------------
		//	info div
		//--------------------------------------------------------------

		var withDownload = false;
		if (this.infoDivId) this.infoDiv = document.getElementById (this.infoDivId);

		if (this.infoDiv) {

			this.infoDiv.parentElement.removeChild(this.infoDiv);
			this.infoDiv.style.display = 'none';

			this.infoDiv.onclick = function (evt) {

				this.style.display = 'none';
			};

			this.resultDiv.onclick = function (evt) {

				control.toggleVisibility(control.infoDiv);
				return false;
			};

			//------------------------------------------------------
			//	activate download button
			//------------------------------------------------------

			var buttonElements = this.infoDiv.getElementsByTagName('button');
			for (var i=0; i<buttonElements.length; i++) {

				var button = buttonElements[i];
				if (!button.name || !this.downloadFormats[button.name]) continue;

				if (window.btoa) {

					button.onclick = function(evt) {

						OpenLayers.Event.stop(evt, false);
						control.startDownload(this.name);
						return false;
					};

					button.style.cursor = 'pointer';
					button.title = 'Download';

					withDownload = true;
				} else {

					button.disabled = true;
				}
			}
		}

		//--------------------------------------------------------------
		//	control div
		//--------------------------------------------------------------

		this.div.style.display='none';

		if (this.infoDiv) this.div.appendChild (this.infoDiv);
		this.div.appendChild (this.analyzerDiv);
		this.div.appendChild (this.resultDiv);

		this.div.style.cursor = 'default';
		this.div.onmousedown = function (evt) {

			OpenLayers.Event.stop(evt, true);
			return false;
		};

		this.setText (this.resultDiv, this.formatOutput(null));

		//--------------------------------------------------------------
		//	download element
		//--------------------------------------------------------------

		if (withDownload) {

			this.downloadElement = document.createElement('a');
			this.downloadElement.style.display = 'none';
			this.div.appendChild(this.downloadElement);
		}

		//--------------------------------------------------------------
		//	create keydown handler
		//--------------------------------------------------------------

		this.documentOnKeydown = function (evt) {

			return control.onKeypress (evt);
		};

		//--------------------------------------------------------------
		//	return control div
		//--------------------------------------------------------------

		return this.div;
	},

	//----------------------------------------------------------------------
	//	OpenLayers.Control:	destructor
	//----------------------------------------------------------------------

	destroy: function() {

		this.deactivate();

		//--------------------------------------------------------------
		//	stop observing events
		//--------------------------------------------------------------

		this.map.events.unregister ('mousedown', this, this.onMousedown);
		this.map.events.unregister ('click',     this, this.onClick);

		OpenLayers.Event.stopObserving (document, 'keydown', this.documentOnKeydown);

		//--------------------------------------------------------------
		//	destroy layer
		//--------------------------------------------------------------

		if (this.layer) {

			this.layer.destroyFeatures();
			this.map.removeLayer(this.layer);
			this.layer.destroy();
			this.layer = null;
		}

		//--------------------------------------------------------------
		//	destroy elements
		//--------------------------------------------------------------

		if (this.downloadElement) {

			this.downloadElement.parentElement.removeChild(this.downloadElement);
		}

		this.infoDiv = null;
		this.analyzerDiv = null;
		this.resultDiv = null;
		this.downloadElement = null;

		OpenLayers.Control.prototype.destroy.apply(this, arguments);
	},

	//----------------------------------------------------------------------
	//	OpenLayers.Control:	activate
	//----------------------------------------------------------------------

	activate: function() {

		if (!OpenLayers.Control.prototype.activate.apply(this)) return false;

		this.layer.setVisibility(true);
		this.layer.div.style.cursor = this.cursor;
		this.div.style.display = '';

		this.map.events.registerPriority ('mousedown',   this, this.onMousedown);
		this.map.events.registerPriority ('click',       this, this.onClick);
		this.map.events.register         ('addlayer',    this, this.setLayerDivTopZIndex);
		this.map.events.register         ('removelayer', this, this.setLayerDivTopZIndex);
		this.map.events.register         ('changelayer', this, this.setLayerDivTopZIndex);

		this.setLayerDivTopZIndex();

		OpenLayers.Event.observe (document, 'keydown', this.documentOnKeydown);

		return true;
	},

	//----------------------------------------------------------------------
	//	OpenLayers.Control:	deactivate
	//----------------------------------------------------------------------

	deactivate: function() {

		if (!OpenLayers.Control.prototype.deactivate.apply(this)) return false;

		this.cancelDrag();
		if (this.resetOnDeactivate) this.reset();

		this.layer.setVisibility(false);
		this.div.style.display = 'none';

		this.map.events.unregister ('mousedown',   this, this.onMousedown);
		this.map.events.unregister ('click',       this, this.onClick);
		this.map.events.unregister ('addlayer',    this, this.setLayerDivTopZIndex);
		this.map.events.unregister ('removelayer', this, this.setLayerDivTopZIndex);
		this.map.events.unregister ('changelayer', this, this.setLayerDivTopZIndex);

		this.setLayerDivNormZIndex();

		OpenLayers.Event.stopObserving (document, 'keydown', this.documentOnKeydown);

		return true;
	},

	//----------------------------------------------------------------------
	//
	//	fuck you, SelectFeature!
	//
	//----------------------------------------------------------------------

	setLayerDivTopZIndex: function() {

		this.layer.div.style.zIndex = this.map.Z_INDEX_BASE.Popup-1;
	},

	setLayerDivNormZIndex: function() {

		var index = this.map.getLayerIndex(this.layer);
		if (index>=0) this.map.setLayerZIndex(this.layer, index);
	},

	//----------------------------------------------------------------------
	//
	//	redraw
	//
	//----------------------------------------------------------------------

	redraw: function(dragging) {

		this.setLayerDivTopZIndex();
		this.layer.removeAllFeatures();

		if (!this.markers.length) return false;

		//--------------------------------------------------------------
		//	remove old line feature
		//--------------------------------------------------------------

		for (var i in this.lineFeatures) {
			this.lineFeatures[i].destroy();
		}
		this.lineFeatures = [];

		//--------------------------------------------------------------
		//	(re)create line feature
		//--------------------------------------------------------------

		var lastXY = null;

		var points = [];
		for (i=0; i<this.markers.length; i++) {

			var xy = this.markers[i].geometry;

			//------------------------------------------------------
			//	first point
			//------------------------------------------------------

			if (lastXY===null) {

				points.push (xy);
				lastXY = xy;
				continue;
			}

			//------------------------------------------------------
			//	distance w/o dateline transition < 180°
			//------------------------------------------------------

			var d = (xy.x - lastXY.x) / this.circumference;
			if (Math.abs(d) < 0.5) {

				points.push (xy);
				lastXY = xy;
				continue;
			}

			//------------------------------------------------------
			//	has to wrap dateline
			//------------------------------------------------------

			var lx = this.halfUnity(lastXY.x/this.circumference);
			var dx = this.halfUnity(d);

			var s = Math.sign(dx)/2;
			var f = (s - lx) / dx;
			var y = lastXY.y + f * (xy.y - lastXY.y);

			//------------------------------------------------------
			//	set point before dateline and cut line
			//------------------------------------------------------

			points.push (new OpenLayers.Geometry.Point(
				s*this.circumference, y));

			this.lineFeatures.push (new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.LineString(points),
				null, this.lineStyle));
			points = [];

			//------------------------------------------------------
			//	set point after dateline and continue
			//------------------------------------------------------

			points.push (new OpenLayers.Geometry.Point(
				-s*this.circumference, y));
			points.push (xy);
			lastXY = xy;
		}

		this.lineFeatures.push (new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.LineString(points),
			null, this.lineStyle));

		//--------------------------------------------------------------
		//	add features to layer
		//--------------------------------------------------------------

		this.layer.addFeatures(this.lineFeatures);
		this.layer.addFeatures(this.auxMarkers);
		this.layer.addFeatures(this.markers);

		//--------------------------------------------------------------
		//	measurement
		//--------------------------------------------------------------

		var value = 0;

		for (i in this.lineFeatures) {
			value += this.lineFeatures[i].geometry.getGeodesicLength(
					this.map.getProjectionObject());
		}

		this.currentValue = value;
		this.resultHandler(this.currentValue);

		//--------------------------------------------------------------
		//	extended analysis
		//--------------------------------------------------------------

		this.destroyFeatures (this.extraFeatures);

		if (!dragging && this.enableAnalyzer) this.analyze();
		return true;
	},

	//----------------------------------------------------------------------
	//
	//	application level methods
	//
	//----------------------------------------------------------------------

	//----------------------------------------------------------------------
	//	reset
	//----------------------------------------------------------------------

	reset: function() {

		this.cancelDrag();

		this.destroyMarkers (this.oldMarkers);
		this.destroyMarkers (this.oldAuxMarkers);

		this.markers      = [];
		this.auxMarkers   = [];
		this.oldMarkers   = [];
		this.oldAuxMarkers= [];
		this.lineFeatures = [];
		this.currentValue = null;

		this.layer.destroyFeatures();

		this.resultHandler(this.currentValue);
		this.setText (this.analyzerDiv, null);
	},

	//----------------------------------------------------------------------
	//	save and than remove markers
	//----------------------------------------------------------------------

	clear: function() {

		this.cancelDrag();

		this.destroyFeatures(this.oldMarkers);
		this.destroyFeatures(this.oldAuxMarkers);

		this.layer.removeFeatures(this.markers);
		this.layer.removeFeatures(this.auxMarkers);

		this.oldMarkers   = this.markers;
		this.oldAuxMarkers= this.auxMarkers;

		this.markers      = [];
		this.auxMarkers   = [];
		this.lineFeatures = [];
		this.currentValue = null;

		this.layer.destroyFeatures();
		this.resultHandler(this.currentValue);
	},

	//----------------------------------------------------------------------
	//	restore saved markers
	//----------------------------------------------------------------------

	restore: function() {

		this.cancelDrag();

		if (!this.oldMarkers) return;

		this.markers      = this.oldMarkers;
		this.auxMarkers   = this.oldAuxMarkers;
		this.oldMarkers   = null;
		this.oldAuxMarkers= null;

		this.layer.destroyFeatures();

		this.redraw();
	},

	//----------------------------------------------------------------------
	//	if marker exists clear else restor
	//----------------------------------------------------------------------

	clearOrRestore: function() {

		if (this.markers.length) {

			this.clear();
		} else {
			this.restore();
		}
	},

	//----------------------------------------------------------------------
	//	remove last marker
	//----------------------------------------------------------------------

	deleteLastMarker: function() {

		if (this.markers.length<1) return false;

		this.layer.removeAllFeatures();

		if (this.auxMarkers.length) this.auxMarkers.pop().destroy();
		this.markers.pop().destroy();

		if (this.markers.length) {

			this.markers[this.markers.length-1].style = this.markerStyleLast;
		}

		this.redraw();
		return true;
	},

	//----------------------------------------------------------------------
	//	remove certain marker
	//----------------------------------------------------------------------

	deleteMarkerAtIndex: function (index) {

		if (index < 0) return false;

		if (index >= this.markers.length-1) {

			return this.deleteLastMarker();
		}

		//--------------------------------------------------------------
		//	hide
		//--------------------------------------------------------------

		this.layer.removeAllFeatures();

		//--------------------------------------------------------------
		//	delete marker and right auxmarker
		//--------------------------------------------------------------

		this.destroyFeatures (this.markers.splice(index, 1));
		this.destroyFeatures (this.auxMarkers.splice(index, 1));

		//--------------------------------------------------------------
		//	new first marker?
		//--------------------------------------------------------------

		if (!index && this.markers.length>=2) {

			this.markers[0].style = this.markerStyleFirst;
		}

		//--------------------------------------------------------------
		//	adjust left aux marker
		//--------------------------------------------------------------

		if (index>0) {

			this.auxMarkers[index-1].geometry = this.auxGeometry(index-1);
		}

		this.redraw();
		return true;
	},

	//----------------------------------------------------------------------
	//	reverse line direction
	//----------------------------------------------------------------------

	reverse: function() {

		this.markers    = this.markers.reverse();
		this.auxMarkers = this.auxMarkers.reverse();

		if (this.markers.length>=2) {

			this.markers[0                    ].style = this.markerStyleFirst;
			this.markers[this.markers.length-1].style = this.markerStyleLast;
		}

		this.redraw();
	},

	//----------------------------------------------------------------------
	//	zoom to extent
	//----------------------------------------------------------------------

	zoomToExtent: function() {

		var bounds = this.layer.getDataExtent();
		if (!bounds) return false;

		this.map.zoomToExtent(bounds);

		return true;
	},

	//----------------------------------------------------------------------
	//	toggle display of line and aux markers
	//----------------------------------------------------------------------

	toggleLine: function() {

		if (!this.markers.length) return false;

		if (!this.lineFeatures.length) {

			this.redraw();

		} else if (this.extraFeatures) {

			this.layer.removeFeatures(this.markers);
			this.layer.removeFeatures(this.auxMarkers);
			this.layer.destroyFeatures(this.lineFeatures);
			this.lineFeatures = [];
		}

		return true;
	},

	//----------------------------------------------------------------------
	//	auxiliary
	//----------------------------------------------------------------------

	destroyFeatures: function (features) {

		if (!features) return;
		while (features.length) features.pop().destroy();
	},

	//----------------------------------------------------------------------
	//
	//	append, insert and remove marker
	//
	//----------------------------------------------------------------------

	appendMarker: function (lonLat) {

		if (this.markers.length >= 2) {

			this.markers[this.markers.length-1].style = this.markerStyle;

		} else if (this.markers.length == 1) {

			this.markers[0].style = this.markerStyleFirst;
		}

		this.markers.push(new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat),
				{}, this.markerStyleLast));

		if (this.markers.length >= 2) {

			this.auxMarkers.push(new OpenLayers.Feature.Vector(
				this.auxGeometry(this.markers.length-2),
					{}, this.markerStyleAux));
		}

		this.redraw();
	},

	insertMarkerAtIndex: function (lonLat, index) {

		if (index >= this.markers.length) {

			this.appendMarker(lonLat);
			return true;
		}

		if (index < 0) return false;

		// assert 0 <= index < this.markers.length >= 1

		//--------------------------------------------------------------
		//	new marker
		//--------------------------------------------------------------

		var marker = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat),
				{}, this.markerStyle);

		this.markers.splice (index, 0, marker);

		//--------------------------------------------------------------
		//	new right aux marker
		//--------------------------------------------------------------

		var auxMarker = new OpenLayers.Feature.Vector(
			this.auxGeometry(index), {}, this.markerStyleAux);

		this.auxMarkers.splice (index, 0, auxMarker);

		//--------------------------------------------------------------
		//	adjust left aux marker
		//--------------------------------------------------------------

		if (index>0) {

			this.auxMarkers[index-1].geometry = this.auxGeometry(index-1);
		}

		return this.redraw(true);
	},

	//----------------------------------------------------------------------
	//	auxiliary methods
	//----------------------------------------------------------------------

	circumference: 40075016.68,

	halfUnity: function(x) {

		return x - Math.floor(x+0.5);
	},

	auxGeometry: function (index) {

		var xy1 = this.markers[index  ].geometry;
		var xy2 = this.markers[index+1].geometry;

		var x1 = xy1.x / this.circumference;
		var x2 = xy2.x / this.circumference;
		var x  = this.circumference * this.halfUnity(x1 + 0.5 * this.halfUnity(x2-x1));

		var y = (xy1.y + xy2.y) / 2;
  
		return new OpenLayers.Geometry.Point(x, y);
	},

	//----------------------------------------------------------------------
	//
	//	mouse event handler
	//
	//----------------------------------------------------------------------

	lastXY:	null,

	onMousedown: function (evt) {

		this.lastXY = null;

		//--------------------------------------------------------------
		//	control -> delete marker
		//--------------------------------------------------------------

		if (evt.ctrlKey) {

			var index = this.findMarkerAtXY (this.markers, evt.xy);

			if (index >= 0) {

				this.deleteMarkerAtIndex(index);
				return false;
			}

			if (this.findMarkerAtXY (this.auxMarkers, evt.xy) >= 0) {

				return false;
			}

			this.lastXY = evt.xy;
			return true;
		}

		//--------------------------------------------------------------
		//	expand auxmarker and start drag
		//--------------------------------------------------------------

		index = this.findMarkerAtXY (this.auxMarkers, evt.xy);
		if (index >= 0) {

			var xy = this.auxMarkers[index].geometry;
			this.insertMarkerAtIndex (new OpenLayers.LonLat(xy.x, xy.y), index + 1);

			this.startDrag (evt, this.markers[index+1], true);
			return false;
		}

		//--------------------------------------------------------------
		//	no marker
		//--------------------------------------------------------------

		index = this.findMarkerAtXY (this.markers, evt.xy);
		if (index < 0) {

			this.lastXY = evt.xy;
			return true;
		}

		//--------------------------------------------------------------
		//	move this marker
		//--------------------------------------------------------------

		if (!index) this.lastXY = evt.xy;
		this.startDrag (evt, this.markers[index]);

		return false;
	},

	onMousemove: function (evt) {

		this.drag(evt);
		return false;
	},

	onMouseup: function (evt) {

		this.cancelDrag(evt);
		return false;
	},

	onClick: function (evt) {

		if (!this.lastXY) return true;

		var dx = this.lastXY.x - evt.xy.x;
		var dy = this.lastXY.y - evt.xy.y;

		this.lastXY = null;

		if (Math.sqrt(dx*dx + dy*dy) > this.clickTolerance) return true;

		if (evt.ctrlKey) return true;

		//--------------------------------------------------------------
		//	click on first marker?
		//--------------------------------------------------------------

		var index = this.findMarkerAtXY (this.markers, evt.xy);

		if (!!index) {

			this.appendMarker (this.map.getLonLatFromViewPortPx(evt.xy));

		} else if (this.markers.length>1) {

			this.reverse();
		}

		return false;
	},

	//----------------------------------------------------------------------
	//	auxiliary methods
	//----------------------------------------------------------------------

	findMarkerAtXY: function (markers, xy) {

		if (!markers) return -1;

		for (var i=markers.length-1; i>=0; i--) {

			var marker = markers[i];

			var lonLat = new OpenLayers.LonLat (marker.geometry.x, marker.geometry.y);
			var px     = this.map.getViewPortPxFromLonLat (lonLat);
			var style  = marker.style || {pointRadius: 5};

			if (style.pointRadius>0) {

				var dx = px.x - xy.x;
				var dy = px.y - xy.y;
				var d  = Math.round (Math.sqrt (dx*dx + dy*dy));

				if (d > style.pointRadius + style.strokeWidth/2 + this.catchMargin) continue;

				return i;

			}

			if (style.externalGraphic) {

				var xOff = typeof(style.graphicXOffset)=='number'? style.graphicXOffset : -style.graphicWidth/2;
				var yOff = typeof(style.graphicYOffset)=='number'? style.graphicYOffset : -style.graphicHeight/2;

				var x = xy.x - px.x - xOff;
				var y = xy.y - px.y - yOff;

				// include code for style.rotate here

				if (x < this.catchMargin || x > style.graphicWidth  + this.catchMargin) continue;
				if (y < this.catchMargin || y > style.graphicHeight + this.catchMargin) continue;

				return i;
			}
		}

		return -1;
	},

	//----------------------------------------------------------------------
	//
	//	drag marker
	//
	//----------------------------------------------------------------------

	dragOffset: null,
	dragFeature: null,
	dragMustRedraw: null,

	startDrag: function (evt, feature, mustRedraw) {

		var xy = this.map.getViewPortPxFromLonLat (
			new OpenLayers.LonLat (feature.geometry.x, feature.geometry.y));

		this.dragOffset  = { x: evt.xy.x - xy.x, y: evt.xy.y - xy.y };
		this.dragFeature = feature;
		this.dragMustRedraw = !!mustRedraw;

		this.map.events.registerPriority ('mouseup',   this, this.onMouseup);
		this.map.events.registerPriority ('mousemove', this, this.onMousemove);
		this.layer.div.style.cursor = 'move';
	},

	drag: function (evt) {

		//--------------------------------------------------------------
		//	drag feature visible?
		//--------------------------------------------------------------

		var index = OpenLayers.Util.indexOf(this.markers, this.dragFeature);

		if (index < 0) {

			this.cancelDrag();
			return;
		}

		//--------------------------------------------------------------
		//	update marker position
		//--------------------------------------------------------------

		this.dragMustRedraw = true;

		var xy     = {x: evt.xy.x-this.dragOffset.x, y: evt.xy.y-this.dragOffset.y};
		var lonLat = this.map.getLonLatFromViewPortPx(xy);
		var point  = new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat);

		this.markers[index].geometry = point;

		//--------------------------------------------------------------
		//	update aux marker position
		//--------------------------------------------------------------

		if (index > 0) {

			this.auxMarkers[index-1].geometry = this.auxGeometry(index-1);
		}

		if (index < this.auxMarkers.length) {

			this.auxMarkers[index].geometry = this.auxGeometry(index);
		}

		//--------------------------------------------------------------
		//	redraw
		//--------------------------------------------------------------

		this.redraw(true);
	},

	cancelDrag: function () {

		this.map.events.unregister ('mousemove', this, this.onMousemove);
		this.map.events.unregister ('mouseup',   this, this.onMouseup);

		if (this.dragFeature) {

			this.dragFeature = null;
			if (this.dragMustRedraw) this.redraw();
		}

		this.layer.div.style.cursor = this.cursor;
	},

	//----------------------------------------------------------------------
	//
	//	keyboard event handler
	//
	//----------------------------------------------------------------------

	onKeypress: function (evt) {

		if (this.checkKeyCode(evt, this.resetKeyCode)) {

			this.reset();
			OpenLayers.Event.stop(evt);
			return false;
		}

		if (this.checkKeyCode(evt, this.clearKeyCode)) {

			this.clearOrRestore();
			OpenLayers.Event.stop(evt);
			return false;
		}

		if (this.checkKeyCode(evt, this.deleteLastKeyCode)) {

			this.deleteLastMarker();
			OpenLayers.Event.stop(evt);
			return false;
		}

		if (this.checkKeyCode(evt, this.reverseKeyCode)) {

			this.reverse();
			OpenLayers.Event.stop(evt);
			return false;
		}

		if (this.checkKeyCode(evt, this.zoomToExtentKeyCode)) {

			this.zoomToExtent();
			OpenLayers.Event.stop(evt);
			return false;
		}

		if (this.checkKeyCode(evt, this.toggleLineKeyCode)) {

			this.toggleLine();
			OpenLayers.Event.stop(evt);
			return false;
		}

		if (this.checkKeyCode(evt, this.analyzerKeyCode)) {

			if (!this.analyzer) return true;

			this.enableAnalyzer = !this.enableAnalyzer;

			if (this.extraFeatures) this.layer.destroyFeatures(this.extraFeatures);
			this.extraFeatures = null;

			if (!this.enableAnalyzer) {

				this.analyzerDiv.style.display = 'none';
				if (this.markers.length && !this.lineFeatures.length) this.redraw();
			} else {
				this.analyze();
			}

			return false;
		}

		return true;
	},

	//----------------------------------------------------------------------
	//	auxiliary
	//----------------------------------------------------------------------

	checkKeyCode: function (evt, pattern) {

		if (!pattern) return false;

		return OpenLayers.Util.isArray(pattern) ?
			OpenLayers.Util.indexOf(pattern, evt.keyCode) >= 0 :
			evt.keyCode === pattern;
	},

	//----------------------------------------------------------------------
	//
	//	analyzer
	//
	//----------------------------------------------------------------------

	analyze: function () {

		if (!this.analyzer) return false;

		//--------------------------------------------------------------
		//	prepare list of lonlats
		//--------------------------------------------------------------

		var lonlats=[];

		for (var i=0; i<this.markers.length; i++) {

			var xy = this.markers[i].geometry;

			lonlats.push(new OpenLayers.LonLat(xy.x, xy.y).
				transform(this.map.getProjectionObject(),
					this.analyzer.projection));
		}

		if (lonlats.length < 1) {

			this.setText (this.analyzerDiv, this.textNoWay);
			return false;
		}

		this.setText (this.analyzerDiv, this.textAnalyzing);

		//--------------------------------------------------------------
		//	prepare callbacks
		//--------------------------------------------------------------

		var control = this; // for closure

		var onSuccess = function(text, features) {

			control.setText (control.analyzerDiv, text);

			if (features && features.length) {

				for (var i in features) features[i].geometry.transform(
					control.analyzer.projection, control.map.getProjectionObject());
				control.extraFeatures = features;
				control.layer.addFeatures(control.extraFeatures);
			}
		};

		var onFailure = function (text) {

			control.setText (control.analyzerDiv, text || control.textAnalyzingFailed);
		};

		//--------------------------------------------------------------
		//	start analyzer
		//--------------------------------------------------------------

		this.analyzer.analyze(lonlats, onSuccess, onFailure);
		return true;
	},

	//----------------------------------------------------------------------
	//
	//	download
	//
	//----------------------------------------------------------------------

	downloadFormats: {

		gpx: {
			ext: '.gpx',
			mime: 'application/gpx+xml',
			encoder: OpenLayers.Format.GPX
		},

		geojson: {
			ext: '.json',
			mime: 'application/json',
			encoder: OpenLayers.Format.GeoJSON
		},

		kml: {
			ext: '.kml',
			mime: 'application/vnd.google-earth.kml+xml',
			encoder: OpenLayers.Format.KML
		},

		osm: {
			ext: '.osm',
			mime: 'text/xml',
			encoder: OpenLayers.Format.OSM
		}
	},

	downloadName: function (ext) {

		var now = new Date();
		var dd = function (v) { return v<9? '0' + v : v; };

		var datetime = [
			now.getFullYear(),
			dd(now.getMonth()+1),
			dd(now.getDate()),
			dd(now.getHours()),
			dd(now.getMinutes()),
			dd(now.getSeconds())
		].join('-');

		return datetime + ext;
	},

	startDownload: function (type) {

		var format = this.downloadFormats[type];
		if (!format) return false;

		var features = this.extraFeatures || this.lineFeatures.length && this.lineFeatures || null;

		if (!features) {

			window.alert (this.textNoWay);
			return false;
		}

		var encoder = new format.encoder({
			internalProjection: this.map.getProjectionObject(),
			externalProjection: new OpenLayers.Projection('EPSG:4326')
		});
		var text = encoder.write(features);
		var url = 'data:' + format.mime + ';base64,' + window.btoa(text);
		var name = this.downloadName(format.ext);

		this.downloadElement.setAttribute ('download', name);
		this.downloadElement.setAttribute ('href', url);
		this.downloadElement.click();
		return true;
	},

	//----------------------------------------------------------------------
	//
	//	dom methods
	//
	//----------------------------------------------------------------------

	setText: function(element, object) {

		if (object===null) {

			element.style.display = 'none';
			return;
		}

		while (element.firstChild) element.removeChild(element.firstChild);

		if ((typeof(object)==='object') &&
				((object.nodeType===1) || (object.nodeType===3))) {

			element.appendChild(object);
			return;
		}

		var text = ''+object;

		var lines = text.split('\n');
		for (var i=0; i<lines.length; i++) {

			if (i>0) element.appendChild(document.createElement('br'));
			element.appendChild(document.createTextNode(lines[i]));
		}
		element.style.display = '';
	},

	toggleVisibility: function (element) {

		element.style.display = element.style.display!='none'? 'none' : '';
	},

	CLASS_NAME: 'OpenLayers.Control.MeasureTool'
});

//------------------------------------------------------------------------------
//	$Id: measure_tool.js,v 1.24 2019/07/19 22:35:01 wolf Exp $
//------------------------------------------------------------------------------
