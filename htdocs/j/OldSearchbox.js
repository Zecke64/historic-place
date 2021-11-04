//------------------------------------------------------------------------------
//	$Id: searchbox.js,v 1.13 2013/06/21 23:09:41 wolf Exp wolf $
//------------------------------------------------------------------------------
//	Erklaerung:	http://www.netzwolf.info/kartografie/openlayers/search.htm
//------------------------------------------------------------------------------
//	Fragen, Wuensche, Bedenken, Anregungen?
//	<openlayers(%40)netzwolf.info>
//------------------------------------------------------------------------------

OpenLayers.Control.SearchBox=OpenLayers.Class(OpenLayers.Control, {

	//----------------------------------------------------------------------
	//	config
	//----------------------------------------------------------------------

	resultMinZoom: 12,

	lang: 'de',
	textNoHits: 'Kein Treffer.',

	baseUrl: 'http://nominatim.openstreetmap.org/search?' +
			'format=json&json_callback={callback}&addressdetails=0&q={query}',

	//----------------------------------------------------------------------
	//	init
	//----------------------------------------------------------------------

	allowSelection: true,

	//----------------------------------------------------------------------
	//	destroy
	//----------------------------------------------------------------------

	destroy:function() {

		if (this.div) { stopObservingElement(this.div); }

		this.form  = null;
		this.input = null;
		this.labelDiv = null;
		this.labelSpan = null;
		this.resultDiv = null;

		OpenLayers.Control.prototype.destroy.apply(this,arguments);
	},

	//----------------------------------------------------------------------
	//	create html and make control visible
	//----------------------------------------------------------------------

	draw:function(px) {

		OpenLayers.Control.prototype.draw.apply(this,arguments);

		this.labelSpan=document.createElement ('span');
		this.labelSpan.className='label';
		this.labelDiv=document.createElement ('div');
		this.labelDiv.className='label';
		this.labelDiv.appendChild(this.labelSpan);

		this.input= document.createElement ('input');
		this.input.setAttribute('type', 'text');
		this.input.setAttribute('name', 'q');
		this.input.control=this;

		this.form=document.createElement ('form');
		this.form.style.display='inline';
		this.form.appendChild(this.input);
		this.form.control=this;
		this.form.onsubmit=this.formOnSubmit;

		this.resultDiv=document.createElement ('div');

		this.div.appendChild(this.labelDiv);
		this.div.appendChild(this.form);
		this.div.appendChild(this.resultDiv);

		OpenLayers.Event.observe(this.input, 'click',
			function(evt){
				evt.target.control.cancelSearch();
				OpenLayers.Event.stop(evt, true);
			}
		);
		OpenLayers.Event.observe(this.div, 'dblclick',
			function(evt){OpenLayers.Event.stop(evt, true);}
		);
		OpenLayers.Event.observe(this.div, 'mousedown',
			function(evt){OpenLayers.Event.stop(evt, true);}
		);

		return this.div;
	},

	//----------------------------------------------------------------------
	//	event handling
	//----------------------------------------------------------------------

	formOnSubmit: function() {
		this.control.startSearch(this.elements.q.value);
		return false;
	},

	//----------------------------------------------------------------------
	//	search
	//----------------------------------------------------------------------

	currentRequest: null,

	startSearch: function (q) {

		this.cancelSearch();

		q = OpenLayers.String.trim(q);
		if (q==='') { return false; }

		this.resultDiv.className='busy';

		this.jsonpRequest (
			this.baseUrl.replace(/{query}/, encodeURIComponent(q)),
			this,
			this.success,
			this.failure,
			{timeout: 5000});

		return false;
	},

	cancelSearch: function () {

		if (this.currentRequest) { this.currentRequest.cancel(); }
		this.currentRequest = null;
		this.removeResult();
	},

	//----------------------------------------------------------------------
	//	format and display search results
	//----------------------------------------------------------------------

	success: function (result) {

		this.currentRequest = null;
		this.removeResult();
		this.resultDiv.className='success';
		this.formatResult(result);
	},

	failure: function (message) {

		this.currentRequest = null;
		this.removeResult();
		this.resultDiv.className='failure';

		this.resultDiv.appendChild (document.createTextNode (message));
	},

	//----------------------------------------------------------------------
	//	format result
	//----------------------------------------------------------------------

	formatResult: function(result) {

		for (var i in result) {
			var element=this.formatResultEntry(data=result[i]);

			element.onclick=this.onResultEntryClick;
			element.className='entry';
			element.control=this;
			element.data=data;

			this.resultDiv.appendChild(element);
		}

		if (!result.length) {
			this.resultDiv.className='success empty';
			this.resultDiv.appendChild (document.createTextNode (this.textNoHits));
		}
	},

	formatResultEntry: function(data) {

		var div = document.createElement ('div');
		div.setAttribute('title', data.display_name + ' [' + data['class'] + ', ' + data.type + ']');
		div.appendChild (document.createTextNode (
			data.display_name.split(', ').slice(0,2).join(', ') +
				' [' + this.translate(data['class'], data.type) + ']'));
		return div;
	},

	//----------------------------------------------------------------------
	//	nominatim translation
	//----------------------------------------------------------------------

	translate: function (clasz, type) {

		var dict = OpenLayers.NominatimTranslation && OpenLayers.NominatimTranslation[this.lang];

		var trans = dict && dict[clasz+'.'+type];
		if (trans) { return trans; }

		return clasz+'='+type;
	},

	//----------------------------------------------------------------------
	//	click on search result moves map
	//----------------------------------------------------------------------

	onResultEntryClick: function() {

		var control = this.control;

		control.removeResult();

		var lonlat = new OpenLayers.LonLat(this.data.lon,this.data.lat).
        		transform(new OpenLayers.Projection("EPSG:4326"), control.map.getProjectionObject());

		if (control.map.getZoom()<control.resultMinZoom) {
			control.map.moveTo (lonlat, control.resultMinZoom);
		} else {
			control.map.panTo (lonlat);
		}
	},

	//----------------------------------------------------------------------
	//	dom
	//----------------------------------------------------------------------

	removeResult: function() {

		while (this.resultDiv.firstChild) {
			this.resultDiv.removeChild(this.resultDiv.firstChild);
		}
		this.resultDiv.className='';
	},

	//----------------------------------------------------------------------
	//	JSONP
	//----------------------------------------------------------------------

	jsonpRequest: function (url, scope, success, failure, options) {

		//--------------------------------------------------------------
		//	sanity
		//--------------------------------------------------------------

		options=options||{};

		//--------------------------------------------------------------
		//	unique request id
		//--------------------------------------------------------------

		var id = 'jsonp' + new Date().getTime();

		//--------------------------------------------------------------
		//	add unique name of jsonp callback function to query
		//--------------------------------------------------------------

		url = url.replace(/{callback}/, 'window.' + id + '.callback');

		//--------------------------------------------------------------
		//	create script element
		//--------------------------------------------------------------

		var scriptElement = document.createElement('script');
		scriptElement.setAttribute('type', 'text/javascript');
		scriptElement.setAttribute('src', url);

		//--------------------------------------------------------------
		//	create request object
		//--------------------------------------------------------------

		var request = {
			id: id,
			scope: scope,
			success: success,
			failure: failure,

			callback: function (data) {
                        	this.cancel();
                        	this.success.apply(this.scope, [data]);
			},

			timeout: function () {
				this.cancel();
				this.failure.apply(this.scope, ['timeout']);
			},

			cancel: function() {
				window.clearTimeout(this.timer);
				if(this.scriptElement.parentElement) {
					this.scriptElement.parentElement.removeChild(this.scriptElement);
				}
				delete window[this.id];
			},

			scriptElement: scriptElement
		};

		//--------------------------------------------------------------
		//	install timeout (var request used in closure)
		//--------------------------------------------------------------

		request.timer = window.setTimeout (function(){request.timeout();},
			options.timeout || 5000);

		//--------------------------------------------------------------
		//	store request object
		//--------------------------------------------------------------

		window[id] = request;

		//--------------------------------------------------------------
		//	install script element (starts execution)
		//--------------------------------------------------------------

		document.getElementsByTagName('head')[0].appendChild(scriptElement);

		return request;
	},

	//----------------------------------------------------------------------
	//	yeah!
	//----------------------------------------------------------------------

	CLASS_NAME:'OpenLayers.Control.SearchBox'
});

//--------------------------------------------------------------------------------
//	$Id: searchbox.js,v 1.13 2013/06/21 23:09:41 wolf Exp wolf $
//--------------------------------------------------------------------------------
