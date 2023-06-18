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
    constructor(chassis, systems, modules, weapon)
    {
        this.chassis = chassis;
        this.systems = systems;
        this.modules = modules;
        this.weapon = weapon;
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
        const techLevel = (Math.floor(Math.random()*chassis.techLevel)+1).toString();
        const weaponJSON = weapons[techLevel][Math.floor(Math.random()*weapons[techLevel].length)];
        const weapon = weaponJSON;
        return new Mech(chassis, mySystems, myModules, weapon);
    }
    toString()
    {
        return `${this.chassis.name} Mech\n${this.weapon.name}: ${this.weapon.damage} SP (Range: ${this.weapon.range})\nSystems: ${this.systems}\nModules: ${this.modules}`
    }
}

export {GetEncounter, Mech};