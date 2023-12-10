<script setup>
import {onMounted, ref} from "vue";
import {queryAddNewNote} from "./notes.js"

let crdx=ref('')
let crdy=ref('')
const mapHeight=500
let show=ref(false)
let latitude=ref('')
let longitude=ref('')
let location
let notes=ref('')
let infobox=ref({
    crdx:crdx,
    crdy:crdy,
    show:show,
    latitude:latitude,
    longitude:longitude,
    location:location
})

onMounted(()=>{
    window.infobox=infobox
})


window.updateCenterCrd=function (pixelLocation){
    crdx.value=Math.round(pixelLocation.x)+"px"
    crdy.value=(Math.round(pixelLocation.y)-mapHeight)+"px"
}
window.clickMarkerHandler=function (e){
    infobox.value.location=e.location
    latitude.value=e.location.latitude
    longitude.value=e.location.longitude
    show.value=true
    formCheck.value=false
    notes.value=e.target.metadata.notesInfo.notes
    console.log("notes=",notes)

}
let formTitle=ref('')
let formAddress=ref('')
let formCheck=ref(false)
let formContent=ref('')
function addNote(){
    console.log("submit")
    queryAddNewNote({
        title:formTitle.value,
        address:formAddress.value,
        content:formContent.value
    })
}

</script>

<template>
    <div id="infoboxContainer" v-if="show">
        <div class="notes" v-for="note in notes">
            <ul>
                <li><textarea readonly>{{note.title}}</textarea></li>
                <li><textarea readonly>{{note.address}}</textarea></li>
                <li><textarea readonly>{{note.content}}</textarea></li>
            </ul>
        </div>
        <div id="form__1" class="notes">
            <span>分享你的经历</span>
            <ul>
                <li>标题: <textarea  v-model="formTitle" placeholder="标题"></textarea></li>
                <li>地点: <textarea  v-model="formAddress" placeholder="地点"></textarea></li>
                <li>选点: <input  v-model="formCheck" type="checkbox"></li>
                <li>内容: <textarea  v-model="formContent" placeholder="内容"></textarea></li>
            </ul>
            <button @click="addNote()" :disabled="!formCheck">提交</button>
        </div>

    </div>

</template>

<style scoped>
#infoboxContainer{
    pointer-events: none;
    display: inline-block;
    position: relative;
    top: v-bind(crdy);
    left: v-bind(crdx);
}
.notes{
    pointer-events: auto;
}
</style>