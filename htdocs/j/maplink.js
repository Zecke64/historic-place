//--------------------------------------------------------------------------------
//	$Id: maplink.js,v 1.8 2013/05/10 12:02:48 wolf Exp wolf $
//--------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/openlayers/maplink
//--------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//--------------------------------------------------------------------------------

OpenLayers.Control.Maplink=OpenLayers.Class(OpenLayers.Control.Permalink,{

	displayClass: 'olControlMaplink',
	label: null,
	target: null,
	minZoom: 0,

	initialize: function(element, base, options) {

		if (!base) { base = 'http://www.openstreetmap.org'; }
		OpenLayers.Control.Permalink.prototype.initialize.apply (this,[element,base,options]);
	},

	updateLink: function() {

		var bounds = this.map.calculateBounds();
		if (bounds) {
			bounds = bounds.transform(this.map.getProjectionObject(), this.map.displayProjection);
		}

		var intersects = !this.bounds || bounds &&
			this.bounds.left  < bounds.right &&
			this.bounds.right > bounds.left  &&
			this.bounds.bottom< bounds.top   &&
			this.bounds.top   > bounds.bottom;

		this.div.style.display = intersects && this.map.getZoom() >= this.minZoom ? '' : 'none';

		var params;

		switch (this.format) {

		case 'trbl':
			if (!bounds) { return; }
			params = {top: bounds.top, right: bounds.right, bottom: bounds.bottom, left: bounds.left};
			break;

		case 'bbox':
			if (!bounds) { return; }
			bbox = bounds.left + ',' + bounds.bottom + ',' + bounds.right + ',' + bounds.top;
			this.element.href=this.base.replace(/<bbox>/, bbox);
			return;

		default:
			params = this.createParams();
			if (params) {
				delete params['layers'];
				delete params['editor'];
			}
			break;
		}

		this.element.href=this.base +
			(this.base.indexOf('?')==-1 ? '?' : '&') +
			OpenLayers.Util.getParameterString(params);
	},

	draw: function() {

		OpenLayers.Control.Permalink.prototype.draw.apply(this,arguments);
		this.div.className=this.displayClass;

		if (this.label             ) { this.element.innerHTML=this.label; }
		if (!this.element.innerHTML) { this.element.innerHTML='Maplink'; }
		if (this.target            ) { this.element.target=this.target; }
		if (this.id                ) { this.div.id=this.id; }

		return this.div;
	},

	CLASS_NAME: 'OpenLayers.Control.Maplink'
});

//--------------------------------------------------------------------------------
//	$Id: maplink.js,v 1.8 2013/05/10 12:02:48 wolf Exp wolf $
//--------------------------------------------------------------------------------
