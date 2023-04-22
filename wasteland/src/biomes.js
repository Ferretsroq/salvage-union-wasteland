function GetDefaultBiomes()
{
	let biomes = {};
    biomes['Plains']              = new Biome('Plains', '', '#98a138', {'Open Space': 'Low', 'Downed Mech': 'High'})
    biomes['Ruins']               = new Biome('Ruins', '', 'gray', {'Bombed-Out Building': 'Medium', 'Empty Road': 'Low'})
    biomes['Fortress']            = new Biome('Fortress', '', '#611610', {'Bunker': 'High', 'Munitions Depot': 'Very High'})
    biomes['Mountains']           = new Biome('Mountains', '', 'brown', {'Cave': 'Low', 'Valley': 'Low'})
    biomes['Nothing Should Live'] = new Biome('Nothing Should Live', '', 'black', {'Irradiated Swamp': 'Low', 'Nuclear Crater': 'High'})
    biomes['Desert']              = new Biome('Desert', '', 'yellow', {'Waving Sands': 'Low', 'Downed Ship': 'High'})
    biomes['Woods']               = new Biome('Woods', '', 'green', {'Clearing': 'Low', 'Logging Operation': 'Medium'})
    return biomes
}

class Biome
{
    constructor(name, description, color, poi)
    {
        this.name = name;
        this.description = description;
        this.color = color;
        console.log(poi);
        this.poi = poi;
    }
    rollPOI()
    {
        const keys = Object.keys(this.poi);
        const roll = Math.floor(Math.random()*keys.length);
        const key = keys[roll];
        const salvage = this.poi[key];
        return {poi: key, salvage: salvage};
    }
}
const Biomes = GetDefaultBiomes();

export {Biome, Biomes}