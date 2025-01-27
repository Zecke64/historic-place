//==============================================================================
//	$Id: config.js,v 1.4 2025/01/23 19:08:47 wolf Exp wolf $
//==============================================================================

//==============================================================================
//
//	Zuordung der Icons
//
//==============================================================================


//==============================================================================
//
//	Hat Objekt Zusatzinfos?
//
//==============================================================================


function hasImageFromData (data) {

	return	data.image ||
		data.url ||
		data.website ||
		data['memorial:website'] ||
		data['heritage:website'] ||
		data.wikipedia ||
		data['wikipedia:de'] ||
		data['wikidata'] ||
		data['openplaques:id'] ||
		data['ref:whc'] ||
		data['ref:FR:MemorialGenWeb'] ||
		data['ref:OnroerendErfgoed'] ||
		data['ref:mhs'] ||
		data['ref:rce'] ||
		data['ref:npu'] ||
		data['ref:bldam'] ||
		data['ref:lfdh'] ||
		data['ref:clt'] ||
		data['ref:LfDH'] ||
		data['ref:LfKD'] ||
		data['ref:kgs'] ||
		data['ref:at:bda'] ||
		data['ref:AT:bda'] ||
		data['ref:hs'] ||
		data['ref:he'] ||
		data['HE_ref'] ||
		data['ref:cadw'] ||
		data['ref:lt:kpd'] ||
		data['ref:nrhp'] ||
		data['subject:wikipedia'] ||
		data['subject:wikidata'] ||
		data['mapillary'] ||
		data.wikimedia_commons;
}

//==============================================================================
//
//	Funktion für Popup-Box Anzeige von Heritage
//
//==============================================================================

function isHeritage (data) {

	if (data.heritage=='1') {

		return 'wke';
	}

	if (data.heritage=='no') {

		return null;
	}

	if (data.historic=='heritage' || data.heritage) {

		switch (data['heritage:operator']) {

		case 'whc':
			return 'wke';
		case 'eh':
		case 'English Heritage':
		case 'English_Heritage':
			return 'heritage-en';
		case 'mhs':
			return 'mhs';
		case 'nid':
			return 'nid';
		case 'nld':
			return 'nld';
		case 'LfDH':
			return 'LfDH';
		case 'lfdh':
			return 'LfDH';
		case 'raa':
			return 'raa';
		case 'UntereDenkmalbehörde':
			return 'nrw';
		case 'BezirksRegierung':
			return 'nrw';
		case 'Institut für Denkmalschutz und Denkmalpflege Essen':
			return 'nrw';
		case 'IfDuD Essen':
			return 'nrw';
		case 'IfDuD Düsseldorf':
			return 'nrw';
		case 'Institut für Denkmalschutz und Denkmalpflege Düsseldorf':
			return 'nrw';
		case 'npu':
			return 'npu';
		case 'uzkb':
			return 'uzkb';
		case 'Národní památkový ústav':
			return 'npu';
		case 'cadw':
			return 'cadw';
		case 'bda':
			return 'bda';
		case 'he':
			return 'he';
		case 'Historic England':
			return 'he';
		case 'hs':
			return 'hs';
		case 'mcrb':
			return 'Belarus_Heritage';
		case 'kpd':
			return 'kpd';
		default:
			return 'heritage';
		}
	}

	if( data.building == 'protected_building' )
		return ['heritage', 18];

	return null;
}


//------------------------------------------------------------------------------
//	Bestimme Icon aus Name-Feldern
//------------------------------------------------------------------------------

function nameMagic( data ){

	const jtext = data['name:ja'] || data.name || '';

	if( jtext.match(/(\u4ecf|\u4f5b|\u91c8\u8fe6)/) ){
		return ['buddha', 30];
	}

	if( jtext.match(/\u89b3\u97f3/) ){
		return ['kannon', 30];
	}

	return null;
}

//==============================================================================
//
//	Icon-Zuweisung
//
//==============================================================================


function iconParamsFromData (data, noHeritage, zoom) {

	switch (data['~group']) {

	//----------------------------------------------------------------------
	//
	//	Heritage
	//
	//----------------------------------------------------------------------

	case 'Wke':
		if (!noHeritage)
			return ['wke', 27, 28];	// !!! Special size !!!

	case 'Heritage00':
	case 'Heritage01':
	case 'Heritage02':
	case 'Heritage03':
	case 'Heritage04':
	case 'Heritage05':
	case 'Heritage06':
	case 'Heritage07':
	case 'Heritage08':
	case 'Heritage09':
	case 'Heritage10':
	case 'Heritage00.userinfo':
	case 'Heritage01.userinfo':
	case 'Heritage02.userinfo':
	case 'Heritage03.userinfo':
	case 'Heritage04.userinfo':
	case 'Heritage05.userinfo':
	case 'Heritage06.userinfo':
	case 'Heritage07.userinfo':
	case 'Heritage08.userinfo':
	case 'Heritage09.userinfo':
	case 'Heritage10.userinfo':
	case 'Heritage00.image':
	case 'Heritage01.image':
	case 'Heritage02.image':
	case 'Heritage03.image':
	case 'Heritage04.image':
	case 'Heritage05.image':
	case 'Heritage06.image':
	case 'Heritage07.image':
	case 'Heritage08.image':
	case 'Heritage09.image':
	case 'Heritage10.image':

		if (data['heritage:operator']=='eh' ||
			data['heritage:operator']=='English Heritage' ||
			data['heritage:operator']=='English_Heritage'){

			return ['heritage-en',18];
		}

		if (data['heritage:operator']=='mhs')
			return ['mhs',18];
		if (data['heritage:operator']=='nid')
			return ['nid',18];
		if (data['heritage:operator']=='raa')
			return ['raa',18];
		if (data['heritage:operator']=='npu' || data['heritage:operator']=='Národní památkový ústav')
			return ['npu',18];

		if (data['heritage:operator']=='UntereDenkmalbehörde'||
			data['heritage:operator']=='BezirksRegierung' ||
			data['heritage:operator']=='Institut für Denkmalschutz und Denkmalpflege Essen' ||
			data['heritage:operator']=='Institut für Denkmalschutz und Denkmalpflege Düsseldorf'||
			data['heritage:operator']=='IfDuD Essen' ||
			data['heritage:operator']=='IfDuD Düsseldorf' ||
			data['heritage:operator']=='Institut für Denkmalschutz und Denkmalpflege' ||
			data['heritage:operator']=='UntereDenkmalbehörde Velbert'){

			return ['nrw',16,18];
		}

		if (data['heritage:operator']=='uzkb')
			return ['uzkb',18];
		if (data['heritage:operator']=='bda')
			return ['bda',18];
		if (data['heritage:operator']=='he')
			return ['he',18];
		if (data['heritage:operator']=='Historic England')
			return ['he',18];
		if (data['heritage:operator']=='hs')
			return ['hs',18];
		if (data['heritage:operator']=='cadw')
			return ['cadw',18];
		if (data['heritage:operator']=='mcrb')
			return ['Belarus_Heritage',18];
		if (data['heritage:operator']=='kpd')
			return ['kpd',18];
		if (data.building=='transformer_tower')
			return ['power', 25];
		if (data.railway)
			return ['heritage', 18];

		return ['heritage', 18];

	case 'Area':

		if (data['heritage:operator']=='MDG' && data['MDG:criteria']=='L')
			return ['heritage-l',32];
		if (data['cemetery']=='war_cemetery')
			return ['war_cemetery',28];
		return ['heritage', 28];

	case 'Heritage_site':
	case 'Heritage_site.image':
	case 'Heritage_site.userinfo':

		if (data['heritage:operator']=='eh' ||
			data['heritage:operator']=='English Heritage' ||
			data['heritage:operator']=='English_Heritage'){
			return ['heritage-en',18];
		}

		if (data['heritage:operator']=='mhs')
			return ['mhs',18];
		if (data['heritage:operator']=='nid')
			return ['nid',18];

		//if (data['heritage:operator']=='nld')
		//	return ['nld',23];
		//if (data['heritage:operator']=='LfDH')
		//	return ['LfDH',28];
		//if (data['heritage:operator']=='lfdh')
		//	return ['LfDH',28];

		if (data['heritage:operator']=='raa')
			return ['raa',18];
		if (data['heritage:operator']=='npu' || data['heritage:operator']=='Národní památkový ústav')
			return ['npu',18];

		if(	data['heritage:operator']=='UntereDenkmalbehörde'||
			data['heritage:operator']=='BezirksRegierung' ||
			data['heritage:operator']=='Institut für Denkmalschutz und Denkmalpflege Essen' ||
			data['heritage:operator']=='Institut für Denkmalschutz und Denkmalpflege Düsseldorf'||
			data['heritage:operator']=='IfDuD Essen' ||
			data['heritage:operator']=='IfDuD Düsseldorf' ||
			data['heritage:operator']=='Institut für Denkmalschutz und Denkmalpflege' ||
			data['heritage:operator']=='UntereDenkmalbehörde Velbert'){

			return ['nrw',16,18];
		}

		if (data['heritage:operator']=='uzkb')
			return ['uzkb',18];
		if (data['heritage:operator']=='bda')
			return ['bda',18];
		if (data['heritage:operator']=='he')
			return ['he',18];
		if (data['heritage:operator']=='Historic England')
			return ['he',18];
		if (data['heritage:operator']=='hs')
			return ['hs',18];
		if (data['heritage:operator']=='cadw')
			return ['cadw',18];
		if (data['heritage:operator']=='mcrb')
			return ['Belarus_Heritage',18];
		if (data['heritage:operator']=='kpd')
			return ['kpd',18];

		return ['heritage', 18];

	//----------------------------------------------------------------------
	//
	//	Memorial
	//
	//----------------------------------------------------------------------

	case 'Memorial':
	case 'Memorial.userinfo':
	case 'Memorial.image':

		switch (data['memorial:type']) {

		case 'statue':
			return nameMagic(data) ||
				(zoom>=17 ? ['statue>16', 25] : ['statue', 20]);
		case 'hand_print':
			return ['hand_print', 30];
		case 'highwater_mark':
			return ['highwater_mark', 30];
		case 'obelisk':
			if (zoom>=17)
				return ['obelisk2>16', 25];
			return ['obelisk2', 25];
		default: break;
		}

		switch (data['memorial']) {

		case 'statue':
			return nameMagic(data) ||
				(zoom>=17 ? ['statue>16', 25] : ['statue', 20]);

		case 'bust':
			return nameMagic(data) ||
				(zoom>=17 ? ['bust', 28] : ['bust', 20]);

		case 'stone':
			if (zoom>=17)
				return ['memorial-stone', 28];
			return ['memorial-stone', 20];

		case 'stele':
			if (zoom>=17)
				return ['memorial-stele', 28];
			return ['memorial-stele', 20];

		case 'hand_print':
			return ['hand_print', 30];

		case 'highwater_mark':
			return ['highwater_mark', 30];

		case 'obelisk':
			if (zoom>=17)
				return ['obelisk2>16', 25];
			return ['obelisk2', 25];

		default: break;
		}

		switch (data['man_made'] ) {

		case 'torii':
				return ['torii', 25];

		case 'obelisk':

			switch (data['historic:civilization'] ) {
			case 'ancient_egyptian':
			case 'ancient_roman':
				if (zoom>=17)
					return ['obelisk-antik>16', 25];
				return ['obelisk-antik', 25];
			default: break;
			}

			if (zoom>=17)
				return ['obelisk2>16', 25];

			return ['obelisk2', 20];

		default: break;
		}

		if (zoom>=18)
			return ['memorial', 30];

                return ['memorial', 20];

	//----------------------------------------------------------------------
	//
	//	Suehnekreuz
	//
	//----------------------------------------------------------------------

	case 'Suehnekreuz':

		return ['suehnekreuz',20];

	//----------------------------------------------------------------------
	//
	//	Place_of_worship
	//
	//----------------------------------------------------------------------

	case 'Place_of_worship':

		if( data.historic == 'hermitage' )
			return ['Einsiedelei',25];

		switch (data.building) {

		case 'chapel':
			return ['kapelle',25];
		case 'hermitage':
			return ['Einsiedelei',25];
		default: break;
		}

		switch (data.religion) {

		case 'jewish':
			if (data.heritage || data.wikipedia || data.image || data.wikidata )
				return ['jewish',20];
			return ['null',1];

		case 'muslim':
			if (data.heritage || data.wikipedia || data.image || data.wikidata )
				return ['muslim',20];
			return ['null',1];

		case 'buddhist':
			if (data.heritage || data.wikipedia || data.image || data.wikidata )
				return ['buddhist',20];
			return ['null',1];

		case 'shinto':
			if (data.heritage || data.wikipedia || data.image || data.wikidata )
				return ['shinto',20];
			return ['null',1];

		case 'hindu':
			if (data.heritage || data.wikipedia || data.image || data.wikidata )
				return ['hindu',20];
			return ['null',1];

		case 'christian':
			if (data.denomination && data.denomination.indexOf('orthodox')>=0)
				return ['orthodox',20];
			if (data.heritage || data.wikipedia || data.image || data.wikidata )
				return ['christian',20];
			return ['null',1];

		case 'taoist':
			if (data.heritage || data.wikipedia || data.image || data.wikidata )
				return ['taoist',20];
			return ['null',1];

		case 'pastafarian':
			return ['fsm',30];

		default: break;
		}

		return ['beten',20];

	//----------------------------------------------------------------------
	//
	//	Bunker
	//
	//----------------------------------------------------------------------

	case 'Bunker':

		if (data['ruins']=='yes' || data['historic'] == 'ruins')
			return ['bunker-r',25];
		return ['bunker',25];

	//----------------------------------------------------------------------
	//
	//	Military
	//
	//----------------------------------------------------------------------

	case 'Military':

		if (data['abandoned:military']=='trench')
			return ['trench',16];
		if (data['abandoned:military'] == 'tank_trap')
			return ['panzersperre',20];
		if (data['abandoned:military'] == 'anti_armored_vehicle_barrier')
			return ['panzersperre',20];
		return ['military',20];

	//----------------------------------------------------------------------
	//
	//	Abandoned_place
	//
	//----------------------------------------------------------------------

	case 'Abandoned_place':

		return ['wuestung',18];

	//----------------------------------------------------------------------
	//
	//	Aircraft
	//
	//----------------------------------------------------------------------

	case 'Aircraft':

		return ['airport',20];

	//----------------------------------------------------------------------
	//
	//	Archaeological_site
	//
	//----------------------------------------------------------------------

	case 'Archaeological_site':

		switch (data.archaeological_site) {

		case 'megalith':

			switch (data.megalith_type) {

			case 'menhir':
				return ['menhir',25];
			case 'passage_grave':
				return ['passage_grave',25];
			case 'stone_circle':
				return ['stone_circle',25];
			case 'alignment':
				return ['alignment',25];
			case 'chamber':
				return ['chamber',25];
			case 'grosssteingrab':
				return ['megalith',25];
			case 'dolmen':
				return ['megalith',25];
			case 'nuraghe':
				return ['nuraghe',25];
			case 'tholos':
				return ['tholos',25];
			case 'cist':
				return ['cist',25];
			case 'stone_ship':
				return ['stone_ship',25];
			default: break;
			}

		case 'fortification':

			if( data.fortification_type == 'dun' )
				return ['dun',28];
			return ['fort',28];

		case 'minilith':
			return ['alignment',25];
		case 'tumulus':
			return ['tumulus',25];
		case 'petroglyph':
			return ['petroglyph',25];
		case 'city':
			return ['archaeological_city',25];
		case 'hut_circle':
			return ['dun',25];
		case 'dun':
			return ['dun',25];
		default: break;
		}

		switch (data.site_type) {

		case 'megalith':

			switch (data.megalith_type) {

			case 'menhir':
				return ['menhir',25];
			case 'passage_grave':
				return ['passage_grave',25];
			case 'stone_circle':
				return ['stone_circle',25];
			case 'alignment':
				return ['alignment',25];
			case 'chamber':
				return ['chamber',25];
			case 'grosssteingrab':
				return ['megalith',25];
			case 'dolmen':
				return ['megalith',25];
			case 'nuraghe':
				return ['nuraghe',25];
			case 'tholos':
				return ['tholos',25];
			case 'cist':
				return ['cist',25];
			case 'stone_ship':
				return ['stone_ship',25];
			default: break;
			}

		case 'fortification':

			if( data.fortification_type == 'dun' )
				return ['dun',28];

                        return ['fort',28];

		case 'minilith':
			return ['alignment',25];

		case 'tumulus':
			return ['tumulus',25];

		case 'petroglyph':
			return ['petroglyph',25];

		case 'city':
			return ['archaeological_city',25];

		case 'hut_circle':
			return ['dun',25];

		case 'dun':
			return ['dun',25];

		default: break;
		}

		return ['archaeologie',20];

	//----------------------------------------------------------------------
	//
	//	Battlefield
	//
	//----------------------------------------------------------------------

	case 'Battlefield':

		return ['battlefield',25];

	//----------------------------------------------------------------------
	//
	//	Boundary_stone
	//
	//----------------------------------------------------------------------

	case 'Boundary_stone':

		if (data['boundary_name'] == 'Historische Forstgrenze zur Abgrenzung des kurfürstl.-sächs. Waldbesitzes')
			return 'schwerter';
		if (data['de.boundary_name'] == 'Historische Forstgrenze zur Abgrenzung des kurfürstl.-sächs. Waldbesitzes')
			return 'schwerter';
		if (data['boundary'] == 'Historische Forstgrenze zur Abgrenzung des kurfürstl.-sächs. Waldbesitzes')
			return 'schwerter';
		if (data['boundary'] == 'Historische Forst-Abteilungs oder Jagengrenze')
			return 'abt_boundary_stone';
		if (data['de.boundary_name'] == 'Historische Forst-Abteilungs oder Jagengrenze')
			return 'abt_boundary_stone';
		if (data['boundary_name'] == 'Historische Forst-Abteilungs oder Jagengrenze')
			return 'abt_boundary_stone';
		if (data['boundary_name'] == 'Historische Kreisgrenze')
			return 'kreis';
		if (data['de.boundary_name'] == 'Historische Kreisgrenze')
			return 'kreis';
		if (data['boundary'] == 'Historische Kreisgrenze')
			return 'kreis';
		if (data['boundary'] == 'Historische Gemeindegrenze')
			return 'gemeinde_boundary_marker';
		if (data['boundary_name'] == 'Historische Gemeindegrenze')
			return 'gemeinde_boundary_marker';
		if (data['de.boundary_name'] == 'Historische Gemeindegrenze')
			return 'gemeinde_boundary_marker';
		if( data.boundary == 'marker' )
			return ['boundary_marker',25];

		return ['historic_boundary_stone',25];

	//----------------------------------------------------------------------
	//
	//	Water_well
	//
	//----------------------------------------------------------------------

	case 'Water_well':

		if (data['amenity'] == 'fountain')
			return ['fountain',22];

		return ['brunnen',22];

	//----------------------------------------------------------------------
	//
	//	Pump_manual
	//
	//----------------------------------------------------------------------

	case 'Pump_manual':
	case 'Pump_manual.userinfo':
	case 'Pump_manual.image':

		return ['pumpe',18];

	//----------------------------------------------------------------------
	//
	//	Building
	//
	//----------------------------------------------------------------------

	case 'Building':

		if (data.historic=='shelter')
			return ['historic_shelter',20];
		if (data.man_made=='torii')
			return ['torii',25];
		if (data.building=='transformer_tower')
			return ['power',25];

		if (data['image'] || data['wikidata'] || data['wikipedia'] ||
			data['website']|| data['heritage:website'] ||
			data['url'] || data['wikimedia_commons'] ){

			return ['house',18];
		}

		return ['null',1];

	//----------------------------------------------------------------------
	//
	//	Castle
	//
	//----------------------------------------------------------------------

	case 'Castle':

		switch (data.castle_type) {

		case 'defensive':
			if (data['ruins'] == 'yes')
				return ['burg-r',28];
			return ['burg',28];

		case 'fortress':
		case 'kremlin':
			if (data['ruins'] == 'yes')
				return ['castle-r',28];
			return ['castle',28];

		case 'stately':
			if (data['ruins'] == 'yes')
				return ['schloss-r',28];
			return ['schloss',28];

		case 'palace':
			if (data['ruins'] == 'yes')
				return ['palast-r',28];
			return ['palast',28];

		case 'shiro':
			if (data['ruins'] == 'yes')
				return 'shiro-r';
			return 'shiro';

		default: break;
		}

		switch (data.historic) {

		case 'fort':
			if (data['ruins'] == 'yes')
				return ['castle-r',28];
			return ['castle',28];

		case 'palace':
			if (data['ruins'] == 'yes')
				return ['palast-r',25];
			return ['palast',25];

		default: break;
		}

		if (data['ruins'] == 'yes')
			return ['castle2-r',25];
		if (data['razed:historic'] == 'castle')
			return ['razed_schloss',25];

		return ['castle2',25];


	//----------------------------------------------------------------------
	//
	//	Manor
	//
	//----------------------------------------------------------------------

	case 'Manor':

		return ['manor',20];

	//----------------------------------------------------------------------
	//
	//	Watermill
	//
	//----------------------------------------------------------------------

	case 'Watermill':

		if (data['ruins'] == 'yes')
			return ['watermill-r',25];
		return ['watermill',25];

	//----------------------------------------------------------------------
	//
	//	Windmill
	//
	//----------------------------------------------------------------------

	case 'Windmill':

		if (data['ruins'] == 'yes')
			return ['windmill-r',25];
		return ['windmill',25];


	//----------------------------------------------------------------------
	//
	//	Monastery
	//
	//----------------------------------------------------------------------

	case 'Monastery':

		if (data['ruins'] == 'yes')
			return 'kloster-r';
		return 'kloster';


	//----------------------------------------------------------------------
	//
	//	Prison_camp
	//
	//----------------------------------------------------------------------

	case 'Prison_camp':

		switch (data['abandoned:amenity']) {

		case 'prison_camp':
			if (data['prison_camp']== 'concentration_camp')
				return 'concentration_camp';
			if (data['prison_camp'] == 'pow_camp')
				return 'pow_camp';
			if (data['prison_camp'] == 'labor_camp')
				return 'pow_camp';
			return 'concentration_camp';

		case 'prison':
			return 'prison';

		default: break;
		}

		if (data['prison']== 'prison_camp')
			return 'concentration_camp';
		if (data['prison_camp'] == 'pow_camp')
			return 'pow_camp';
		if (data['prison_camp'] == 'labor_camp')
			return 'pow_camp';

	//----------------------------------------------------------------------
	//
	//	Gallows
	//
	//----------------------------------------------------------------------

	case 'Gallows':

		return 'gallows';

	//----------------------------------------------------------------------
	//
	//	Road
	//
	//----------------------------------------------------------------------

	case 'Road':

		switch (data.historic) {

		case 'packhorse_trail':
			return ['esel',28];
		case 'mule_path':
			return ['esel',28];
		case 'hollow_way':
			return ['hollow_way',12];
		default: break;
		}

		switch (data['abandoned:historic']) {

		case 'packhorse_trail':
			return ['esel',28];
		case 'mule_path':
			return ['esel',28];
		default: break;
		}

		return ['histroad',20];

	//----------------------------------------------------------------------
	//
	//	Palaeontological_site
	//
	//----------------------------------------------------------------------

	case 'Palaeontological_site':

		return ['palaeontological_site', 26, 26];

	//----------------------------------------------------------------------
	//
	//	Runestone
	//
	//----------------------------------------------------------------------

	case 'Runestone':

		return ['runestone',20];

	//----------------------------------------------------------------------
	//
	//	Townhall
	//
	//----------------------------------------------------------------------

	case 'Townhall':

		return ['rathaus',20];

	//----------------------------------------------------------------------
	//
	//	Mineshaft
	//
	//----------------------------------------------------------------------

	case 'Mineshaft':

		if( (data['disused:man_made']) == 'mineshaft' )
			return ['mine-d',25];
		if( (data['abandoned:man_made']) == 'mineshaft' )
			return ['mine-d',25];
		if (data['razed'] == 'yes')
				return ['mine-razed',25];
		if (data['abandoned'] == 'yes' || data['disused'] == 'yes')
				return ['mine-d',25];
		return ['mine',25];

	//----------------------------------------------------------------------
	//
	//	Headframe
	//
	//----------------------------------------------------------------------

	case 'Headframe':

		if( data['disused:man_made'] == 'mineshaft' )
			return ['mine-d',25];
		if( (data['abandoned:man_made']) == 'mineshaft')
			return ['mine-d',25];
		if (data['razed'] == 'yes')
			return ['mine-razed',25];
		if (data['abandoned'] == 'yes' || data['disused'] == 'yes')
			return ['mine-d',25];
		return ['mine',25];

	//----------------------------------------------------------------------
	//
	//	Mine
	//
	//----------------------------------------------------------------------

	case 'Mine':

		if (data['razed'] == 'yes')
			return ['mine-razed',25];
		if (data['abandoned'] == 'yes' || data['disused'] == 'yes')
			return ['mine-d',25];
		return ['mine',25];

	//----------------------------------------------------------------------
	//
	//	Adit
	//
	//----------------------------------------------------------------------

	case 'Adit':

		if (data.direction && zoom>=15)
			return ['stollen-or', 20, 20, 'S'];
		if ((data.abandoned=='yes' || data.disused=='yes') && data.resource && data.portal=='yes')
			return ['stollen-d-portal', 20];
		if ((data.abandoned=='yes' || data.disused=='yes') && data.resource)
			return ['stollen-d', 20];
		if (data.resource && data.portal=='yes')
			return ['stollen-portal', 20];
		if (data.resource)
			return ['stollen', 20];
		if (data.portal=='yes')
			return ['stollen2-portal', 20];
		return ['stollen2', 20];   // fuer allg. Stollen keine Unterscheidung used, disused, abandoned, razed

	//----------------------------------------------------------------------
	//
	//	Spoil_heap
	//
	//----------------------------------------------------------------------

	case 'Spoil_heap':

		return ['halde', 25];

	//----------------------------------------------------------------------
	//
	//	Drill_hole
	//
	//----------------------------------------------------------------------

	case 'Drill_hole':

		return ['bohrung', 25];

	//----------------------------------------------------------------------
	//
	//	Tree
	//
	//----------------------------------------------------------------------

	case 'Tree':

		return ['tree', 22];

	//----------------------------------------------------------------------
	//
	//	Threshing_floor
	//
	//----------------------------------------------------------------------

	case 'Threshing_floor':

		return ['dreschplatz', 22];

	//----------------------------------------------------------------------
	//
	//	Stone
	//
	//----------------------------------------------------------------------

	case 'Stone':

		return ['hstein',20];

	//----------------------------------------------------------------------
	//
	//	Monument
	//
	//----------------------------------------------------------------------

	case 'Monument':

		if (data['man_made'] == 'obelisk')
			return 'obelisk-antik'  ;

		if (data['man_made'] == 'torii')
			return 'torii'  ;

		if (data['monument'] == 'bust')
			return nameMagic(data) || ['bust', 20];

		if (data['monument'] == 'statue')
			return nameMagic(data) || ['statue',20,20,'U'];

		return ['monument',20,20, 'U'];

	//----------------------------------------------------------------------
	//
	//	Findling
	//
	//----------------------------------------------------------------------

	case 'Findling':

		return ['stein', 27, 22];

	//----------------------------------------------------------------------
	//
	//	Farm
	//
	//----------------------------------------------------------------------

	case 'Farm':

		return ['farm', 20];

	//----------------------------------------------------------------------
	//
	//	Tower
	//
	//----------------------------------------------------------------------

	case 'Tower':

		if(	data['historic']           == 'water_tower' ||
			data['man_made']           == 'water_tower' ||
			data['disused:man_made']   == 'water_tower' ||
			data['abandoned:man_made'] == 'water_tower' ||
			data['disused:railway']    == 'water_tower' ||
			data['abandoned:railway']  == 'water_tower' ){

			return ['watertower',20];
		}

		if(	data['historic']           == 'lighthouse' ||
			data['man_made']           == 'lighthouse' ||
			data['disused:man_made']   == 'lighthouse' ||
			data['abandoned:man_made'] == 'lighthouse' ){

			return ['leuchtturm',20];
		}

		if (data['tower:type'] == 'bell_tower' && data.ruins =='yes' )
			return ['belltower-r',25];

		if (data['tower:type'] == 'bell_tower')
			return ['belltower',20];

		if (data['tower:type'] == 'campanile' && data.ruins =='yes' )
			return ['belltower-r',25];

		if (data['tower:type'] == 'campanile')
			return ['belltower',20];

		if (data['tower:type'] == 'klockstapel' && data.ruins =='yes' )
			return ['belltower-r',25];

		if (data['tower:type'] == 'klockstapel')
			return ['belltower',20];

		if (data['man_made'] == 'campanile')
			return ['belltower',20];

		if (data['tower:type'] == 'observation' && data.ruins =='yes' )
			return ['aussichtsturm-r',20];

		if (data['tower:type'] == 'observation')
			return ['aussichtsturm',20];

		if(	data['tower:type'] == 'defensive' &&
			data.defensive     == 'bergfried' &&
			data.ruins         == 'yes'       ||
			data.defensive     == 'donjon'    &&
			data.ruins         == 'yes'       ||
			data.defensive     == 'keep'      &&
			data.ruins         == 'yes'       ){

			return ['bergfried_r',25];
		}

		if(	data['tower:type'] == 'defensive' &&
			data.defensive     == 'bergfried' ||
			data.defensive     == 'donjon'    ||
			data.defensive     == 'keep'      ){

			return ['bergfried',25];
		}

		if (data['tower:type'] == 'watchtower')
			return ['wachturm',25];

		if (data['ruins'] == 'yes')
			return ['turm-r',20];

		return ['turm',20];

	//----------------------------------------------------------------------
	//
	//	Bismarckturm
	//
	//----------------------------------------------------------------------

	case 'Bismarckturm':

		if (data['tower:type'] == 'observation' && data.ruins =='yes' )
			return ['aussichtsturm-r',20];

		if (data['tower:type'] == 'observation')
			return ['aussichtsturm',20];

		if(	data['tower:type'] == 'defensive' &&
			data.defensive     == 'bergfried' &&
			data.ruins         == 'yes'       ||
			data.defensive     == 'donjon'    &&
			data.ruins         == 'yes'       ||
			data.defensive     == 'keep'      &&
			data.ruins         == 'yes'       ){

			return ['bergfried_r',25];
		}

		if( 	data['tower:type'] == 'defensive' &&
			data.defensive     == 'bergfried' ||
			data.defensive     == 'donjon'    ||
			data.defensive     == 'keep'      ){

			return ['bergfried',25];
		}

		if (data['razed:man_made'] == 'tower')
			return ['razed_bismarckturm',20];

		if (data['ruins'] == 'yes')
			return ['turm-r',20];

		return ['turm',20];

	//----------------------------------------------------------------------
	//
	//	Survey_point
	//
	//----------------------------------------------------------------------

	case 'Survey_point':

		return ['trigpoint', 22];

	//----------------------------------------------------------------------
	//
	//	Reservoir_covered
	//
	//----------------------------------------------------------------------

	case 'Reservoir_covered':

		return ['reservoir_covered', 28];

	//----------------------------------------------------------------------
	//
	//	Ship
	//
	//----------------------------------------------------------------------

	case 'Ship':

		if (data['historic'] == 'wreck')
			return ['wreck',25];
		return ['ship', 25];

	//----------------------------------------------------------------------
	//
	//	Quarry
	//
	//----------------------------------------------------------------------

	case 'Quarry':

		return ['steinbruch', 20];

	//----------------------------------------------------------------------
	//
	//	Technical_monument
	//
	//----------------------------------------------------------------------

	case 'Technical_monument':
	case 'Technical_monument.userinfo':
	case 'Technical_monument.image':

		return ['t-heritage', 20];

	//----------------------------------------------------------------------
	//
	//	City_gate
	//
	//----------------------------------------------------------------------

	case 'City_gate':

		return ['stadttor',28,28, 'U'];

	//----------------------------------------------------------------------
	//
	//	Milestone
	//
	//----------------------------------------------------------------------

	case 'Milestone':
	case 'Saxony_Milestone':

		return ['milestone',25];

	//----------------------------------------------------------------------
	//
	//	Pillory
	//
	//----------------------------------------------------------------------

	case 'Pillory':

		return ['pranger',20];

	//----------------------------------------------------------------------
	//
	//	Coats_of_arms
	//
	//----------------------------------------------------------------------

	case 'Coats_of_arms':

		return ['Coats_of_arms',20];

	//----------------------------------------------------------------------
	//
	//	Razed
	//
	//----------------------------------------------------------------------

	case 'Razed':

		if( (	data.man_made          == 'adit'        ||
			data['razed:man_made'] == 'adit'        ||
			data['historic']       == 'razed:adit') &&
			data.direction                          &&
			zoom>=15                                ){

			return ['stollen-or-razed', 20, 20, 'S'];
		}

		if(	data.man_made          == 'adit'       ||
			data['razed:man_made'] == 'adit'       ||
			data['historic']       == 'razed:adit' ){

			return ['stollen-razed', 20];
		}

		if(	data.man_made          == 'mine'      ||
			data['razed:man_made'] == 'mine'      ||
			data['historic']       =='razed:mine' ){

			return ['mine-razed',25];
		}

		if(	data.man_made          == 'mineshaft'        ||
			data['razed:man_made'] == 'mineshaft'        ||
			data['historic']       == 'razed:mineshaft'  ||
			data['historic']       == 'razed:mine_shaft' ){

			return ['mine-razed',25];
		}

		if(	data.man_made          == 'windmill'       ||
			data['razed:man_made'] == 'windmill'       ||
			data['historic']       == 'razed:windmill' ){

			return ['razed-windmill',25];
		}

		if(	data.man_made          == 'watermill'       ||
			data['razed:man_made'] == 'watermill'       ||
			data['historic']       == 'razed:watermill' ){

			return ['razed-watermill',25];
		}

		if (data['razed:man_made'] =='water_tower')
			return ['razed_watertower',25];
		if (data['demolished:historic'] =='citywalls')
			return ['wall',20];

	//----------------------------------------------------------------------
	//
	//	Wayside_shrine
	//
	//----------------------------------------------------------------------

	case 'Wayside_shrine':

		return ['shrine_neu', 32, 32, 'S'];

	//----------------------------------------------------------------------
	//
	//	Wayside_cross
	//
	//----------------------------------------------------------------------

	case 'Wayside_cross':

		return ['cross_neu', 32, 32, 'S'];

	//----------------------------------------------------------------------
	//
	//	Wayside_chapel
	//
	//----------------------------------------------------------------------

	case 'Wayside_chapel':

		return ['kapelle',25];

	//----------------------------------------------------------------------
	//
	//	Chapel
	//
	//----------------------------------------------------------------------

	case 'Chapel':

		return ['kapelle',25];

	//----------------------------------------------------------------------
	//
	//	Tomb
	//
	//----------------------------------------------------------------------

	case 'Tomb':

		return ['tomb',15];

	//----------------------------------------------------------------------
	//
	//	Plaque
	//
	//----------------------------------------------------------------------

	case 'Plaque':
	case 'Plaque.userinfo':
	case 'Plaque.image':

		if (zoom>=17)
			return ['blue_plaque', 30];
		return ['blue_plaque', 14];

	//----------------------------------------------------------------------
	//
	//	Plate
	//
	//----------------------------------------------------------------------

	case 'Plate':
	case 'Plate.userinfo':
	case 'Plate.image':

		if (zoom>=17)
			return ['plate', 30];
		return ['plate', 20];

	//----------------------------------------------------------------------
	//
	//	Kiln
	//
	//----------------------------------------------------------------------

	case 'Kiln':
	case 'Kiln.userinfo':
	case 'Kiln.image':

		if( data['abandoned:man_made']   == 'kiln'          ||
			data['disused:man_made'] == 'kiln'          ||
			data['abandoned']        == 'yes'           ||
			data['disused']          == 'yes'           ||
			data['historic']         == 'charcoal_pile' ){

			return ['meileraus', 20];
		}
		return ['meiler',20];

	//----------------------------------------------------------------------
	//
	//	Gipfelkreuz
	//
	//----------------------------------------------------------------------

	case 'Gipfelkreuz':

		return ['peakcross', 20, 20, 'U'];

	//----------------------------------------------------------------------
	//
	//	City_wall
	//
	//----------------------------------------------------------------------

	case 'City_wall':

		if(	data['image']             || data['wikidata'] ||
			data['wikipedia']         || data['website']  ||
			data['heritage:website']  || data['url']      ||
			data['wikimedia_commons'] || data['heritage'] ){

			return ['wall',20];
		}

		return ['null',1];

	//----------------------------------------------------------------------
	//
	//	Wall
	//
	//----------------------------------------------------------------------

	case 'Wall':

		if(	data['image']             || data['wikidata'] ||
			data['wikipedia']         || data['website']  ||
			data['heritage:website']  || data['url']      ||
			data['wikimedia_commons']                     ){

			return ['wall',20];
		}

		return ['null',1];

	//----------------------------------------------------------------------
	//
	//	Stolperstein
	//
	//----------------------------------------------------------------------

	case 'Stolperstein':
	case 'Stolperstein.userinfo':
	case 'Stolperstein.image':

		if (zoom>=17)
			return ['stolperstein', 30];
		return ['stolperstein', 14];

	//----------------------------------------------------------------------
	//
	//	Ruins
	//
	//----------------------------------------------------------------------

	case 'Ruins':

		return ['null',1];

	case 'Ruins.userinfo':
	case 'Ruins.image':

		return ['ruins',16];

	//----------------------------------------------------------------------
	//
	//	Railway
	//
	//----------------------------------------------------------------------

	case 'Railway':

		return ['null',1];

	case 'Railway.userinfo':
	case 'Railway.image':

		if(	data['historic:railway'] == 'halt'            ||
			data['historic:railway'] == 'station'         ||
			data['historic:railway'] == 'station_site'    ||
			data['historic:railway'] == 'railway_station' ||
			data['railway:historic'] == 'halt'            ||
			data['railway:historic'] == 'station'         ||
			data['railway:historic'] == 'station_site'    ||
			data['railway:historic'] == 'railway_station' ||
			data['historic']         == 'station_site'    ||
			data['historic']         == 'railway_station' ){

			return ['railway_station',20];
		}

		if(	data['historic:railway'] == 'narrow_gauge' ||
			data['historic:railway'] == 'rail'         ||
			data['historic:railway'] == 'railway'      ||
			data['railway:historic'] == 'narrow_gauge' ||
			data['railway:historic'] == 'rail'         ||
			data['railway:historic'] == 'railway'      ||
			data['historic']         == 'railway'      ||
			data['historic']         == 'rail'         ||
			data['railway']          == 'abandoned'    ){

			return ['zug-h',16];
		}

	//----------------------------------------------------------------------
	//
	//	Industrial
	//
	//----------------------------------------------------------------------

	case 'Industrial':

		return ['industrie',20];

	//----------------------------------------------------------------------
	//
	//	Bomb_crater
	//
	//----------------------------------------------------------------------

	case 'Bomb_crater':

		return ['bombe',20];

	//----------------------------------------------------------------------
	//
	//	Info
	//
	//----------------------------------------------------------------------

	case 'Info':

		return ['board', 15];

	//----------------------------------------------------------------------
	//
	//	Spring
	//
	//----------------------------------------------------------------------

	case 'Spring':
	case 'Spring.userinfo':
	case 'Spring.image':

		return ['quelle', 25, 25, 'S'];

	//----------------------------------------------------------------------
	//
	//	Cannon
	//
	//----------------------------------------------------------------------

	case 'Cannon':

		return ['cannon', 25, 25, 'S'];

	//----------------------------------------------------------------------
	//
	//	Bridge
	//
	//----------------------------------------------------------------------

	case 'Bridge':

		return ['null',1];

	case 'Bridge.userinfo':
	case 'Bridge.image':

		if (data['ruins'] == 'yes')
			return ['bridge-broken',25];

		return ['bridge',25];

	//----------------------------------------------------------------------
	//
	//	Aquaudukt
	//
	//----------------------------------------------------------------------

	case 'Aquaedukt':

		return ['aquaeduct',20];

	case 'Aquädukt':

		return ['aquaeduct',20];

	//----------------------------------------------------------------------
	//
	//	Umgebinde
	//
	//----------------------------------------------------------------------

	case 'Umgebinde':

		return ['umgebindehaus',20];

	//----------------------------------------------------------------------
	//
	//	Timber_frame
	//
	//----------------------------------------------------------------------

	case 'Timber_frame':

		return ['umgebindehaus',20];

	//----------------------------------------------------------------------
	//
	//	Pinge
	//
	//----------------------------------------------------------------------

	case 'Pinge':

		return 'binge';

	//----------------------------------------------------------------------
	//
	//	Lavoir
	//
	//----------------------------------------------------------------------

	case 'Lavoir':

		return ['lavoir',15];

	//----------------------------------------------------------------------
	//
	//	Cellar
	//
	//----------------------------------------------------------------------

	case 'Cellar':

		if (data.direction)
			return ['cellar', 20, 20, 'S'];
		return ['cellar', 20];

	//----------------------------------------------------------------------
	//
	//	Ski
	//
	//----------------------------------------------------------------------

	case 'Ski':
	case 'Ski.image':
	case 'Ski.userinfo':

		return ['ski', 25];

	//----------------------------------------------------------------------
	//
	//	Portal
	//
	//----------------------------------------------------------------------

	case 'Portal':

		return ['portal',20];

	//----------------------------------------------------------------------
	//
	//	Optical_telegraph
	//
	//----------------------------------------------------------------------

	case 'Optical_telegraph':

		return ['optical_telegraph',20];

	//----------------------------------------------------------------------
	//
	//	Chimney
	//
	//----------------------------------------------------------------------

	case 'Chimney':

		return ['chimney',30];

	//----------------------------------------------------------------------
	//
	//	Lok
	//
	//----------------------------------------------------------------------

	case 'Lok':

		return ['Lok',30];

	//----------------------------------------------------------------------
	//
	//	Exhibit
	//
	//----------------------------------------------------------------------

	case 'Exhibit':

		return ['exhibit',26];

	//----------------------------------------------------------------------
	//
	//	Jewish grave
	//
	//----------------------------------------------------------------------

	case 'Jewish_grave':

		return ['jewish-grave',26];

	//----------------------------------------------------------------------
	//
	//	Jewish grave
	//
	//----------------------------------------------------------------------

	case 'War_cemetery':

		return ['war_cemetery',28];

	//----------------------------------------------------------------------
	//
	//	Historic_place
	//
	//----------------------------------------------------------------------

	case 'Historic_place':

		if (data['historic:place']=='farm')
			return ['farm', 20, 20];

		if (data['historic:place']=='foresters_house')
			return ['foresters_house'];

		return ['null',1];

	//----------------------------------------------------------------------
	//
	//	Sonstiges
	//
	//----------------------------------------------------------------------

	case 'Sonstiges':


		//--------------------------------------------------------------
		//
		//	nicht anzeigen
		//
		//==============================================================================

		if (data.historic=='highway' ||
			data.historic=='paving' ||
			data.historic=='track'||
			data.railway=='historic' ||
			data.historic=='rail' ){

			return ['null',1];
		}

		if (data['disused:highway']=='path')
			return ['reddot',1];

		// XXX fall through erwuenscht?

	case 'Sonstiges.image':
	case 'Sonstiges.userinfo':

		//--------------------------------------------------------------
		//
		//	Fun
		//
		//--------------------------------------------------------------

		if (data.name=='historische Säule zum Pferdeanbinden')
			return 'pferd';

		if(	data.historic == 'cultural_site' &&
			data.name     == 'Flachsrösten'  ||
			data.wikidata == 'Q1426270'      ||
			data.wikidata == 'Q1426255'      ){

			return ['Flachroesten',22,22];
		}

		if (data.historic=='vehicle' && data.vehicle=='tank')
			return ['tank', 28 , 28 ,'S'];
		if (data.historic=='tank')
			return ['tank', 28 , 28 ,'S'];
		if (data.historic=='olympic_flame')
			return ['olympic_flame',32];
		if (data.historic=='highwater_mark')
			return ['highwater_mark',30];
		if (data.tourism=='artwork')
			return ['artwork',28 ,28 ,'S'];
		if (data.name=='Eppinger Linie')
			return ['Eppinger_Linie',25];
		if (data.historic=='path')
			return ['reddot',8];

		//--------------------------------------------------------------
		//
		//	beacon
		//
		//--------------------------------------------------------------

		if (data.man_made=='beacon')
			return ['beacon',20];

		//--------------------------------------------------------------
		//
		//	torii
		//
		//--------------------------------------------------------------
		
		if (data.man_made=='torii')
			return ['torii',20];

		//--------------------------------------------------------------
		//
		//	historic shelter
		//
		//--------------------------------------------------------------

		if (data.historic=='shelter')
			return ['historic_shelter',20];

		//--------------------------------------------------------------
		//
		//	historic=railway car
		//
		//--------------------------------------------------------------

		if (data.historic=='railway_car')
			return ['exhibit',26];

		//--------------------------------------------------------------
		//
		//	street_lamp
		//
		//--------------------------------------------------------------

		if (data.highway=='street_lamp')
			return ['street_lamp'];

		//--------------------------------------------------------------
		//
		//	Sonstige mit transparenten Ring
		//
		//--------------------------------------------------------------

		if (data.tourism=='viewpoint')
			return ['image2'];

		return ['blaues_kreuz',20];

	default: break;
	}

	return null;
}

//==============================================================================
//
//	Erzeugt eine Kurzbeschreibung zu einem Objekt
//
//==============================================================================

function infoFromData (data) {

	var classes = [];
	var types = [];

	//----------------------------------------------------------------------
	//	Attribute
	//----------------------------------------------------------------------

	var collapsed	= (data.collapsed=='yes');
	var portal	= (data.portal=='yes');
	var ruins	= (data.ruins=='yes');
	var disused	= (data.disused=='yes');
	var abandoned	= !!data.abandoned;
	var isprotect	= false;

	switch (data.heritage) {

	case 'yes':
	case '2':
	case '3':
	case '4':
	case '5':
	case '6':
	case '7':
	case '8':
	case '9':
	case '10':
		isprotect = true;
		break;
	default: break;
	}

	if( data.historic == 'heritage') isprotect = true;

	//----------------------------------------------------------------------
	//	Groups
	//----------------------------------------------------------------------

	switch (data['~group']) {

		//--------------------------------------------------------------
		//	Wke
		//--------------------------------------------------------------

	case 'Wke':
		classes.push ("$$UNESCO Welterbe%%");
		break;

		//--------------------------------------------------------------
		//	Heritage
		//--------------------------------------------------------------

	case 'Heritage00':
	case 'Heritage00.userinfo':
	case 'Heritage00.image':
	case 'Heritage01':
	case 'Heritage01.userinfo':
	case 'Heritage01.image':
	case 'Heritage02':
	case 'Heritage02.userinfo':
	case 'Heritage02.image':
	case 'Heritage03':
	case 'Heritage03.userinfo':
	case 'Heritage03.image':
	case 'Heritage04':
	case 'Heritage04.userinfo':
	case 'Heritage04.image':
	case 'Heritage05':
	case 'Heritage05.userinfo':
	case 'Heritage05.image':
	case 'Heritage06':
	case 'Heritage06.userinfo':
	case 'Heritage06.image':
	case 'Heritage07':
	case 'Heritage07.userinfo':
	case 'Heritage07.image':
	case 'Heritage08':
	case 'Heritage08.userinfo':
	case 'Heritage08.image':
	case 'Heritage09':
	case 'Heritage09.userinfo':
	case 'Heritage09.image':
	case 'Heritage10':
	case 'Heritage10.userinfo':
	case 'Heritage10.image':

		if (data.historic=='building') {
			types.push ("$$Gebäude%%");
			break;
		}

		if (data.building=='transformer_tower'){
			types.push ("$$Transformatorenturm%%");
			break;
		}

		break;

		//--------------------------------------------------------------
		//	Technical_monument
		//--------------------------------------------------------------

	case 'Technical_monument':
	case 'Technical_monument.userinfo':
	case 'Technical_monument.image':

		types.push ("$$Technikdenkmal%%");
		break;

		//--------------------------------------------------------------
		//	Military
		//--------------------------------------------------------------

	case 'Military':

		types.push ("$$Historisches Militärgelände%%");
		break;

		//--------------------------------------------------------------
		//	Bomb_crater
		//--------------------------------------------------------------

	case 'Bomb_crater':

		types.push ("$$Bombenkrater%%");
		break;

		//--------------------------------------------------------------
		//	Abandoned_place
		//--------------------------------------------------------------

	case 'Abandoned_place':

		types.push ("$$Wüstung%%");
		break;

		//--------------------------------------------------------------
		//	Aircraft
		//--------------------------------------------------------------

	case 'Aircraft':

		types.push ("$$Historisches Luftfahrzeug%%");
		break;

		//--------------------------------------------------------------
		//	Archaeological_site
		//--------------------------------------------------------------

	case 'Archaeological_site':

		if (data.megalith_type=='menhir') {
			types.push ("$$Steingrab - Menhir%%");
			break;
		}

		if (data.megalith_type=='passage_grave') {
			types.push ("$$Ganggrab (Langbett)%%");
			break;
		}

		if (data.megalith_type=='stone_circle') {
			types.push ("$$Steinkreis%%");
			break;
		}

		if (data.megalith_type=='alignment') {
			types.push ("$$Steinreihe%%");
			break;
		}

		if (data.megalith_type=='chamber') {
			types.push ("$$Archäologische Stätte (Grabkammer)%%");
			break;
		}

		if (data.megalith_type=='grosssteingrab') {
			types.push ("$$Großsteingrab - Dolmen%%");
			break;
		}

		if (data.megalith_type=='nuraghe') {
			types.push ("Nuraghe");
			break;
		}

		if (data.megalith_type=='tholos') {
				types.push ("Tholos");
				break;
		}

		if (data.megalith_type=='dolmen') {
			types.push ("$$Großsteingrab - Dolmen%%");
			break;
		}

		if (data.site_type=='tumulus' || data.archaeological_site=='tumulus' ) {
			types.push ("$$Hügelgrab (Tumulus)%%");
			break;
		}

		if (data.site_type=='minilith' || data.archaeological_site=='minilith') {
			types.push ("Minilith");
			break;
		}

		if (data.site_type=='fortification' || data.archaeological_site=='fortification') {
			types.push ("$$Wallanlage%%");
			break;
		}

		types.push ("$$Archäologische Stätte%%");
		break;

		//--------------------------------------------------------------
		//	Battlefield
		//--------------------------------------------------------------

	case 'Battlefield':

		types.push ("$$Schlachtfeld%%");
		break;

		//--------------------------------------------------------------
		//	Boundary_stone
		//--------------------------------------------------------------

	case 'Boundary_stone':

		if (data.boundary=='marker') {
			types.push ("$$Grenzmarkierung%%");
			break;
		}

		if (data.historic=='boundary_stone') {
			types.push ("$$Grenzstein%%");
			break;
		}
		break;

		//--------------------------------------------------------------
		//	Water_well
		//--------------------------------------------------------------

	case 'Water_well':

		types.push ("$$Brunnen%%");
		break;

		//--------------------------------------------------------------
		//	Pump_manual
		//--------------------------------------------------------------

	case 'Pump_manual':
	case 'Pump_manual.userinfo':
	case 'Pump_manual.image':

		types.push ("$$Handschwengelpumpe%%");
		break;

		//--------------------------------------------------------------
		//	Building
		//--------------------------------------------------------------

	case 'Building':
	case 'Building.userinfo':
	case 'Building.image':

		if (data.building=='transformer_tower'){
			types.push ("$$Transformatorenturm%%");
			break;
		}

		types.push ("$$Historisches Gebäude%%");
		break;

		//--------------------------------------------------------------
		//	Bunker
		//--------------------------------------------------------------

	case 'Bunker':

		types.push ("$$Bunker%%");
		break;

		//--------------------------------------------------------------
		//	Castle
		//--------------------------------------------------------------

	case 'Castle':

		if (data.castle_type=='defensive') {
			types.push ("$$Burg%%");
			break;
		}

		if (data.castle_type=='fortress' || data.castle_type=='kremlin') {
			types.push ("$$Festung%%");
			break;
		}

		if (data.castle_type=='stately') {
			types.push ("$$Schloss%%");
			break;
		}

		if (data.castle_type=='palace') {
			types.push ("$$Palast%%");
			break;
		}

		if (data.castle_type=='shiro') {
			types.push ("$$Japanische Burg%%");
			break;
		}

		if (data.historic=='fort') {
			types.push ("$$Festung%%");
			break;
		}

		if (data.historic=='palace') {
			types.push ("$$Palast%%");
			break;
		}

		types.push ("$$Burg oder Schloss%%");
		break;

		//--------------------------------------------------------------
		//	Manor
		//--------------------------------------------------------------

	case 'Manor':

		types.push ("$$Rittergut/Herrenhaus%%");
		break;

		//--------------------------------------------------------------
		//	City_gate
		//--------------------------------------------------------------

	case 'City_gate':

		types.push ("$$Stadttor%%");
		break;

		//--------------------------------------------------------------
		//	City_wall
		//--------------------------------------------------------------

	case 'City_wall':
	case 'City_wall.userinfo':
	case 'City_wall.image':

		types.push ("$$Stadtmauer%%");
		break;

		//--------------------------------------------------------------
		//	Wall
		//--------------------------------------------------------------

	case 'Wall':
	case 'Wall.userinfo':
	case 'Wall.image':

		types.push ("$$Historische Stadt-Mauer/Historische Mauer%%");
		break;

		//--------------------------------------------------------------
		//	Farm
		//--------------------------------------------------------------

	case 'Farm':

		types.push ("$$Farm%%");
		break;

		//--------------------------------------------------------------
		//	Findling
		//--------------------------------------------------------------

	case 'Findling':

		types.push ("$$Findling%%");
		break;

		//--------------------------------------------------------------
		//	Gallows
		//--------------------------------------------------------------

	case 'Gallows':

		types.push ("$$Galgen%%");
		break;

		//--------------------------------------------------------------
		//	Gipfelkreuz
		//--------------------------------------------------------------

	case 'Gipfelkreuz':

		types.push ("$$Gipfelkreuz%%");
		break;

		//--------------------------------------------------------------
		//	Industrial
		//--------------------------------------------------------------

	case 'Industrial':

		types.push ("$$Industriegebäude%%");
		break;

		//--------------------------------------------------------------
		//	Info
		//--------------------------------------------------------------

	case 'Info':

		types.push ("$$Informationstafel%%");
		break;

		//--------------------------------------------------------------
		//	Kiln
		//--------------------------------------------------------------

	case 'Kiln':

		if (data.kiln=='lime' || data.product=='lime' || data.produce=='lime') {
			types.push ("$$Kalkbrandofen%%");
			break;
		}

		if (data.kiln=='pottery' || data.product=='pottery' || data.produce=='pottery') {
			types.push ("$$Töpferei%%");
			break;
		}

		if(	data.kiln    == 'bricks' ||
			data.product == 'bricks' ||
			data.produce == 'bricks' ||
			data.kiln    == 'brick'  ||
			data.product == 'brick'  ||
			data.produce == 'brick'  ){

			types.push ("$$Ziegelei%%");
			break;
		}

		if (data.kiln=='glass' || data.product=='glass' || data.produce=='glass') {
			types.push ("$$Glashütte%%");
			break;
		}

		if (data.kiln=='tar' || data.product=='tar' || data.produce=='tar') {
			types.push ("$$Pechhütte%%");
			break;
		}

		if (data.kiln=='charcoal' || data.product=='charcoal' || data.produce=='charcoal') {
			types.push ("$$Köhlerei%%");
			break;
		}

		if (data.historic=='charcoal_kiln') {
			types.push ("$$Köhlerei%%");
			break;
		}

		if (data.historic=='charcoal_pile') {
			types.push ("$$Köhlerei%%");
			break;
		}

		types.push ("$$Brennofen%%");
		break;

		//--------------------------------------------------------------
		//	Memorial
		//--------------------------------------------------------------

	case 'Memorial':
	case 'Memorial.userinfo':
	case 'Memorial.image':

		if (data['memorial:type'] == 'statue' || data.memorial=='statue') {
			types.push ("$$Statue%%");
			break;
		}

		if (data['memorial:type'] == 'obelisk' || data.memorial=='obelisk' || data.man_made=='obelisk') {
			types.push ("$$Obelisk%%");
			break;
		}

		types.push ("$$Denkmal%%");
		break;

		//--------------------------------------------------------------
		//	Umgebinde
		//--------------------------------------------------------------

	case 'Umgebinde':

		types.push ("$$Umgebindehaus%%");
		break;

		//--------------------------------------------------------------
		//	Timber_frame
		//--------------------------------------------------------------

	case 'Timber_frame':

		types.push ("$$Fachwerkhaus%%");
		break;

		//--------------------------------------------------------------
		//	Milestone
		//--------------------------------------------------------------

	case 'Milestone':

		types.push ("$$Meilenstein%%");
		break;

		//--------------------------------------------------------------
		//	Mine
		//--------------------------------------------------------------

	case 'Mine':

		if (data['abandoned:man_made']=='mine') {
			types.push ("$$Bergwerk%%-$$aufgegeben%%");
			break;
		}

		if (data['disused:man_made']=='mine') {
			types.push ("$$Bergwerk%%-$$geschlossen%%");
			break;
		}

		types.push ("$$Bergwerk%%");
		break;

		//--------------------------------------------------------------
		//	Monastery
		//--------------------------------------------------------------

	case 'Monastery':

		types.push ("$$Kloster%%");
		break;

		//--------------------------------------------------------------
		//	Monument
		//--------------------------------------------------------------

	case 'Monument':
		types.push ("$$Erinnerungsstätte%%");
		break;

		//--------------------------------------------------------------
		//	Optical_telegraph
		//--------------------------------------------------------------

	case 'Optical_telegraph':

		if (data['razed:historic']=='optical_telegraph') {
			types.push ("$$Optischer Telegraf%%-$$nahezu komplett entfernt%%");
			break;
		}

		types.push ("$$Optischer Telegraf%%");
		break;

		//--------------------------------------------------------------
		//	Palaeontological_site
		//--------------------------------------------------------------

	case 'Palaeontological_site':

		types.push ("$$Paläontologische Stätte%%");
		break;

		//--------------------------------------------------------------
		//	Pillory
		//--------------------------------------------------------------

	case 'Pillory':

		types.push ("$$Pranger%%");
		break;

		//--------------------------------------------------------------
		//	Place_of_worship
		//--------------------------------------------------------------

	case 'Place_of_worship':

		if (data.building=='chapel') {
			types.push ("$$Kapelle%%");
			break;
		}

		if (data.building=='shrine') {
			types.push ("$$Schrein%%");
			break;
		}

		if (data.historic=='church' || data.building=='church') {
			types.push ("$$Kirche%%");
			break;
		}

		if (data.building=='synagogue') {
			types.push ("$$Synagoge%%");
			break;
		}

		if (data.building=='mosque') {
			types.push ("$$Moschee%%");
			break;
		}

		types.push ("$$Religiöse Stätte%%");
		break;

		//--------------------------------------------------------------
		//	Plaque
		//--------------------------------------------------------------

	case 'Plaque':
	case 'Plaque.userinfo':
	case 'Plaque.image':

		types.push ("$$Gedenkplakette%%");
		break;

		//--------------------------------------------------------------
		//	Plate
		//--------------------------------------------------------------

	case 'Plate':
	case 'Plate.userinfo':
	case 'Plate.image':

		types.push ("$$Gedenktafel%%");
		break;

		//--------------------------------------------------------------
		//	Quarry
		//--------------------------------------------------------------

	case 'Quarry':

		types.push ("$$Steinbruch%%");
		break;

		//--------------------------------------------------------------
		//	Railway
		//--------------------------------------------------------------

	case 'Railway':
	case 'Railway.userinfo':
	case 'Railway.image':

		if (    data['historic:railway'] == 'halt'            ||
			data['historic:railway'] == 'station'         ||
			data['historic:railway'] == 'station_site'    ||
			data['historic:railway'] == 'railway_station' ||
			data['railway:historic'] == 'halt'            ||
			data['railway:historic'] == 'station'         ||
			data['railway:historic'] == 'station_site'    ||
			data['railway:historic'] == 'railway_station' ||
			data['historic']         == 'railway_station' ||
			data['historic']         == 'station_site') {

			types.push ("$$Bahnhof%%");
			break;
		}

		types.push ("$$Bahnlinie%%");
		break;

		//--------------------------------------------------------------
		//	Road
		//--------------------------------------------------------------

	case 'Road':

		if (	data['historic']           == 'mule_path'       ||
			data['historic']           == 'packhorse_trail' ||
			data['abandoned:historic'] == 'mule_path'       ||
			data['abandoned:historic'] == 'packhorse_trail' ){

			types.push ("$$Maultierpfad%%");
			break;
		}

		types.push ("$$Historische Straße%%");
		break;

		//--------------------------------------------------------------
		//	Ruins
		//--------------------------------------------------------------

	case 'Ruins':
	case 'Ruins.userinfo':
	case 'Ruins.image':

		types.push ("$$Ruine%%");
		break;

		//--------------------------------------------------------------
		//	Runestone
		//--------------------------------------------------------------

	case 'Runestone':

		types.push ("$$Runenstein%%");
		break;

		//--------------------------------------------------------------
		//	Ship
		//--------------------------------------------------------------

	case 'Ship':

		if (data['historic']  == 'wreck') {
			types.push ("$$Schiffswrack%%");
			break;
		}

		types.push ("$$Historisches Schiff%%");
		break;

		//--------------------------------------------------------------
		//	Stolperstein
		//--------------------------------------------------------------

	case 'Stolperstein':

		types.push ("$$Stolperstein%%");
		break;

		//--------------------------------------------------------------
		//	Stone
		//--------------------------------------------------------------

	case 'Stone':

		types.push ("$$Historischer Stein%%");
		break;

		//--------------------------------------------------------------
		//	Suehnekreuz
		//--------------------------------------------------------------

	case 'Suehnekreuz':

		types.push ("$$Sühnekreuz%%");
		break;

		//--------------------------------------------------------------
		//	Spring
		//--------------------------------------------------------------

	case 'Spring':
	case 'Spring.userinfo':
	case 'Spring.image':

		types.push ("$$Historische Quelle%%");
		break;

		//--------------------------------------------------------------
		//	Survey_point
		//--------------------------------------------------------------

	case 'Survey_point':

		types.push ("$$Vermessungspunkt%%");
		break;

		//--------------------------------------------------------------
		//	Threshing_floor
		//--------------------------------------------------------------

	case 'Threshing_floor':

		types.push ("$$Dreschplatz%%");
		break;

		//--------------------------------------------------------------
		//	Tomb
		//--------------------------------------------------------------

	case 'Tomb':

		types.push ("$$Grab%%");
		break;

		//--------------------------------------------------------------
		//	Ski
		//--------------------------------------------------------------

	case 'Ski':
	case 'Ski.userinfo':
	case 'Ski.image':

		types.push ("$$Skisprungschanze%%");
		break;

		//--------------------------------------------------------------
		//	Bridge
		//--------------------------------------------------------------

	case 'Bridge':
	case 'Bridge.userinfo':
	case 'Bridge.image':

		types.push ("$$Historische Brücke%%");
		break;

		//--------------------------------------------------------------
		//	Cannon
		//--------------------------------------------------------------

	case 'Cannon':

		types.push ("$$Kanone%%");
		break;

		//--------------------------------------------------------------
		//	Portal
		//--------------------------------------------------------------

	case 'Portal':

		types.push ("$$Tunnelportal%%");
		break;

		//--------------------------------------------------------------
		//	Chimney
		//--------------------------------------------------------------

	case 'Chimney':

		types.push ("$$Schornstein%%");
		break;

		//--------------------------------------------------------------
		//	Tower
		//--------------------------------------------------------------

	case 'Tower':

		if(	data.historic              == 'water_tower' ||
			data.man_made              == 'water_tower' ||
			data['disused:man_made']   == 'water_tower' ||
			data['abandoned:man_made'] == 'water_tower' ||
			data['disused:railway']    == 'water_tower' ||
			data['abandoned:railway']  == 'water_tower' ){

			types.push ("$$Wasserturm%%");
			break;
		}

		if(	data.historic              == 'lighthouse' ||
			data.man_made              == 'lighthouse' ||
			data['disused:man_made']   == 'lighthouse' ||
			data['abandoned:man_made'] =='lighthouse' ){

			types.push ("$$Leuchtturm%%");
			break;
		}

		if (data['tower:type']=='bell_tower') {
			types.push ("$$Glockenturm%%");
			break;
		}

		if (data['tower:type'] == 'observation') {
			types.push ("$$Aussichtsturm%%");
			break;
		}

		if(	data['tower:type'] == 'defensive' && data.defensive == 'bergfried' ||
			data.defensive == 'donjon' ||
			data.defensive == 'keep'   ){

			types.push ("$$Wohnturm%%-$$Wehrturm%%");
			break;
		}

		if (data['tower:type'] == 'defensive') {
			types.push ("$$Wehrturm%%");
			break;
		}

		if (data['tower:type'] == 'watchtower') {
			types.push ("$$Wachturm%%");
			break;
		}

		types.push ("$$Turm%%");
		break;

		//--------------------------------------------------------------
		//	Bismarckturm
		//--------------------------------------------------------------

		case 'Bismarckturm':
			if (data['razed:man_made'] == 'tower') {
			types.push ("ehemaliger Turmstandort");
			break;
		}

		types.push ("Bismarckturm");
		break;

		//--------------------------------------------------------------
		//	Townhall
		//--------------------------------------------------------------

	case 'Townhall':

		types.push ("$$Rathaus%%");
		break;

		//--------------------------------------------------------------
		//	Tree
		//--------------------------------------------------------------

	case 'Tree':

		if (data['denotation']=='natural_monument') {
			types.push ("$$Naturdenkmal%%");
			break;
		}

		types.push ("");
		break;

		//--------------------------------------------------------------
		//	Watermill
		//--------------------------------------------------------------

	case 'Watermill':

		if (data['abandoned:man_made']=='watermill') {
			types.push ("$$Wassermühle%%-$$aufgegeben%%");
			break;
		}

		if (data['disused:man_made']=='watermill') {
			types.push ("$$Wassermühle%%-$$geschlossen%%");
			break;
		}

		types.push ("$$Wassermühle%%");
		break;


		//--------------------------------------------------------------
		//	Wayside_chapel
		//--------------------------------------------------------------

	case 'Wayside_chapel':

		types.push ("$$Weg-Kapelle%%");
		break;

		//--------------------------------------------------------------
		//	Chapel
		//--------------------------------------------------------------

	case 'Chapel':

		types.push ("$$Kapelle%%");
		break;

		//--------------------------------------------------------------
		//	Wayside_cross
		//--------------------------------------------------------------

	case 'Wayside_cross':

		types.push ("$$Wegkreuz%%");
		break;

		//--------------------------------------------------------------
		//	Wayside_shrine
		//--------------------------------------------------------------

	case 'Wayside_shrine':

		types.push ("$$Bildstock%%");
		break;

		//--------------------------------------------------------------
		//	Coats_of_arms
		//--------------------------------------------------------------

	case 'Coats_of_arms':

		types.push ("$$Wappen%%");
		break;

		//--------------------------------------------------------------
		//	Windmill
		//--------------------------------------------------------------

	case 'Windmill':

		if (data['abandoned:man_made']=='windmill') {
			types.push ("$$Windmühle%%-$$aufgegeben%%");
			break;
		}

		if (data['disused:man_made']=='watermill') {
			types.push ("$$Windmühle%%-$$geschlossen%%");
			break;
		}

		types.push ("$$Windmühle%%");
		break;

		//--------------------------------------------------------------
		//	Prison_camp
		//--------------------------------------------------------------

	case 'Prison_camp':

		if (data['prison_camp']=='concentration_camp' && data['concentration_camp']=='nazism') {
			types.push ("$$NS-Konzentrationslager%%");
			break;
		}

		if (data['prison_camp']=='concentration_camp') {
			types.push ("$$Konzentrationslager%%");
			break;
		}

		if (data['prison_camp']=='pow_camp') {
			types.push ("$$Kriegsgefangenenlager%%");
			break;
		}

		if (data['prison_camp']=='labor_camp') {
			types.push ("$$Arbeitslager%%");
			break;
		}

		if (data['amenity']=='prison' || data['abandoned:amenity']=='prison') {
			types.push ("$$Gefängnis%%");
			break;
		}

		break;

		//--------------------------------------------------------------
		//	Spoil_heap
		//--------------------------------------------------------------

	case 'Spoil_heap':

		types.push ("$$Bergehalde%%");
		break;

		//--------------------------------------------------------------
		//	Drill_hole
		//--------------------------------------------------------------

	case 'Drill_hole':

		types.push ("$$Bohrung%%");
		break;

		//--------------------------------------------------------------
		//	Adit
		//--------------------------------------------------------------

	case 'Adit':

		if (data['abandoned:man_made']=='adit' && data.resource) {
			types.push ("$$Bergwerksstollen (aufgegeben)%%");
			break;
		}

		if (data['disused:man_made']=='adit' && data.resource) {
			types.push ("$$Bergwerksstollen (aufgegeben)%%");
			break;
		}
		if (data.resource) {
			types.push ("$$Bergwerksstollen%%");
			break;
		}

		types.push ("$$Stolleneingang%%");
		break;

		//--------------------------------------------------------------
		//	Cellar
		//--------------------------------------------------------------

	case 'Cellar':

		types.push ("$$Felsenkeller%%");
		break;

		//--------------------------------------------------------------
		//	Mineshaft
		//--------------------------------------------------------------

	case 'Mineshaft':

		types.push ("$$Schacht%%");
		break;

		//--------------------------------------------------------------
		//	Headframe
		//--------------------------------------------------------------

	case 'Headframe':

		types.push ("$$Schacht%%");
		break;

		//--------------------------------------------------------------
		//	Razed
		//--------------------------------------------------------------

	case 'Razed':

		if(	data.man_made          == 'adit'       ||
			data['razed:man_made'] == 'adit'       ||
			data['historic']       == 'razed:adit' ){

			types.push ("$$Ehemaliger Stollen%%");
			break;
		}

		if(	data.man_made          == 'mine'       ||
			data['razed:man_made'] == 'mine'       ||
			data['historic']       == 'razed:mine' ){

			types.push ("$$Ehemaliges Bergwerk%%");
			break;
		}

		if(	data.man_made          == 'mineshaft'        ||
			data['razed:man_made'] == 'mineshaft'        ||
			data['historic']       == 'razed:mineshaft'  ||
			data['historic']       == 'razed:mine_shaft' ){

			types.push ("$$Ehemaliger Schacht%%");
			break;
		}

		if(	data.man_made          == 'windmill'       ||
			data['razed:man_made'] == 'windmill'       ||
			data['historic']       == 'razed:windmill' ){

			types.push ("$$Ehemaliger Windmühlenstandort%%");
			break;
		}

		if(	data.man_made          == 'watermill'       ||
			data['razed:man_made'] == 'watermill'       ||
			data['historic']       == 'razed:watermill' ){

			types.push ("$$Ehemaliger Wassermühlenstandort%%");
			break;
		}

		if(	data['demolished:historic'] == 'citywalls'      &&
			data.name                   == 'Berliner Mauer' ){

			types.push ("Berliner Mauer");
			break;
		}

		break;

		//--------------------------------------------------------------
		//	Aquädukt
		//--------------------------------------------------------------

	case 'Aquädukt':

		types.push ("$$Aquädukt%%");
		break;

		//--------------------------------------------------------------
		//	Pinge
		//--------------------------------------------------------------

	case 'Pinge':

		types.push ("$$Pinge%%");
		break;

		//--------------------------------------------------------------
		//	Lavoir
		//--------------------------------------------------------------

	case 'Lavoir':

		types.push ("$$Waschplatz%%");
		break;

		//--------------------------------------------------------------
		//	Schienenfahrzeug
		//--------------------------------------------------------------

	case 'Lok':

		types.push ("$$Historisches Schienenfahrzeug%%");
		break;

		//--------------------------------------------------------------
		//	Exhibit
		//--------------------------------------------------------------

	case 'Exhibit':

		types.push ("$$Historisches Ausstellungsstück%%");
		break;


		//--------------------------------------------------------------
		//	War_cemetery
		//--------------------------------------------------------------

	case 'War_cemetery':

		types.push ("$$Kriegsgräberstätte%%");
		break;

	default: break;
	}

	//------------------------------------------------------------
	//	Artwork
	//------------------------------------------------------------

	if (data.tourism=='artwork') {
		types.push ("$$Kunstwerk%%");
	}

	//------------------------------------------------------------
	//	Default types
	//------------------------------------------------------------

	if (!types.length && data.boundary=='protected_area') {
		types.push ("$$Geschütztes Gebiet%%");
	}

	if (!types.length && data.building) {
		types.push (data.building=='hut' ? "$$Hütte%%" : "$$Gebäude%%");
	}

	if (!types) {
		types.push ("$$Historisches Objekt%%");
	}

	//===========================================================-
	//
	//	Klassen
	//
	//===========================================================-

	var result = [];

	if (classes.length>0) {
		result.push (classes.join(', '));
		result.push (': ');
	}

	result.push (types.join(', '));

	//===========================================================-
	//
	//	Attribute
	//
	//===========================================================-

	var attributes = [];

	if (collapsed	) attributes.push ("collapsed");
	if (ruins	) attributes.push ("$$Ruine%%");
	if (disused	) attributes.push ("$$geschlossen%%");
	if (abandoned	) attributes.push ("$$aufgegeben%%");
	if (isprotect	) attributes.push ("$$denkmalgeschützt%%");
	if (portal	) attributes.push ("Portal");

	if (attributes.length>0) {
		result.push (' (');
		result.push (attributes.join(', '));
		result.push (')');
	}

	//------------------------------------------------------------
	//	Result
	//------------------------------------------------------------

	return result.join('');
}


//==============================================================================
//
//	Erzeuge einen Linestyle für Linienobjekte
//
//==============================================================================


function styleFromData (data, context) {

	var title;

	if ( window.sprache == 'de' )
		title = data['name:de'] || data.name || data.old_name ||
			data['historic:name'] || data.ref || null;
	if ( window.sprache == 'en' )
		title = data['name:en'] || data.name || data.old_name ||
			data['historic:name'] || data.ref || null;

	// XXX if eingefügt, weil der Befehl sonst die beiden vorausgehenden überschreibt

	if(!title)
		title = data['name:'+window.sprache] || data.name || data.old_name ||
			data['historic:name'] || data.ref || null;

	//----------------------------------------------------------------------
	// style.strokeDashstyle:
	//	solid
	//	dot
	//	dash
	//	dashdot
	//	longdash
	//	longdashdot
	//----------------------------------------------------------------------

	if (data.amenity=='townhall') return {

		strokeColor:	'black',
		strokeWidth:	1.5,
		strokeOpacity:	0.7,
		fillColor:	'palegoldenrod',
		fillOpacity:	0.5,
		graphicTitle:	title
	};

	if(	data.building=='monastery'                             ||
		data.building && data.amenity               == 'monastery' ||
		data.building && data.historic              == 'monastery' ||
		data.building && data['abandoned:historic'] == 'monastery' ||
		data.building && data.historic              == 'abbey' ) return {

		strokeColor:	'black',
		strokeWidth:	1.5,
		strokeOpacity:	0.7,
		fillColor:	'sandybrown',
		fillOpacity:	0.5,
		graphicTitle:	title
	};

	if(	data.building == 'church'    ||
		data.building == 'cathedral' ||
		data.building && data.amenity=='place_of_worship' ) return {

      		strokeColor:	'black',
      		strokeWidth:	2,
      		strokeOpacity:	0.7,
      		fillColor:	'tan',
      		fillOpacity:	0.4,
      		graphicTitle:	title
      };


	if (data.building || data['building:part'] && data.heritage) return {

		strokeColor: 'black',
		strokeWidth: 1.5,
		strokeOpacity: 0.7,
		fillColor: 'salmon',
		fillOpacity: 0.5,
		graphicTitle: title
	};

	if (data.fortification_type=='limes') return {

		strokeColor:	'black',
		strokeWidth:	3,
		strokeOpacity:	0.7,
			//strokeDashstyle: 'dot',
		fillColor:	'white',
		fillOpacity:	0.3,
			//cursor: 'help',
		graphicTitle:	title
	};

	if (data.historic=='archaeological_site' && data.name=='Eppinger Linie') return {

		strokeColor:	'black',
		strokeWidth:	5,
		strokeOpacity:	0.7,
			//strokeDashstyle: 'dot',
		fillColor:	'white',
		fillOpacity:	0.3,
			//cursor: 'help',
		graphicTitle:	title
	};

	if (data.wikidata=='Q707801' || data.wikidata=='Q146924') return {

		strokeColor:	'black',
		strokeWidth:	3,
		strokeOpacity:	0.7,
			//strokeDashstyle: 'dot',
		fillColor:	'white',
		fillOpacity:	0.3,
			//cursor: 'help',
		graphicTitle:	title
	};

	if (data.historic=='archaeological_site') return {

		strokeColor:	'gray',
		strokeWidth:	3,
		strokeOpacity:	0.7,
			//strokeDashstyle: 'dot',
		fillColor:	'white',
		fillOpacity:	0.3,
			//cursor: 'help',
		graphicTitle:	title
	};

	if (data['demolished:historic']=='citywalls' || data['abandoned:barrier']=='wall') return {

		strokeColor:	'brown',
		strokeWidth:	6,
		strokeOpacity:	0.7,
		fillColor:	'brown',
		fillOpacity:	0.5,
			//cursor: 'help',
		graphicTitle:	title
	};

	if(	data.historic         == 'citywalls'   ||
		data.barrier          == 'city_wall'   ||
		data.building         == 'castle_wall' ||
		data.wall             == 'castle_wall' ||
		data.historic         == 'castle_wall' ||
		data['fortress:type'] == 'wall'        ) return {

		strokeColor:	'brown',
		strokeWidth:	6,
		strokeOpacity:	0.7,
		fillColor:	'brown',
		fillOpacity:	0.5,
			//cursor: 'help',
		graphicTitle:	title
	};

	if (data.leisure=='park' || data.leisure=='garden' || data.leisure=='nature_reserve') return {

		strokeColor:	'green',
		strokeWidth:	3,
		strokeOpacity:	0.7,
		fillColor:	'none',
		fillOpacity:	0,
			//cursor: 'help',
		graphicTitle:	title
	};

	if (data.boundary=='protected_area' && data.protect_class=='22') return {

		strokeColor:	'yellow',
		strokeWidth:	3,
		strokeOpacity:	0.7,
		fillColor:	'yellow',
		fillOpacity:	0,
			//cursor: 'help',
		graphicTitle:	title
	};

	if (data.historic=='aqueduct') return {

		strokeColor:	'blue',
		strokeWidth:	3,
		strokeOpacity:	0.7,
		fillColor:	'blue',
		fillOpacity:	0.5,
			//cursor: 'help',
		graphicTitle:	title
	};

	if (data.historic=='aircraft') return {

		strokeColor:	'black',
		strokeWidth:	1.5,
		strokeOpacity:	0.7,
		fillColor:	'gray',
			// fillOpacity: 0.5,
		graphicTitle:	title
	};

	if (data.historic=='ship') return {

		strokeColor: 'black',
		strokeWidth: 1.5,
		strokeOpacity: 0.7,
		fillColor: 'gray',
			// fillOpacity: 0.5,
		graphicTitle: title
	};

	return false;	// *nicht* darstellen
}


//==============================================================================
//
//	Erzeuge einen Linestyle für Linienobjekte
//
//==============================================================================


function styleFromData3 (data, context) {

	if(	data.historic              == 'roman_road'      ||
		data.historic              == 'road'            ||
		data.historic              == 'hollow_way'      ||
		data.historic              == 'Altstraße'       ||
		data.historic              == 'altstraße'       ||
		data.historic              == 'mule_path'       ||
		data.historic              == 'packhorse_trail' ||
		data['abandoned:historic'] == 'packhorse_trail' ||
		data['abandoned:historic'] == 'mule_path'       ) return {

		strokeColor:	'gray',
		fillColor:	'white',
		strokeWidth:	5,
		strokeOpacity:	0.7,
			//strokeDashstyle:'dashdot',
		fillOpacity:	5,
			//cursor: 'help',
		graphicTitle:	data.name || null
	};

	return false;						// *nicht* darstellen
}


//==============================================================================
//
//	Erzeuge einen Linestyle für Linienobjekte
//
//==============================================================================


function styleFromData4 (data, context) {

	if (data.boundary=='historic') return {

		strokeColor:	'red',
		strokeWidth:	3,
		strokeOpacity:	0.7,
			//strokeDashstyle: 'dot',
			//cursor:'help',
		graphicTitle:	data.name || null
	};

	return false;		// *nicht* darstellen
}


//==============================================================================
//
//	Lookup Table
//
//==============================================================================

const HeritageOperatorNames = {

	'aatl':		'Monuments et Sites',
	'babs':		'Bundesamt für Bevölkerungsschutz',
	'cadw':		'Cadw',
	'MDG':		'Ministerium der Deutschsprachigen Gemeinschaft',
	'bda':		'Bundesdenkmalamt',
	'alsh':		'Archäologisches Landesamt Schleswig-Holstein',
	'bldam':	'Brandenburgisches Landesamt für Denkmalpflege und Archäologisches Landesmuseum',
	'BLfD':		'Bayerisches Landesamt für Denkmalpflege',
	'clt':		'Direction de la Protection',
	'dsa':		'Denkmalschutzamt Hamburg',
	'eh':		'English Heritage',
	'he':		'Historic England',
	'gdke':		'Generaldirektion Kulturelles Erbe Rheinland-Pfalz',
	'he':		'Historic England',
	'DGPC':		'Direção Geral do Património Cultural',
	'DRCN':		'Direção Regional da Cultura do Norte',
	'hs':		'Historic Scotland',
	'hsmbc':	'Historic Sites and Monuments Board of Canada',
	'iphan':	'Instituto do Patrimônio Histórico e Artístico Nacional',
	'lda':		'Landesdenkmalamt',
	'LfDH':		'Landesamt für Denkmalpflege Hessen',
	'LfKD':		'Landesamt für Kultur und Denkmalpflege Mecklenburg-Vorpommern',
	'lfd':		'Landesamt für Denkmalpflege',
	'lmi':		'Monument istoric',
	'mhs':		'Monuments historiques et sites',
	'nid':		'Narodowy Instytut Dziedzictwa',
	'nld':		'Niedersächsisches Landesamt für Denkmalpflege',
	'raa':		'Riksantikvarieämbetets',
	'rce':		'Rijksdienst voor het Cultureel Erfgoed',
	'ssmn':		'Service des sites et monuments nationaux',
	'tlda':		'Thüringisches Landesamt für Denkmalpflege und Archäologie',
	'vkpai':	'Valsts kultūras pieminekļu aizsardzības inspekcija',
	'whc':		'World Heritage Committee',
	'nhl':		'National Historic Landmark',
	'npu':		'Národní památkový ústav',
	'nrhp':		'National Registry of Historic Places',
	'purs':		'Pamiatkový úrad Slovenskej republik',
	'uzkb':		'Uprava za zaštitu kulturne baštine',
	'kpd':		'KULTŪROS PAVELDO DEPARTAMENTAS',
	'mcrb':		'Ministry of Culture of the Republic of Belarus',
	'OnroerendErfgoed':	'Vlaams Instituut van Onroerend Erfgoed',
	'BezirksRegierung':	'Bezirksregierung für die bundes- und landeseigenen Denkmäler',
	'UntereDenkmalbehörde':	'Untere Denkmalbehörde, Institut für Denkmalschutz und Denkmalpflege'
};

//==============================================================================
//	$Id: config.js,v 1.4 2025/01/23 19:08:47 wolf Exp wolf $
//==============================================================================
