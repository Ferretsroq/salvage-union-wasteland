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

class Vehicle
{
    constructor(name, sp, weapon, techLevel, salvageValue)
    {
        this.name = name;
        this.sp = sp;
        this.weapon = weapon;
        this.techLevel = techLevel;
        this.salvageValue = salvageValue;
    }
    toString()
    {
        return `${this.name}: ${this.sp} SP\n${this.weapon.name}: ${this.weapon.damage} SP (Range: ${this.weapon.range})\nSalvage Value: ${this.salvageValue} T${this.techLevel} Scrap`;
    }
    static GenerateVehicle()
    {
        const vehicleTypes = ["Fighting Box Wheel", "Machine Gun Turret", "Armoured Box Wheel", "Tank", "Rotorcraft"];
        const name = vehicleTypes[Math.floor(Math.random()*vehicleTypes.length)];
        if(name == "Fighting Box Wheel")
        {
            return new Vehicle(name, 2, weapons["1"][0], 1, 2);
        }
        else if(name == "Machine Gun Turret")
        {
            return new Vehicle(name, 2, weapons["1"][0], 1, 1);
        }
        else if(name == "Armoured Box Wheel")
        {
            return new Vehicle(name, 4, weapons["2"][0], 2, 3);
        }
        else if(name == "Tank")
        {
            return new Vehicle(name, 6, weapons["3"][0], 3, 4);
        }
        else if(name == "Rotorcraft")
        {
            return new Vehicle(name, 3, weapons["3"][7], 4, 3);
        }
    }
}

class Person
{
    constructor(name, hp, weapon)
    {
        this.name = name;
        this.hp = hp;
        this.weapon = weapon;
    }
    toString()
    {
        return `${this.name}: ${this.hp} HP\n${this.weapon.name}: ${this.weapon.damage} HP (Range: ${this.weapon.range})`;
    }
    static GeneratePerson()
    {
        const personTypes = ["Wastelander", "Raider", "Trooper", "Veteran", "Combat Pilot", "Ace"];
        const name = personTypes[Math.floor(Math.random()*personTypes.length)];
        if(name == "Wastelander")
        {
            return new Person(name, 2, {name: "Improvised Melee Weapon", range: "Close", damage: 2});
        }
        else if(name == "Raider")
        {
            return new Person(name, 3, {name: "Improvised Firearm", range: "Close", damage: 2});
        }
        else if(name == "Trooper")
        {
            return new Person(name, 5, {name: "Rifle", range: "Medium", damage: 5});
        }
        else if(name == "Veteran")
        {
            return new Person(name, 9, {name: "Green Laser Rifle", range: "Medium", damage: 5});
        }
        else if(name == "Combat Pilot")
        {
            return new Person(name, 10, {name: "Pistol", range: "Close", damage: 3});
        }
        else if(name == "Ace")
        {
            return new Person(name, 16, {name: "Sniper Rifle", range: "Long", damage: 6});
        }
    }
}

class Drone
{
    constructor(name, sp, weapon, techLevel, salvageValue)
    {
        this.name = name;
        this.sp = sp;
        this.weapon = weapon;
        this.techLevel = techLevel;
        this.salvageValue = salvageValue;
    }
    toString()
    {
        return `${this.name}: ${this.sp} SP\n${this.weapon.name}: ${this.weapon.damage} SP (Range: ${this.weapon.range})\nSalvage Value: ${this.salvageValue} T${this.techLevel} Scrap`;
    }
    static GenerateDrone()
    {
        const droneTypes = ["Defacer Drone", "Salvo Drone", "Combat Drone", "Heavy Combat Drone", "Walker Drone", "Pest Drone", "Hover Drone", "Needle Drone"];
        const name = droneTypes[Math.floor(Math.random()*droneTypes.length)];
        if(name == "Defacer Drone")
        {
            return new Drone(name, 2, weapons["1"][1], 1, 1);
        }
        else if(name == "Salvo Drone")
        {
            return new Drone(name, 3, weapons["1"][0], 1, 1);
        }
        else if(name == "Combat Drone")
        {
            return new Drone(name, 4, weapons["1"][6], 1, 2);
        }
        else if(name == "Heavy Combat Drone")
        {
            return new Drone(name, 5, weapons["2"][0], 2, 2);
        }
        else if(name == "Walker Drone")
        {
            return new Drone(name, 6, weapons["2"][2], 3, 2);
        }
        else if(name == "Pest Drone")
        {
            return new Drone(name, 4, weapons["1"][2], 3, 3);
        }
        else if(name == "Hover Drone")
        {
            return new Drone(name, 4, weapons["3"][4], 4, 3);
        }
        else if(name == "Needle Drone")
        {
            return new Drone(name, 2, weapons["4"][4], 4, 3);
        }
    }
}

export {GetEncounter, Mech, Vehicle, Person, Drone};