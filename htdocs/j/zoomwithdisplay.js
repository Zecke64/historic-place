//------------------------------------------------------------------------------
//	$Id: zoomwithdisplay.js,v 1.5 2019/07/22 23:15:30 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	https://www.netzwolf.info/ol2/zoomwithdisplay.html
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

/*jsl:option explicit*/

'use strict';

OpenLayers.Control.ZoomWithDisplay = OpenLayers.Class(OpenLayers.Control, {

	//----------------------------------------------------------------------
	//	text config
	//----------------------------------------------------------------------

	zoomInText: "+",
	zoomOutText: "\u2212",

	//----------------------------------------------------------------------
	//	style config
	//----------------------------------------------------------------------

	divStyle: 'position: absolute; width: 3ex; opacity: 1.0; border-radius: 4px; padding: 2px; font-family: sans-serif',
	buttonStyle: 'display: block; color: black; width: 100%; cursor: pointer; font-weight: bold;',
	displayStyle: 'display: block; color: black; width: 100%; font-weight: bold; text-align: center;',

	zoomIn:   null,
	zoomShow: null,
	zoomOut:  null,

	//----------------------------------------------------------------------
	//	destroy
	//----------------------------------------------------------------------

	destroy: function()  {

		if (this.map) {

			this.map.events.unregister('zoomend', this, this.updateZoom);
		}

		this.zoomIn   = null;
		this.zoomOut  = null;
		this.zoomShow = null;

		OpenLayers.Control.prototype.destroy.apply(this, arguments);
	},

	//----------------------------------------------------------------------
	//	make control visible
	//----------------------------------------------------------------------

	draw: function() {

		var div = OpenLayers.Control.prototype.draw.apply(this);

		div.style = this.divStyle;
		div.className = 'olControlZoom olControlZoomWithDisplay';

		div.onmousedown = this.stopEvent;
		div.ontouchstart= this.stopEvent;
		div.ondblclick  = this.stopEvent;

		var control = this; // closure

		this.zoomIn = document.createElement('button');
		this.zoomIn.style = this.buttonStyle;
		this.zoomIn.appendChild(document.createTextNode(this.zoomInText));
		this.zoomIn.onclick = function() { control.map.zoomIn(); };
		this.zoomIn.ontouchstart = function() { control.map.zoomIn(); };

		this.zoomShow = document.createElement('span');
		this.zoomShow.style = this.displayStyle;
		this.zoomShow.appendChild(document.createTextNode('?'));
		this.zoomShow.onmousedown = function() { return false; };
		this.zoomShow.ondblclick = function() { control.map.zoomTo(0); };

		this.zoomOut = document.createElement('button');
		this.zoomOut.style = this.buttonStyle;
		this.zoomOut.appendChild(document.createTextNode(this.zoomOutText));
		this.zoomOut.onclick = function() { control.map.zoomOut(); };
		this.zoomOut.ontouchstart = function() { control.map.zoomOut(); };

		div.appendChild(this.zoomIn);
		div.appendChild(this.zoomShow);
		div.appendChild(this.zoomOut);

		this.map.events.register('zoomend', this, this.updateZoom);

		return div;
	},

	//----------------------------------------------------------------------
	//	update info
	//----------------------------------------------------------------------

	updateZoom: function() {

		this.zoomShow.innerHTML = this.map.getZoom();
	},

	stopEvent: function(evt) {

		OpenLayers.Event.stop(evt, true);
	},

	CLASS_NAME: "OpenLayers.Control.ZoomWithDisplay"
});

//------------------------------------------------------------------------------
//	$Id: zoomwithdisplay.js,v 1.5 2019/07/22 23:15:30 wolf Exp $
//------------------------------------------------------------------------------
