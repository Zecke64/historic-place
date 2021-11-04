//------------------------------------------------------------------------------
//	$Id: localtracks.js,v 1.10 2016/04/17 06:53:35 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/openlayers/
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

OpenLayers.Control.LocalTracks=OpenLayers.Class(OpenLayers.Control,{

	//----------------------------------------------------------------------
	//	config
	//----------------------------------------------------------------------

	displayClass: 'olControlLocalTracks',

	fileSizeLimit: (1<<20),	// 1Mb

	textButtonLabel: 'Tracks einlesen',
	textButtonTitle: 'Lese GPX-Datei(en) aus dem lokalen Dateisystem',
	textFileSizeWarning: 'Die Datei "${name}" ist ${size} Bytes gro' +
		String.fromCharCode(223) + '.\n' +
		'Das Laden kann etwas dauern. Fortsetzen?',

	trackLayerGroup: 'local',

	pointStyle: {

		pointRadius: 5,
		strokeColor: '#0000ff',
		strokeWidth: 2,
		strokeOpacity: 0.8,
		fillOpacity: 0
	},

	trackStyle: {

		strokeColor: '#ff0000',
		strokeWidth: 5,
		strokeOpacity: 0.8
	},

	zoomToTracks: true,
	zoomToBoundingBox: true,
	useTrackName: true,

	uploadURL: null,

	trackProjection: new OpenLayers.Projection('EPSG:4326'),

	//----------------------------------------------------------------------
	//	variables
	//----------------------------------------------------------------------

	reader: null,
	filesToLoad: [],
	nextFile: null,
	bounds: null,

	//----------------------------------------------------------------------
	//	init
	//----------------------------------------------------------------------

	initialize: function(){

		OpenLayers.Control.prototype.initialize.apply(this,arguments);

		var control = this;

		try {
			this.reader = new FileReader();
			this.reader.onload = function(evt) {

				return control.readerOnLoad.apply(control, arguments);
			};

		} catch (e) {

			//alert ("Browser doesn't support FileReader-objects.");
		}
	},

	//----------------------------------------------------------------------
	//	destroy
	//----------------------------------------------------------------------

	destroy:function() {

		this.buttonElement = null;
		this.inputElement  = null;
		this.reader        = null;

		OpenLayers.Control.prototype.destroy.apply(this,arguments);
	},

	//----------------------------------------------------------------------
	//	create html and make control visible
	//----------------------------------------------------------------------

	draw:function(px) {

		OpenLayers.Control.prototype.draw.apply(this,arguments);

		var control = this;

		this.inputElement=document.createElement('input');
		this.inputElement.type='file';
		this.inputElement.multiple=true;
		this.inputElement.accept='.gpx';
		this.inputElement.style.display='none';
		this.inputElement.onchange=function(){control.inputOnChange(this);};

		this.buttonElement=document.createElement('button');
		this.buttonElement.disabled=this.reader==null;
		this.buttonElement.title=this.textButtonTitle;
		this.buttonElement.appendChild(document.createTextNode(this.textButtonLabel));
		this.buttonElement.onclick=function(evt){
			control.inputElement.click();
			OpenLayers.Event.stop(evt, true);
		};
		this.buttonElement.onmousedown=function(evt){
			OpenLayers.Event.stop(evt, true);
		};

		OpenLayers.Element.addClass(this.div, this.reader!=null?'enabled':'disabled');
		this.div.appendChild(this.buttonElement);
		this.div.appendChild(this.inputElement);

		return this.div;
	},

	//----------------------------------------------------------------------
	//	interface to LayerChanger
	//----------------------------------------------------------------------

	activate: function() {

		var result = OpenLayers.Control.prototype.activate.apply(this);

		if (this.displayInLayerSwitcher && result) {

			var control = this;
			window.setTimeout(function(){

				window.setTimeout(function() {
					control.map.events.register ('mousemove', control, control.onMouseMove);
				}, 1000);

				control.inputElement.click();
			}, 10);
		}

		return result;
	},

	deactivate: function() {

		var result = OpenLayers.Control.prototype.deactivate.apply(this);
		if (this.displayInLayerSwitcher && result) {
			this.map.events.triggerEvent("changelayer", {
				layer: this, property: "visibility"
			});
		}
		return result;
	},

	onMouseMove: function(evt) {

		this.map.events.unregister ('mousemove', this, this.onMouseMove);
		this.deactivate();
	},

	//----------------------------------------------------------------------
	//	files selected ind file selector box:
	//	push to file list and start loading
	//----------------------------------------------------------------------

	inputOnChange: function(inputElement) {

		if (this.displayInLayerSwitcher) {

			this.map.events.unregister ('mousemove', this, this.onMouseMove);
		}

		var files = inputElement.files;

		if (files != null) {

			for (var i=0; i<files.length; i++) {

				this.filesToLoad.push(files[i]);
			}
		}

		inputElement.value='';

		this.bounds = new OpenLayers.Bounds();

		this.loadFile();
		return false;
	},

	//----------------------------------------------------------------------
	//	get file from file list, check size and start loading
	//----------------------------------------------------------------------

	loadFile: function() {

		for (;;) {

			this.nextFile = this.filesToLoad.pop();

			if (!this.nextFile) break;

			if (!this.fileSizeLimit) break;
			if (this.nextFile.size <= this.fileSizeLimit) break;

			var msg = OpenLayers.String.format(this.textFileSizeWarning,{
				name: this.nextFile.name,
				size: this.nextFile.size});

			if (confirm(msg)) break;
		}

		if (!this.nextFile) {

			if (this.displayInLayerSwitcher) this.deactivate();
			return;
		}

		var control=this;

		window.setTimeout(function() {

			control.reader.readAsText(control.nextFile);
		}, 100);
	},

	//----------------------------------------------------------------------
	//	file loaded: call layer creator and load next file
	//----------------------------------------------------------------------

	readerOnLoad: function (event) {

		this.createLayer (this.nextFile.name, event.target.result);

		if (this.uploadURL) {
			OpenLayers.Request.POST({
				async:	true,
				url:	this.uploadURL + this.nextFile.name,
				data:	event.target.result
			});
		}

		this.loadFile ();
	},

	//----------------------------------------------------------------------
	//	create layer
	//----------------------------------------------------------------------

	createLayer: function (filename, text) {

		//--------------------------------------------------------------
		//	parse text
		//--------------------------------------------------------------

		var features = new OpenLayers.Format.GPX().read (text);
		if (!features || !features.length) return;

		//--------------------------------------------------------------
		//	reproject
		//--------------------------------------------------------------

		var remote=this.trackProjection;
		var local=this.map.getProjectionObject();

		if(!local.equals(remote)) {

			for (var i in features) {

				var geom=features[i].geometry;
				if(geom) geom.transform(remote,local);
			}
		}

		//--------------------------------------------------------------
		//	add style
		//--------------------------------------------------------------

		for (var i in features) {

			var feature = features[i];

			switch (feature.geometry && feature.geometry.CLASS_NAME) {

			case 'OpenLayers.Geometry.Point':

				feature.style = OpenLayers.Util.extend(this.pointStyle, null);
				break;

			default:

				feature.style = OpenLayers.Util.extend(this.trackStyle, null);
				break;
			}

			feature.style.cursor = 'help';

			var titles = [];

			if (feature.attributes && feature.attributes.name) {

				titles.push(feature.attributes.name);
			}

			titles.push('(' + filename + ')');

			feature.style.graphicTitle = titles.join('\n');
		}

		//--------------------------------------------------------------
		//	create layer and add features
		//--------------------------------------------------------------

		var match = text.match(/<name>([^<>]+)<\/name>/);
		var gpxname = match? match[1] :
			features[0].attributes && features[0].attributes.name || null;
		var name = this.useTrackName && gpxname || filename;

		var layer = new OpenLayers.Layer.Vector (name, {

			layerGroup: this.trackLayerGroup,
			ephemeral: true
		});

		this.map.addLayer (layer);
		this.map.setLayerIndex (layer, 0);

		layer.addFeatures(features);

		//--------------------------------------------------------------
		//	zoom to track
		//--------------------------------------------------------------

		if (this.zoomToTracks) {

			this.bounds.extend(layer.getDataExtent());
			if (this.bounds.left!==null) this.map.zoomToExtent(this.bounds);
		}
	},

	//----------------------------------------------------------------------
	//	class name
	//----------------------------------------------------------------------

	CLASS_NAME: 'OpenLayers.Control.LocalTracks'
});

//------------------------------------------------------------------------------
//	$Id: localtracks.js,v 1.10 2016/04/17 06:53:35 wolf Exp $
//------------------------------------------------------------------------------
