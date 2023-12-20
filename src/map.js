import {queryNotesNearCenter} from "@/notes.js";

let map, center
let clickMarker
let markers=[]

function initMap() {
    center=JSON.parse(localStorage.getItem("center"))
    let zoom=JSON.parse(localStorage.getItem("zoom"))
    if (!center || !center.latitude || !center.longitude){
        localStorage.clear()
        center = new Microsoft.Maps.Location(39.994104, 116.387503)
        zoom=15
    }
    map = new Microsoft.Maps.Map('#map', {
        credentials: 'AjKEvK5u4xGH3PutDiec0s4s7NbmCrGvoYYhFezxbOSe2tHROcO_h0GLIoAMYoIR',
        center: center,
        zoom: zoom
    });
    Microsoft.Maps.Events.addHandler(map, 'click', clickMapHandler);
    Microsoft.Maps.Events.addHandler(map, 'viewchange', attachInfobox);
}
function setDefaultStart() {
    localStorage.setItem("center", JSON.stringify(map.getCenter()))
    localStorage.setItem("zoom", JSON.stringify(map.getZoom()))
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
            notesInfo:[],
            location:e.location,
            id:0
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
    // remove existing marker
    markers.forEach((m,i)=>{
        map.entities.remove(m)
    })
    markers=[]
    let nothing=function (){
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    let createMarker=function (r){
        r.forEach((p,i)=>{
            let l=new Microsoft.Maps.Location(p.latitude,p.longitude)
            let m=new Microsoft.Maps.Pushpin(l)
            m.metadata={
                notesInfo:p.notesInfo,
                location:l
            }
            console.log("create marker->",m)
            map.entities.push(m)
            markers.push(m)
            Microsoft.Maps.Events.addHandler(m, 'click', clickMarkerHandler);
        })
        if (markers.length===0){
            nothing()
        }
    }
    let b=map.getBounds()
    queryNotesNearCenter(b.getSouth(), b.getNorth(), b.getWest(), b.getEast())
        .catch((e)=>{nothing()})
        .then(r  =>{createMarker(r);})

}



window.initMap=initMap
window.getNotes=getNotes;
window.setDefaultStart=setDefaultStart;

(function (){
    const script=document.createElement('script')
    script.type = 'text/javascript'
    script.src="https://www.bing.com/api/maps/mapcontrol?UR=CN&setLang=zh-CN&callback=initMap&key=AjKEvK5u4xGH3PutDiec0s4s7NbmCrGvoYYhFezxbOSe2tHROcO_h0GLIoAMYoIR"
    document.body.appendChild(script)
})()
