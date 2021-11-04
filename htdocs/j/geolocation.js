//--------------------------------------------------------
//	Get browsers current location
//--------------------------------------------------------

function geolocate() {

	if (!navigator.geolocation) {
		alert('Geolocation not available');
		return;
	}

	navigator.geolocation.getCurrentPosition (

		function (position) {
			/*
			alert ('lat: ' + position.coords.latitude +
				', lon: ' + position.coords.longitude);
			*/

			map.setCenter (
				new OpenLayers.LonLat
					(position.coords.longitude, position.coords.latitude).
					transform(new OpenLayers.Projection("EPSG:4326"),
                				map.getProjectionObject()), 14);
        	},

		function () {
			alert ('Geolocation: position could not be determined.');
		},

		{enableHighAccuracy: true, maximumAge: 1000}
	);
}
