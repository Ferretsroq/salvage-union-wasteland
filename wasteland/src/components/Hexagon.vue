<script setup lang="ts">
import VueMermaidString from 'vue-mermaid-string';
import endent from 'endent';
import {ref, computed} from 'vue';
import Graph from './Graph.vue';
import { NodeWeb } from './NodeMapping';


const clicks = ref(0);
const props = defineProps({
  hexWidth: Number,
  region: Object,
  hexID: Number
});
const hexWidth = props.hexWidth;
const color = props.region.biome.color;
const diagram = props.region.diagram;
const hexID = props.hexID;
const hexHeight = hexWidth*Math.sqrt(3)/2*2/3;

const hexWidthpx = `${hexWidth}px`;
const hexHeightpx = `${hexWidth*Math.sqrt(3)/2*2/3}px`;
const hexMarginpx = `${hexWidth*Math.sqrt(3)/2*1/3}px 0`;
const hexAfterpx = `${hexWidth*Math.sqrt(2)/2}px`;
const hexAfterLeftpx = `${(hexWidth/2) - ((hexWidth/2)*Math.sqrt(2)/2)}px`;
const hexToppx = `${-(hexWidth/2)*Math.sqrt(2)/2}px`

/*const num = Math.floor(Math.random()*10)+5;
let diagram = 'flowchart TD\n';
const web = new NodeWeb(0.25);
web.GenerateWeb(num, 5);
web.MakeNodeConnections();
for(let index = 0; index < Object.keys(web.web).length; index++)
{
  
  if(web.web[index].exits.length > 0)
  {
    for(let exitIndex = 0; exitIndex < web.web[index].exits.length; exitIndex++)
    {
      if(!diagram.includes(`${index} --- ${web.web[index].exits[exitIndex]}`) && ! diagram.includes(`${web.web[index].exits[exitIndex]} --- ${index}`))
      {
        diagram += `${index} --- ${web.web[index].exits[exitIndex]}\n`;
      }
    }
  }
  diagram += `click ${index}\n`;
}
diagram = diagram.trim();*/
//console.log(num);
/*for(let index = 0; index <= num; index++)
{
  if(index+1 <= num)
  {
    diagram += `${index} --- ${index+1}\n`; 
  }
  diagram += `click ${index}\n`;
}
for(let index =0; index < num; index++)
{
  for(let index2 = 0; index2 < num; index2++)
  {
    if(index != index2)
    {
      if(Math.random() < 0.5)
      {
        if(!diagram.includes(`${index} --- ${index2}`) && !diagram.includes(`${index2} --- ${index}`))
        {
          diagram += `${index} --- ${index2}\n`;
        }
        
      }
    }
  }
}
*/
//console.log(diagram);

function nodeClick(nodeId: any)
{
  console.log(nodeId);
  clicks.value++;
}



</script>
<template>

<div >
  <div class="hexagon" @click.stop="$parent.$emit('hexClick', diagram, region)">
    <div class="label">
      {{ hexID }}
    </div>
    <!--<div class="graph" :id="`hexID${hexID}`">
      <Graph :value="diagram" @node-click="nodeClick" :hexWidthpx="hexWidthpx" :hexHeightpx="hexHeightpx"/>
    </div>-->
  </div>
</div>
</template>

<style>
.label {
  font-size: 48px;
  text-align: center;
  position: relative;
  z-index: 2;
  color: #cccccc;
}
.hexagon {
  position: relative;
  width: v-bind('hexWidthpx'); 
  height: v-bind('hexHeightpx');
  background-color: v-bind('color');
  margin: v-bind('hexMarginpx');
  border-left: solid 1px #000000;
  border-right: solid 1px #000000;
}

.hexagon:before,
.hexagon:after {
  content: "";
  position: absolute;
  z-index: 1;
  width: v-bind('hexAfterpx');
  height: v-bind('hexAfterpx');
  -webkit-transform: scaleY(0.5774) rotate(-45deg);
  -ms-transform: scaleY(0.5774) rotate(-45deg);
  transform: scaleY(0.5774) rotate(-45deg);
  background-color: inherit;
  left: v-bind(hexAfterLeftpx);
}

.hexagon:before {
  top: v-bind(hexToppx);
  border-top: solid 1px #000000;
  border-right: solid 1px #000000;
}

.hexagon:after {
  bottom: v-bind(hexToppx);
  border-bottom: solid 1px #000000;
  border-left: solid 1px #000000;
}
</style>