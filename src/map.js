import {points, queryNotesNearCenter} from "@/notes.js";
import {infobox, initInfobox, renderInfobox} from "@/infoBox.js";

let map, center
let clickMarker=[]

function initMap() {

    center = new Microsoft.Maps.Location(39.994104, 116.387503)
    map = new Microsoft.Maps.Map('#map', {
        credentials: 'AjKEvK5u4xGH3PutDiec0s4s7NbmCrGvoYYhFezxbOSe2tHROcO_h0GLIoAMYoIR',
        center: center,
        zoom: 15
    });
    Microsoft.Maps.Events.addHandler(map, 'click', clickMapHandler);
    initInfobox()
}

const clickMapHandler = function (e) {
    console.log("click e=", e);
    const lat = e.location.latitude.toFixed(6);
    const lng = e.location.longitude.toFixed(6);
    if (!clickMarker){
        clickMarker = new Microsoft.Maps.Pushpin(e.location)
        clickMarker.metadata={
            id:"-1",
            title:"add new note"
        }
        Microsoft.Maps.Events.addHandler(clickMarker, 'click', clickMarkerHandler);
        map.entities.push(clickMarker);

    } else {
        map.entities.remove(clickMarker)
        clickMarker = null
        infobox.setMap(null)
    }

};
const clickMarkerHandler = function (e) {
    console.log("click marker=", e);
    infobox.setLocation(e.location)
    infobox.setMap(map)
    infobox.metadata.location=e.location
    if (!e.target.metadata.id) {
        infobox.metadata.location = e.target.metadata.location
    }
    let infoboxHtml=renderInfobox(e.target.metadata)
    let f=function(){
        let host=document.querySelector("#InfoBox")

        if (!host){
            console.log("wtf")
            return
        }
        host.innerHTML=''
        host.appendChild(infoboxHtml)
    }
    setTimeout(f,100)

    // add expandable div for add new note function

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
