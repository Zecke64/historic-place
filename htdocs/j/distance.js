//------------------------------------------------------------------------------
//	$Id: distance.js,v 1.2 2014/08/14 13:06:03 wolf Exp wolf $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/openlayers/distance.htm
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------
//
//	$Log: distance.js,v $
//	Revision 1.2  2014/08/14 13:06:03  wolf
//	*** empty log message ***
//
//	Revision 1.1  2014/08/14 12:56:49  wolf
//	Initial revision
//
//------------------------------------------------------------------------------

OpenLayers.Control.Measure.Distance = OpenLayers.Class(OpenLayers.Control.Measure, {

	displayInLayerSwitcher: true,

	textFinalize: 'Beende mit der ESC-Taste',

	finalizeKeyCode: 27,
	deletePointKeyCode: 46,

	formatResult: function (measure, units) {

		if (units=='m') return measure.toFixed(1) + ' ' + units;
                return measure.toFixed(3) + ' ' + units;
	},

	//----------------------------------------------------------------------
	//	Init
	//----------------------------------------------------------------------

	initialize: function(options) {

		OpenLayers.Control.Measure.prototype.initialize.apply(this, [
			OpenLayers.Handler.Path, OpenLayers.Util.extend ({
				persist: true,
				handlerOptions: {
					dblclick: OpenLayers.Handler.Point.prototype.dblclick
				}
			},options)
		]);

		this.setImmediate(!!this.immediate);

		var control = this;

		this.onKeypress = function(evt) {

			return control.unboundOnKeypress(evt);
		};

		this.events.on({
			'measure': this.onResult,
			'measurepartial': this.onResult
		});
	},

	//----------------------------------------------------------------------
	//	Draw
	//----------------------------------------------------------------------

	draw: function() {

		OpenLayers.Control.Measure.prototype.draw.apply(this);

		this.div.style.display = 'none';
		return this.div;
	},

	//----------------------------------------------------------------------
	//	activate / deactivate
	//----------------------------------------------------------------------

	activate: function() {

		OpenLayers.Control.Measure.prototype.activate.apply(this);

		if (this.textFinalize) {
			this.div.innerHTML = this.textFinalize;
			this.div.style.display ='';
		} else {
			this.div.style.display = 'none';
		}

		if (this.finalizeKeyCode || this.deletePointKeyCode) {

			OpenLayers.Event.observe (document, 'keypress', this.onKeypress);
		}
	},

	deactivate: function() {

		OpenLayers.Control.Measure.prototype.deactivate.apply(this);
		this.div.style.display='none';

		if (this.finalizeKeyCode || this.deletePointKeyCode) {

			OpenLayers.Event.stopObserving (document, 'keypress', this.onKeypress);
		}
	},

	//----------------------------------------------------------------------
	//	interface to LayerChanger
	//----------------------------------------------------------------------

	setValue: function(on) {

		if (on) { this.activate(); } else { this.deactivate(); }
	},

	getValue: function() {

		return this.active;
	},

	//----------------------------------------------------------------------
	//	handle result
	//----------------------------------------------------------------------

	onResult: function (evt) {

		this.div.innerHTML = this.formatResult(evt.measure, evt.units);
		this.div.style.display ='';
	},

	//----------------------------------------------------------------------
	//	handle keypress
	//----------------------------------------------------------------------

	onKeypress: null, // set by initialize()

	unboundOnKeypress: function(evt) {

		var handler = this.handler;

		if (evt.keyCode===this.deletePointKeyCode) {

			var index=handler.line.geometry.components.length-2;
			if (index<1) return false;
			handler.line.geometry.removeComponent(handler.line.geometry.components[index]);
			handler.drawFeature();
			this.measure(handler.line.geometry,'measurepartial');
			return false;
		}

		if (evt.keyCode===this.finalizeKeyCode && handler.lastDown) {

			var index=handler.line.geometry.components.length-1;
			handler.line.geometry.removeComponent(handler.line.geometry.components[index]);
			handler.drawFeature();
			handler.removePoint();
			handler.finalize();
			return false;
		}

		return true;
	},

	CLASS_NAME: 'OpenLayers.Control.Measure.Distance'

});

//------------------------------------------------------------------------------
//	$Id: distance.js,v 1.2 2014/08/14 13:06:03 wolf Exp wolf $
//------------------------------------------------------------------------------
