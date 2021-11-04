//--------------------------------------------------------------------------------
//	$Id: mouseposition_gk.js,v 1.7 2013/02/25 07:53:40 wolf Exp wolf $
//--------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/openlayers/gk
//--------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//--------------------------------------------------------------------------------

function sqr (x) { return x*x; }
function cub (x) { return x*x*x; }

OpenLayers.Control.MousePositionGK = OpenLayers.Class (OpenLayers.Control.MousePosition, {
	formatOutput: function (lonLat) {
		if (lonLat.lat > 80.0) { return "[Lattitude > 80&#176;N]"; }
		if (lonLat.lat <-80.0) { return "[Lattitude < 80&#176;S]"; }
		lonLat.lon -= Math.floor(lonLat.lon/360+0.5)*360;

		//---------------------------------------------------------
		//	Konstante
		//---------------------------------------------------------

		var rho = 180.0/3.14159265358979;

		//---------------------------------------------------------
		//	Uebergang von ellipsoid auf kartesisch
		//---------------------------------------------------------

		var phi_w = lonLat.lat / rho;
		var lbd_w = lonLat.lon / rho;

		var N_w = 6378137 / Math.sqrt (1 - 0.00669437998863492 * sqr(Math.sin(phi_w)));

		var w1 = N_w * Math.cos (phi_w) * Math.cos (lbd_w);
		var w2 = N_w * Math.cos (phi_w) * Math.sin (lbd_w);
		var w3 = N_w * Math.sin (phi_w) * 0.993305620011365;

		//---------------------------------------------------------
		//	Helmert-Transformation
		//---------------------------------------------------------

		var b1 = +0.999990181       * w1 -7.06993057967e-06 * w2 +3.56996494617e-07 * w3 -591.28;
		var b2 = +7.06993057967e-06 * w1 +0.999990181       * w2 +7.15992969596e-06 * w3 - 81.35;
		var b3 = -3.56996494617e-07 * w1 -7.15992969596e-06 * w2 +0.999990181       * w3 -396.39;

		//---------------------------------------------------------
		//	Uebergang kartesisch auf ellipsoid
		//---------------------------------------------------------

		var p = Math.sqrt (b1*b1 + b2*b2);
		var theta = Math.atan2 (1.00335398479226 * b3, p);
		var lat = rho * Math.atan2 (b3 + 42707.8852523705 * cub(Math.sin(theta)),
			p - 42565.1224788954 * cub(Math.cos(theta)));
		var lon = rho * Math.atan2 (b2, b1);

		//---------------------------------------------------------
		//	Bestimme Mittelmerdian
		//---------------------------------------------------------

		var zone = Math.floor (lon/3.0+360.5) % 120;
		var meridian = (zone+60)%120*3-180;

		//---------------------------------------------------------
		//	Laenge relativ zum Mittelmeridian
		//	Uebergang auf Bogenmass
		//---------------------------------------------------------

		var phi = lat/rho;
		var lbd = (lon-meridian - Math.floor ((lon-meridian)/360.0+0.5)*360) / rho;

		//---------------------------------------------------------
		//	Hilfswerte
		//	(Alle Konstanten fuer das Bessel-Ellipsoid)
		//---------------------------------------------------------

		var sin = Math.sin (phi);
		var cos = Math.cos (phi);
		var tan = Math.tan (phi);
		var c2  = cos*cos;
		var t2  = tan*tan;
		var l2  = lbd*lbd;
		var eta = 0.00671921879917476 * c2;
		var Vq  = 1 + eta;
		var V   = Math.sqrt(Vq);
		var N   = 6399593.62575849/V;

		//---------------------------------------------------------
		//	Konforme Transformation in Nord- und Ost-Wert
		//	.oO( you are not expected to understand this :-)
		//---------------------------------------------------------

		var nv = 6366742.52023404 * phi + sin * cos *
				(((0.00398709744545801 * c2 - 0.703273544958366) *
				c2 + 134.570531269045) * c2 - 32044.3278401524) +
				N * (0.5 * tan * c2 * l2 * (1 + 1/12 * (5+9*eta-t2)*c2*l2));
		var ev = N * cos * lbd * (1+ 1/6 * c2 * l2 * (Vq - t2 +0.05 * (5-18*t2+t2*t2) * c2 * l2));

		//---------------------------------------------------------
		//	Anzeige
		//---------------------------------------------------------

		zone = ""+zone;
		if (zone.length<2) { zone = " "+zone; }
		if (zone.length<3) { zone = " "+zone; }

		return "GK "+zone+
			Math.round (ev +   500000)+ " "+
			Math.round (nv + 50000000).toString().substr(1);

	},

	CLASS_NAME:"OpenLayers.Control.MousePositionGK"
});

//--------------------------------------------------------------------------------
//	$Id: mouseposition_gk.js,v 1.7 2013/02/25 07:53:40 wolf Exp wolf $
//--------------------------------------------------------------------------------
