/*

Zoomlevel.js  by André Joost
Version 12-2010

Dieses Modul erstellt ein zusätzliches Steuerelement für Openlayers,
mit dem die Zoomstufe in Text und Zahl dargestellt wird.

Für die Positionierung auf dem Bildschirm muß in der CSS-Datei folgender Abschnitt vorhanden sein:

.olControlZoomlevel {
    left: 10px;
    bottom: 2.5em;
    display: block;
    position: absolute;
} 

*/	
OpenLayers.Control.Zoomlevel=OpenLayers.Class(OpenLayers.Control,
{argParserClass:OpenLayers.Control.ArgParser,element:null,base:'',displayProjection:null,
	initialize:function(element,base,options)
	{
		OpenLayers.Control.prototype.initialize.apply(this,[options]);
		this.element=OpenLayers.Util.getElement(element);
		this.base=base||document.location.href;
		},

	destroy:function()
	{
		if(this.element.parentNode==this.div)
		{
			this.div.removeChild(this.element);
		}
		this.element=null;
		this.map.events.unregister('moveend',this,this.updateLink);
		OpenLayers.Control.prototype.destroy.apply(this,arguments);
		},

	setMap:function(map)
	{
		OpenLayers.Control.prototype.setMap.apply(this,arguments);
		for(var i=0,len=this.map.controls.length;i<len;i++)
		{
			var control=this.map.controls[i];
			if(control.CLASS_NAME==this.argParserClass.CLASS_NAME)
			{
				if(control.displayProjection!=this.displayProjection)
				{
					this.displayProjection=control.displayProjection;
				}
				break;
			}
		}
		if(i==this.map.controls.length)
		{
			this.map.addControl(new this.argParserClass({'displayProjection':this.displayProjection}));
		}
	},
	
	draw:function()
	{
		OpenLayers.Control.prototype.draw.apply(this,arguments);
		if(!this.element)
		{
			this.div.className=this.displayClass;
			this.element=document.createElement("a");
			this.element.innerHTML=OpenLayers.i18n(this.map.getZoom());
			this.element.href="";
			this.div.appendChild(this.element);
		}
		this.map.events.on({'moveend':this.updateLink,'changelayer':this.updateLink,'changebaselayer':this.updateLink,scope:this});
		this.updateLink();
		return this.div;
	},
	
	updateLink:function()
	{
		var href=this.base;
		if(href.indexOf('?')!=-1)
		{
			href=href.substring(0,href.indexOf('?'));
		}
//		href+='?'+OpenLayers.Util.getParameterString(this.createParams());
		this.element.href=href;
		this.element.innerHTML=OpenLayers.Util.getParameterString(this.createParams());
	},

	createParams:function(center,zoom,layers)
	{
		center=center||this.map.getCenter();
		var params=OpenLayers.Util.getParameters(this.base);
		if(center)
		{
			params.zoom=zoom||this.map.getZoom();
		}
		return params;
	},
	
	CLASS_NAME:"OpenLayers.Control.Zoomlevel"
});
