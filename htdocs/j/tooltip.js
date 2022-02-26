//------------------------------------------------------------------------------
//	$Id: tooltip.js,v 1.6 2019/07/22 23:13:54 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	https://www.netzwolf.info/ol2/tooltip.html
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

/*jsl:option explicit*/

'use strict';

OpenLayers.Control.Tooltip=OpenLayers.Class(OpenLayers.Control,{

	displayClass: 'olControlTooltip',

	margin: 16,

	lr: 'r',
	tb: 'b',

	maxIdle: 3000,

	//----------------------------------------------------------------------
	//	init
	//----------------------------------------------------------------------

	initialize: function (options) {
		OpenLayers.Control.prototype.initialize.apply (this,[options]);
		this.options=options || {};
	},

	//----------------------------------------------------------------------
	//	destroy
	//----------------------------------------------------------------------

	destroy: function() {
		this.deactivate();
		OpenLayers.Control.prototype.destroy.apply(this,arguments);
	},

	//----------------------------------------------------------------------
	//	attached to map
	//----------------------------------------------------------------------

	setMap: function() {
		OpenLayers.Control.prototype.setMap.apply(this,arguments);
		if (!this.active) { this.activate(); }
	},

	//----------------------------------------------------------------------
	//	make control visible
	//----------------------------------------------------------------------

	draw: function() {

		OpenLayers.Control.prototype.draw.apply(this,arguments);

		this.div.className=this.displayClass;
		this.div.style.display = 'none';

		this.div.onmousedown = function(evt) {
			OpenLayers.Event.stop(evt, false);
			return false;
		};

		this.div.onclick = function(evt) {
			OpenLayers.Event.stop(evt, false);
			return false;
		};

		this.div.ondblclick = function(evt) {
			OpenLayers.Event.stop(evt, false);
			return false;
		};

		return this.div;
	},

	//----------------------------------------------------------------------
	//	activate
	//----------------------------------------------------------------------

	activate: function() {
		if (this.active || !this.map) { return false; }

		this.active = true;
		this.map.events.register ('mousemove', this, this.onmove);

		this.events.triggerEvent('activate');
		return true;
	},

	//----------------------------------------------------------------------
	//	deactivate
	//----------------------------------------------------------------------

	deactivate: function() {
		if (!this.active || !this.map) { return false; }

		this.map.events.unregister('mousemove', this, this.onmove);
		this.active = false;

		if (this.div) { this.div.style.display='none'; }

		this.events.triggerEvent('deactivate');
		return true;
	},

	//----------------------------------------------------------------------
	//	on mouse move update position
	//----------------------------------------------------------------------

	timer: null,

	ontimeout: function () {
		this.timer = null;
		this.div.style.display='none';
	},

	onmove: function (ev) {

		//--------------------------------------------------------------
		//	stopp timer
		//--------------------------------------------------------------

		if (this.timer) {
			window.clearTimeout (this.timer);
			this.timer = null;
		}

		if (this.maxIdle) {
			this.timer = window.setTimeout (
				OpenLayers.Function.bind (this.ontimeout, this),
					this.maxIdle);
		}

		//--------------------------------------------------------------
		//	cursor pixel position in map
		//--------------------------------------------------------------

		var x  = ev.xy.x;
		var y  = ev.xy.y;

		//--------------------------------------------------------------
		//	map size in pixels
		//--------------------------------------------------------------

		var w = this.map.div.offsetWidth;
		var h = this.map.div.offsetHeight;

		//--------------------------------------------------------------
		//	select orientation of tooltip
		//--------------------------------------------------------------

		if (5*x > 3*w) { this.lr = 'l'; }
		if (5*x < 2*w) { this.lr = 'r'; }
		if (5*y > 3*h) { this.tb = 't'; }
		if (5*y < 2*h) { this.tb = 'b'; }

		//--------------------------------------------------------------
		//	set left / right / top / bottom style values
		//--------------------------------------------------------------

		switch (this.lr) {
		case 'l':
			this.div.style.right = (w - x + this.margin) + 'px';
			this.div.style.left  = 'auto';
			break;
		case 'r':
			this.div.style.left  = (x + this.margin) + 'px';
			this.div.style.right = 'auto';
			break;
		default:
			break;
		}

		switch (this.tb) {
		case 't':
			this.div.style.bottom = (h - y + this.margin) + 'px';
			this.div.style.top    = 'auto';
			break;
		case 'b':
			this.div.style.top    = (y + this.margin) + 'px';
			this.div.style.bottom = 'auto';
			break;
		default:
			break;
		}

		//--------------------------------------------------------------
		//	set left / right / top / bottom style values
		//--------------------------------------------------------------

		this.div.innerHTML = this.getContent(ev);

		//--------------------------------------------------------------
		//	set left / right / top / bottom style values
		//--------------------------------------------------------------

		this.div.style.display=null;
	},

	//----------------------------------------------------------------------
	//	create content for tooltip
	//----------------------------------------------------------------------

	getContent: function (ev) {
		return 'x=' + parseInt(ev.xy.x, 10) + ', y=' + parseInt(ev.xy.y, 10);
	},

	CLASS_NAME:'OpenLayers.Control.Tooltip'
});

//------------------------------------------------------------------------------
//	$Id: tooltip.js,v 1.6 2019/07/22 23:13:54 wolf Exp $
//------------------------------------------------------------------------------
