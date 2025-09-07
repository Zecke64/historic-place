//
//	Include file zu histmap.js
//
//	WMS Layer
//

        //----------------------------------------------------------------------
        //      Bundesamt für Kartographie und Geodäsie
        //----------------------------------------------------------------------
	if ( sprache == 'de' || sprache == 'nl')
		addHistmapWMS("Bundesamt für Kartographie und Geodäsie 2017", 
			"https://sgx.geodatenzentrum.de/wms_topplus_web_open?", "web",
			"kdr1893",
			{
				positionInLayerChanger: 7,
				permaId: 'Kb',
				description: 'Bundesamt für Kartographie und Geodäsie 2017, Creative Commons CCZero',
				minZoom: 3,
				numZoomLevels: 19,
				layerGroup: '1',
				isBaseLayer: true,
				attribution:'<a href="https://www.bkg.bund.de/DE/Home/home.html"target="_blank">Bundesamt für Kartographie und Geodäsie 2017</a>,  <a href="https://sgx.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf"target="_blank">Datenquellen</a>, <a href="https://opendefinition.org/licenses/cc-zero/"target="_blank">Creative Commons CCZero</a>'
			}
		);
		
	else

		addHistmapWMS("Bundesamt für Kartographie und Geodäsie 2017", 
			"https://sgx.geodatenzentrum.de/wms_topplus_web_open?", "web",
			"kdr1893",
			{
				positionInLayerChanger: 7,
				permaId: 'Kb',
				description: 'Bundesamt für Kartographie und Geodäsie 2017, Creative Commons CCZero',
				minZoom: 3,
				numZoomLevels: 15,
				layerGroup: '1',
				isBaseLayer: true,
				attribution:'<a href="https://www.bkg.bund.de/DE/Home/home.html"target="_blank">Bundesamt für Kartographie und Geodäsie 2017</a>,  <a href="https://sgx.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf"target="_blank">Datenquellen</a>, <a href="https://opendefinition.org/licenses/cc-zero/"target="_blank">Creative Commons CCZero</a>'
			}
		);


        //----------------------------------------------------------------------
        //      Map of Litchfield County Hopkins 1854, Windham County Woodford 1856
        //----------------------------------------------------------------------
	addHistmapWMS(
                "Litchfield County Hopkins 1854, Windham County Woodford 1856", 
		"http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", "MAGIC:LitchfieldCounty_Hopkins_1854,MAGIC:WindhamCounty_Woodford_1856",
		"Lichtfield-Windham-County",
		{
                        positionInLayerChanger: 7,
		        description: 'Map of Litchfield County Hopkins 1854, Windham County Woodford 1856 from University of Connecticut Libraries',
                        permaId: 'Oq',
                        minZoom: 6,
                        numZoomLevels: 17,
		        attribution:'<a href="https://www.loc.gov"target="_blank">Library of Congress, Geography and Map Division</a>, <a href="https://magic.lib.uconn.edu/"target="_blank">UCONN University of Connecticut Libraries - MAGIC </a>, <a href="https://creativecommons.org/licenses/by-nc/2.0/"target="_blank">(CC BY-NC 2.0) </a>  '
		}
        );

        //----------------------------------------------------------------------
        //      Fairfield County Chace 1856, Hartford County Woodford 1855
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Fairfield County Chace 1856, Hartford County Woodford 1855", 
		"http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", "MAGIC:FairfieldCounty_Chace_1856,MAGIC:HartfordCounty_Woodford_1855",
		"Lichtfield-Windham-County",
		{
                        positionInLayerChanger: 7,
		        description: 'Map Fairfield County Chace 1856, Hartford County Woodford 1855 from University of Connecticut Libraries',
                        permaId: 'Op',
                        minZoom: 6,
                        numZoomLevels: 17,
		        attribution:'<a href="https://www.loc.gov"target="_blank">Library of Congress, Geography and Map Division</a>, <a href="https://magic.lib.uconn.edu/"target="_blank">UCONN University of Connecticut Libraries - MAGIC </a>, <a href="https://creativecommons.org/licenses/by-nc/2.0/"target="_blank">(CC BY-NC 2.0) </a>  '
		}
        );

        //----------------------------------------------------------------------
        //      Map of New London County, Connecticut 1854
        //----------------------------------------------------------------------

        addHistmapWMS(
                "New London County Baker 1854", 
		"http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", "MAGIC:NewLondonCounty_Baker_1854",
		"NewLondonCounty_Baker_1854",
		{
                        positionInLayerChanger: 7,
		        description: 'Map of New London County, Connecticut 1854 - Walling, Henry Francis, Baker, William E. from University of Connecticut Libraries',
                        permaId: 'On',
                        minZoom: 9,
                        numZoomLevels: 16,
		        attribution:'<a href="https://www.loc.gov"target="_blank">Library of Congress, Geography and Map Division</a>, <a href="https://magic.lib.uconn.edu/"target="_blank">UCONN University of Connecticut Libraries - MAGIC </a>, <a href="https://creativecommons.org/licenses/by-nc/2.0/"target="_blank">(CC BY-NC 2.0) </a>  '
		}
        );

        //----------------------------------------------------------------------
        //      Mozaic hărți austriece 'degree maps'
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Austriece 1910 (1: 200 000)", 
		"http://cleanwater.meteoromania.ro:8080/geoserver/ows?", "eharta:mozaic_austrian_200k",
		"Mozaic_harti_sovietice_50k",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Gd',
                        minZoom: 11,
                        numZoomLevels: 16,
		        attribution:'<a href="https://www.geo-spatial.org/"target="_blank">geo-spatial.org</a>'
		}
        );

        //----------------------------------------------------------------------
        //      planuri_tragere_20k
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Planuri Directoare de Tragere", 
                "http://cleanwater.meteoromania.ro:8080/geoserver/ows?", "eharta:mozaic_planuri_tragere_20k",
		"Mozaic_harti_sovietice_50k",
		{
                        positionInLayerChanger: 6,
                        permaId: 'Gn',
                        minZoom: 11,
                        numZoomLevels: 18,
		        attribution:'<a href="https://www.geo-spatial.org/"target="_blank">geo-spatial.org</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Siebenbürgen
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Siebenbürgen 1862", 
                "http://cleanwater.meteoromania.ro:8080/geoserver/ows?", "eharta:misc_karte_von_siebenburgen",
		"siebenbürgen",
		{
                        positionInLayerChanger: 5,
                        permaId: 'Gf',
                        minZoom: 7,
                        numZoomLevels: 13,
		        attribution:'<a href="https://www.geo-spatial.org/"target="_blank">geo-spatial.org</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Flandern Topografisch 1846-1854
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Topografische kaart Vandermaelen (1846-1854)", 
		"https://geoservices.informatievlaanderen.be/raadpleegdiensten/histcart/wms?", "vandermaelen",
		"flandern",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Mi',
		        description: 'AGIV Agentschap voor Geografische Informatie Vlaanderen',
                        minZoom: 13,
                        numZoomLevels: 18,
		        opacity: 0.8,
		        attribution:'<a href="https://www.agiv.be/"target="_blank">Agentschap voor Geografische Informatie Vlaanderen</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Flandern Popp 1842-1879
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Atlas cadastral parcellaire de la Belgique, P.C. Popp, 1842-1879", 
		"https://geoservices.informatievlaanderen.be/raadpleegdiensten/histcart/wms?", "popp",
		"flandern-popp",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Mj',
		        description: 'AGIV Agentschap voor Geografische Informatie Vlaanderen',
                        minZoom: 14,
                        numZoomLevels: 19,
                        opacity: 0.8,
		        attribution:'<a href="https://www.agiv.be/"target="_blank">Agentschap voor Geografische Informatie Vlaanderen</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Flandern Buurtwegen (ca 1840)
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Atlas der Buurtwegen (ca 1840), Vlaanderen", 
		"https://geoservices.informatievlaanderen.be/raadpleegdiensten/histcart/wms?", "abw",
		"flandern-abw",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Mk',
		        description: 'AGIV Agentschap voor Geografische Informatie Vlaanderen',
                        minZoom: 14,
                        numZoomLevels: 19,
		        opacity: 0.8,
		        attribution:'<a href="https://www.agiv.be/"target="_blank">Agentschap voor Geografische Informatie Vlaanderen</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Flandern Frickx-kaart (1744)
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Frickx-kaart (1744), Vlaanderen", 
		"https://geoservices.informatievlaanderen.be/raadpleegdiensten/histcart/wms?", "frickx",
		"flandern",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Ml',
		        description: 'AGIV Agentschap voor Geografische Informatie Vlaanderen',
                        minZoom: 12,
                        numZoomLevels: 15,
		        opacity: 0.8,
		        attribution:'<a href="https://www.agiv.be/"target="_blank">Agentschap voor Geografische Informatie Vlaanderen</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Flandern Ferrariskaart (1777)
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Ferrariskaart (1777), Vlaanderen", 
		"https://geoservices.informatievlaanderen.be/raadpleegdiensten/histcart/wms?", "ferraris",
		"flandern",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Mm',
		        description: 'AGIV Agentschap voor Geografische Informatie Vlaanderen',
                        minZoom: 14,
                        numZoomLevels: 19,
		        opacity: 0.8,
		        attribution:'<a href="https://www.agiv.be/"target="_blank">Agentschap voor Geografische Informatie Vlaanderen</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Freiburg 1944
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Freiburg 1944", 
		"https://geoportal.freiburg.de/wms/verma_stadtplan_hist/verma_stadtplan_hist?", "stadtplan_1944",
		"Freiburg_1944",
		{
                        positionInLayerChanger: 7,
                        permaId: 'My',
		        description: 'Freiburg 1944, © Stadt Freiburg (DL-DE-BY-2.0)',
                        minZoom: 14,
                        numZoomLevels: 19,
		        opacity: 0.8,
		        attribution:'<a href="https://geodaten.freiburg.de/geonetwork/srv/ger/catalog.search#/metadata/16f7271f-beae-4120-9d8c-5fdcecd4d092"target="_blank">Datengrundlage: Stadt Freiburg, www.freiburg.de</a>, <a href="https://www.govdata.de/dl-de/by-2-0"target="_blank">(DL-DE-BY-2.0)</a>'
		}
        );
        
        //----------------------------------------------------------------------
        //      Saarland
        //----------------------------------------------------------------------
        
        addHistmapWMS(
                "Saarland", 
                "https://geoportal.saarland.de/mapbender/php/wms.php?layer_id=38960", "WMS_SL_ALKIS",
                "Saar",{
                        positionInLayerChanger: 7,
                        permaId: 'Vw',
                        description: 'ALKIS Saarland SW (Raster)',
                        minZoom: 13,
                        numZoomLevels: 18,
                        opacity: 0.8,
                        projection: new OpenLayers.Projection('EPSG:3857'),
                      attribution:'<a href="https://geoportal.saarland.de/" target="_blank">Datenlizenz Deutschland Namensnennung 2.0
                      Quellenvermerk: © GeoBasis DE/LVGL-SL (2025)</a>'
                }
        );
        
        //----------------------------------------------------------------------
        //      Sachsen vor 1945
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Sachsen vor 1945", 
		"https://geodienste.sachsen.de/wms_geosn_hist/guest?", "messtischblatt_vor_1945",
		"sachsen",{
                        positionInLayerChanger: 7,
                        permaId: 'Mu',
		        description: 'Sachsen vor 1945, Staatsbetrieb Geobasisinformation und Vermessung Sachsen - GeoSN',
                        minZoom: 13,
                        numZoomLevels: 18,
		        opacity: 0.8,
		        projection: new OpenLayers.Projection('EPSG:3857'),
		        attribution:'<a href="https://www.landesvermessung.sachsen.de" target="_blank">Staatsbetrieb Geobasisinformation und Vermessung Sachsen 2016</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Sachsen DDR
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Sachsen DDR 1976-1989", 
		"https://geodienste.sachsen.de/wms_geosn_hist/guest?", "tk25_ddr_ausgabe_staat",
		"sachsen",{
                        positionInLayerChanger: 7,
                        permaId: 'Mv',
		        description: 'Sachsen TK25 DDR Ausgabe Staat, Staatsbetrieb Geobasisinformation und Vermessung Sachsen - GeoSN',
                        minZoom: 13,
                        numZoomLevels: 18,
		        opacity: 0.8,
		        projection: new OpenLayers.Projection('EPSG:3857'),
		        attribution:'<a href="https://www.landesvermessung.sachsen.de" target="_blank">Staatsbetrieb Geobasisinformation und Vermessung Sachsen 2016</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Sachsen 1990-1996
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Sachsen 1990-1996", 
		"https://geodienste.sachsen.de/wms_geosn_hist/guest?", "tk25_ab_1990",
		"sachsen",{
                        positionInLayerChanger: 7,
                        permaId: 'Mw',
		        description: 'Sachsen 1990-1996, Staatsbetrieb Geobasisinformation und Vermessung Sachsen - GeoSN',
                        minZoom: 13,
                        numZoomLevels: 18,
		        opacity: 0.8,
		        projection: new OpenLayers.Projection('EPSG:3857'),
		        attribution:'<a href="https://www.landesvermessung.sachsen.de" target="_blank">Staatsbetrieb Geobasisinformation und Vermessung Sachsen 2016</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Dutch Topographical & Military Map 1850
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Dutch Topographical & Military Map 1850", 
		"https://geo.rug.nl/image/services/HistorischeKaarten/TMK_Kleur/ImageServer/WMSServer?", "0",
		"Bonnebladen_1865",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Nu',
		        description: 'Kadaster, University of Groningen',
                        minZoom: 13,
                        numZoomLevels: 19,
		        opacity: 0.8,
		        attribution:'<a href="https://opendata.rug.nl/datasets?group_id=cfe67a82c2754794a6ff0dfbf0e84603"target="_blank">Kadaster, University of Groningen</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Bonnebladen 1865
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Bonnebladen 1865", 
		"https://geo.rug.nl/image/services/HistorischeKaarten/Bonnebladen/ImageServer/WMSServer?", "0",
		"Bonnebladen_1865",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Nt',
		        description: 'Kadaster, University of Groningen',
                        minZoom: 13,
                        numZoomLevels: 19,
		        opacity: 0.8,
		        attribution:'<a href="https://opendata.rug.nl/datasets?group_id=cfe67a82c2754794a6ff0dfbf0e84603"target="_blank">Kadaster, University of Groningen</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Wien 1912
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Wien 1912", 
		"https://data.wien.gv.at/daten/wms?", "GENLPLAN1912OGD",
		"wien_1912",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Nb',
		        description: 'Generalstadtplan Wien 1912, Stadt Wien (CC BY 3.0 AT)',
                        minZoom: 16,
                        numZoomLevels: 19,
		        opacity: 0.8,
		        attribution:'<a href="https://www.data.gv.at/katalog/dataset/35102370-ad3b-41e5-a5c3-567750be2711"target="_blank">Stadt Wien</a>, <a href="https://creativecommons.org/licenses/by/3.0/at/deed.de"target="_blank">(CC BY 3.0 AT)</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Zürich 1793 (Müllerplan)
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Zürich 1793 (Müllerplan)", 
		"https://www.ogd.stadt-zuerich.ch/wms/geoportal/Historischer_Uebersichtsplan_der_Stadt_Zuerich_um_1793__Muellerplan_?", "UP_1793_STZH.tif",
		"Zuerich_1910",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Oi',
		        description: 'Stadtplan von 1793 (Müllerplan),Quelle: Stadt Zürich, non-commercial use',
                        minZoom: 13,
                        numZoomLevels: 20,
		        opacity: 0.8,
		        attribution:'<a href="https://www.stadt-zuerich.ch/geodaten/download/Historischer_Uebersichtsplan_der_Stadt_Zuerich_um_1793__Muellerplan_"target="_blank">Quelle: Stadt Zürich</a>, <a href="https://www.geocat.ch/geonetwork/srv/ger/md.viewer#/full_view/f87519a7-dc70-7032-e338-367f714d9fad"target="_blank">non-commercial use</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Zürich 1900
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Zürich 1900", 
		"https://www.ogd.stadt-zuerich.ch/wms/geoportal/Historischer_Uebersichtsplan_der_Stadt_Zuerich_um_1900?", "UP_1900_STZH.tif",
		"Zuerich_1910",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Oj',
		        description: 'Stadtplan von 1900, Quelle: Stadt Zürich, non-commercial use',
                        minZoom: 13,
                        numZoomLevels: 20,
		        opacity: 0.8,
		        attribution:'<a href="https://www.stadt-zuerich.ch/geodaten/download/Historischer_Uebersichtsplan_der_Stadt_Zuerich_um_1900"target="_blank">Quelle: Stadt Zürich</a>, <a href="https://www.geocat.ch/geonetwork/srv/ger/md.viewer#/full_view/a29830fb-f4a1-c29d-7f1d-1fb9c303415c"target="_blank">non-commercial use</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Zürich 1864 (Kellerplan)
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Zürich 1864 (Kellerplan)", 
		"https://www.ogd.stadt-zuerich.ch/wms/geoportal/Historischer_Uebersichtsplan_der_Stadt_Zuerich_um_1864?", "UP_1864_STZH.tif",
		"Zuerich_1910",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Ok',
		        description: 'Stadtplan von 1864 (Kellerplan), Creative-Commons-Zero-Lizenz (CC-0)',
                        minZoom: 13,
                        numZoomLevels: 20,
		        opacity: 0.8,
		        attribution:'<a href="https://www.stadt-zuerich.ch/geodaten/download/Historischer_Uebersichtsplan_der_Stadt_Zuerich_um_1864"target="_blank">Quelle: Stadt Zürich</a>, <a href="https://opendefinition.org/licenses/cc-zero/"target="_blank">Creative-Commons-Zero-Lizenz (CC-0)</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Zürich 1860 
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Zürich 1860", 
		"https://www.ogd.stadt-zuerich.ch/wms/geoportal/Historischer_Uebersichtsplan_der_Stadt_Zuerich_um_1860?", "UP_1860_STZH.tif",
		"Zuerich_1910",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Ol',
		        description: 'Stadtplan von 1860, Quelle: Stadt Zürich, non-commercial use',
                        minZoom: 13,
                        numZoomLevels: 20,
		        opacity: 0.8,
		        attribution:'<a href="https://www.stadt-zuerich.ch/geodaten/download/Historischer_Uebersichtsplan_der_Stadt_Zuerich_um_1860"target="_blank">Quelle: Stadt Zürich</a>, <a href="https://www.geocat.ch/geonetwork/srv/ger/md.viewer#/full_view/da6181dd-9c08-d592-6c9a-9103c5bd6caf"target="_blank">non-commercial use</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Open Data Zürich Denkmalschutz
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Zürich Denkmalschutzobjekte", 
		"https://wms.zh.ch/DenkmalschutzWMS?", "DenkmalschutzWMS",
		"zuerich",
		{
                        positionInLayerChanger: 7,
		        layerGroup: 'opendata',
                        permaId: 'Mz',
		        description: 'Geoinformation Kanton Zürich, Open Data',
                        minZoom: 12,
                        numZoomLevels: 19,
		        opacity: 0.8,
		        attribution:'<a href="https://opendata.swiss/de/organization/geoinformation-kanton-zuerich"target="_blank">Geoinformation Kanton Zürich</a>, <a href="https://opendata.swiss/de/terms-of-use/"target="_blank">Open Data</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Open Data Zürich Archäologische Zonen
        //----------------------------------------------------------------------

        addHistmapWMS(
                "Zürich Archäologische Zonen", 
		"https://wms.zh.ch/ArchWMS?", "ArchWMS",
		"zuerich",
		{
                        positionInLayerChanger: 7,
		        layerGroup: 'opendata',
                        permaId: 'Na',
		        description: 'Geoinformation Kanton Zürich, Open Data',
                        minZoom: 12,
                        numZoomLevels: 19,
		        opacity: 0.8,
		        attribution:'<a href="https://opendata.swiss/de/organization/geoinformation-kanton-zuerich"target="_blank">Geoinformation Kanton Zürich</a>, <a href="https://opendata.swiss/de/terms-of-use/"target="_blank">Open Data</a>'
		}
        );
	
