<script setup>

import {ref} from "vue";
import {schema,host} from "../staticConfig.js"

let showSideBar=ref(true)
let toggleValue=ref('x')
function clickToggle(){
    showSideBar=!showSideBar
    if (showSideBar){
        toggleValue.value='x'
    }else{
        toggleValue.value='+'
    }
}
function toAbout(){
    window.location.href=schema+"://"+host+"/about"
}
</script>

<template>
    <div class="SideBarWrapper">
        <button @click="clickToggle" class="ToggleSideBarBtn">{{toggleValue}}</button>
        <div v-if="showSideBar" class="SideBarContent">
            <h1>共享小本本</h1>
            <h3>记录你遇到的坑，借鉴前人踩过的坑</h3>
            <button @click="toAbout">详细介绍</button>
            <button id="setDefaultStart" onclick="setDefaultStart()">当前视野作为你的初始视野</button>
        </div>
    </div>
    <div class="SideBarContent"></div>

</template>

<style scoped>
.SideBarWrapper{
    position: relative;
    background: black;

}
.ToggleSideBarBtn{
    pointer-events: auto;
    font-size: xxx-large;
    color: yellow;
    background: black;
    border:0;
    margin: 0;

}
.SideBarContent{
    background: red;
}
</style>