//------------------------------------------------------------------------------
//	$Id: OpenLayers_Layer_Vector_backgroundImage_Patch.js,v 1.1 2015/02/17 15:44:46 wolf Exp $
//------------------------------------------------------------------------------
//
//	class:	OpenLayers.Layer.Vector
//	methods: getURL
//
//------------------------------------------------------------------------------
//
//	The challenge:
//
//	OpenLayers.Layer.Vector can draw polygon areas  only with solid colors,
//	but I want to use a background pattern, e.g. hatches.
//
//------------------------------------------------------------------------------
//
//	The solution (only for the SVG renderer):
//
//	The added method "registerImage" creates a SVG-<pattern> containing
//	an <image> with the provided image url and returns an "url(...)"
//	pseudocolor, which can be used as style.fillColor.
//
//------------------------------------------------------------------------------
//	http://www.netzwolf.info/kartografie/openlayers/vector_bgimage.htm
//------------------------------------------------------------------------------

(function() {

	OpenLayers.Layer.Vector.prototype.registerImage =
	function (url, width, height, replacementColor) {

		if (typeof(this.svgDefs)!='object') {

			this.svgDefs = null;

			if (this.div.firstChild.tagName=='svg') {

				var svg = this.div.firstChild;
				this.svgDefs = this.createNodeSVG('defs');
				svg.insertBefore(this.svgDefs, svg.firstChild);
			}
		}

		if (!this.svgDefs) return color || null;

		var id = OpenLayers.Util.createUniqueID();

		var pattern = this.createNodeSVG('pattern');
		pattern.setAttributeNS(null, 'id',		id);
		pattern.setAttributeNS(null, 'patternUnits',	'userSpaceOnUse');
		pattern.setAttributeNS(null, 'width',		width);
		pattern.setAttributeNS(null, 'height',		height);

		var image = this.createNodeSVG('image');
		image.setAttributeNS(null, 'x',		0);
		image.setAttributeNS(null, 'y',		0);
		image.setAttributeNS(null, 'width',	width);
		image.setAttributeNS(null, 'height',	height);
		image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', url);

		pattern.appendChild(image);
		this.svgDefs.appendChild(pattern);

		return 'url(#' + id + ')';
	};

	OpenLayers.Layer.Vector.prototype.createNodeSVG = function(type) {

		return document.createElementNS('http://www.w3.org/2000/svg', type);
	};
})();

//------------------------------------------------------------------------------
//	$Id: OpenLayers_Layer_Vector_backgroundImage_Patch.js,v 1.1 2015/02/17 15:44:46 wolf Exp $
//------------------------------------------------------------------------------
