import chassisTypes from './chassis.json';
import systems from './systems.json';
import modules from './modules.json';
import weapons from './weapons.json';
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

class Chassis
{
    constructor(name, techLevel, sp, salvageValue)
    {
        this.name = name;
        this.techLevel = techLevel;
        this.sp = sp;
        this.salvageValue = salvageValue;
    }
    static fromJSON(inputJSON)
    {
        return new Chassis(inputJSON.name, inputJSON.techLevel, inputJSON.sp, inputJSON.salvageValue);
    }
}

class Mech
{
    constructor(chassis, systems, modules, weapons)
    {
        this.chassis = chassis;
        this.systems = systems;
        this.modules = modules;
        this.weapons = weapons;
    }
    static GenerateMech()
    {
        const roll = Math.floor(Math.random()*Object.keys(chassisTypes).length);
        const chassisType = chassisTypes[Object.keys(chassisTypes)[roll]];
        const chassis = Chassis.fromJSON(chassisType);
        const numSystems = Math.floor(Math.random()*3)+1;
        const numModules = Math.floor(Math.random()*3)+1;
        let mySystems = [];
        let myModules = [];
        let myWeapons = [];
        for(let system = 0; system < numSystems; system++)
        {
            const techLevel = (Math.floor(Math.random()*chassis.techLevel)+1).toString();
            mySystems.push(systems[techLevel][Math.floor(Math.random()*systems[techLevel].length)]);
        }
        for(let module = 0; module < numModules; module++)
        {
            const techLevel = (Math.floor(Math.random()*chassis.techLevel)+1).toString();
            myModules.push(modules[techLevel][Math.floor(Math.random()*modules[techLevel].length)]);
        }
        const numWeapons = Math.ceil(chassis.techLevel/2);
        for(let weapon = 0; weapon < numWeapons; weapon++)
        {
            const techLevel = (Math.floor(Math.random()*chassis.techLevel)+1).toString();
            const weaponJSON = weapons[techLevel][Math.floor(Math.random()*weapons[techLevel].length)];
            myWeapons.push(weaponJSON);
        }
        return new Mech(chassis, mySystems, myModules, myWeapons);
    }
    toString()
    {
        let returnString = `${this.chassis.name} Mech: ${this.chassis.sp} SP`;
        for(let weapon = 0; weapon < this.weapons.length; weapon++)
        {
            returnString += `\n${this.weapons[weapon].name}: ${this.weapons[weapon].damage} SP (Range: ${this.weapons[weapon].range})`;
        }
        returnString += `\nSystems: ${this.systems}\nModules: ${this.modules}\nSalvage Value: ${this.chassis.salvageValue} T${this.chassis.techLevel} Scrap`;
        return returnString;
    }
}

export {GetEncounter, Mech};