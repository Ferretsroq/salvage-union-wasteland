<script setup>
    import {watch} from 'vue';
    import Hexagon from './Hexagon.vue';
    import {Biome, Biomes} from './biomes';
    import {Region} from './region';
    import { Area } from './area';
    import { Quest } from './quests';
    import { Faction } from './factions';
    import { Rumor } from './rumors';
    import { Settlement } from './settlements';
    import { GetEncounter } from './encounters';
    import { GetBioTitan } from './biotitan';
    import { RollSystemOrModule } from './advancedsalvage';
    



    const hexWidth = 200;
    const hexHeightCornerpx = `${Math.floor(-(hexWidth/2)*1/Math.sqrt(3))}px`;
    const hexWidthHalfpx = `${Math.floor(hexWidth/2)}px`;
    defineOptions({
  inheritAttrs: false
});
    const rows = 5;
    const numHexes = 5;
    const rowIndexList = [];
    const hexIndexList = [];
    const props = defineProps({
        quest: Object,
        rumors: Array,
        factions: Array,
        pdfBool: Boolean
});
    
    //const quest = Quest.GenerateQuest(rows*numHexes);
    //const rumors = [];
    const quest = props.quest;
    const rumors = props.rumors;
    const factions = props.factions;
    for(let rumor = 0; rumor < 10; rumor++)
    {
      rumors.push(Rumor.GenerateRumor(rows*numHexes));
    }
    //const factions = [];
    factions.push(Faction.GenerateFaction());
    factions.push(Faction.GenerateFaction());
    factions.push(Faction.GenerateFaction());

    for(let index = 0; index < rows; index++)
    {
        rowIndexList.push(index);
    }
    for(let index = 0; index < numHexes; index++)
    {
        hexIndexList.push(index);
    }
    const hexes = [];
    for(let row = 0; row < rows; row++)
    {
        for(let hex = 0; hex < numHexes; hex++)
        {
            if(hex == 0)
            {
                if(row == 0)
                {
                    hexes.push(new Region(Biomes[Object.keys(Biomes)[Math.floor(Math.random()*Object.keys(Biomes).length)]]));
                }
                else
                {
                    hexes.push(new Region(hexes[((row-1)*numHexes)].biome.rollNextBiome()))
                }
            }
            else
            {
                hexes.push(new Region(hexes[(row*numHexes)+hex-1].biome.rollNextBiome()));
            }
        }
    }
    ValidateQuest(quest, hexes);
    ValidateRumors(rumors, hexes);

    function ValidateQuest(quest, hexes)
    {
        for(let index = 0; index < quest.hexes.length; index++)
        {
            if(Object.keys(quest.hexes[index]).length > 0)
            {
                if(quest.hexes[index].detail == "combat")
                {
                    let encounter = GetEncounter();
                    while(encounter.type != "Combat")
                    {
                        encounter = GetEncounter();
                    }
                    const hexNum = parseInt(quest.hexes[index].hex);
                    const roll = Math.floor(Math.random()*hexes[hexNum].areas.length);
                    hexes[hexNum].areas[roll].encounter += `\n---\nQUEST ENCOUNTER\n---\n${Area.FormatEncounter(encounter, hexes[hexNum].biome)}`;;
                    hexes[hexNum].areas[roll].UpdateText();
                 }
                else if(quest.hexes[index].detail == "data cache")
                {
                    const hexNum = parseInt(quest.hexes[index].hex);
                    const roll = Math.floor(Math.random()*hexes[hexNum].areas.length);
                    hexes[hexNum].areas[roll].encounter += `\n---\nQUEST ENCOUNTER\n---\nData Cache related to quest`;
                    hexes[hexNum].areas[roll].UpdateText();
                    
                }
                else if(quest.hexes[index].detail == "bad place data cache")
                {
                    const hexNum = parseInt(quest.hexes[index].hex);
                    const node = hexes[hexNum].areas[Math.floor(Math.random()*Object.keys(hexes[hexNum].areas).length)];
                    const options = ["roving bandits", "a Bio-Titan", "a warlord that has claimed this territory"];
                    const option = options[Math.floor(Math.random()*options.length)];
                    node.encounter += `\n---\nQUEST ENCOUNTER\n---\nData Cache related to quest, protected by ${option}\n`;
                    node.UpdateText();
                    if(option == "roving bandits" || option == "a warlord that has claimed this territory")
                    {
                        let encounter = GetEncounter();
                        while(encounter.type != "Combat")
                        {
                            encounter = GetEncounter();
                        }
                        node.encounter += `Encounter: ${Area.FormatEncounter(encounter, hexes[hexNum].biome)}\n`;
                        node.UpdateText();
                    }
                    else if(option == "a Bio-Titan")
                    {
                        node.encounter += `${GetBioTitan()}\n`;
                        node.UpdateText();
                    }
                }
            }
        }
        if(quest.goal.includes("bio-titan"))
        {
            const hexGoal = Math.floor(Math.random()*25);
            quest.hexGoal = hexGoal;
            const node = hexes[hexGoal].areas[Math.floor(Math.random()*Object.keys(hexes[hexGoal].areas).length)];
            node.encounter += `\n---\nQUEST END GOAL\n---\nBIO TITAN ${GetBioTitan()}\n`;
            node.UpdateText();
         }
        else if(quest.goal.includes("treasure map"))
        {
            const hexGoal = Math.floor(Math.random()*25);
            quest.hexGoal = hexGoal;
            const node = hexes[hexGoal].areas[Math.floor(Math.random()*Object.keys(hexes[hexGoal].areas).length)];
            node.encounter += `\n---\nQUEST END GOAL\n---\nTreasure Trove containing:\n${RollSystemOrModule(6)}\n${RollSystemOrModule(6)}\n${RollSystemOrModule(6)}\n${RollSystemOrModule(5)}\n${RollSystemOrModule(5)}\n${RollSystemOrModule(5)}\n${Math.floor(Math.random()*100)+10} TL1 Scrap\n${Math.floor(Math.random()*100)+10} TL2 Scrap\n${Math.floor(Math.random()*100)+10} TL3 Scrap\n${Math.floor(Math.random()*50)+10} TL4 Scrap\n${Math.floor(Math.random()*20)+10} TL5 Scrap\n${Math.floor(Math.random()*10)+10} TL6 Scrap\n`;
            node.UpdateText();
        }
        else if(quest.goal.includes("great TL 6 machine"))
        {
            let hexGoals = [];
            for(let goal = 0; goal < 5; goal++)
            {
                let hex = Math.floor(Math.random()*25);
                while(hexGoals.includes(hex))
                {
                    hex = Math.floor(Math.random()*25);
                }
                hexGoals.push(hex);
            }
            quest.hexGoal = hexGoals;
            for(let goal = 0; goal < quest.hexGoal.length; goal++)
            {
                const node = hexes[quest.hexGoal[goal]].areas[Math.floor(Math.random()*Object.keys(hexes[quest.hexGoal[goal]].areas).length)];
                node.encounter += `\n---\nQUEST GOAL\n---\nA piece of the great machine is here.\n`
                node.UpdateText();
            }
        }
        else if(quest.goal.includes("A warlord has set up shop"))
        {
            const hexGoal = Math.floor(Math.random()*25);
            quest.hexGoal = hexGoal;
            const node = hexes[hexGoal].areas[Math.floor(Math.random()*Object.keys(hexes[hexGoal].areas).length)];
            node.encounter += `\n---\nQUEST END GOAL\n---\nWarlord base, or centerpiece of their master plan.\n`;
            node.UpdateText();
        }
    }
    function ValidateRumors(rumors, hexes)
    {
        for(let rumor = 0; rumor < rumors.length; rumor++)
        {
            console.log(rumors[rumor]);
            const node = hexes[rumors[rumor].hex].areas[Math.floor(Math.random()*Object.keys(hexes[rumors[rumor].hex].areas).length)];
            if(rumors[rumor].text.includes('buried'))
            {
                node.advancedSalvage = `${rumors[rumor].content} Chassis`
            }
            else if(rumors[rumor].text.includes('battle'))
            {
                node.supply += 10;
            }
            else if(rumors[rumor].text.includes('new warlord'))
            {
                let encounter = GetEncounter();
                while(encounter.type != 'Combat')
                {
                    encounter = GetEncounter();
                }
                node.encounter += `\nEncounter: ${Area.FormatEncounter(encounter, hexes[rumors[rumor].hex].biome)}`;
            }
            else if(rumors[rumor].text.includes('new settlement'))
            {
                node.settlement = Settlement.GenerateSettlement();
            }
            node.UpdateText();
        }
    }
    const emit = defineEmits(['PDFhexes']);
    watch(() => (props.pdfBool), (value) => {
        if(value == true)
        {
            emit('PDFhexes', hexes);
        }
    });
</script>

<template>
    <div class="rows">
        <!--<div class="row" v-for="i in 5">
            <Hexagon v-for="j in 5" :hexWidth="hexWidth" />
        </div>-->
        <div class="row" v-for="row in rowIndexList">
            <Hexagon v-for="hex in hexIndexList" :hexWidth="hexWidth" :region="hexes[(row*numHexes)+hex]" :hexID="(row*numHexes)+hex" />
        </div>
    </div>
</template>
<style>
.row {
    margin-bottom: v-bind(hexHeightCornerpx);
    display: flex;
}
.row:nth-child(odd) {
    margin-left: v-bind(hexWidthHalfpx);
}
</style>