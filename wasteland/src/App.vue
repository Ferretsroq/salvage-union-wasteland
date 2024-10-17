<script setup lang="ts">
import Honeycomb from './components/Honeycomb.vue';
import Hexagon from './components/Hexagon.vue';
import VueMermaidString from 'vue-mermaid-string';
import { VueSidePanel } from 'vue3-side-panel';
import 'vue3-side-panel/dist/vue3-side-panel.css';
import {ref, computed} from 'vue';
import { Quest } from './components/quests';
import {jsPDF} from 'jspdf';
import domtoimage from 'dom-to-image-more';

let graphVisible = ref(false);
let bigDiagram = ref('');
let isOpened = ref(false);
let leftOpened = ref(false);
let activeRegion = ref(null);
let activeText = ref('');
let activeLeftText = ref('');
let hexes = ref([]);
let pdfBool = ref(false);
const quest = Quest.GenerateQuest(25);
const rumors = [];
const factions = [];

function showGraph(diagram, region)
{
  graphVisible.value = true;
  isOpened.value = true;
  bigDiagram.value = diagram;
  activeRegion.value = region;
  activeText.value = activeRegion.value.text;
}
function graphClick(node)
{
  activeText.value = `${activeRegion.value.text}\n---\n${activeRegion.value.areas[node].text}`;
}

function questClick()
{
  leftOpened.value = true;
  activeLeftText.value = quest.toString();
}

function rumorsClick()
{
  leftOpened.value = true;
  activeLeftText.value = '';
  for(let index = 0; index < rumors.length; index++)
  {
    activeLeftText.value += `${rumors[index].toString()}\n`;
  }
}

function factionsClick()
{
  leftOpened.value = true;
  activeLeftText.value = '';
  for(let index = 0; index < factions.length; index++)
  {
    activeLeftText.value += `${factions[index].toString()}\n---\n`
  }
}
function kickoffPDF()
{
  pdfBool.value = true;
}
async function savePDF()
{
  const pdf = new jsPDF();
  const honeycomb = document.getElementById('pdfRender');
  const canvas = await domtoimage.toCanvas(honeycomb);
  const data = canvas.toDataURL('image/png');
  const imgProperties = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.addPage();

  const readmeText = "The overall hex map represents a campaign map.\nIndividual hexes represent a region map.\nIndividual nodes within the hexes represent an area map.\nRegions have an associated biome, threats, and map of areas.\nArea maps are rough elevation maps, where bright points are higher elevation and dark points are lower elevation.\nRed triangles mark approximate positions of enemy combatants.\nAs a potential campaign seed, this document includes a pregenerated multi-step quest tied to the map.\nThis document also includes 10 smaller rumors of points of interest seeded around the map.\nThis document is intended to be used in something like OneNote or similar annotation program, or printed for note-taking.\nAs always, feel free to change anything generated to better suit your game!";
  const splitReadme = pdf.splitTextToSize(readmeText, 180);
  pdf.text(20, 20, splitReadme);
  pdf.addPage();
  const questText = quest.toString();
  const splitQuest = pdf.splitTextToSize(questText, 180);
  const rumorsText = rumors.join('\n');
  const splitRumors = pdf.splitTextToSize(rumorsText, 180);
  const factionText = `${factions[0].toString()}\n---\n${factions[1].toString()}\n---\n${factions[2].toString()}`;
  const splitFactions = pdf.splitTextToSize(factionText, 180);
  pdf.text(20, 20, splitQuest);
  pdf.addPage();
  pdf.text(20, 20, splitRumors);
  pdf.addPage();
  pdf.text(20, 20, splitFactions);
  for(let index = 0; index < hexes.value.length; index++)
  { 
        pdf.addPage();

        //const canvas = await html2canvas(element);
        //const data = canvas.toDataURL('image/jpeg');
        //const imgProperties = pdf.getImageProperties(data);
        //const pdfWidth = pdf.internal.pageSize.getWidth();
        //const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        bigDiagram.value = hexes.value[index].diagram;
        const hexImage = document.getElementById(`pdfgraph`);
        const canvas = await domtoimage.toCanvas(hexImage);
        const data = canvas.toDataURL('image/png');
        const imgProperties = pdf.getImageProperties(data);
        
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.addPage();
        const splitRegionText = pdf.splitTextToSize(`Region ${index}\n${hexes.value[index].text}`, 180);
        pdf.text(20, 20, splitRegionText);
        //pdf.addImage(data, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        
        for(let nodeIndex = 0; nodeIndex < hexes.value[index].areas.length; nodeIndex++)
        {
          pdf.addPage();
          const node = hexes.value[index].areas[nodeIndex];
          const noiseMap = node.noiseMap;
          let rScale = 1;
          let gScale = 1;
          let bScale = 1;
          if(hexes.value[index].biome.name == 'Plains')
          {
            rScale = 152/255;
            gScale = 161/255;
            bScale = 56/255;
          }
          else if(hexes.value[index].biome.name == 'Fortress')
          {
            rScale = 97/255;
            gScale = 22/255;
            bScale = 16/255;
          }
          else if(hexes.value[index].biome.name == 'Mountains')
          {
            rScale = 165/255;
            gScale = 42/255;
            bScale = 42/255;
          }
          else if(hexes.value[index].biome.name == 'Desert')
          {
            bScale = 0;
          }
          else if(hexes.value[index].biome.name == 'Forest')
          {
            rScale = 0;
            bScale = 0;
          }
          /*for(let x = 0; x < node.noiseMap.dimension; x++)
          {
            for(let y = 0; y < node.noiseMap.dimension; y++)
            {
              const pixelValue = noiseMap.get(x, y);
              //this.ctx.fillStyle = `rgb(${Math.floor(pixelValue*255*rScale)}, ${Math.floor(pixelValue*255*gScale)}, ${Math.floor(pixelValue*255*bScale)})`;
              //this.ctx.fillRect(x, y, 1, 1);
            }
          }*/
          if(node.encounterData.type == 'Combat')
          {
            const mechs = node.encounterData.content['Mechs'];
            const drones = node.encounterData.content['Drones'];
            const vehicles = node.encounterData.content['Vehicles'];
            const people = node.encounterData.content['People'];
            const enemies = mechs+drones+vehicles+people;
            /*for(let enemy = 0; enemy < enemies; enemy++)
            {
              const image = new Image();
              const xcoord = Math.floor(Math.random()*80);
              const ycoord = Math.floor(Math.random()*80);
              image.onload = () => {
                //this.ctx.drawImage(image, xcoord, ycoord, 20, 20);
              };
              image.src = process.env.PUBLIC_URL + '/triangle-target.png';
              //await new Promise(r => setTimeout(r, 100));
            }  */         
          }
          /*if(node.settlement)
          {
            const image = new Image();
            const xcoord = Math.floor(Math.random()*80);
            const ycoord = Math.floor(Math.random()*80);
            image.onload = () => {
              this.ctx.drawImage(image, xcoord, ycoord, 20, 20);
            };
            image.src = process.env.PUBLIC_URL + '/factory.png';
            await new Promise(r => setTimeout(r, 100));
          }
          const submapData = this.canvasRef.current.toDataURL('image/jpg');
          pdf.addImage(submapData, 'JPEG', 175, 0, node.noiseMap.dimension/4, node.noiseMap.dimension/4);*/
          let nodeString = `Area ${nodeIndex}\n${node.text}`;
          const splitStrings = pdf.splitTextToSize(nodeString, 180);
          if(splitStrings.length > 40)
          {
            pdf.text(20, 20, splitStrings.slice(0,40));
            pdf.addPage();
            pdf.text(20, 20, splitStrings.slice(40, splitStrings.length));
          }
          else
          {
            pdf.text(20, 20, splitStrings);
          }
          
        }
      }
      
      pdf.save('campaign_map.pdf');
      pdfBool.value = false;
}

function populateHexes(hexesFromHoneycomb)
{
  hexes.value = hexesFromHoneycomb;
  savePDF();
  saveJSON();
}

function saveJSON()
{
  const jsonString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(hexes.value, null, 2));
  const blob = new Blob([jsonString], {type: 'text/plain'});
  const ref = window.URL.createObjectURL(blob);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     jsonString);
  downloadAnchorNode.setAttribute("download", 'campaign_map' + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function UploadJSON(event)
{
  console.log(event.target.files[0]);
}

</script>

<template>
  <div ref="honeycomb" id="pdfRender">
    <Honeycomb @PDFhexes="populateHexes" @hexClick="showGraph" :pdfBool="pdfBool" :quest="quest" :rumors="rumors" :factions="factions"/>
  </div>
  <VueSidePanel :side="'right'" :rerender="true" width="500px" v-model="isOpened" style="background-color: #ccc">
    <template #default>
      <div style="height: 100%; background-color: #ccc; text-align: center">
        <vue-mermaid-string  :value="bigDiagram" @node-click="graphClick"/>
        <span class="roboto-regular" style="white-space: pre-wrap; font-size: 24px; background-color: #ccc"> {{ activeText }}</span>
       
      </div>

    </template>
  </VueSidePanel>
  <VueSidePanel :side="'left'" :rerender="true" width="500px" v-model="leftOpened" style="background-color: #ccc">
    <template #default>
      <div style="height: 100%; background-color: #ccc; text-align: center">
        <span class="roboto-regular" style="white-space: pre-wrap; font-size: 24px; background-color: #ccc"> {{ activeLeftText }}</span>
      </div>
    </template>
  </VueSidePanel>
  <div>
    <button @click="questClick">Show Quest</button>
    <button @click="rumorsClick">Show Rumors</button>
    <button @click="factionsClick">Show Factions</button>
    <!--<button @click="kickoffPDF">Save PDF/JSON</button> -->
    <!--<button @click="$refs.file.$el.click()">Upload JSON</button>-->
    <input type="file" id="file" ref="file" style="display: none;" @change="UploadJSON($event)"/>
  </div>
  <div v-if="pdfBool" style="height: 100%; text-align: center">
    <vue-mermaid-string  id="pdfgraph" :value="bigDiagram" @node-click="graphClick"/>
  </div>
  
</template>


<style>
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
  background-color: #ccc;
}

.roboto-regular {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.roboto-bold {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
}


.roboto-black {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
}

</style>