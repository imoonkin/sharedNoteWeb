<script setup>
import {onMounted, ref} from "vue";
import {queryAddNewNote} from "./notes.js"

let crdx=ref('')
let crdy=ref('')
const mapHeight=500
let show=ref(false)
let showAddNotes=ref(false)
let location
let notes=ref('')
let infobox=ref({
    crdx:crdx,
    crdy:crdy,
    show:show,
    location:location,
    markerMetadata:null
})

onMounted(()=>{
    window.infobox=infobox
})


window.updateCenterCrd=function (pixelLocation){
    crdx.value=Math.round(pixelLocation.x)+"px"
    crdy.value=(Math.round(pixelLocation.y)-mapHeight)+"px"
}
window.clickMarkerHandler=function (e){
    show.value=true
    showAddNotes.value=false
    formCheck.value=false
    infobox.value.location=e.location
    notes.value=e.target.metadata.notesInfo.notes
    infobox.value.markerMetadata=e.target.metadata
    console.log("marker=",e)
}
let formTitle=ref('')
let formAddress=ref('')
let formCheck=ref(false)
let formContent=ref('')
function addNote(){
    console.log("submit")
    if (formTitle.value.length===0 || formAddress.value.length===0){
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML="必填 你倒是填啊"
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        return
    }
    queryAddNewNote({
        title:formTitle.value,
        address:formAddress.value,
        content:formContent.value,
        latitude:infobox.value.markerMetadata.location.latitude,
        longitude:infobox.value.markerMetadata.location.longitude
    })
}

function getNotes(){
    window.getNotes()
}
</script>

<template>
    <div id="infoboxContainer" v-if="show">
        <div class="notes" v-for="note in notes">
            <ul class="notes-ul">
                <li><textarea readonly>{{note.title}}</textarea></li>
                <li><textarea readonly>{{note.address}}</textarea></li>
                <li><textarea readonly>{{note.content}}</textarea></li>
            </ul>
        </div>
        <div class="btnWrapper">
            <button class="extendAddNotesBtn" @click="showAddNotes=!showAddNotes">记录你踩的坑</button>
            <button class="getNotesBtn" @click="getNotes()">查看附近</button>
        </div>
        <br>
        <div id="form__1" class="notes" v-if="showAddNotes">
            <ul class="notes-ul">
                <li><textarea  v-model="formTitle" placeholder="标题 必填"></textarea></li>
                <li><textarea  v-model="formAddress" placeholder="地点 必填"></textarea></li>
                <li><input  v-model="formCheck" type="checkbox">地点已确认</li>
                <li><textarea  v-model="formContent" placeholder="内容"></textarea></li>
                <li><textarea  v-model="formEmail" placeholder=
'留下邮箱，仅管理员可见
消息审核不通过会有邮件提示'
                ></textarea></li>
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
    translate: -50% 50px;
    width: fit-content;
}
.notes{
    pointer-events: auto;
}
.btnWrapper{
    margin: 0;
    padding: 0;
    width: 100%;

    background: red;
    display: inline-block;
}
.getNotesBtn{
    pointer-events: auto;
    float: right;
}
.extendAddNotesBtn{
    float: left;
    pointer-events: auto;
}
.notes-ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
}
</style>