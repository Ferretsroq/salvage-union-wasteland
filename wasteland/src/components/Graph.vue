<script setup>
  import VueMermaidString from 'vue-mermaid-string';
  const props = defineProps({
    value: String,
    hexWidthpx: String,
    hexHeightpx: String
  });
  const diagram = props.value;
  const hexWidthpx = props.hexWidthpx;
  const hexHeightpx = props.hexHeightpx;
  const hexWidthSVGpx = '0px';
  /*function nodeClick(node)
  {
    console.log(node);
  }*/

</script>

<template>
  <div>
    <vue-mermaid-string :value="diagram" />
  </div>
</template>

<style>
.graph{
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  max-width: v-bind(hexWidthpx);
  max-height: v-bind(hexHeightpx);
  text-align: center;
}

svg {
    max-width: v-bind(hexWidthSVGpx);
    max-height: v-bind(hexHeightpx);
}
</style>