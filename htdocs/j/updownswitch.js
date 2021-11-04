//--------------------------------------------------------------------------------
//      $Id: updownswitch.js,v 1.4 2013/03/03 14:45:24 wolf Exp wolf $
//--------------------------------------------------------------------------------
//      Erklaerung:     http://www.netzwolf.info/kartografie/openlayers/
//--------------------------------------------------------------------------------
//      Fragen, Wuensche, Bedenken, Anregungen?
//      <openlayers(%40)netzwolf.info>
//--------------------------------------------------------------------------------

OpenLayers.Control.UpDownSwitch=OpenLayers.Class(OpenLayers.Control,{

	//------------------------------------------------------------------------
	//	application hook
	//------------------------------------------------------------------------

	scope: {},

	getValue: function() { return 0; },

	setValue: function() {},

	//------------------------------------------------------------------------
	//	tooltip
	//------------------------------------------------------------------------

	upperText: 'Mehr',
	innerText: 'Normal',
	lowerText: 'Weniger',

	//------------------------------------------------------------------------
	//	set to false if providing own style
	//------------------------------------------------------------------------

	style: true,

	//------------------------------------------------------------------------
	//	click event handler registry
	//------------------------------------------------------------------------

	events: null,

	//------------------------------------------------------------------------
	//	creation and destruction
	//------------------------------------------------------------------------

	destroy:function() {

		if (this.events) {
			this.events.un( {"click": this.click});
			this.events.destroy();
		}
		OpenLayers.Control.prototype.destroy.apply(this,arguments);
	},

	draw: function () {

		OpenLayers.Control.prototype.draw.apply(this,arguments);

		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.className = 'olControlUpDownSwitch';

		this.upperDiv=document.createElement('div');
		this.upperDiv.title=this.upperText;
		this.upperDiv.className='upper';

		this.innerDiv=document.createElement('div');
		this.innerDiv.title=this.innerText;
		this.innerDiv.className='inner';
		this.innerDiv.appendChild (document.createTextNode(this.currentValue));

		this.lowerDiv=document.createElement('div');
		this.lowerDiv.title=this.lowerText;
		this.lowerDiv.className='lower';

		if (this.style===true) {

			this.upperDiv.appendChild (document.createTextNode('+'));
			this.lowerDiv.appendChild (document.createTextNode('-'));

			var style = {
				'background': 'gray',
				'border': '2px ridge gray',
				'color': 'white',
				'fontWeight': 'bold',
				'padding': '4px'
			};

			div.style.textAlign='center';
			div.style.cursor='pointer';

			for (var tag in style) {
				var val = style[tag];
				this.upperDiv.style[tag] = val;
				this.innerDiv.style[tag] = val;
				this.lowerDiv.style[tag] = val;
			}
		}

		div.appendChild(this.upperDiv);
		div.appendChild(this.innerDiv);
		div.appendChild(this.lowerDiv);

		this.events=new OpenLayers.Events (this, div, null, false, {includeXY:true});
		this.events.on( {'click':this.click});

		this.updateDisplay (this.getValue.apply (this.scope));

		return div;
	},

	//------------------------------------------------------------------------
	//	click handler
	//------------------------------------------------------------------------

	click: function (evt) {

		var value = this.getValue.apply (this.scope);

		if (evt.xy.y >= this.upperDiv.offsetHeight+this.innerDiv.offsetHeight) {

			value--;

		} else if (evt.xy.y >= this.upperDiv.offsetHeight) {

			if (value===0) { return; }
			value = 0;

		} else {

			value++;
		}

		this.updateDisplay (this.setValue.apply (this.scope, [value]));
	},

	//------------------------------------------------------------------------
	//	update display
	//------------------------------------------------------------------------

	updateDisplay: function (value) {

		while (this.innerDiv.firstChild) {

			this.innerDiv.removeChild(this.innerDiv.firstChild);
		}

		this.innerDiv.appendChild (document.createTextNode(value));
	},

	CLASS_NAME: 'OpenLayers.Control.UpDownSwitch'
});

//--------------------------------------------------------------------------------
//      $Id: updownswitch.js,v 1.4 2013/03/03 14:45:24 wolf Exp wolf $
//--------------------------------------------------------------------------------
