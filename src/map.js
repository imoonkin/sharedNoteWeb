import {points, queryNotesNearCenter} from "@/notes.js";

let map, center
let clickMarker

function initMap() {
    center = new Microsoft.Maps.Location(39.994104, 116.387503)
    map = new Microsoft.Maps.Map('#map', {
        credentials: 'AjKEvK5u4xGH3PutDiec0s4s7NbmCrGvoYYhFezxbOSe2tHROcO_h0GLIoAMYoIR',
        center: center,
        zoom: 15
    });
    Microsoft.Maps.Events.addHandler(map, 'click', clickMapHandler);
    Microsoft.Maps.Events.addHandler(map, 'viewchange', attachInfobox);
}

const attachInfobox=function (e) {
    if (!window.infobox.value.show) return
    let px=map.tryLocationToPixel(window.infobox.value.location, Microsoft.Maps.PixelReference.control)
    window.updateCenterCrd(px)
}

const clickMapHandler = function (e) {
    console.log("click e=", e);
    const lat = e.location.latitude.toFixed(6);
    const lng = e.location.longitude.toFixed(6);
    if (!clickMarker){
        clickMarker = new Microsoft.Maps.Pushpin(e.location)
        clickMarker.metadata={
            notesInfo:{
                notes:[]
            },
            location:e.location,
        }
        Microsoft.Maps.Events.addHandler(clickMarker, 'click', clickMarkerHandler);
        map.entities.push(clickMarker);

    } else {
        map.entities.remove(clickMarker)
        clickMarker = null
        window.infobox.value.show=false
    }

};
const clickMarkerHandler = function (e) {
    console.log("click marker=", e);
    window.clickMarkerHandler(e)
    attachInfobox(e)
}

const getNotes = function () {
    console.log("click marker=",clickMarker)
    center = map.getCenter()
    queryNotesNearCenter(center.latitude,center.longitude)

    points.forEach((p,i)=>{
        let l=new Microsoft.Maps.Location(p.latitude,p.longitude)
        let m=new Microsoft.Maps.Pushpin(l)
        m.metadata={
            notesInfo:p,
            location:l
        }
        map.entities.push(m)
        Microsoft.Maps.Events.addHandler(m, 'click', clickMarkerHandler);
    })

}



window.initMap=initMap
window.getNotes=getNotes;


(function (){
    const script=document.createElement('script')
    script.type = 'text/javascript'
    script.src="https://www.bing.com/api/maps/mapcontrol?UR=CN&setLang=zh-CN&callback=initMap&key=AjKEvK5u4xGH3PutDiec0s4s7NbmCrGvoYYhFezxbOSe2tHROcO_h0GLIoAMYoIR"
    document.body.appendChild(script)
})()
