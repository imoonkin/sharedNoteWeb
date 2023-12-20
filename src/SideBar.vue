<script setup>

import {ref} from "vue";

let showSideBar=ref(true)
let toggleValue=ref('+')
function clickToggle(){
    showSideBar=!showSideBar
    if (showSideBar){
        toggleValue.value='x'
    }else{
        toggleValue.value='+'
    }

}
</script>

<template>
    <div class="SideBarWrapper">
        <button @click="clickToggle" class="ToggleSideBarBtn">{{toggleValue}}</button>
        <div v-if="showSideBar" class="SideBarContent">
            <h1>共享小本本</h1>
            <h3>记录你遇到的坑，借鉴前人踩过的坑</h3>
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
    font-size: xx-large;
    color: yellow;
    background: black;

}
.SideBarContent{
    background: red;
}
</style>