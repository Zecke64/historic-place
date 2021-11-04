//------------------------------------------------------------------------------
//	$Id: layerchanger.js,v 1.46 2017/03/07 22:24:23 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/openlayers/layerchanger.htm
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------
//
//	Based on OpenLayers.Control.LayerChanger provided by OpenLayers 2.13.1
//
//	http://dev.openlayers.org/releases/OpenLayers-2.13.1/lib/OpenLayers/Control/LayerSwitcher.js
//
//------------------------------------------------------------------------------

OpenLayers.Control.LayerChanger = OpenLayers.Class(OpenLayers.Control, {

	//----------------------------------------------------------------------
	//	Configuration
	//----------------------------------------------------------------------

	controls:		null,
	maxGroupsOpen:		null,
	mapLinks:		null,
	mapLinkExtendParams:	null,

	minimizeButtonImageURL: null,
	maximizeButtonImageURL: null,

	withOpacityButtons:	true,
	minOpacity:		0.5,
	opacityStep:		0.1,

	withFullZoomButton:	false,
	withDeleteButton:	false,
	hideMinMaxButtons:	false,

	enableAutoClose:	false,	// autoclose groups if box overflows map

	toggleKeyCode:		null,
	defaultPosition:	0,

	//----------------------------------------------------------------------
	//	children of this.div:
	//----------------------------------------------------------------------

	layersDiv:		null,
	minimizeDiv:		null,
	maximizeDiv:		null,

	//----------------------------------------------------------------------
	//	State
	//----------------------------------------------------------------------

	minimized:		null,
	mustRedraw:		false,
	layerStates:		null,
	groupsHidden:		null,
	minTableWidth:		100,

	//----------------------------------------------------------------------
	//	Text
	//----------------------------------------------------------------------

	textHeaderControls:	'Steuerelemente',
	textHeaderLinks:	'Verweise auf andere Karten',

	textShowLayerChanger:	'Zeigt den Layerchanger',
	textHideLayerChanger:	'Versteckt den LayerChanger',

	textShowGroup:		'Zeigt diese Gruppe',
	textHideGroup:		'Versteckt diese Gruppe',

	textShowLayer:		'Zeigt diese Ebene',
	textHideLayer:		'Versteckt diese Ebene',
	textMakeBaseLayer:	'W\xe4hlt diese Ebene als Basisebene',

	textShowControl:	'Zeigt dieses Steuerelement',
	textHideControl:	'Versteckt dieses Steuerelement',

	textMinusLayerOpacity:	'Verringert die Deckkraft der Ebene',
	textPlusLayerOpacity:	'Erh\xf6ht die Deckkraft der Ebene',

	textMinusControlOpacity:'Verringert die Deckkraft des Steuerelements',
	textPlusControlOpacity:	'Erh\xf6ht die Deckkraft des Steuerelements',

	textFullZoom:		'Zoomt auf Ausdehnung',
	textDelete:		'Entfernt das Layer',

	textZoomIn:		'Bitte zuerst von ${zoom} auf ${minZoom} hineinzoomen',
	textNoIntersection:	'Von Zielkarte abgedeckter Bereich nicht im Fenster',

	labelButtonFullZoom:	'\u25a0',	// Rectangle
	labelButtonDelete:	'\u00d7',	// multiply-x
			//	'\x267b',	// Recycling

	//----------------------------------------------------------------------
	//	Images
	//----------------------------------------------------------------------


	closerURL:	'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAA' +
		'AADFBMVEXAwMDMzMyZmZlmZmY5B4mWAAAAAXRSTlMAQObY' +
		'ZgAAACpJREFUCJljYFq1atUCBs7Q0NAEBlUwORUvOf3//7' +
		'8wEr9KiGkQk8G2AAAhACaFeLd5EwAAAABJRU5ErkJggg==',

	openerURL:	'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAAD' +
		'FBMVEXAwMDMzMyZmZlmZmY5B4mWAAAAAXRSTlMAQObYZgAAAD' +
		'RJREFUCJljYOBatWoBA8PS0NAEBqZQEMkJJlVDa+HkVGSy/v9' +
		'fOIkkjqweYgLENIjJYFsAVtEi7RlpX9gAAAAASUVORK5CYII=',

	//----------------------------------------------------------------------
	//	private variables
	//----------------------------------------------------------------------

	nextMinorPosition: null,
	mapLinkTRs: null,
	quirk: null,		// Konquerer aka KHTML

	//----------------------------------------------------------------------
	//	OpenLayers.Control:	Constructor
	//----------------------------------------------------------------------

	initialize: function(options) {

		this.quirk = navigator.userAgent && navigator.userAgent.indexOf('KHTML')>=0;

		OpenLayers.Control.prototype.initialize.apply(this, arguments);

		this.layerStates = [];
		this.groupsHidden= {};
	},

	//----------------------------------------------------------------------
	//	OpenLayers.Control:	Destructor
	//----------------------------------------------------------------------

	destroy: function() {

		this.map.events.un({
			addlayer:	this.redraw,
			changelayer:	this.redraw,
			removelayer:	this.redraw,
			changebaselayer:this.redraw,
			moveend:	this.onMoveEnd,
			scope: this
		});

		if (this.boundOnKeypress) {
			OpenLayers.Event.stopObserving (document, 'keypress', this.boundOnKeypress);
		}

		if (this.div) this.div.innerHTML = '';

		OpenLayers.Control.prototype.destroy.apply(this, arguments);
	},

	//----------------------------------------------------------------------
	//	OpenLayers.Control:	Attached to map
	//----------------------------------------------------------------------

	setMap: function(map) {

		OpenLayers.Control.prototype.setMap.apply(this, arguments);
	},

	//----------------------------------------------------------------------
	//	OpenLayers.Control:	Create HTML-Elements, return main <div>
	//----------------------------------------------------------------------

	draw: function() {

		OpenLayers.Control.prototype.draw.apply(this);

		var changer = this; // for closure

		//--------------------------------------------------------------
		//	allow bottom overflow
		//--------------------------------------------------------------

		if (this.enableAutoClose) {

			this.div.style.bottom = 'auto';
		}

		//--------------------------------------------------------------
		//	layers div
		//--------------------------------------------------------------

		this.layersDiv = document.createElement('div');
		this.layersDiv.setAttribute ('class', 'layersDiv');
		this.layersDiv.ondblclick = function(evt) { OpenLayers.Event.stop(evt); };

		this.div.appendChild(this.layersDiv);

		//--------------------------------------------------------------
		//	prevent mousedown/touchstart events reaching the map
		//--------------------------------------------------------------

		this.layersDiv.onmousedown= function(evt) {

			OpenLayers.Event.stop(evt, true);
			return null;
		};

		this.layersDiv.ontouchstart = function(evt) {

			OpenLayers.Event.stop(evt, true);
			return null;
		};

		//--------------------------------------------------------------
		//	maximize button
		//--------------------------------------------------------------

		var imgURL = this.maximizeButtonImageURL || this.openerURL;

		this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(
			'OpenLayers_Control_MaximizeDiv', null, null, imgURL, 'absolute');

		OpenLayers.Element.addClass(this.maximizeDiv, 'maximizeDiv olButton');
		this.maximizeDiv.setAttribute('title', this.textShowLayerChanger);
		this.maximizeDiv.style.display = 'none';
		this.maximizeDiv.onclick      = function(evt) {changer.maximizeControl(evt);};
		this.maximizeDiv.ontouchstart = function(evt) {changer.maximizeControl(evt);};

		this.div.appendChild(this.maximizeDiv);

		//--------------------------------------------------------------
		//	minimize button div
		//--------------------------------------------------------------

		var imgURL = this.minimizeButtonImageURL || this.closerURL;

		this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv(
			'OpenLayers_Control_MinimizeDiv', null, null, imgURL, 'absolute');

		OpenLayers.Element.addClass(this.minimizeDiv, 'minimizeDiv olButton');
		this.minimizeDiv.setAttribute('title', this.textHideLayerChanger);
		this.minimizeDiv.style.display = 'none';
		this.minimizeDiv.onclick      = function(evt) {changer.minimizeControl(evt);};
		this.minimizeDiv.ontouchstart = function(evt) {changer.minimizeControl(evt);};

		this.div.appendChild(this.minimizeDiv);

		//--------------------------------------------------------------
		//	attach events
		//--------------------------------------------------------------

		this.map.events.on({
			addlayer:	this.redraw,
			changelayer:	this.redraw,
			removelayer:	this.redraw,
			changebaselayer:this.redraw,
			moveend:	this.onMoveEnd,
			scope: this
		});

		var control = this; // closure

		this.boundOnKeypress = function (evt) {

			return control.onKeypress(evt);
		};

		OpenLayers.Event.observe (document, 'keypress', this.boundOnKeypress);

		//--------------------------------------------------------------
		//	make visible
		//--------------------------------------------------------------

		if (!this.outsideViewport) {

			if (this.minimized===false) {
				this.maximizeControl();
			} else {
				this.minimizeControl();
			}
		}

		this.redraw();

		return this.div;
	},

	//----------------------------------------------------------------------
	//	check if maps layer structure changed
	//----------------------------------------------------------------------

	checkRedraw: function() {

		if (this.map.layers.length != this.layerStates.length) {

			return true;
		}

		for (var i in this.layerStates) {

			var layerState	= this.layerStates[i];
			var layer	= this.map.layers [i];

			if ( (layerState.name != layer.name) ||
				 (layerState.inRange != layer.inRange) ||
				 (layerState.id != layer.id) ||
				 (layerState.visibility != layer.visibility) ) {
				return true;
			}
		}

		return false;
	},

	//----------------------------------------------------------------------
	//	create or recreate table
	//----------------------------------------------------------------------

	redraw: function(force) {

		if (force) this.layerStates = [];

		//--------------------------------------------------------------
		//	be lazy
		//--------------------------------------------------------------

		if (this.minimized===true) {

			this.mustRedraw	= true;
			return;
		}

		this.mustRedraw	= false;

		if (!this.checkRedraw()) return;

		//--------------------------------------------------------------
		//	create groups from configuration
		//--------------------------------------------------------------

		var layerGroupMap = {};
		var layerGroups   = [];

		if (this.layerGroups) for (var groupIndex in this.layerGroups) {

			var layerGroupInfo = this.layerGroups[groupIndex];

			var id = layerGroupInfo.id;
			if (!id || layerGroupMap[id]) continue;

			var layerGroup = {

				id:	id,
				name:	layerGroupInfo.name || id,
				trList:	[]
			};

			layerGroups.push (layerGroup);
			layerGroupMap[id]=layerGroup;
			if (this.groupsHidden[id]==null) {
				this.groupsHidden[id]=!!layerGroupInfo.hidden;
			}
		}

		//--------------------------------------------------------------
		//	prepend main group if missing
		//--------------------------------------------------------------

		if (!layerGroupMap.main) {

			var id = 'main';
			var layerGroup = {

				id:	id,
				name:	OpenLayers.i18n('Base Layer'),
				trList:	[]
			};

			layerGroups.unshift(layerGroup);
			layerGroupMap[id] = layerGroup;
			if (this.groupsHidden[id]==null) {
				this.groupsHidden[id]=!!layerGroup.hidden;
			}
		}

		//--------------------------------------------------------------
		//	append data group if missing
		//--------------------------------------------------------------

		if (!layerGroupMap.data) {

			var id = 'data';
			var layerGroup = {

				id:	id,
				name:	OpenLayers.i18n('Overlays'),
				trList:	[]
			};

			layerGroups.push (layerGroup);
			layerGroupMap[id]=layerGroup;
			if (this.groupsHidden[id]==null) {
				this.groupsHidden[id]=!!layerGroup.hidden;
			}
		}

		//--------------------------------------------------------------
		//	append ctrl group if missing
		//--------------------------------------------------------------

		if (!layerGroupMap.ctrl) {

			var id = 'ctrl';
			var layerGroup = {

				id:	id,
				name:	this.textHeaderControls,
				hidden:	true,
				trList:	[]
			};

			layerGroups.push (layerGroup);
			layerGroupMap[id]=layerGroup;
			if (this.groupsHidden[id]==null) {
				this.groupsHidden[id]=!!layerGroup.hidden;
			}
		}

		//--------------------------------------------------------------
		//	append link group if missing
		//--------------------------------------------------------------

		if (!layerGroupMap.link) {

			var id = 'link';
			var layerGroup = {

				id:	id,
				name:	this.textHeaderLinks,
				hidden:	true,
				trList:	[]
			};

			layerGroups.push (layerGroup);
			layerGroupMap[id]=layerGroup;
			if (this.groupsHidden[id]==null) {
				this.groupsHidden[id]=!!layerGroup.hidden;
			}
		}

		//--------------------------------------------------------------
		//	groups
		//--------------------------------------------------------------

		var radioGroupMap = {};
		var linkGroupMap = {};

		//--------------------------------------------------------------
		//	layout
		//--------------------------------------------------------------

		this.nColumns = 2 + (this.withFullZoomButton||this.withDeleteButton?1:0) +
				(this.withOpacityButtons||this.controlOpacity?1:0);

		//--------------------------------------------------------------
		//	assign controls to groups
		//--------------------------------------------------------------

		this.nextMinorPosition = 0;

		for (var controlIndex in this.map.controls) {

			var control = this.map.controls[controlIndex];

			if (control==this || control.displayInLayerChanger===false ||
				control.displayInLayerSwitcher===false) continue;

			if (!control.displayInLayerChanger &&
				!control.displayInLayerSwitcher && this.controls !== true) {

				if (!(this.controls instanceof Array)) continue;

				if (OpenLayers.Util.indexOf(this.controls, control)<0 &&
				OpenLayers.Util.indexOf(this.controls, control.CLASS_NAME)<0) {

					continue;
				}
			}

			// No config of 'Control' text cause it can't happen [tm]

			var title = control.title || control.name || control.CLASS_NAME &&
				control.CLASS_NAME.split('.').pop() || 'Control';

			//------------------------------------------------------
			//	add control to layer group
			//------------------------------------------------------

			var layerGroup	= control.layerGroup && layerGroupMap[control.layerGroup]
				|| layerGroupMap.ctrl;

			var isChecked = control.activate && control.deactivate ? control.active :
					control.div.style.display != 'none';

			//------------------------------------------------------
			//	radio and link groups
			//------------------------------------------------------

			if (control.radioGroup) {

				var layerList = radioGroupMap[control.radioGroup] || [];
				radioGroupMap[control.radioGroup] = layerList;
				layerList.push(control);
				control.radioPeers = layerList;
			}

			if (control.linkGroup) {

				var layerList = linkGroupMap[control.linkGroup] || [];
				linkGroupMap[control.linkGroup] = layerList;
				layerList.push(control);
				control.linkPeers = layerList;
			}

			this.addObject (layerGroup, control, title,
				true,		// isControl
				false,		// isDisabled
				isChecked,
				false);		// isBaseLayer
		}

		//--------------------------------------------------------------
		//	assign layers to groups
		//--------------------------------------------------------------

		var layers = this.map.layers.slice();
		this.layerStates = [];

		for (var layerIndex in layers) {

			//------------------------------------------------------
			//	prepare layer data
			//------------------------------------------------------

			var layer = layers[layerIndex];

			//------------------------------------------------------
			//	save state for change check
			//------------------------------------------------------

			this.layerStates.push ({
				id:		layer.id,
				name:		layer.name,
				visibility:	layer.visibility,
				inRange:	layer.inRange
			});

			//------------------------------------------------------
			//	get layer info
			//------------------------------------------------------

			if (!layer.displayInLayerChanger &&
				!layer.displayInLayerSwitcher) continue;

			var isBaseLayer	= layer.isBaseLayer;
			var isChecked	= isBaseLayer? layer==this.map.baseLayer : layer.getVisibility();
			var isDisabled	= !isBaseLayer && !layer.inRange;

			var layerGroup	= layer.layerGroup && layerGroupMap[layer.layerGroup]
				|| (isBaseLayer ? layerGroupMap.main : layerGroupMap.data);

			//------------------------------------------------------
			//	radio and link groups
			//------------------------------------------------------

			if (layer.radioGroup) {

				var layerList = radioGroupMap[layer.radioGroup] || [];
				radioGroupMap[layer.radioGroup] = layerList;
				layerList.push(layer);
				layer.radioPeers = layerList;
			}

			if (layer.linkGroup) {

				var layerList = linkGroupMap[layer.linkGroup] || [];
				linkGroupMap[layer.linkGroup] = layerList;
				layerList.push(layer);
				layer.linkPeers = layerList;
			}

			//------------------------------------------------------
			//	add layer to layer group
			//------------------------------------------------------

			this.addObject (layerGroup, layer, layer.name,
				false,		// isControl
				isDisabled,
				isChecked,
				isBaseLayer);
		}

		//--------------------------------------------------------------
		//	assign maplinks to groups
		//--------------------------------------------------------------

		this.mapLinkTRs = [];

		if (this.mapLinks) for (var mapLinkIndex in this.mapLinks) {

			//------------------------------------------------------
			//	prepare maplink data
			//------------------------------------------------------

			var mapLink = this.mapLinks[mapLinkIndex];

			var layerGroup	= mapLink.layerGroup && layerGroupMap[mapLink.layerGroup]
				|| layerGroupMap.link;

			//------------------------------------------------------
			//	add maplink to layer group
			//------------------------------------------------------

			this.addMapLink (layerGroup, mapLink);
		}

		this.updateMapLinkEntries();

		//--------------------------------------------------------------
		//	create <table>
		//--------------------------------------------------------------

		var tableElement = document.createElement('table');
		tableElement.style.minWidth = this.minTableWidth + 'px';
		tableElement._changer = this;

		for (var layerIndex in layerGroups) {

			var layerGroup = layerGroups[layerIndex];
			if (layerGroup.trList.length==0) continue;

			//------------------------------------------------------
			//	sort trList
			//------------------------------------------------------

			layerGroup.trList.sort(function(a,b) {
				return a._object._posInLayerChanger-b._object._posInLayerChanger;
			});

			//------------------------------------------------------
			//	create header <tr><th> {layerGroupName}
			//------------------------------------------------------

			var isHidden = this.groupsHidden[layerGroup.id];

			var thElem = document.createElement('th');
			thElem.setAttribute('colspan', this.nColumns);
			thElem.setAttribute('class',   isHidden? 'hidden' : 'visible');
			thElem.setAttribute('title',   isHidden ? this.textShowGroup : this.textHideGroup);

			thElem.onclick      = this.onGroupVisibilityToggle;
			thElem.ontouchstart = this.onGroupVisibilityToggle;
			thElem._changer= this;
			thElem._groupId= layerGroup.id;
			thElem.appendChild(document.createTextNode(layerGroup.name));

			//------------------------------------------------------
			//	create <tbody> and append <tr> from trList
			//------------------------------------------------------

			var groupBody = document.createElement('tbody');
			groupBody.style.display = isHidden ? 'none' : '';

			for (var trIndex in layerGroup.trList) {

				groupBody.appendChild(layerGroup.trList[trIndex]);
			}

			//------------------------------------------------------
			//	Append group header and group body to table
			//------------------------------------------------------

			var groupHeader = document.createElement('tr');
			groupHeader.setAttribute('class', 'layerChangerGroupHeader');
			groupHeader.appendChild (thElem);

			tableElement.appendChild(groupHeader);
			tableElement.appendChild(groupBody);
		}

		this.layersDiv.innerHTML = '';
		this.layersDiv.appendChild (tableElement);
	},

	//----------------------------------------------------------------------
	//	Add layer or control
	//----------------------------------------------------------------------

	addObject: function (layerGroup, object, name,
			isControl, isDisabled, isChecked, isBaseLayer) {

		var pos = parseInt(object.positionInLayerChanger);
		if (isNaN(pos)) pos = this.defaultPosition;
		object._posInLayerChanger = 1e5 * pos + ++this.nextMinorPosition;

		//--------------------------------------------------------------
		//	<tr>
		//--------------------------------------------------------------

		var trElem = document.createElement('tr');
		trElem._object = object;

		if (isDisabled) trElem.setAttribute('class', 'disabled');

		layerGroup.trList.push(trElem);

		//--------------------------------------------------------------
		//	<td> <input>
		//--------------------------------------------------------------

		var tooltip =
			isControl && isChecked? this.textHideControl :
			isControl ? this.textShowControl :
			!isBaseLayer && isChecked? this.textHideLayer :
			!isBaseLayer ? this.textShowLayer :
			!isChecked? this.textMakeBaseLayer : '';

		var inputElem = document.createElement('input');

		inputElem.setAttribute('class', 'olButton');
		inputElem.setAttribute('title', tooltip);
		inputElem.setAttribute('type',  isBaseLayer ? 'radio' : 'checkbox');
		inputElem.setAttribute('name',  name),
		inputElem.setAttribute('value', name);

		inputElem.checked	= isChecked;
		inputElem._checked	= isChecked;
		inputElem.defaultChecked= isChecked;
		inputElem.disabled	= isDisabled;
		inputElem.onclick	= this.onInputClick;
		inputElem.ontouchstart	= this.onInputClick;

		var inputTdElem = document.createElement('td');
		inputTdElem.appendChild (inputElem);

		trElem.appendChild (inputTdElem);

		//--------------------------------------------------------------
		//	<td> <label>
		//--------------------------------------------------------------

		var labelElem = document.createElement('label');

		labelElem.setAttribute('class', 'labelElem olButton');
		labelElem.setAttribute('title', object.description || '');

		labelElem._input = inputElem;
		labelElem.appendChild (document.createTextNode (name));
		labelElem.onclick = function(evt) {
			if (evt != null) OpenLayers.Event.stop(evt);
			this._input.click();
			return false;
		};
		labelElem.ontouchstart = function(evt) {
			if (evt != null) OpenLayers.Event.stop(evt);
			this._input.click();
			return false;
		};
		var labelTdElem = document.createElement('td');
		labelTdElem.appendChild (labelElem);

		trElem.appendChild (labelTdElem);

		//--------------------------------------------------------------
		//	<td> {<opacity-changer}
		//--------------------------------------------------------------

		if (this.withOpacityButtons || this.controlOpacity) {

			var container = document.createElement('td');
			container.setAttribute('class', 'opacityChanger');
			trElem.appendChild (container);

			if (object.div && (!isControl || object.div.firstChild)) {

				var minusButton = document.createElement('button');

				minusButton.setAttribute('class', 'minus');
				minusButton.setAttribute('title', isControl?
					this.textMinusControlOpacity : this.textMinusLayerOpacity);

				minusButton.appendChild(document.createTextNode('\u2013')); // long "-"
				minusButton.onclick      = this.onMinusOpacity;
				minusButton.ontouchstart = this.onMinusOpacity;

				container.appendChild (minusButton);

				var plusButton = document.createElement('button');

				plusButton.setAttribute('class', 'plus');
				plusButton.setAttribute('title', isControl?
					this.textPlusControlOpacity : this.textPlusLayerOpacity);

				plusButton.appendChild(document.createTextNode('+'));
				plusButton.onclick      = this.onPlusOpacity;
				plusButton.ontouchstart = this.onPlusOpacity;

				container.appendChild (plusButton);
			}
		}

		//--------------------------------------------------------------
		//	<td> {autozoom}
		//--------------------------------------------------------------

		if (this.withFullZoomButton||this.withDeleteButton) {

			var container = document.createElement('td');

			container.setAttribute('class', 'autoZoom');

			trElem.appendChild (container);

			if (this.withFullZoomButton && object.getDataExtent && (
				object.strategies && object.strategies[0] &&
					object.strategies[0].CLASS_NAME=='OpenLayers.Strategy.Fixed'
				|| object.CLASS_NAME=='OpenLayers.Layer.Vector' && !object.strategies
				|| object.location && object.createHtmlFromData)) {

				var zoomButton = document.createElement('button');

				zoomButton.setAttribute('class', 'zoom');
				zoomButton.setAttribute('title', this.textFullZoom);

				zoomButton.disabled = !isChecked;
				zoomButton.appendChild(
					document.createTextNode(this.labelButtonFullZoom));
				zoomButton.onclick      = this.onFullZoom;
				zoomButton.ontouchstart = this.onFullZoom;
				container.appendChild (zoomButton);
			}

			if (this.withDeleteButton && object.ephemeral) {

				var deleteButton = document.createElement('button');

				deleteButton.setAttribute('class', 'delete');
				deleteButton.setAttribute('title', this.textDelete);

				deleteButton.appendChild(
					document.createTextNode(this.labelButtonDelete));
				deleteButton.onclick      = this.onDelete;
				deleteButton.ontouchstart = this.onDelete;
				container.appendChild (deleteButton);
			}
		}
	},

	//----------------------------------------------------------------------
	//	Add map link or control
	//----------------------------------------------------------------------

	addMapLink: function (layerGroup, mapLink) {

		if (!mapLink || !mapLink.label) return;

		//--------------------------------------------------------------
		//	<tr>
		//--------------------------------------------------------------

		var pos = parseInt(mapLink.positionInLayerChanger);
		if (isNaN(pos)) pos = this.defaultPosition;
		mapLink._posInLayerChanger = 1e5 * pos + ++this.nextMinorPosition;

		var trElem = document.createElement('tr');
		trElem._object = mapLink;
		layerGroup.trList.push(trElem);
		this.mapLinkTRs.push(trElem);

		//--------------------------------------------------------------
		//	Label
		//--------------------------------------------------------------

		var textElem = document.createTextNode (mapLink.label);

		//--------------------------------------------------------------
		//	<a>label</a>
		//--------------------------------------------------------------

		var linkElem = document.createElement('a');
		linkElem.setAttribute('class', 'disabled');
		linkElem.setAttribute('href',  '/');

		linkElem._mapLink = mapLink;
		linkElem.appendChild (textElem);
		linkElem.onclick      = this.returnFalse;
		linkElem.ontouchstart = this.returnFalse;
		if (mapLink.target) linkElem.setAttribute('target', mapLink.target);

		//--------------------------------------------------------------
		//	<td> <a>
		//--------------------------------------------------------------

		var tdElem = document.createElement('td');
		tdElem.setAttribute('colspan', this.nColumns);
		tdElem.appendChild (linkElem);

		trElem.appendChild (tdElem);
	},

	//----------------------------------------------------------------------
	//	Update maplinks
	//----------------------------------------------------------------------

	updateMapLinkEntries: function() {

		if (!this.mapLinkTRs || !this.mapLinkTRs.length) return;

		//--------------------------------------------------------------
		//
		//--------------------------------------------------------------

		var replacement = {};

		var mapZoom = this.map.getZoom();
		replacement.zoom=mapZoom;

		var nDigits = Math.round (1 + 0.3 * mapZoom);

		var mapBounds = this.map.calculateBounds();
		if (mapBounds) {

			mapBounds = mapBounds.transform(this.map.getProjectionObject(),
				this.map.displayProjection);

			replacement.left   = mapBounds.left.toFixed(nDigits);
			replacement.bottom = mapBounds.bottom.toFixed(nDigits);
			replacement.right  = mapBounds.right.toFixed(nDigits);
			replacement.top    = mapBounds.top.toFixed(nDigits);
		}

		var mapCenter = this.map.getCenter();
		if (mapCenter) {

			mapCenter = mapCenter.transform(this.map.getProjectionObject(),
				this.map.displayProjection);

			replacement.lon = mapCenter.lon.toFixed(nDigits);
			replacement.lat = mapCenter.lat.toFixed(nDigits);
		}

		if (this.mapLinkExtendParams) {

			replacement = this.mapLinkExtendParams(replacement);
		}

		for (var index in this.mapLinkTRs) {

			var trElem = this.mapLinkTRs[index];
			var mapLink = trElem._object;
			var linkElem = trElem.firstChild.firstChild;
			if (!mapLink.baseURL) continue;

			var intersects = mapBounds && mapCenter && (!mapLink.bounds ||
				mapLink.bounds.left  < mapBounds.right &&
				mapLink.bounds.right > mapBounds.left  &&
				mapLink.bounds.bottom< mapBounds.top   &&
				mapLink.bounds.top   > mapBounds.bottom);

			if (!intersects) {

				linkElem.setAttribute ('class', 'disabled');
				linkElem.setAttribute ('href',  '/');
				linkElem.setAttribute ('title', this.textNoIntersection);

				linkElem.style.cursor = 'help';
				linkElem.onclick      = this.alertTitle;
				linkElem.ontouchstart = this.alertTitle;
				continue;
			}

			if (mapLink.minZoom>mapZoom) {

				linkElem.setAttribute('class', 'disabled');
				linkElem.setAttribute('href',  '/');
				linkElem.setAttribute('title', OpenLayers.String.format(this.textZoomIn,
					{zoom: mapZoom, minZoom: mapLink.minZoom}));

				linkElem.style.cursor = 'help';
				linkElem.onclick      = this.alertTitle;
				linkElem.ontouchstart = this.alertTitle;
				continue;
			}

			var url = mapLink.baseURL.replace(/{(\w+)}/g, function (match, arg) {

				var value = replacement[arg];
				return value || value===0? value : '';
			});

			linkElem.setAttribute ('href',  url);
			linkElem.removeAttribute ('class');
			linkElem.setAttribute ('title', linkElem._mapLink.title || '');

			linkElem.style.cursor = 'pointer';
			linkElem.onclick      = null;
			linkElem.ontouchstart = null;
		}
	},

	alertTitle: function() {

		alert (this.title);
		return false;
	},

	returnFalse: function() {

		return false;
	},

	//----------------------------------------------------------------------
	//	Remote control
	//----------------------------------------------------------------------

	setWithOpacityButtons: function (on) {

		this.withOpacityButtons = !!on;
		this.minTableWidth = 100;
		this.redraw(true);
	},

	setWithFullZoomButton: function (on) {

		this.withFullZoomButton = !!on;
		this.minTableWidth = 100;
		this.redraw(true);
	},

	setAllGroupsOpen: function (on) {

		var hide = !on;
		var changed = false;

		for (var groupId in this.groupsHidden) {

			if (this.groupsHidden[groupId]!=hide) changed=true;
			this.groupsHidden[groupId] = hide;
		}

		if (changed) this.redraw(true);
	},

	//----------------------------------------------------------------------
	//	On click handler
	//----------------------------------------------------------------------

	onGroupVisibilityToggle: function (evt) {

		if (evt != null) OpenLayers.Event.stop(evt);

		var changer= this._changer;
		var tbody = this.parentElement.nextSibling;

		changer.minTableWidth = tbody.parentElement.offsetWidth;
		tbody.parentElement.style.minWidth = changer.minTableWidth + 'px';

		var hide = changer.groupsHidden[this._groupId] = !changer.groupsHidden[this._groupId];

		if (hide) {
			tbody.style.display='none';
			this.setAttribute('class', 'hidden');
			this.setAttribute('title', changer.textShowGroup);
		} else {
			tbody.style.display='';
			this.setAttribute('class', 'visible');
			this.setAttribute('title', changer.textHideGroup);
		}

		if (hide) return;

		//--------------------------------------------------------------
		//	if maxGroupsOpen eventually close groups
		//--------------------------------------------------------------

		if (changer.maxGroupsOpen) {

			var nGroupsOpen = 0;

			for (var element = tbody.parentElement.firstChild; element; element=element.nextSibling) {

				if (element.tagName != 'TR') continue;
				var thElement = element.firstChild;
				if (!changer.groupsHidden[thElement._groupId]) nGroupsOpen++;
			}

			for (var element = tbody.parentElement.lastChild; element; element=element.previousSibling) {

				if (nGroupsOpen <= changer.maxGroupsOpen) break;
				if (element.tagName != 'TR') continue;

				var thElement = element.firstChild;
				if (thElement==this || changer.groupsHidden[thElement._groupId]) continue;

				thElement.onclick (null);
				nGroupsOpen--;
			}
		}

		//--------------------------------------------------------------
		//	while box overflow, close groups
		//--------------------------------------------------------------

		if (changer.enableAutoClose && changer.div.offsetTop+changer.div.offsetHeight
							>changer.div.parentElement.offsetHeight) {

			for (var element = tbody.parentElement.lastChild; element; element=element.previousSibling) {

				if (element.tagName != 'TR') continue;

				var thElement = element.firstChild;

				if (thElement==this || changer.groupsHidden[thElement._groupId]) continue;

				thElement.onclick (null);

				if (changer.div.offsetTop+changer.div.offsetHeight<=changer.div.parentElement.offsetHeight)
					break;
			}
		}

		if (changer.quirk) changer.redraw(true);
	},

	onInputClick: function(evt) {

		if (evt != null) OpenLayers.Event.stop(evt);

		if (this.disabled) return false;

		var layer  = this.parentElement.parentElement._object;
		var changer= this.parentElement.parentElement.parentElement.parentElement._changer;

		// Konquerer feuert (bis zum ersten mousemove) "onclick" *vor* dem togglen von checked.
		if (changer.quirk && this.type=='checkbox') this.checked = this._checked = !this._checked;

		if (this.type == 'radio') {

			this.checked = true;
			changer.map.setBaseLayer(layer);

		} else if (layer.setVisibility) {

			layer.setVisibility(this.checked);

			//------------------------------------------------------
			//	link and radio groups
			//------------------------------------------------------

			if (changer.processPeers(layer, this.checked)) changer.redraw(true);

		} else if (layer.activate && layer.deactivate) {

			changer.processPeers(layer, this.checked);

			if (this.checked) {

				layer.activate();

				if (layer.div && layer.div.style.display=='none') {
					layer.div.style.display='';
				}

			} else {

				layer.deactivate();
				if (layer.div) layer.div.style.display='none';
			}

			changer.redraw(true);

			if (this.checked && layer.autoDeactivate) {

				setTimeout(function() {

					layer.deactivate();
					if (layer.div) layer.div.style.display='none';
					changer.redraw(true);
				}, 3000);
			}
		}

		return false;
	},

	processPeers: function(component, on) {

		var controlChanged = false;

		if (on && component.radioPeers) {

			for (var i in component.radioPeers) {

				var peer = component.radioPeers[i];
				if (peer==component) continue;

				if (peer.setVisibility) {

					peer.setVisibility(false);
					continue;
				}

				if (peer.deactivate) peer.deactivate();
				if (peer.div) peer.div.style.display='none';

				controlChanged = true;
			}
		}

		if (component.linkPeers) {

			for (var i in component.linkPeers) {

				var peer = component.linkPeers[i];
				if (peer==component) continue;

				if (component.radioPeers &&
					OpenLayers.Util.indexOf(component.radioPeers,peer)>=0)
						continue;

				if (peer.setVisibility) {

					peer.setVisibility(on);
					continue;
				}

				if (peer.div) peer.div.style.display=on ? '' : 'none';

				if (on) {
					if (peer.activate) peer.activate();
				} else {
					if (peer.deactivate) peer.deactivate();
				}

				controlChanged = true;
			}
		}

		return controlChanged;
	},

	onMinusOpacity: function(evt) {

		if (evt != null) OpenLayers.Event.stop(evt);

		var layer = this.parentElement.parentElement._object;
		if (layer.visibility===false) return false;

		var changer= this.parentElement.parentElement.parentElement.parentElement._changer;
		oldOpacity = parseFloat(layer.div.style.opacity);
		if (isNaN(oldOpacity)) oldOpacity = 1.0;
		layer.div.style.opacity=Math.max(changer.minOpacity, oldOpacity-changer.opacityStep);
		return false;
	},

	onPlusOpacity: function(evt) {

		if (evt != null) OpenLayers.Event.stop(evt);

		var layer = this.parentElement.parentElement._object;
		if (!layer.visibility) return false;

		var changer= this.parentElement.parentElement.parentElement.parentElement._changer;
		oldOpacity = parseFloat(layer.div.style.opacity);
		if (isNaN(oldOpacity)) oldOpacity = 1.0;
		layer.div.style.opacity=Math.min(1.0, oldOpacity+changer.opacityStep);
		return false;
	},

	onMaxOpacity: function(evt) {

		if (evt != null) OpenLayers.Event.stop(evt);

		var layer = this.parentElement.parentElement._object;
		if (!layer.visibility) return false;

		layer.div.style.opacity=1.0;
		return false;
	},

	onFullZoom: function(evt) {

		if (evt != null) OpenLayers.Event.stop(evt);

		var layer = this.parentElement.parentElement._object;
		if (layer.getDataExtent && layer.getVisibility() &&
				layer.div && layer.div.firstChild) {

			layer.map.zoomToExtent(layer.getDataExtent());
		}

		return false;
	},

	onDelete: function(evt) {

		if (evt != null) OpenLayers.Event.stop(evt);

		var layer = this.parentElement.parentElement._object;
		layer.map.removeLayer(layer);
		layer.destroy();
		return false;
	},

	//----------------------------------------------------------------------
	//	Hotkeys
	//----------------------------------------------------------------------

	boundOnKeypress: null,

	onKeypress: function (evt) {

		if (evt.keyCode === this.toggleKeyCode) {

			this.toggleControl();
			return false;
		}

		var used = false;

		for (var i in this.map.controls) {

			var control = this.map.controls[i];

			if (!control.activationKeyCode ||
				!this.checkKeyCode(evt, control.activationKeyCode)) continue;

			var on = !control.active;
			this.processPeers(control, on);

			on? control.activate() : control.deactivate();
			used = true;
		}

		return !used;
	},

	checkKeyCode: function (evt, pattern) {

		if (!OpenLayers.Util.isArray(pattern)) return evt.keyCode === pattern;

		return OpenLayers.Util.indexOf(pattern, evt.keyCode) >= 0;
	},

	//----------------------------------------------------------------------
	//	Maximizer / minimizer
	//----------------------------------------------------------------------

	toggleControl: function(evt) {

		if (this.minimized) {

			this.maximizeControl(evt);

		} else {

			this.minimizeControl(evt);
		}
	},

	maximizeControl: function(evt) {

		if (evt != null) OpenLayers.Event.stop(evt);

		this.minimized			= false;

		if (this.mustRedraw) this.redraw();

		this.layersDiv.style.display	= '';
		this.div.style.overflowY	= 'auto';
		this.div.style.overflowX	= 'hidden';

		if (!this.hideMinMaxButtons) {
			this.minimizeDiv.style.display	= '';
			this.maximizeDiv.style.display	= 'none';
		}
	},

	minimizeControl: function(evt) {

		if (evt != null) OpenLayers.Event.stop(evt);

		this.layersDiv.style.display	= 'none';
		this.div.style.overflowY	= '';
		this.div.style.overflowX	= '';

		if (!this.hideMinMaxButtons) {
			this.minimizeDiv.style.display	= 'none';
			this.maximizeDiv.style.display	= '';
		}

		this.minimized			= true;
	},

	onMoveEnd: function(evt) {

		this.updateMapLinkEntries();
	},

	CLASS_NAME: 'OpenLayers.Control.LayerChanger'
});

//------------------------------------------------------------------------------
//	$Id: layerchanger.js,v 1.46 2017/03/07 22:24:23 wolf Exp $
//------------------------------------------------------------------------------
