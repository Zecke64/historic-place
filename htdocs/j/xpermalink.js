//------------------------------------------------------------------------------
//	$Id: xpermalink.js,v 1.2 2014/09/05 11:14:45 wolf Exp wolf $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/openlayers/xperm.htm
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

(function(){

	//----------------------------------------------------------------------
	//	make controls signaling activation
	//----------------------------------------------------------------------

	var controlActivate = OpenLayers.Control.prototype.activate;

	OpenLayers.Control.prototype.activate = function () {

		if (!controlActivate.apply(this, arguments)) return false;

		if (this.permaId) this.map.events.triggerEvent("changelayer", {
			layer: this, property: "activated"
		});

		return true;
	};

	//----------------------------------------------------------------------
	//	make controls signaling deactivation
	//----------------------------------------------------------------------

	var controlDeactivate = OpenLayers.Control.prototype.deactivate;

	OpenLayers.Control.prototype.deactivate = function () {

		if (!controlDeactivate.apply(this, arguments)) return false;

		if (this.permaId) this.map.events.triggerEvent("changelayer", {
			layer: this, property: "deactivated"
		});

		return true;
	};

	//----------------------------------------------------------------------
	//	replace permalink "layers=" field
	//----------------------------------------------------------------------

	var permalinkCreateParams = OpenLayers.Control.Permalink.prototype.createParams;

	OpenLayers.Control.Permalink.prototype.createParams = function (center, zoom, layers) {

		var result = permalinkCreateParams.apply(this, arguments);
		delete result.layers;

		var add = [];
		var sub = [];

		var nBaseLayers = 0;

		var layers = layers || this.map.layers;
		for (var i=0, len=layers.length; i<len; i++) {

			var layer = layers[i];
			if (layer.isBaseLayer) nBaseLayers++;

			if (!layer.permaId) continue;

			if (layer.isBaseLayer) {

				if (layer==this.map.baseLayer && nBaseLayers >= 2) {

					add.push(layer.permaId);
				}
				continue;
			}

			if (typeof(layer.baseVisibility) != 'boolean') continue;

			var visibility = layer.getVisibility();
			if (visibility == layer.baseVisibility) continue;

			if (visibility) add.push(layer.permaId); else sub.push(layer.permaId);
		}

		var controls = this.map.controls;
		for (var i=0, len=controls.length; i<len; i++) {

			var control = controls[i];
			if (!control.permaId) continue;

			var isActive = control.activate && control.deactivate ? control.active :
				control.div.style.display != 'none';

			if (!isActive == !control.autoActivate) continue;

			if (isActive) add.push(control.permaId); else sub.push(control.permaId);
		}
    
		if (sub.length) {
    
			result.layers = add.sort().join('') + '-' + sub.sort().join('');

		} else if (add.length) {
    
			result.layers = add.sort().join('');
		}

		return result;
	};

	//----------------------------------------------------------------------
	//	process layers on load
	//----------------------------------------------------------------------

	var argParserSetMap = OpenLayers.Control.ArgParser.prototype.setMap;

	OpenLayers.Control.ArgParser.prototype.setMap = function (map) {

		argParserSetMap.apply(this, arguments);

		//--------------------------------------------------------------
		//	split args.layers
		//--------------------------------------------------------------

		var args = this.getParameters();
		this.map.includePermaIdPattern = args.layers && args.layers.split('-')[0] || '';
		this.map.excludePermaIdPattern = args.layers && args.layers.split('-')[1] || '';

		//--------------------------------------------------------------
		//	process args.layers first
		//--------------------------------------------------------------

		for (var i=0; i<map.layers.length; i++) {

			this.onAddLayer({layer: map.layers[i]});
		}

		this.map.events.register('addlayer', this, this.onAddLayer);

		//--------------------------------------------------------------
		//	process args.controls
		//--------------------------------------------------------------

		for (var i=0; i<map.controls.length; i++) {

			var control = map.controls[i];

			if (!control.permaId) continue;

			if (this.map.excludePermaIdPattern.indexOf(control.permaId)>=0) {

				control.deactivate();

			} else if (this.map.includePermaIdPattern.indexOf(control.permaId)>=0) {

				control.activate();
			}
		}

		//--------------------------------------------------------------
		//	process lat, lon
		//--------------------------------------------------------------

		var lat = parseFloat(args.lat);
		var lon = parseFloat(args.lon);
		this.displayProjection = new OpenLayers.Projection('EPSG:4326');

		if (!isNaN(lat) && !isNaN(lon)) {

			this.center = new OpenLayers.LonLat(lon, lat);
			if (args.zoom) this.zoom = parseFloat(args.zoom);

			this.map.events.register('changebaselayer', this, this.setCenter);
			this.setCenter();
		}
	};
   
	OpenLayers.Control.ArgParser.prototype.onAddLayer = function (properties) {

		var layer = properties.layer;

		if (!layer.permaId) return;

		if (typeof(layer.baseVisibility) == 'boolean') return;

		layer.baseVisibility = layer.visibility;

		if (this.map.excludePermaIdPattern.indexOf(layer.permaId)>=0) {

			layer.setVisibility(false);

		} else if (this.map.includePermaIdPattern.indexOf(layer.permaId)>=0) {

			if (layer.isBaseLayer) {
				this.map.setBaseLayer(layer);
			} else {
				layer.setVisibility(true);
			}
		}
	};

	//----------------------------------------------------------------------
	//	process controls on load
	//----------------------------------------------------------------------

	var mapAddControl = OpenLayers.Map.prototype.addControl;

	OpenLayers.Map.prototype.addControl = function (control, px) {

		if (typeof(this.includePermaIdPattern) != 'string' ||
			typeof(this.excludePermaIdPattern) != 'string' ||
			!control.permaId) {

			mapAddControl.apply(this, arguments);
			return;
		}

		var savedAutoActivate = control.autoActivate;

		if (this.includePermaIdPattern.indexOf(control.permaId)>=0) {

			control.autoActivate = true;
		}

		if (this.excludePermaIdPattern.indexOf(control.permaId)>=0) {

			control.autoActivate = false;
		}

		mapAddControl.apply(this, arguments);

		control.autoActivate = savedAutoActivate;
	};
})();

//------------------------------------------------------------------------------
//	$Id: xpermalink.js,v 1.2 2014/09/05 11:14:45 wolf Exp wolf $
//------------------------------------------------------------------------------
