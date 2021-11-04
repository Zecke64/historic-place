//------------------------------------------------------------------------------
//	based on: trackloader.js,v 1.10 2015/07/16 17:28:36 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/openlayers/trackloader.htm
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

OpenLayers.Control.JsonLoader=OpenLayers.Class(OpenLayers.Control,{

	//----------------------------------------------------------------------
	//	Config
	//----------------------------------------------------------------------

	jsonIndex:	'json.csv',
	jsonPrefix:	'./',
	maxShapes:	10,

	zoomToShapes:	true,	// zoom map to shapes after loading index
	restrictMap:	false,	// restrict map to shapes area
	autoUpdate:	null,	// rebuild shapelist after zoom or pan
	selectFeature:	null,	// if set, loaded shapes will be registered

	jsonColors:	'#ff8000',
	jsonWidth:	1,
	jsonOpacity:	1,

	jsonCursor:	'pointer',
	descrCursor:	'help',

	attribution:	null,	// will be copied to the shape-layers created

	textButtonOff:	'No shapes available',
	textButtonOn:	'Update shapelist (${count})',
	textLoadError:	'Error loading file ${url}',

	//----------------------------------------------------------------------
	//	State
	//----------------------------------------------------------------------

	button:		null,
	shapes:		null,
	shapesExtent:	null,
	colorIndex:	0,

	//----------------------------------------------------------------------
	//	Implementation
	//----------------------------------------------------------------------

	initialize: function () {

		OpenLayers.Control.prototype.initialize.apply (this, arguments);
	},

	destroy: function()  {

		if (this.map)
		this.map.events.unregister('moveend', this, this.update);

		if (this.button) this.button.parentElement.removeChild(this.button);
		this.button = null;

		this.destroyLayers();
		this.selectFeature = null;

		OpenLayers.Control.prototype.destroy.apply(this, arguments);
	},

	draw: function() {

		OpenLayers.Control.prototype.draw.apply(this);

		var control = this;	// for closure

		this.button = document.createElement('button');
		this.button.innerHTML = this.textButtonOff;
		this.button.disabled = true;
		this.button.onclick = function(evt) {
			if (evt) OpenLayers.Event.stop(evt);
			control.destroyLayers();
			control.update(true);
		};
		this.div.appendChild(this.button);

		if (this.autoUpdate !== false)
		this.map.events.register('moveend', this, this.update);

		this.loadIndex(true);

		return this.div;
	},

	//----------------------------------------------------------------------
	//	Workhorse
	//----------------------------------------------------------------------

	intersects: function (a,b) {

		if (a.left   >= b.right ) return false;
		if (a.right  <= b.left  ) return false;
		if (a.bottom >= b.top   ) return false;
		if (a.top    <= b.bottom) return false;
		return true;
	},

	update: function(full) {

		//--------------------------------------------------------------
		//	Delete layers
		//--------------------------------------------------------------

		if (!this.shapes) {

			this.destroyLayers();
			return false;
		}

		//--------------------------------------------------------------
		//	Get list of visible shapes
		//--------------------------------------------------------------

		var mapExtent = this.map.getExtent().
			transform(this.map.getProjectionObject(),this.map.displayProjection);

		this.updateVisibility();

		var shapesInExtent = [];
		var selectedShapes = [];

		for (var i in this.shapes) {

			var shape = this.shapes[i];

			if (shape.bounds.left   >= mapExtent.right ) continue;
			if (shape.bounds.right  <= mapExtent.left  ) continue;
			if (shape.bounds.bottom >= mapExtent.top   ) continue;
			if (shape.bounds.top    <= mapExtent.bottom) continue;

			shapesInExtent.push (shape);

			if (shape.visibility) {

				selectedShapes.push(shape);
				if (selectedShapes.length >= this.maxShapes) break;
			}
		}

		//--------------------------------------------------------------
		//	Update button
		//--------------------------------------------------------------

		this.button.innerHTML= OpenLayers.String.format(this.textButtonOn,
						{count: shapesInExtent.length});
		this.button.disabled = false;

		//--------------------------------------------------------------
		//	Full update?
		//--------------------------------------------------------------

		if (!full && !this.autoUpdate) return;

		//--------------------------------------------------------------
		//	Add invisible shapes to selection
		//--------------------------------------------------------------

		if (shapesInExtent.length <= this.maxShapes) {

			selectedShapes = shapesInExtent;

		} else if (selectedShapes.length<this.maxShapes) {

			var mergedShapes = [];
			var freeSpace = this.maxShapes - selectedShapes.length;

			for (i in shapesInExtent) {

				var shape = shapesInExtent[i];

				if (shape.visibility || freeSpace-- >0) {

					mergedShapes.push(shape);
				}
			}

			selectedShapes = mergedShapes;
		}

		//--------------------------------------------------------------
		//	Match layers and selected shapes
		//--------------------------------------------------------------

		if (this.selectFeature && this.selectFeature.setLayer)
			this.selectFeature.setLayer([]);

		var selectFeatureLayers = [];

		var mapLayers = this.map.layers.slice();

		for (var i in mapLayers) {

			var layer = mapLayers[i];
			if (!layer.shape || layer.shape.loader != this) continue;

			var index = OpenLayers.Util.indexOf(selectedShapes, layer.shape);

			if (index >= 0) {

				selectedShapes.splice (index, 1);
				selectFeatureLayers.push(layer);

			} else {

				layer.shape = null;
				layer.events.triggerEvent('loadEnd'); // Hmpf!
				this.map.removeLayer(layer);
				layer.destroy();
			}
		}

		//--------------------------------------------------------------
		//	Add layers
		//--------------------------------------------------------------

		for (var i in selectedShapes) {

			var shape = selectedShapes[i];

			//------------------------------------------------------
			//	Or create new layer
			//------------------------------------------------------

			if (!shape.color) {

				shape.color = this.jsonColors
					[this.colorIndex++%this.jsonColors.length];
			}

			var layer = new OpenLayers.Layer.Vector (shape.title, {

				shape: shape,
				layerGroup: shape.group,

				attribution: this.attribution,
				visibility: shape.visibility,

				ephemeral: true,

				strategies: [new OpenLayers.Strategy.Fixed()],

				protocol: new OpenLayers.Protocol.HTTP({

					url: this.jsonPrefix + shape.gpx,
					format: new OpenLayers.Format.GeoJSON()
				}),

				style: {
					fillColor:	'#ff8000',
					fillOpacity:	0.5,
					strokeColor:	shape.color,
					strokeWidth:	this.jsonWidth,
					strokeOpacity:	this.jsonOpacity,
					graphicTitle:	shape.title,
					cursor:		shape.description ? this.descrCursor : this.jsonCursor
				}
			});

			this.map.addLayer (layer);
			this.map.setLayerIndex (layer, 0);
			selectFeatureLayers.push(layer);
		}

		if (this.selectFeature && this.selectFeature.setLayer)
			this.selectFeature.setLayer(selectFeatureLayers);
	},

	//----------------------------------------------------------------------
	//	Copy layer visibility into shape visibility
	//----------------------------------------------------------------------

	updateVisibility: function () {

		var mapLayers = this.map.layers.slice();

		for (var i in mapLayers) {

			var layer = mapLayers[i];
			if (!layer.shape || layer.shape.loader != this) continue;

			layer.shape.visibility = layer.visibility;
		}
	},

	//----------------------------------------------------------------------
	//	Destroy layers but keep visibility
	//----------------------------------------------------------------------

	destroyLayers: function() {

		if (this.selectFeature && this.selectFeature.setLayer)
			this.selectFeature.setLayer([]);

		var layers = this.map.layers.slice();

		while (layers.length>0) {

			var layer = layers.shift();

			if (!layer.shape || layer.shape.loader != this) continue;

			layer.shape.visibility = layer.visibility;

			layer.shape = null;
			this.map.removeLayer(layer);
			layer.destroy();
		}
	},

	//----------------------------------------------------------------------
	//	Load shape index
	//----------------------------------------------------------------------

	loadIndex: function(async) {

		this.shapes      = null;
		this.shapesExtent= null;

		this.button.innerHTML= this.textButtonOff;
		this.button.disabled = true;

		this.destroyLayers();
		this.colorIndex = 0;

		this.events.triggerEvent('loadStart');

		OpenLayers.Request.GET({

			async:	async,
	                url:	this.jsonIndex,

	                success: function(request) {

				this.events.triggerEvent('loadEnd');
				this.processIndexCSV(request.responseText);

				if (this.zoomToShapes && !this.map.getCenter()) {

					if (this.shapesExtent) {
						this.map.zoomToExtent(this.shapesExtent);
					} else {
						this.map.zoomToMaxExtent();
					}
				}

				if (this.restrictMap && this.shapesExtent) {

					this.map.setOptions({
						restrictedExtent: this.shapesExtent});
				}

				this.update();
	                },

			failure: function (request) {

				this.events.triggerEvent('loadEnd');

				if (this.zoomToShapes && !this.map.getCenter()) {

					 this.map.zoomToMaxExtent();
				}

				OpenLayers.Console.userError(
					OpenLayers.String.format(this.textLoadError,
						{url: this.jsonIndex}));
			},

			scope: this
	        });
	},

	//----------------------------------------------------------------------
	//	Process shape index csv
	//----------------------------------------------------------------------

	processIndexCSV: function(text) {

		var minLon = 180;
		var minLat =  90;
		var maxLon =-180;
		var maxLat = -90;

		var lines = OpenLayers.String.trim(text).split('\n');
		var shapes = [];

		for (lineIndex in lines) {

			var f = OpenLayers.String.trim(lines[lineIndex]).split('\t');

			var l = parseFloat(f[1]);
			var b = parseFloat(f[2]);
			var r = parseFloat(f[3]);
			var t = parseFloat(f[4]);

			if (isNaN(l)||isNaN(b)||isNaN(r)||isNaN(t)) continue;

			shapes.push ({
				loader: this,
				gpx: f[0],
				color: null,
				bounds: new OpenLayers.Bounds (l, b, r, t),
				title: f[5] || f[0],
				description: f[6] || null,
				visibility: false,
				group: f[7] || 'jsonloader'
			});

			if (l < minLon) minLon = l;
			if (b < minLat) minLat = b;
			if (r > maxLon) maxLon = r;
			if (t > maxLat) maxLat = t;
		}

		this.shapes = shapes;

		if (minLon<maxLon && minLat<maxLat) this.shapesExtent =
			new OpenLayers.Bounds(minLon, minLat, maxLon, maxLat).
			transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject());
	},

	CLASS_NAME: 'OpenLayers.Control.JsonLoader'
});

//------------------------------------------------------------------------------
//	based on: trackloader.js,v 1.10 2015/07/16 17:28:36 wolf Exp $
//------------------------------------------------------------------------------
