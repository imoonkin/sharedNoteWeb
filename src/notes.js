import {host, schema} from "../staticConfig.js";

let points=[{
    latitude:39.994104,
    longitude:116.387503,
    notes:[{
        title:"t1",
        id:"1"
    }]

},{
    latitude:39.984104,
    longitude:116.397503,
    notes:[{
        title:"t12",
        id:"2"
    },{
        title:"t13",
        id:"3"
    }]
},{
    latitude:39.974104,
    longitude:116.407503,
    notes:[{
        title:"t14",
        id:"4"
    },{
        title:"t15",
        id:"5"
    },{
        title:"t16",
        id:"6"
    }]
}]
export async function queryNotesNearCenter(latitude1,latitude2,longitude1, longitude2){
    const params=new URLSearchParams({
        latitude1:latitude1,
        latitude2:latitude2,
        longitude1:longitude1,
        longitude2:longitude2,

    })
    const response = await fetch(schema+"://"+host+"/range?"+params.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Vue POST Request Example" })
    });
    const data = await response.json();
    console.log(data)
    return points
}

export async function queryAddNewNote(newNote){
    const response = await fetch(schema+"://"+host+"/add?", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote)
    });
    const data = await response.json();
    console.log(data)
}