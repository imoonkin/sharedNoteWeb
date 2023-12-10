let s=`<div id="InfoBox"></div><div>HHHHHHH</div>`
export let infobox

export function initInfobox(){
    let center=new Microsoft.Maps.Location(39.994104, 116.387503)
    infobox=new Microsoft.Maps.Infobox(center, {
            htmlContent: s
        });
    infobox.metadata={
        location:center
    }
}

const addNote = function () {
    const newNote={
        latitude:infobox.metadata.location.latitude,
        longitude:infobox.metadata.location.longitude,
        formTitle:document.getElementById("formTitle"),
        formAddress:document.getElementById("formAddress"),
        formCheck:document.getElementById("formCheck"),
        formContent:document.getElementById("formContent"),
    }
    queryAddNewNote(newNote)
}

export let renderInfobox=function(data){
    console.log("infobox data=",data)

    let host=document.createElement("div")
    let template=document.querySelector("#InfoBoxNotesTemplate")
    if (data.notesInfo){//todo render notes
        data.notesInfo.notes.forEach((n,i)=>{
            let c=document.importNode(template.content,true)
            let x=c.children[0]
            console.log("x=",x)
            x[0].value=n.title
            x[1].value=n.address
            x[2].value=n.content
            host.appendChild(c)
        })
    }
    template=document.querySelector("#InfoBoxAddNoteTemplate")
    let c=document.importNode(template.content,true)
    host.appendChild(c)
    //todo render +1 new note
    return host
}

window.addNote=addNote;