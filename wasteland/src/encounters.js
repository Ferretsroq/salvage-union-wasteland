const encounterTypes = ['Combat', 'Social', 'Environmental'];
const combatants = ['Mechs', 'People', 'Drones', 'Vehicles'];
const people = ['Salvagers', 'Scouts', 'Merchants', 'Raiders'];
const needs = ['Food', 'Water', 'Salvage', 'Goods', 'Medicine', 'Weapons'];

function GetEncounterType()
{
    return encounterTypes[Math.floor(Math.random()*encounterTypes.length)];
}

function GetCombatant()
{
    const combatant = combatants[Math.floor(Math.random()*combatants.length)];
    let num = 0;
    if(combatant == 'Mechs')
    {
        num = 1;
    }
    else if(combatant == 'People')
    {
        num = Math.floor(Math.random()*4)+2;
    }
    else if(combatant == 'Drones')
    {
        num = 1;
    }
    else if(combatant == 'Vehicles')
    {
        num = 2;
    }
    return {combatant: combatant, num: num};
}

function GetSocialEncounter()
{
    const peopleType = people[Math.floor(Math.random()*people.length)];
    const need = needs[Math.floor(Math.random()*needs.length)];
    return {type: peopleType, need: need};
}

function GetEncounter()
{
    let encounter = {};
    const encounterType = GetEncounterType();
    if(encounterType == 'Combat')
    {
        let enemies = {'Mechs': 0, 'People': 0, 'Drones': 0, 'Vehicles': 0};
        const num = Math.floor(Math.random()*4)+1;
        for(let enemy = 0; enemy < num; enemy++)
        {
            const enemy = GetCombatant();
            enemies[enemy.combatant] += enemy.num;
        }
        encounter.type = 'Combat';
        encounter.content = enemies;
    }
    else if(encounterType == 'Social')
    {
        encounter.type = 'Social';
        encounter.content = GetSocialEncounter();
    }
    else if(encounterType == 'Environmental')
    {
        encounter.type = 'Environmental';
        encounter.content = 'idk yet';
    }
    return encounter;
}

export {GetEncounter};