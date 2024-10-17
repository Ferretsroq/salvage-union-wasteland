import { GetEncounter, Mech, Vehicle, Person, Drone } from "./encounters";
import {Settlement} from './settlements';
import { RollSystemOrModule } from "./advancedsalvage";


class Area
{
    constructor(biome)
    {
      this.biome = biome;
		  this.encounterData = GetEncounter();
      this.encounter = Area.FormatEncounter(this.encounterData, this.biome);
      const salvage = this.RollSalvage();
		  this.techLevel = salvage.tl;
		  this.supply = salvage.supply;
		  this.advancedSalvage = this.RollAdvancedSalvage();
		  this.settlement = null;
      const settlementRoll = Math.floor(Math.random()*100)+1;
      if(settlementRoll <= 10)
      {
        this.settlement = Settlement.GenerateSettlement();
      }
      this.text = this.FormatText();

    }
    UpdateText()
    {
      this.text = this.FormatText();
    }
    RollSalvage()
    {
      let techLevel = 1;
      const techRoll = Math.floor(Math.random()*100);
      if(techRoll > 50 && techRoll < 75)
      {
        techLevel = 2;
      }
      else if(techRoll >= 75 && techRoll < 85)
      {
        techLevel = 3;
      }
      else if(techRoll >= 85 && techRoll < 95)
      {
        techLevel = 4;
      }
      else if(techRoll >= 95 && techRoll < 99)
      {
        techLevel = 5;
      }
      else if(techRoll >= 99)
      {
        techLevel = 6;
      }
      /*let salvage = [0, 0, 0, 0, 0, 0];
      for(let tech = 0; tech < techLevel; tech++)
      {
        const scrapAmount = Math.floor(Math.random()*15)+1;
        salvage[tech] = scrapAmount;
      }*/
      const supply = Math.floor(Math.random()*6)+1;
      const salvage = {tl: techLevel, supply: supply};

      return salvage;
    }
    RollAdvancedSalvage()
    {
      let techLevel = 1;
      const techRoll = Math.floor(Math.random()*100);
      if(techRoll > 50 && techRoll < 75)
      {
        techLevel = 2;
      }
      else if(techRoll >= 75 && techRoll < 85)
      {
        techLevel = 3;
      }
      else if(techRoll >= 85 && techRoll < 95)
      {
        techLevel = 4;
      }
      else if(techRoll >= 95 && techRoll < 99)
      {
        techLevel = 5;
      }
      else if(techRoll >= 99)
      {
        techLevel = 6;
      }
      let advancedSalvage = "None";
      if(Math.floor(Math.random()*100) < 10)
      {
        advancedSalvage = RollSystemOrModule(techLevel);
      }
      return advancedSalvage;
    }
    static FormatEncounter(encounter, biome)
    {
      let returnString = `${encounter.type}`;
      if(encounter.type == 'Combat')
      {
        returnString += `\nMechs: ${encounter.content.Mechs}, Drones: ${encounter.content.Drones}, Vehicles: ${encounter.content.Vehicles}, People: ${encounter.content.People}`;
        for(let mech = 0; mech < encounter.content.Mechs; mech++)
        {
          returnString += `\nMech ${mech+1}: ${Mech.GenerateMech().toString()}\n---`;
        }
        for(let vehicle = 0; vehicle <  encounter.content.Vehicles; vehicle++)
        {
          returnString += `\nVehicle ${vehicle+1}: ${Vehicle.GenerateVehicle().toString()}\n---`;
        }
        for(let drone = 0; drone < encounter.content.Drones; drone++)
        {
          returnString += `\nDrone ${drone+1}: ${Drone.GenerateDrone().toString()}\n---`;
        }
        for(let person = 0; person < encounter.content.People; person++)
        {
          returnString += `\nPerson ${person+1}: ${Person.GeneratePerson().toString()}\n---`;
        }
      }
      else if(encounter.type == 'Social')
      {
        returnString += `\n${encounter.content.type} need ${encounter.content.need}`;
      }
      else if(encounter.type == 'Environmental')
      {

        //returnString += `\nRelated to feature`;
        returnString += `\n${biome.rollEnvironmentalEncounter()}`;
      }
      returnString += `\n\n`;
      return returnString;
    }
    FormatText()
    {
      if(this.settlement == null)
      {
        return `Encounter: ${this.encounter}\nArea Tech Level: ${this.techLevel}\nArea Supply: ${this.supply}\nAdvanced Salvage: ${this.advancedSalvage}`
      }
      else
      {
        return `Encounter: ${this.encounter}\nArea Tech Level: ${this.techLevel}\nArea Supply: ${this.supply}\nAdvanced Salvage: ${this.advancedSalvage}\nSettlement: ${this.settlement.toString()}`
      }
    }
}

export {Area}