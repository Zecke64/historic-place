//------------------------------------------------------------------------------
//	$Id: mouseposition_tk.js,v 1.2 2017/03/05 10:54:31 wolf Exp $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/ol2/tkgridpos.htm
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

OpenLayers.Control.MousePositionTK = OpenLayers.Class (OpenLayers.Control.MousePosition, {

	dd: function (d) {

		return d<10 ? '0' + d : d;
	},

	baseX: 6.0 - 2.0/6,
	baseY: 56.0,

	stepX: 6.0,
	stepY: 10.0,

	tkQuadrantJoiner: '/',
	quadrantJoiner1: '.',
	quadrantJoiner2: '.',

	expand: [0x00, 0x01, 0x04, 0x05, 0x10, 0x11, 0x14, 0x15],

	formatOutput: function (lonLatWGS84) {

		var lonLat = this.toBessel(lonLatWGS84);

		var x = (lonLat.lon - this.baseX) * this.stepX;
		var y = (this.baseY - lonLat.lat) * this.stepY;

		if (x<0 || x>=100 || y<0 || y>=100) return "";

		var xTk = Math.floor(x);
		var yTk = Math.floor(y);

		var xSub = Math.floor ((x - xTk) * 8);
		var ySub = Math.floor ((y - yTk) * 8);

		var quad = this.expand[ySub] * 2 + this.expand[xSub];

		return 'TK ' + this.dd(yTk) + this.dd(xTk) +
			this.tkQuadrantJoiner +
			((quad>>4)%4+1) + this.quadrantJoiner1 +
			((quad>>2)%4+1) + this.quadrantJoiner2 +
			((quad>>0)%4+1);
	},

	//----------------------------------------------------------------------
	//	transform coordinates from WGS64 do Bessel
	//----------------------------------------------------------------------

	toBessel: function (lonLat) {

		//--------------------------------------------------------------
		//	Transform WGS84 ellipsoide to carthesian
		//--------------------------------------------------------------

		var phi_w = lonLat.lat / this.RHO;
		var lbd_w = lonLat.lon / this.RHO;

		var N_w = 6378137 / Math.sqrt (1 - 0.00669437998863492 * this.sqr(Math.sin(phi_w)));

		var w1 = N_w * Math.cos (phi_w) * Math.cos (lbd_w);
		var w2 = N_w * Math.cos (phi_w) * Math.sin (lbd_w);
		var w3 = N_w * Math.sin (phi_w) * 0.993305620011365;

		//--------------------------------------------------------------
		//	Transform ellipsoide (Helmert tranformation)
		//--------------------------------------------------------------

		var b1 = +0.999990181       * w1 -7.06993057967e-06 * w2 +3.56996494617e-07 * w3 -591.28;
		var b2 = +7.06993057967e-06 * w1 +0.999990181       * w2 +7.15992969596e-06 * w3 - 81.35;
		var b3 = -3.56996494617e-07 * w1 -7.15992969596e-06 * w2 +0.999990181       * w3 -396.39;

		//--------------------------------------------------------------
		//	Transform carthesian to elliposide (BESSEL)
		//--------------------------------------------------------------

		var p = Math.sqrt (b1*b1 + b2*b2);
		var theta = Math.atan2 (1.00335398479226 * b3, p);
		var lat = this.RHO * Math.atan2 (b3 + 42707.8852523705 * this.cub(Math.sin(theta)),
			p - 42565.1224788954 * this.cub(Math.cos(theta)));
		var lon = this.RHO * Math.atan2 (b2, b1);

		return {lon:lon, lat:lat};
	},

	//----------------------------------------------------------------------
	//	auxiliary constants, methods and vars
	//----------------------------------------------------------------------

	RHO: 180.0/3.14159265358979,

	sqr: function (x) { return x*x;  },
	cub: function (x) { return x*x*x;},

	CLASS_NAME:"OpenLayers.Control.MousePositionTK"
});

//------------------------------------------------------------------------------
//	$Id: mouseposition_tk.js,v 1.2 2017/03/05 10:54:31 wolf Exp $
//------------------------------------------------------------------------------
