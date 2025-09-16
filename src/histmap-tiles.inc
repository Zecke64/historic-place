//
//	Include file zu histmap.js
//
//	Tiles Layer
//


        //----------------------------------------------------------------------
        //      kdr 1893
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Deutsches Reich 1893", "kdr1893", "kdr1893",
                { 
			description: 'Karte des Deutschen Reichs 1893 aus der David Rumsey Map Collection',
                        positionInLayerChanger: 2,
			numZoomLevels: 16,
                        permaId: 'Go',
			attribution:'<a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>'
		}
        );

        //----------------------------------------------------------------------
        //      german maps 1936
        //----------------------------------------------------------------------

        addHistmapTiles(
                "German Maps 1936", "gm1936", "byu1936",
                {
                        description: 'Pre-WW2 German Maps, BYU Harold B. Library Collections',
                        positionInLayerChanger: 2,
                        opacity: 0.6,
			minZoom: 13,
			numZoomLevels: 17,
                        permaId: 'Gp',
			attribution:'<a href="https://lib.byu.edu/collections/german-maps/" target="_blank">BYU Harold B. Lee Library</a>'
                }
        );

        //----------------------------------------------------------------------
        //      newport 1845
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Newport 1845", "newport1845", "newport",
		{
			description: 'Newport 1845 National Library of Wales',
                        positionInLayerChanger: 11,
                        permaId: 'Gq',
                        minZoom: 14,
                        numZoomLevels: 19,
                        opacity: 0.8,
			attribution:'<a href="https://www.llgc.org.uk/en/" target="_blank">National Library of Wales</a>'
		}
        );

        //---------------------------------------------------------------------------------
        //      Karte von Belgien; Einheitsblatt 5b, Königlich-Preussische Landesaufnahme
        //---------------------------------------------------------------------------------

        addHistmapTiles(
                "Belgien 1918", "bg1918", "bg1918",
		{
			description: 'Karte von Belgien; Einheitsblatt 5b, Königlich-Preussische Landesaufnahme, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 (non-commercial use)',
                        positionInLayerChanger: 10,
			numZoomLevels: 16,
                        permaId: 'Ga',
			attribution:'<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Berlin1860
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Berlin 1860", "Berlin1860", "berlin1860",
		{
                        positionInLayerChanger: 10,
                        permaId: 'Ge',
                        minZoom: 13,
                        numZoomLevels: 18,
			attribution:'<a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>'
		}
        );

	//----------------------------------------------------------------------
        //      Berlin_1940
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Berlin 1940", "city/Berlin_1940", "Berlin_1940",
		{
			description: 'Geoportal Berlin, Berlin um 1940',
                        positionInLayerChanger: 23,
                        permaId: 'Mx', 
			minZoom: 16,
                        numZoomLevels: 19,
                        opacity: 0.8,
			attribution:'<a href="https://www.stadtentwicklung.berlin.de/geoinformation/geodateninfrastruktur/de/geodienste/" target="_blank">Geoportal Berlin, Berlin um 1940</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Spandau 1938
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Spandau 1938", "Niemcy_1870-1945/Spandau_1938", "Spandau_1938",
		{
			description: 'Spandau 1938 Reichsamt für Landesaufnahme Blatt 3445, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 (non-commercial use)',
                        positionInLayerChanger: 12,
                        permaId: 'Gi',
			numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Dresden 1833
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Dresden 1833", "city/Dresden_1833", "dresden1833",
		{
			description: 'Dresden 1833 David Rumsey Map Collection',
                        positionInLayerChanger: 13,
                        permaId: 'Gj', 
			minZoom: 14,
                        numZoomLevels: 19,
                        opacity: 0.8,
			attribution:'<a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Belgrad 1940
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Belgrad 1940", "city/Belgrad1940", "Belgrad1940",
		{
			description: 'Belgrad 1940, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 (non-commercial use)',
                        positionInLayerChanger: 16,
                        permaId: 'Gt', 
			minZoom: 14,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Umgebung von Wien 1941
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Umgebung von Wien 1941", "city/Umgebung_von_Wien_1941", "Umgebung_von_Wien_1941",
		{
			description: 'Umgebung von Wien 1941, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 (non-commercial use)',
                        positionInLayerChanger: 15,
                        permaId: 'Gr', 
			minZoom: 13,
                        numZoomLevels: 16,
                        opacity: 0.8,
			attribution:'<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Moskau 1836
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Moskau 1836", "city/Moskau_1836", "moskau1836",
		{
			description: 'Moskau 1836 David Rumsey Map Collection ',
                        positionInLayerChanger: 14,
                        permaId: 'Gk', 
			minZoom: 13,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'<a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Budapest 1933
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Budapest 1933", "city/Budapest_1933", "budapest1933",
		{
			description: 'Budapest 1933, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 ',
                        positionInLayerChanger: 14,
                        permaId: 'Gu', 
			minZoom: 13,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Schwarzwald-Nord-1920
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Schwarzwald(Nord) 1920", "region/Schwarzwald-Nord-1920", "Schwarzwald-Nord-1920",
		{
			description: 'Schwarzwald(Nord) 1920, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 (non-commercial use)',
                        positionInLayerChanger: 14,
                        permaId: 'Gw', 
			minZoom: 13,
                        numZoomLevels: 16,
                        opacity: 0.8,
			attribution:'<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Helsinki 1900
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Helsinki 1900", "city/Helsinki_1900", "Helsinki_1900",
		{
			description: 'Helsinki 1900, Helsinki Region Infoshare',
                        positionInLayerChanger: 14,
                        permaId: 'Gx', 
			minZoom: 13,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'<a href="https://www.hri.fi/fi/" target="_blank">Helsinki Region Infoshare</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Lyon_1888
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Lyon 1888", "city/Lyon_1888", "Lyon_1888",
		{
			description: 'Lyon 1888, Bibliothèque nationale de France',
                        positionInLayerChanger: 14,
                        permaId: 'Gy', 
			minZoom: 13,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'<a href="https://visualiseur.bnf.fr/CadresFenetre?O=IFN-8439740&M=imageseule" target="_blank">Bibliothèque nationale de France</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Tartu_1892
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Tartu 1892", "city/Tartu_1892", "Tartu_1892",
		{
			description: 'Tartu 1892, National Archives of Estonia',
                        positionInLayerChanger: 14,
                        permaId: 'Ma', 
			minZoom: 13,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'<a href="https://www.ra.ee" target="_blank">National Archives of Estonia</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Umea_1937
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Umeå 1937", "city/Umea_1937", "Umea_1937",
		{
			description: 'Umeå 1937 , Wikimaps Warper',
                        positionInLayerChanger: 14,
                        permaId: 'Mb', 
			minZoom: 13,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'<a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Zuerich_1910
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Zürich 1910", "city/Zuerich_1910", "Zuerich_1910",
		{
			description: 'Zürich 1910 , Wikimaps Warper',
                        positionInLayerChanger: 14,
                        permaId: 'Mc', 
			minZoom: 13,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'<a href="https://imagebase.ubvu.vu.nl/cdm/ref/collection/krt/id/1784" target="_blank">Universiteitsbibliotheek Vrije Universiteit Amsterdam</a>, <a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Zuerich_1504
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Zürich 1504", "city/Zuerich_1504", "Zuerich_1504",
		{
			description: 'Zürich 1504 , Wikimaps Warper',
                        positionInLayerChanger: 14,
                        permaId: 'Md', 
			minZoom: 15,
                        numZoomLevels: 19,

			
                        opacity: 0.8,
			attribution:'<a href="https://commons.wikimedia.org/wiki/File:Keller_Stadtplan_Z%C3%BCrich_1504.jpg" target="_blank">Wikimedia Commons</a>, <a href="https://warper.wmflabs.org/maps/57" target="_blank">Wikimaps Warper</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Lindau_1822
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Lindau 1822", "city/Lindau_1822", "Lindau_1822",
		{
			description: 'Lindau 1822 , Wikimaps Warper',
                        positionInLayerChanger: 14,
                        permaId: 'Me', 
			minZoom: 13,
                        numZoomLevels: 19,
                        opacity: 0.8,
			attribution:'<a href="https://www.bayerische-landesbibliothek-online.de/" target="_blank">Bayerische Landesbibliothek Online</a>, <a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Rostock 1911
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Rostock 1911", "city/Rostock_1911", "rostock_1911",
		{
			description: 'Hansestadt Rostock , (ODC-By) v1.0',
                        positionInLayerChanger: 14,
                        permaId: 'Nc', 
			minZoom: 13,
                        numZoomLevels: 19,
                        opacity: 0.8,
			attribution:'<a href="https://www.opendata-hro.de/dataset/plan-von-rostock_1911/resource/18e531e2-b28b-4ae2-9630-940bf60df6ad" target="_blank">Hansestadt Rostock </a>, <a href="https://opendatacommons.org/licenses/by/1.0/" target="_blank">(ODC-By) v1.0</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Rostock Tarnow 1790
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Rostock Tarnow 1790", "city/Rostock_Tarnow_1790", "Rostock_Tarnow_1790",
		{
			description: 'Hansestadt Rostock , (CC0 1.0)',
                        positionInLayerChanger: 14,
                        permaId: 'Nv', 
			minZoom: 14,
                        numZoomLevels: 20,
                        opacity: 0.8,
			attribution:'<a href="https://www.opendata-hro.de/dataset/tarnow_1790" target="_blank">Hansestadt Rostock </a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">(CC0 1.0)</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Rostock 1788
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Rostock Schmettau 1788", "region/Rostock_1788", "Rostock_Schmettau_1788",
		{
			description: 'Hansestadt Rostock , (CC0 1.0)',
                        positionInLayerChanger: 14,
                        permaId: 'Nw', 
			minZoom: 14,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'<a href="https://www.opendata-hro.de/dataset/schmettau_1788" target="_blank">Hansestadt Rostock </a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">(CC0 1.0)</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Rostock 1911Rostock_Wiebeking_1786
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Rostock Wiebeking 1786", "region/Rostock_Wiebeking_1786", "Rostock_Wiebeking_1786",
		{
			description: 'Hansestadt Rostock , (CC0 1.0)',
                        positionInLayerChanger: 14,
                        permaId: 'Nx', 
			minZoom: 14,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'<a href="https://www.opendata-hro.de/dataset/wiebeking_1786" target="_blank">Hansestadt Rostock </a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">(CC0 1.0)</a>'
		}
        );

        //----------------------------------------------------------------------
        //      Cherbourg 1943
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Cherbourg 1943", "city/Cherbourg_1943", "Cherbourg_1943",
		{
			description: 'Cherbourg 1943 , Used by permission of the University of Texas Libraries, The University of Texas at Austin',
                        positionInLayerChanger: 14,
                        permaId: 'Mf', 
			minZoom: 13,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'<a href="https://www.lib.utexas.edu/maps/" target="_blank">The University of Texas at Austin</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Markgröningen 1751
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Markgröningen 1751", "city/Markgroeningen_1751", "Markgroeningen_1751",
		{
			description: 'Markgröningen 1751 , Wikimaps Warper',
                        positionInLayerChanger: 14,
                        permaId: 'Mg', 
			minZoom: 13,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'<a href="https://www.landesarchiv-bw.de" target="_blank">Landesarchiv Baden-Württemberg</a>, <a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
		} 
        );
	
        //----------------------------------------------------------------------
        //      Urmesstisch_Berlin_1835-1840
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Urmesstischblatter Spandau-Berlin Nord 1835-18401", "city/Urmesstisch_Berlin_1835-1840", "Urmesstisch_Berlin_1835-1840",
		{
			description: 'Urmesstischblatter_Spandau-Berlin_Nord_1835-1840 , Wikimaps Warper',
                        positionInLayerChanger: 15,
                        permaId: 'Mh', 
			minZoom: 13,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'<a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Berlin_1907
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Berlin 1907", "city/Berlin_1907", "Berlin_1907",
		{
			description: 'Mende Großer Verkehrs-Plan Berlin und seine Vororte 1907 , Wikimaps Warper',
                        positionInLayerChanger: 23,
                        permaId: 'Mp', 
			minZoom: 13,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'<a href="https://blocksignal.de/krt/f.php?k=vw" target="_blank">blocksignal.de</a>, <a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Dübener-Heide 1895
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Duebener-Heide 1895", "region/Duebener-Heide-1895", "Duebener-Heide-1895",
		{
                        positionInLayerChanger: 20,
                        permaId: 'Mn', 
			minZoom: 13,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'<a href="https://commons.wikimedia.org/wiki/File:Soellichau_1895.png" target="_blank">Wikimedia Commons</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Dübener-Heide Flurnamen 1800
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Duebener-Heide Flurnamen 1800", "region/Duebener-Heide_Flurnamen_1800", "Duebener-Heide_Flurnamen_1800",
		{
                        positionInLayerChanger: 21,
			description: 'Quellennachweis: Archiv,Landesamt für Denkmalpflege und Archäologie Sachsen-Anhalt.',
                        permaId: 'Mo', 
			minZoom: 13,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'<a href="https://www.lda-lsa.de/" target="_blank">Archiv,Landesamt für Denkmalpflege und Archäologie Sachsen-Anhalt</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      USA 1900
        //----------------------------------------------------------------------

        addHistmapTiles(
                "USA 1900", "region/usa_1900", "usa_1900",
		{
                        positionInLayerChanger: 22,
			description: 'United States Geological Survey-Historical Topographic Maps',
                        permaId: 'Mt', 
			minZoom: 13,
                        numZoomLevels: 17,
			opacity: 0.8,
			attribution:'USA 1900,<a href="https://www.usgs.gov" target="_blank">U.S. Geological Survey Department of the Interior/USGS U.S. Geological Survey</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Top. Aufnahme der Pfalz (1836-1841)
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Top. Aufnahme der Pfalz (1836-1841)", 
		"region/pfalz_1836-1841",
		"Pfalz_1836-1841",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Mr',
		        description: 'Top. Aufnahme der Pfalz (1836-1841), Landesamt für Vermessung und Geobasisinformation (LVermGeo) Rheinland-Pfalz',
                        minZoom: 13,
                        numZoomLevels: 17,
		        opacity: 0.8,
			attribution:'<a href="https://www.lvermgeo.rlp.de" target="_blank">©GeoBasis-DE / LVermGeoRP (2016)</a>'
		}
        );
	
        //----------------------------------------------------------------------
        //      Preußische_Kartenaufnahme_1843-1878
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Preußische Kartenaufnahme Rheinland 1843-1878", 
		"region/Preußische_Kartenaufnahme_1843-1878",
		"Preußische_Kartenaufnahme_1843-1878",
		{
                        positionInLayerChanger: 7,
                        permaId: 'Mq',
		        description: 'Preußische Kartenaufnahme 1843-1878, Landesamt für Vermessung und Geobasisinformation (LVermGeo) Rheinland-Pfalz',
                        minZoom: 13,
                        numZoomLevels: 17,
		        opacity: 0.8,
			attribution:'<a href="https://www.lvermgeo.rlp.de" target="_blank">©GeoBasis-DE / LVermGeoRP (2016)</a>'
		}
        );


        //----------------------------------------------------------------------
        //      Kliverkarte
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Kliver Flözkarte ~1890", "mining/Kliver", "Kliver",
                {
                        positionInLayerChanger: 7,
                        description: 'Flözkarte des Saarländischen Kohledistrikts nach Moritz Kliver (1881-1908)',
                        permaId: 'Nd',
                        minZoom: 14,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'Kliver courtesy of <a href="https://www.sulb.uni-saarland.de/" target="_blank">SULB</a>'
                }
        );
	
        //----------------------------------------------------------------------
        //      Duhamel-Atlas
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Duhamel-Atlas 1810", "mining/Duhamel", "Duhamel",
                {
                        positionInLayerChanger: 7,
                        description: 'Duhamel-Atlas (Atlas des concessions du Terrain Houiller de la Sarre) von Beaunier und Calmelet (1810)',
                        permaId: 'Ob',
                        minZoom: 12,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:"Duhamel-Atlas courtesy of Bibliothèque de l'"+'École des mines de Paris, <a href="https://www.bib.mines-paristech.fr/" target="_blank"> MINES ParisTech</a>'
                }
        );

        //----------------------------------------------------------------------
        //      Oberschlesisches Steinkohlebecken 1902
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Oberschlesisches Steinkohlebecken 1902", "mining/Oberschlesien_1902", "Oberschlesien_1902",
                {
                        positionInLayerChanger: 7,
                        description: 'Flötzkarte des Oberschlesischen Steinkohlenbeckens 1902',
                        permaId: 'Of',
                        minZoom: 13,
                        numZoomLevels: 20,
                        opacity: 0.7,
			attribution:'<a href="https://english.mapywig.org/news.php" target="_blank">provided by Mapywig (non-commercial use)</a>'
                }
        );

        //----------------------------------------------------------------------
        //      Atlas Fourcy 1859 (Paris Katakomben)
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Atlas Fourcy 1859", "mining/Fourcy", "Fourcy",
                {
                        positionInLayerChanger: 7,
                        description: 'Atlas Fourcy (premier atlas souterrain de Paris), 1859',
                        permaId: 'Oc',
                        minZoom: 15,
                        numZoomLevels: 20,
                        opacity: 0.7,
			attribution:"Atlas Fourcy courtesy of Bibliothèque de l'"+'École des mines de Paris, <a href="https://www.bib.mines-paristech.fr/" target="_blank"> MINES ParisTech</a>'
                }
        );

        //----------------------------------------------------------------------
        //      Wien 1684
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Wien 1684 (Suttinger)", "city/Wien_1684", "Wien_1684",
                {
                        positionInLayerChanger: 7,
                        description: 'Grundrissplan der Stadt Wien nach Suttinger 1683 (1684)',
                        permaId: 'Ny',
                        minZoom: 16,
                        numZoomLevels: 20,
                        opacity: 0.8,
			attribution:'<a href="https://www.data.gv.at/katalog/dataset/stadt-wien_kartenvor1850wien/resource/25088e6c-f612-48f2-a5be-b35f23e78fa1" target="_blank">Stadt Wien</a>, <a href="https://creativecommons.org/licenses/by/3.0/at/deed.de" target="_blank">(CC BY 3.0 AT)</a>'
                }
        );

        //----------------------------------------------------------------------
        //      Gent 1841
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Gent 1841", "city/Gent_1841", "Gent_1841",
                {
                        positionInLayerChanger: 7,
                        description: 'High res map of Ghent by Saurel 1841',
                        permaId: 'Nz',
                        minZoom: 14,
                        numZoomLevels: 19,
                        opacity: 0.8,
			attribution:'<a href="https://adore.ugent.be/view?q=_id:%22archive.ugent.be:6CFD6A70-8CD1-11E2-A445-9E8DB44EB760%22&search_type=advanced" target="_blank">Universiteitsbibliotheek Gent</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/be/deed.nl" target="_blank">(CC BY-NC-SA 2.0 BE)</a>, <a href="https://warper.wmflabs.org/maps/1291" target="_blank">Wikimaps Warper</a>'
                }
        );

        //----------------------------------------------------------------------
        //      Heimatkarte Saargebiet 1927
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Saargebiet 1927", "region/Heimatkarte-Saargebiet_1927", "Saar",
                {
                        positionInLayerChanger: 7,
                        description: 'Heimatkarte Saargebiet 1927, Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)',
                        permaId: 'Od',
                        minZoom: 12,
                        numZoomLevels: 15,
                        opacity: 0.8,
			attribution:'<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
                }
        );
	
        //----------------------------------------------------------------------
        //      Mines d'Anzin
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Mines d'Anzin 1880", "mining/Mines_D_Anzin", "Mines_D_Anzin",
                {
                        positionInLayerChanger: 7,
                        description: "Carte des concessions et chemins de fer de la Compagnie propriétaire des mines d'Anzin, Raismes, Fresnes, Vieux-Condé, Denain, Saint-Saulve, Odomez et Hasnon ",
                        permaId: 'Oe',
                        minZoom: 12,
                        numZoomLevels: 16,
                        opacity: 0.8,
			attribution:'<a href="https://gallica.bnf.fr/ark:/12148/btv1b8445093c/f1" target="_blank"> gallica.bnf.fr / Bibliothèque nationale de France </a>'
                }
        );
	
        //----------------------------------------------------------------------
        //      Stockholm 1861
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Stockholm 1861", "city/Stockholm_1861", "stockholm",
                {
                        positionInLayerChanger: 7,
                        description: 'Topografiska corpsens map of Stockholm, Blad I-IX 1861',
                        permaId: 'Og',
                        minZoom: 13,
                        numZoomLevels: 18,
                        opacity: 0.8,
			attribution:'Historical map created by Topografiska corpsen, original at<a href="https://stockholmskallan.se/Soksida/Post/?nid=9746" target="_blank">Stockholms stadsarkiv</a> ,<a href="https://creativecommons.org/licenses/by-sa/2.5/se/" target="_blank">(CC BY-SA 2.5 SE)</a>, <a href="https://commons.wikimedia.org/wiki/Category:Topografiska_corpsens_map_of_Stockholm,_Blad_I-IX" target="_blank">Wikimedia Commons</a>'
                }
        );
	
        //----------------------------------------------------------------------
        //      Göteborg 1888
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Göteborg 1888", "city/Goeteborg_1888", "goeteborg",
                {
                        positionInLayerChanger: 7,
                        description: 'Map of Gothenburg, Sweden, published by N. P. Pehrsson in 1888',
                        permaId: 'Oh',
                        minZoom: 13,
                        numZoomLevels: 19,
                        opacity: 0.8,
			attribution:'<a href="https://www.riksarkivet.se/goteborg" target="_blank">Riksarkivet, Landsarkivet i Göteborg</a> ,<a href="https://creativecommons.org/publicdomain/mark/1.0/deed.en" target="_blank">Public Domain</a>, <a href="https://commons.wikimedia.org/wiki/File:Simon%27s_1888_Gothenburg_map.tiff" target="_blank">Wikimedia Commons</a>'
                }
        );
        //----------------------------------------------------------------------
        //      TayNinh 1898
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Tây Ninh 1898", "region/TAYNINH_1898", "TAYNINH",
                {
                        positionInLayerChanger: 7,
                        description: 'Tây Ninh, published by E. Dufrénoy (Paris)  in 1898',
                        permaId: 'Om',
                        minZoom: 11,
                        numZoomLevels: 15,
                        opacity: 0.8,
			attribution:'<a href="https://gallica.bnf.fr/accueil/fr/content/accueil-fr?mode=desktop" target="_blank">gallica.bnf.fr / Bibliothèque nationale de France</a> ,<a href="https://creativecommons.org/licenses/by-nc/2.0/" target="_blank">(CC BY-NC 2.0)</a>, <a href="https://commons.wikimedia.org/wiki/File:TayNinh1898.jpg" target="_blank">Wikimedia Commons</a>'
                }
        );
        //----------------------------------------------------------------------
        //      Polen 1920
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Poland 1920", "region/Poland--Boundaries--Maps_1920", "Polen_1920",
                {
                        positionInLayerChanger: 7,
                        description: 'Poland : 1:2,000,000 Digital Commonwealth, Norman B. Leventhal Map Center Collection, Boston Public Library',
                        permaId: 'Or',
                        minZoom: 6,
                        numZoomLevels: 11,
                        opacity: 0.8,
			attribution:' Poland 1920  Arctowski, Henryk, General Drafting Company, <a href="https://www.digitalcommonwealth.org" target="_blank">Digital Commonwealth</a>, <a href="https://www.digitalcommonwealth.org/search/commonwealth:x633fb66g" target="_blank"> Norman B. Leventhal Map Center Collection, Boston Public Library</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">(CC BY-NC-SA)</a>'
                }
        );
        //----------------------------------------------------------------------
        //      Frankreich 1799
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Frankreich 1799", "region/Frankreich_1799", "Frankreich_1799",
                {
                        positionInLayerChanger: 7,
                        description: 'Clement Cruttwell Map of France 1799, Geographicus Rare Antique Maps',
                        permaId: 'Os',
                        minZoom: 6,
                        numZoomLevels: 11,
                        opacity: 0.8,
			attribution:'Frankreich 1799 Cruttwell, C., Atlas to Cruttwells Gazetteer, 1799<a href="https://www.geographicus.com/P/AntiqueMap/FranceDepartments-cruttwell-1799" target="_blank"> Geographicus Rare Antique Maps</a>, a cooperation project with <a href="https://commons.wikimedia.org/wiki/File:1799_Clement_Cruttwell_Map_of_France_in_Departments_-_Geographicus_-_FranceDepartments-cruttwell-1799.jpg" target="_blank">Wikimedia Commons</a>, <a href="https://warper.wmflabs.org/maps/1531#Preview_tab" target="_blank">Wikimaps Warper</a>, <a href="https://commons.wikimedia.org/wiki/Commons:Licensing#Material_in_the_public_domain" target="_blank">Public domain</a>'
                }
        );
        //----------------------------------------------------------------------
        //      Egypt 1885
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Egypt 1885", "region/Egypt_1885", "Egypt_1885",
                {
                        positionInLayerChanger: 7,
                        description: 'W. & A.K. Johnston Limited, Norman B. Leventhal Map Center Collection, Boston Public Library, Digital Commonwealth',
                        permaId: 'Ot',
                        minZoom: 6,
                        numZoomLevels: 10,
                        opacity: 0.8,
			attribution:'Egypt 1885 W. & A.K. Johnston Limited, <a href="https://www.digitalcommonwealth.org" target="_blank">Digital Commonwealth</a>, <a href="https://www.digitalcommonwealth.org/collections/commonwealth:41688024w" target="_blank"> Norman B. Leventhal Map Center Collection, Boston Public Library</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">(CC BY-NC-SA)</a>'
                }
        );

        //----------------------------------------------------------------------
        //      Brasil_1911
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Brasil 1911", "region/Brasil_1911", "Brasil_1911",
                {
                        positionInLayerChanger: 7,
                        description: 'Rio de Janeiro : Jornal do Brasil, Leventhal Map Center Collection, Boston Public Library, Digital Commonwealth',
                        permaId: 'Ou',
                        minZoom: 6,
                        numZoomLevels: 11,
                        opacity: 0.8,
			attribution:'Brasil 1911 from Rio de Janeiro : Jornal do Brasil, <a href="https://www.digitalcommonwealth.org" target="_blank">Digital Commonwealth</a>, <a href="https://www.digitalcommonwealth.org/collections/commonwealth:41688024w" target="_blank"> Norman B. Leventhal Map Center Collection, Boston Public Library</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">(CC BY-NC-SA)</a>'
                }
        );

        //----------------------------------------------------------------------
        //      Finmarken 1861
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Finmarken 1861", "region/Finmarken_1861", "Finmarken_1861",
                {
                        positionInLayerChanger: 7,
                        description: 'Kartverket (Norges Geografiske Oppmåling):J. A. Friis, Etnografisk Kart over Finmarken 1861, (CC BY 4.0)',
                        permaId: 'Ow',
                        minZoom: 7,
                        numZoomLevels: 13,
                        opacity: 0.8,
			attribution:' Etnografisk Kart over Finmarken 1861, <a href="https://kartverket.no/Kart/Historiske-kart/Historiske-kart-galleri/" target="_blank">Kartverket (Norges Geografiske Oppmåling)</a>, <a href="https://en.wikipedia.org/wiki/Jens_Andreas_Friis" target="_blank">J. A. Friis</a>, <a href="https://creativecommons.org/licenses/by/4.0/deed.no" target="_blank">(CC BY 4.0)</a>'
                }
        );

        //----------------------------------------------------------------------
        //      Leipzig 1850-1892
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Leipzig 1850-1892", "city/Leipzig_1850-1892", "Leipzig",
                {
                        positionInLayerChanger: 7,
                        description: 'Stadtplan des Brandversicherungsinspektor Carl Robert Friedrich Kanitz (1811-1893), Stadtarchiv Leipzig, (dl-de/by-2-0)',
                        permaId: 'Oz',
                        minZoom: 15,
                        numZoomLevels: 22,
                        opacity: 0.8,
			attribution:' Carl Robert Friedrich Kanitz, <a href="https://opendata.leipzig.de/" target="_blank">Open Data Stadtarchiv Leipzig</a>, <a href="https://www.govdata.de/dl-de/by-2-0" target="_blank">(dl-de/by-2-0)</a>'
                }
        );

        //----------------------------------------------------------------------------
        //      Memorial Atlas of Ireland 1901
        //----------------------------------------------------------------------------

        addHistmapTiles(
                "Memorial Atlas of Ireland 1901", "https://mapwarper.net/layers/tile/295", "Irland",
                {
                        description: 'Published by L.J. Richards & Company of Philadelphia,James Hardiman Library, NUIG, Tiles from Map Warper',
                        positionInLayerChanger: 3,
                        permaId: 'Ox',
                        tileOptions: {crossOriginKeyword: null},
                        transitionEffect: "resize",
                        minZoom: 7,
                        numZoomLevels: 16,
                        attribution:'Irland 1901, L.J. Richards & Co, <a href="https://archives.library.nuigalway.ie/memorial/memorial-atlas.html" target="_blank">James Hardiman Library, NUIG</a>, Tiles from <a href="https://mapwarper.net/layers/295" target="_blank">Map Warper</a>'
                }
        );

        //----------------------------------------------------------------------------
        //      Ireland British War Office 1:25k GSGS 3906
        //----------------------------------------------------------------------------

        addHistmapTiles(
                "Ireland British War Office 1:25k GSGS 3906", "https://mapwarper.net/layers/tile/101", "Irland",
                {
                        description: 'British War Office, Glucksman Map Library, Trinity College Dublin, Tiles from Map Warper',
                        positionInLayerChanger: 3,
                        permaId: 'Oy',
                        tileOptions: {crossOriginKeyword: null},
                        transitionEffect: "resize",
                        minZoom: 7,
                        numZoomLevels: 18,
                        attribution:'Ireland British War Office 1:25k GSGS 3906, <a href="https://www.tcd.ie/library/map-library/" target="_blank">Glucksman Map Library, Trinity College Dublin</a>, Tiles from <a href="https://mapwarper.net/layers/101" target="_blank">Map Warper</a>'
                }
        );

        //----------------------------------------------------------------------
        //      Japan 1890
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Japan 1890", "region/Japan_1890", "Japan_1890",
                {
                        positionInLayerChanger: 7,
                        description: 'Vegetationsgebiete der Japanischen Inseln: Fesca, Max, ETH-Bibliothek Zürich, Public Domain Mark',
                        permaId: 'Vb',
                        minZoom: 6,
                        numZoomLevels: 11,
                        opacity: 0.8,
			attribution:'Fesca, Max: Vegetationsgebiete der Japanischen Inseln, <a href="https://dx.doi.org/10.3931/e-rara-39312" target="_blank">ETH-Bibliothek Zürich, Rar K 236</a>, <a href="https://creativecommons.org/publicdomain/mark/1.0//deed.de" target="_blank">Public Domain Mark</a>'
                }
        );
        
        
        //----------------------------------------------------------------------
        //      Hokkaido 1892
        //----------------------------------------------------------------------
        
        addHistmapTiles(
                "Hokkaido 1892", "region/Hokkaido", "Hokkaido",
                {
                        positionInLayerChanger: 8,
                        description: 'Full map of Hokkaido, City map of Sapporo, City map of Hakodate, Taikichi Tanaka (Tokyo, author and editor), Magokichi Matsumura (Tokyo, printer), Sanshodo (Tokyo, editor), International Research Center for Japanese Culture',
                        permaId: 'Vv',
                        minZoom: 7,
                        numZoomLevels: 13,
                        opacity: 0.8,
                        attribution:'Full map of Hokkaido, <a href="https://lapis.nichibun.ac.jp/chizu/map_detail.php?id=002409852" target="_blank">(from the collection of the International Research Center for Japanese Studies)</a>'
                }
        );


        //----------------------------------------------------------------------------
        //      Former Yugoslavia
        //----------------------------------------------------------------------------

        addHistmapTiles(
                "Former Yugoslavia", "https://tms.osm-hr.org/ustopo", "Yugoslavia",
                {
                        description: 'Former Yugoslavia Topographic Maps 1:50,000, Series M709, The University of Texas Libraries at Austin, U.S. Defense Mapping Agency, Tiles from OpenStreetMap Hrvatska',
                        positionInLayerChanger: 3,
                        permaId: 'Ov',
                        tileOptions: {crossOriginKeyword: null},
                        transitionEffect: "resize",
                        minZoom: 7,
                        numZoomLevels: 16,
                        attribution:'<a href="https://www.lib.utexas.edu/maps/topo/former_yugoslavia/" target="_blank">The University of Texas Libraries at Austin, U.S. Defense Mapping Agency, Tiles from <a href="https://osm-hr.org/openstreetmap-hrvatska/"                                                                                                                                                                target="_blank">OpenStreetMap Hrvatska</a>'
                }
        );
        
	//----------------------------------------------------------------------
	//	Tel Aviv 1936
	//----------------------------------------------------------------------
		
	addHistmapTiles(
                "Tel Aviv 1936", "https://mapwarper.net/mosaics/tile/596", "Tel_Aviv_1936",
                {
                        positionInLayerChanger: 7,
                        description: 'Tel Aviv 1936 from NYPL Map Warper',
                        permaId: 'Vf',
                        minZoom: 15,
                        numZoomLevels: 20,
                        opacity: 0.8,
			attribution:'Survey of Palestine, "Jaffa : Survey of Palestine, 1936" <a href="https://mapwarper.net/layers/596" target="_blank">NYPL Map Warper</a>'
                }
        );

	//----------------------------------------------------------------------
	//	Topographische Karte über das Grossherzogthum Baden 1839
	//----------------------------------------------------------------------
		
	addHistmapTiles(
                "Grossherzogthum Baden 1839", "region/Herzogtum_Baden", "Grossherzogtum_Baden",
                {
                        positionInLayerChanger: 7,
                        description: 'Topographische Karte über das Grossherzogthum Baden 1839',
                        permaId: 'Vg',
                        minZoom: 13,
                        numZoomLevels: 16,
                        opacity: 0.8,
			attribution:'Grossherzogthum Baden 1839, <a href="https://digi.ub.uni-heidelberg.de/sammlungen/karten/rothe/" target="_blank">Universitätsbibliothek Heidelberg Ministerium für Wissenschaft, Forschung und Kunst Baden-Württemberg</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/de/deed.en" target="_blank">(CC BY-SA 3.0 DE)</a>'
                }
        );
		
	//----------------------------------------------------------------------
	//	Kartenaufnahme der Rheinlande durch Tranchot und von Müffling (1803 - 1820)
	//----------------------------------------------------------------------
		
	addHistmapTiles(
                "Karte der Rheinlande von Tranchot und v. Müffling 1803-1820", "region/Rheinland_1803-1820", "Rheinland_1803-1820",
                {
                        positionInLayerChanger: 7,
                        description: 'Kartenaufnahme der Rheinlande durch Tranchot und von Müffling (1803 - 1820), Landesamt für Vermessung und Geobasisinformation (LVermGeo) Rheinland-Pfalz',
                        permaId: 'Ms',
                        minZoom: 14,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'Karte der Rheinlande von Tranchot und v. Müffling 1803-1820 , <a href="https://www.lvermgeo.rlp.de" target="_blank">©GeoBasis-DE / LVermGeoRP (2016)</a>'
                }
        );

	//----------------------------------------------------------------------
	//	Atlas_Tyrolensis
	//----------------------------------------------------------------------
		
	addHistmapTiles(
                "Atlas Tyrolensis 1774", "region/Atlas_Tyrolensis", "Tirol",
                {
                        positionInLayerChanger: 7,
                        description: 'Atlas Tyrolensis des Peter Anich und des Blasius Hueber aus dem Jahre 1774 ',
                        permaId: 'Vh',
                        minZoom: 11,
                        numZoomLevels: 15,
                        opacity: 0.8,
			attribution:'Atlas Tyrolensis, <a href="https://commons.wikimedia.org/wiki/File:Atlas_Tyrolensis-small.jpg" target="_blank">Wikimedia Commons</a>, <a href="https://www.tirol.gv.at/kunst-kultur/landesarchiv/archiv-und-quelle/24/" target="_blank">Tiroler Landesarchiv -Historische Kartenwerke Tirol-</a>, <a href="https://en.wikipedia.org/wiki/Public_domain" target="_blank">Public domain</a>'
                }
        );

	//----------------------------------------------------------------------
	//	Verkehrskarte Magdeburg 1922
	//----------------------------------------------------------------------
		
	addHistmapTiles(
                "Verkehrskarte Magdeburg 1922", "region/Verkehrskarte_Magdeburg_1922", "Magdeburg",
                {
                        positionInLayerChanger: 7,
                        description: 'Ravensteins Spezialkarte des Deutschen Reichs, Regierungsbezirk Magdeburg Karte Nr. 37, 1:300000',
                        permaId: 'Vi',
                        minZoom: 11,
                        numZoomLevels: 15,
                        opacity: 0.8,
			attribution:'Verkehrskarte Magdeburg von Hans Ravenstein, Ravensteins Geographische Verlagsanstalt <a href="https://commons.wikimedia.org/wiki/File:Neue Spezial- und Verkehrskarte für den Regierungsbezirk Magdeburg.jpg" target="_blank">Wikimedia Commons</a>, <a href="https://en.wikipedia.org/wiki/Public_domain" target="_blank">Public domain</a>'
                }
        );

	//----------------------------------------------------------------------------
        //      Carte industrielle de la région parisienne 1927
        //----------------------------------------------------------------------------

        addHistmapTiles(
                "Carte industrielle de la région parisienne 1927", "https://mapwarper.net/mosaics/tile/867", "Paris",
                {
                        description: 'Carte industrielle de la région parisienne 1927, Bibliothèque nationale de France, Tiles from Map Warper',
                        positionInLayerChanger: 3,
                        permaId: 'Vj',
                        tileOptions: {crossOriginKeyword: null},
                        transitionEffect: "resize",
                        minZoom: 13,
                        numZoomLevels: 18,
						opacity: 0.8,
                        attribution:'Carte industrielle de la région parisienne, <a href="https://catalogue.bnf.fr/ark:/12148/cb40712638q" target="_blank">gallica.bnf.fr / Bibliothèque nationale de France</a>, Tiles from <a href="https://mapwarper.net/layers/867" target="_blank">Map Warper</a>'
                }
        );

	//----------------------------------------------------------------------
	//	Post und Eisenbahn-Reisekarte Deutschland 1859
	//----------------------------------------------------------------------
		
	addHistmapTiles(
                "Post und Eisenbahn-Reisekarte Deutschland 1859", "region/Reisekarte_Deutschland_1856", "kdr1893",
                {
                        positionInLayerChanger: 7,
                        description: 'Post und Eisenbahn-Reisekarte Deutschland 1859, Bayerische Staatsbibliothek München',
                        permaId: 'Vk',
                        minZoom: 7,
                        numZoomLevels: 12,
                        opacity: 0.8,
			attribution:'Post und Eisenbahn-Reisekarte Deutschland 1859 , <a href="https://www.bsb-muenchen.de" target="_blank">© Bayerische Staatsbibliothek München, urn:nbn:de:bvb:12-bsb00112332-6</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a>'
                }
        );
		
		
	//----------------------------------------------------------------------
	//	Ostbelgien Grenze 
	//----------------------------------------------------------------------

	addHistmapTiles(
                "Ostbelgien Grenze 1873", "loc/Ostbelgien-Grenze", "Eupen-grenz",
                {
                        positionInLayerChanger: 13,
                        description: 'National Geographic Institute www.ign.be',
                        permaId: 'Vl',
                        minZoom: 10,
                        numZoomLevels: 17,
                        opacity: 0.9,
			attribution:'Extract from IGN maps with the authorization A3647 Of the National Geographic Institute <a href="https://www.ign.be" target="_blank">www.ign.be" <img src="../../../i/ign.png" width="131px" hight="31px"></a>'
                }
        );

	//----------------------------------------------------------------------
	//	Ostbelgien Grenze 1936
	//----------------------------------------------------------------------
				
	addHistmapTiles(
                "Ostbelgien Grenze 1936", "loc/Ostbelgien-Grenze-1936", "Eupen-grenz",
                {
                        positionInLayerChanger: 14,
                        description: 'National Geographic Institute www.ign.be',
                        permaId: 'Vm',
                        minZoom: 10,
                        numZoomLevels: 17,
                        opacity: 0.9,
			attribution:'Extract from IGN maps with the authorization A3647 Of the National Geographic Institute <a href="https://www.ign.be" target="_blank">www.ign.be" <img src="../../../i/ign.png" width="131px" hight="31px"></a>'
                }
        );
	//----------------------------------------------------------------------
	//	Westrussland 1905
	//----------------------------------------------------------------------

				
		addHistmapTiles(
                "Westrussland 1905", "region/Westrussland", "Westruss",
                {
                        positionInLayerChanger: 14,
                        description: 'Westrussland aus der David Rumsey Map Collection',
                        permaId: 'Vn',
                        minZoom: 8,
                        numZoomLevels: 12,
                        opacity: 0.9,
			attribution:'<a href="http://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>, Andrees Allgemeiner Handatlas-Authors Richard Andree and Albert Scobel'
                }
        );

    //----------------------------------------------------------------------
	//	Schmettau 1787 Brandenburg
	//----------------------------------------------------------------------

            
		addHistmapTiles(
                "Schmettau 1787", "region/Schmettau-1787", "Schmettau-1787",
                {
                        positionInLayerChanger: 14,
                        description: 'Quelle © Staatsbibliothek zu Berlin – Preußischer Kulturbesitz',
                        permaId: 'Vo',
                        minZoom: 11,
                        numZoomLevels: 15,
                        opacity: 0.9,
			attribution:'<a href="https://geobasis-bb.de/lgb/de/geodaten/historische-karten/schmettausches-kartenwerk-%281767-1787%29/" target="_blank">Landesvermessung und Geobasisinformation Brandenburg (LGB) </a> Quelle © Staatsbibliothek zu Berlin – Preußischer Kulturbesitz, <a href="https://www.govdata.de/dl-de/by-2-0" target="_blank">dl-de-by-2.0 (Daten geändert)</a>'
                }
        );
        
    //----------------------------------------------------------------------
	//	Sachsen 1857
	//----------------------------------------------------------------------
		
	addHistmapTiles(
                "Wandkarte vom Königreiche Sachsen 1857", "region/Sachsen_1857", "sachsen",
                {
                        positionInLayerChanger: 8,
                        description: 'Wandkarte vom Königreiche Sachsen 1857, Leibniz-Institut für Länderkunde e.V.',
                        permaId: 'Vp',
                        minZoom: 10,
                        numZoomLevels: 14,
                        opacity: 0.8,
			attribution:'Wandkarte vom Königreiche Sachsen 1857 ,<a href="https://leibniz-ifl.de/" target="_blank">Leibniz-Institut für Länderkunde e.V., Leipzig</a>, <a href="https://commons.wikimedia.org/wiki/Category:1857_maps_of_Saxony" target="_blank">Wikimedia Commons</a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en" target="_blank">(CC0 1.0) Public Domain Dedication</a>'
                }
        );
        
    //----------------------------------------------------------------------
    //	Sächsische Meilenblätter 1781/1810
    //----------------------------------------------------------------------
    
    addHistmapTiles(
            "Sächsische Meilenblätter 1781/1810", "region/SMB", "sachsen",
            {
                    positionInLayerChanger: 8,
                    description: 'Meilenblätter von Sachsen,Berliner Exemplar aufgenommen vom Sächs. Ing.-Korps 1780 - 1806 unter Ltg. von Friedrich Ludwig Aster',
                    permaId: 'Vs',
                    minZoom: 10,
                    numZoomLevels: 17,
                    opacity: 0.8,
                    attribution:'Meilenblätter von Sachsen, Sächs. Ing.-Korps unter Ltg. von Friedrich Ludwig Aster, <a href="https://www.deutschefotothek.de/cms/kartenforum-sachsen-meilenblaetter-berlin.xml" target="_blank">SLUB / Deutsche Fotothek</a>, <a href="https://commons.wikimedia.org/wiki/Category:Meilenbl%C3%A4tter" target="_blank">Wikimedia Commons</a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en" target="_blank">(CC0 1.0) Public Domain Dedication</a>'
            }
    );
    
     //----------------------------------------------------------------------
	 //	 Sitzenrodaer-Forst 1780
	//----------------------------------------------------------------------
		
	addHistmapTiles(
                "Sitzenrodaer-Forst 1780", "region/Sitzenrodaer-Forst_1780", "sachsen",
                {
                        positionInLayerChanger: 8,
                        description: 'Karte vom Sitzenroder Forstrevier, Handzeichnung, 1780',
                        permaId: 'Vr',
                        minZoom: 10,
                        numZoomLevels: 17,
                        opacity: 0.8,
			attribution:'Karte vom Sitzenroder Forstrevier 1780 ,<a href="http://www.deutschefotothek.de/documents/obj/70400358" target="_blank"> Pönisch, Carl Ernst, Sächsische Landesbibliothek - Staats- und Universitätsbibliothek Dresden (SLUB)</a>, <a href="https://creativecommons.org/publicdomain/mark/1.0/deed.en" target="_blank">(CC0 1.0) Public Domain</a>'
                }
        );

        //----------------------------------------------------------------------
        //       MTB3548 und 3549 Saarbruecken/St. Johann 1887/82
        //----------------------------------------------------------------------

        addHistmapTiles(
                "MTB35xx Saarbrücken/St. Johann 1882-87", "city/MTB35xx-SB-StJ", "MTB35xx-SB-StJ",
                {
                        positionInLayerChanger: 7,
                        description: 'MTB35xx Saarbrücken/St. Johann 1882-87',
                        permaId: 'Vx',
                        minZoom: 12,
                        numZoomLevels: 17,
                        opacity: 0.8,
                        attribution:'Landesarchiv Saarbrücken, Bestand K Hellwig, Nr. 0315 / CC-BY-SA 3.0 DE'
                }
        );

        //----------------------------------------------------------------------
        //       Carte GeoFR 161 Pfalz von 1770
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Carte GeoFR 161 Pfalz 1770", "region/GeoFR161-Pfalz-1770", "GeoFR161",
                {
                        positionInLayerChanger: 7,
                        description: 'Carte GeoFR 161 Pfalz 1770',
                        permaId: 'Vy',
                        minZoom: 11,
                        numZoomLevels: 16,
                        opacity: 0.8,
                        attribution:'Landesarchiv Saarbrücken, Bestand K Hellwig, Nr. 0261, Urheber César-Francois Cassini de Thury (1714-1784) / CC-BY-SA 3.0 DE'
                }
        );

        //----------------------------------------------------------------------
        //       Ostfrankreich-Vogesen Hachette 1892
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Ostfrankreich-Vogesen Hachette 1892", "region/OstFR-Vogesen-1892", "OstFR-Vogesen-1892",
                {
                        positionInLayerChanger: 7,
                        description: 'Ostfrankreich-Vogesen Hachette 1892',
                        permaId: 'Vz',
                        minZoom: 12,
                        numZoomLevels: 16,
                        opacity: 0.8,
                        attribution:'Landesarchiv Saarbrücken, Bestand K Hellwig, Nr. 959-972, Urheber Librairie Hachette et Cie. / CC-BY-SA 3.0 DE'
                }
        );

        //----------------------------------------------------------------------
        //       Püttlingen Tractus 1784
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Püttlingen Tractus 1784", "city/Puettlingen/Tractus_1784", "Puettl-Tractus-1784",
                {
                        positionInLayerChanger: 7,
                        description: 'Püttlingen Tractus 1784',
                        permaId: 'Wa',
                        minZoom: 14,
                        numZoomLevels: 20,
                        opacity: 0.8,
                        attribution:'Stadtarchiv Püttlingen'
                }
        );

        //----------------------------------------------------------------------
        //       Püttlingen - Nassau-Saarbrückische Überarbeitung der Tractus-Karte 1822
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Püttlingen Nassau-SB 1822", "city/Puettlingen/Nassau_1822", "Puettl-Nassau-1822",
                {
                        positionInLayerChanger: 7,
                        description: 'Püttlingen Nassau SB 1822',
                        permaId: 'Vw',
                        minZoom: 12,
                        numZoomLevels: 20,
                        opacity: 0.8,
                        attribution:'Saarländisches Landesarchiv'
                }
        );

        //----------------------------------------------------------------------
        //       Püttlingen - Tractus Karte 1759 von Rittenhofen, Coelln, Engelfangen
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Tractus Rittenhofen/Coelln/Engelfangen 1759", "city/Puettlingen/RittCoEng_1759", "Rittenhofen-Coelln-Engelfangen_1759",
                {
                        positionInLayerChanger: 7,
                        description: 'Rittenhofen/Coelln/Engelfangen 1759',
                        permaId: 'Wb',
                        minZoom: 14,
                        numZoomLevels: 20,
                        opacity: 0.8,
                        attribution:'Saarländisches Landesarchiv'
                }
        );

        //----------------------------------------------------------------------
        //       Herchenbach - Tractus Karte 1807-1809
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Tractus Herchenbach 1807", "city/Puettlingen/Herchenbach_1807", "Herchenbach_1807",
                {
                        positionInLayerChanger: 7,
                        description: 'Herchenbach Tractus 1807',
                        permaId: 'Wc',
                        minZoom: 14,
                        numZoomLevels: 20,
                        opacity: 0.8,
                        attribution:'Stadtarchiv Püttlingen, Bestand D1.1-8167 bis D1.1-8170'
                }
        );

        //----------------------------------------------------------------------
        //       Wehrden - Tractus Karte 1755
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Tractus Wehrden 1755", "city/Voelklingen/Wehrden_1755", "Wehrden_1755",
                {
                        positionInLayerChanger: 7,
                        description: 'Wehrden Tractus 1755',
                        permaId: 'Wi',
                        minZoom: 14,
                        numZoomLevels: 20,
                        opacity: 0.8,
                        attribution:'(wird in Kürze ergänzt)'
                }
        );

        //----------------------------------------------------------------------
        //       Geislautern - Tractus Karte 
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Tractus Geislautern", "city/Voelklingen/Geislautern", "Geislautern",
                {
                        positionInLayerChanger: 7,
                        description: 'Geislautern Tractus',
                        permaId: 'Wj',
                        minZoom: 14,
                        numZoomLevels: 20,
                        opacity: 0.8,
                        attribution:'(wird in Kürze ergänzt)'
                }
        );

        //----------------------------------------------------------------------
        //       Fürstenhausen - Tractus Karte
        //----------------------------------------------------------------------

        addHistmapTiles(
                "Tractus Fürstenhausen", "city/Voelklingen/Fuerstenhausen", "Fuerstenhausen",
                {
                        positionInLayerChanger: 7,
                        description: 'Fürstenhausen Tractus',
                        permaId: 'Wk',
                        minZoom: 14,
                        numZoomLevels: 20,
                        opacity: 0.8,
                        attribution:'(wird in Kürze ergänzt)'
                }
        );


