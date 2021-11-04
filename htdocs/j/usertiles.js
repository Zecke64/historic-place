//------------------------------------------------------------------------------
//	$Id: usertiles.js,v 1.3 2016/12/09 19:56:58 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/ol2/usertiles
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

OpenLayers.Control.UserTiles=OpenLayers.Class(OpenLayers.Control,{

	//----------------------------------------------------------------------
	//	config
	//----------------------------------------------------------------------

	displayClass: 'olControlUserTiles',

	textButtonLabel: 'Neuer Tile-Layer',
	textButtonTitle: 'Lade zusätzlichen Tile-Layer',

	textPromptLayerURL: 'Layer URL (Google/OSM scheme) Exemple:\nhttps://warper.wmflabs.org/maps/tile/1519/{z}/{x}/{y}.png',
	textPromptLayerName: 'Layer Name?',

	buttonStyle: 'display:none',

	exampleURL: '',

	userTilesEphemeral:         true,
	userTilesIsBaseLayer:       false,
	userTilesLayerGroup:        'usertiles',
	userTilesRadioGroup:        null,
	userTilesSphericalMercator: true,
	userTilesVisibility:        false,

	debug: false,

	//----------------------------------------------------------------------
	//	variables
	//----------------------------------------------------------------------

	buttonElement: null,

	//----------------------------------------------------------------------
	//	create html and make control visible
	//----------------------------------------------------------------------

	draw:function(px) {

		OpenLayers.Control.prototype.draw.apply(this,arguments);

		var control = this;

		this.buttonElement=document.createElement('button');
		this.buttonElement.title=this.textButtonTitle;
		this.buttonElement.style=this.buttonStyle;

		this.buttonElement.onclick=function(evt){

			control.queryLayer();
			OpenLayers.Event.stop(evt, true);
		};

		this.buttonElement.onmousedown=function(evt){
			OpenLayers.Event.stop(evt, true);
		};

		this.div.appendChild(this.buttonElement);

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

				control.queryLayer();
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
	//	ask for layer url
	//----------------------------------------------------------------------

	queryLayer: function() {

		var url = prompt (OpenLayers.String.format (this.textPromptLayerURL, this),
				this.debug? this.exampleURL : '');
		if (!url) return;

		var match = url.match(/^\s*(https?:\/\/(([\w.-]+)([^{\s]*\w)?)\S+)\s*$/, url);
		if (!match) {

			alert ('Invalid URL:\n' + url);
			return;
		}

		url  = match[1];
		var name = prompt (this.textPromptLayerName, match[2]);
		var attr = '©' + match[3];

		if (!name) return;

		url = url.replace(/\$?\{/g, '${');

		if (this.debug) alert ('Name: ' + name + '\nURL: ' + url + '\nAttribution: ' + attr);

		this.createLayer (name, url, attr);
	},

	//----------------------------------------------------------------------
	//	create layer
	//----------------------------------------------------------------------

	createLayer: function (name, url, attribution) {

		//--------------------------------------------------------------
		//	create tile layer
		//--------------------------------------------------------------

		var newLayer = new OpenLayers.Layer.XYZ(name, url, {

                        attribution: attribution,
			layerGroup:        this.userTilesLayerGroup,
			radioGroup:        this.userTilesRadioGroup,
			isBaseLayer:       this.userTilesIsBaseLayer,
			visibility:        this.userTilesVisibility,
			sphericalMercator: this.userTilesSphericalMercator,
			ephemeral:         this.userTilesEphemeral
                });

		this.map.addLayer (newLayer);
		this.map.setLayerIndex (newLayer, 0);
	},

	//----------------------------------------------------------------------
	//	class name
	//----------------------------------------------------------------------

	CLASS_NAME: 'OpenLayers.Control.UserTiles'
});

//------------------------------------------------------------------------------
//	$Id: usertiles.js,v 1.3 2016/12/09 19:56:58 wolf Exp $
//------------------------------------------------------------------------------
