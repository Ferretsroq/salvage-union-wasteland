class EncounterCard
{
	constructor(name, face, suit, terrains, description)
	{
		this.name = name;
		this.face = face;
		this.suit = suit;
		this.terrains = terrains;
		this.description = description;
	}
	Show()
	{
		return this.description;
	}
	toString()
	{
		return `**${this.name}** — ${this.face} of ${this.suit}\n${this.description}`
	}
}

EncounterCard.Clubs2 = new EncounterCard('Forest Fire', '2', 'Clubs', ['Woods'], "Hunting possible without spending a shift. The fire has Intensity C and is 20 hexes deep. SURVIVAL roll needed to find a way past. Even if successful, no further travel this shift. If the roll fails, the path forward is blocked for the next shift too.");
EncounterCard.Clubs3 = new EncounterCard('Pack of Wolves', '3', 'Clubs', ['Woods', 'Open'], "A pack of wolves begins tracking the PCs, howling in the distance, and attacks when the PCs are resting. They will attack an isolated PC if they can, preferably at night. If killed, each wolf will yield meat enough for D6 rations of food.");
EncounterCard.Clubs4 = new EncounterCard('Booby-Trapped Vehicle', '4', 'Clubs', ['Open', 'Road'], "Deserted pickup truck. If the PCs investigate, ambushing marauders detonate a hidden charge (blast power B) and open fire. They have hunting rifles and one RPG- 16, one reload each, D6 rations of wild food. The truck is permanently destroyed, but spare parts can be scavenged from it.");
EncounterCard.Clubs5 = new EncounterCard('Ground Zero', '5', 'Clubs', ['Open', 'Road'], "Crater from a nuclear strike, 4D6x10 meters wide and one fifth as deep. Pond of greenish water in the bottom. An area twice as wide as the crater is radioactive, inflicting 1 rad every stretch. To pass, a vehicle needs to go offroad and lose one hex of movement this shift before it can continue.");
EncounterCard.Clubs6 = new EncounterCard('Full Tank', '6', 'Clubs', ['Open', 'Road'], "Abandoned gas station. Marauders, armed with AKMs and one RPK machine gun (one reload each and D6 rations of wild food) are lying in ambush inside, and attack if PCs approach. There is no gasoline left in the tanks but plenty of scrap around – PCs scrounging here get a +2 modifier.");
EncounterCard.Clubs7 = new EncounterCard('Hungry & Angry', '7', 'Clubs', ['Open', 'Road', 'Woods'], "A group of refugees, starving and hypothermic. Some have cholera. They are aggressive and demand food and shelter. PCs can PERSUADE them to leave or use violence to chase them off.");
EncounterCard.Clubs8 = new EncounterCard('My Kill, My Meat', '8', 'Clubs', ['Woods'], "Hunters have just killed a moose and are carving up the carcass. They are protective of their prey and can threaten or even attack the PCs if they feel cornered. One of the hunters suffers from pneumonia.");
EncounterCard.Clubs9 = new EncounterCard('Marauder Roadblock', '9', 'Clubs', ['Open', 'Road'], "Marauders at a roadblock. They have AKMs, one RPG-16 (one reload), a pickup truck with half a tank and a DShK machinegun (one reload), and 2D6 rations of domestic food. The marauders try to capture or kill the PCs. If they are captured, the marauders bring them to their leader. The marauders flee if half of them are incapacitated.");
EncounterCard.Clubs10 = new EncounterCard('Murderous Bastards', '10', 'Clubs', ['Open' ,'Road', 'Woods'], "A band of stragglers from the US forces in the area. They are starving and will hail the PCs as friends, but take the first chance they get to kill the characters and steal their gear. Some of the stragglers suffer from typhus and the PCs risk being infected.");
EncounterCard.ClubsJ = new EncounterCard('Shoot On Sight', 'J', 'Clubs', ['Open', 'Road', 'Woods'], "Soviet soldiers searching for enemy stragglers. If they spot the PCs, they attack and call in fire support from a 122mm howitzer with five HE rounds 200 hexes away. The unit has a R-392A radio and D6 field rations.");
EncounterCard.ClubsQ = new EncounterCard('Superior Firepower', 'Q', 'Clubs', ['Open', 'Road'], "Soviet soldiers, including one officer, have set up a roadblock using a T-72 tank and sandbags. If they spot the PCs they will attack immediately. The T-72 has half a tank of alcohol fuel and five HEAT rounds. The roadblock is also equipped with a DShK machinegun, with one reload, and 2D6 field rations.");
EncounterCard.ClubsK = new EncounterCard('Outnumbered', 'K', 'Clubs', ['Open', 'Road'], "A Soviet convoy led by a BTR-70 APC (full tank, officer inside), followed by two GAZ-66 trucks (half tanks). If they spot the PCs, they attack. The BTR-70 has a KPV machinegun, with one reload. The convoy has an R-311 radio and PCxD6 field rations.");
EncounterCard.ClubsA = new EncounterCard('For My Country', 'A', 'Clubs', ['Open', 'Road', 'Woods'], "Village of 2D6 houses, surrounded by barbed wire and sandbags. Guards have AKMs with two reloads and a frag grenade each, and one RPG-16 (two reloads) and an 82 mm mortar (four HE rounds). Villagers are very suspicious of foreign soldiers but may be reasoned or even traded with.");
EncounterCard.Diamonds2 = new EncounterCard('Dense Fog', '2', 'Diamonds', ['Open', 'Road', 'Woods'], "A thick fog descends on the landscape, limiting visibility to 10 hexes. The fog counts as heavy rain for the purposes of driving.");
EncounterCard.Diamonds3 = new EncounterCard('Rabid Dogs', '3', 'Diamonds', ['Open', 'Road', 'Woods'], "A pack of wild dogs tracks the PCs, and will attack them if they get the chance. The dogs have a 1 in 6 chance to be infected with rabies.");
EncounterCard.Diamonds4 = new EncounterCard("Viper's Nest", '4', 'Diamonds', ['Open', 'Road'], "A burnt-out derelict bus. The wreck is beyond repair, but the PCs can scavenge parts from it. There is plenty of scrap around and any roll to scrounge in the area gets a +2 bonus. A viper has made its nest inside the bus and will attack any PC who enters it. This counts as an ambush.");
EncounterCard.Diamonds5 = new EncounterCard('The Final Rest', '5', 'Diamonds', ['Open', 'Road'], "A crater from a nuclear strike, 3D6x10 meters wide and one fifth as deep. Debris everywhere (scrounging rolls +2), and the corpse of a soldier with an assault rifle lies at the bottom. An area twice as wide as the crater is radioactive (1 rad per stretch). To pass, a vehicle needs to go offroad and lose one hex of movement this shift before it can continue.");
EncounterCard.Diamonds6 = new EncounterCard('House On Fire', '6', 'Diamonds', ['Open', 'Road', 'Woods'], "A farm set ablaze. Corpses of civilians on the ground, recently shot or beaten. Inside the buildings, roll MOBILITY to avoid intensity C fire. Scrounging at +2. After a stretch, armed civilians show up, assuming the PCs are behind the attack. They are armed with shotguns and pistols.");
EncounterCard.Diamonds7 = new EncounterCard('Desperate Times', '7', 'Diamonds', ['Open', 'Road', 'Forest'], "A group of refugees, starving, and hypothermic - and desperate. They plead with the PCs for food and protection. Several suffer from dysentery and the PCs risk being infected.");
EncounterCard.Diamonds8 = new EncounterCard('Hunters and Their Prey', '8', 'Diamonds', ['Woods'], "Hunters lying in wait for prey. They hail the PCs and try to barter for ammunition or weapons. They have knives and hunting bows with five arrows each, and enough raw meat for D6 rations of food.");
EncounterCard.Diamonds9 = new EncounterCard('Everything Has a Price', '9', 'Diamonds', ['Open', 'Road'], "A band of marauders have set up a roadblock using sandbags. They are ready to negotiate with the PCs and will let them pass, for the right price. They will defend themselves if attacked. They are armed with AKMs and the group has one RPG-16 (with one reload), as well as a civilian light truck with half a tank of alcohol fuel.");
EncounterCard.Diamonds10 = new EncounterCard('Whatcha Got?', '10', 'Diamonds', ['Open', 'Road', 'Woods'], "A band of US stragglers from the US forces in the area. They will hail the PCs, and try to barter with them or just plead for food, ammunition and protection. They are all starving.");
EncounterCard.DiamondsJ = new EncounterCard('Cash Is King', 'J', 'Diamonds', ['Open', 'Road', 'Woods'], "Soviet soldiers (one with RPG-16 with one reload) searching for enemy stragglers. If they spot the PCs they hold them at gunpoint but try to barter. One of the soldiers has pneumonia. The group also has PCxD6 field rations and some other gear and random scrap.");
EncounterCard.DiamondsQ = new EncounterCard('Drop Your Weapons', 'Q', 'Diamonds', ['Open', 'Road'], "Soviet soldiers at a roadblock with a BTR-70 APC (half tank, full reload for the KPV). If they spot the PCs, they order them to surrender, but can be PERSUADED to let them go, for a price. If the PCs surrender, they are taken to the nearest Soviet division HQ. The unit has PCx2 field rations.");
EncounterCard.DiamondsK = new EncounterCard('Loaded Like a Freight Train', 'K', 'Diamonds', ['Open', 'Road', 'Woods'], "A freight train commandeered by Soviet forces. MOBILITY roll to jump on. The train has guards and is loaded with 5,000 liters of alcohol fuel, 1,000 field rations, 200 AK-74 rifles, 6,000 rounds of 5.45x39 mm ammo, 50 hand grenades (frag), and 10 RPG-16 rocket launchers. Train moves D6 hexes per shift until it arrives at a local HQ.");
EncounterCard.DiamondsA = new EncounterCard('Buying and Selling', 'A', 'Diamonds', ['Open', 'Road', 'Woods'], "A small village of 2D6 houses. It is defended by local civilians who are ready to barter with the PCs for weapons or protection, in exchange for food and lodging. They are armed with shotguns and pistols. The PCs might even be offered to stay here indefinitely.");
EncounterCard.Hearts2 = new EncounterCard('Sunshine', '2', 'Hearts', ['Open', 'Road', 'Woods'], "Suddenly, the thick gray clouds of soot from countless nuclear detonations dissipate, and the sun breaks through the smog. The sight of the sun heals 1 point of stress and the weather turns to fair.");
EncounterCard.Hearts3 = new EncounterCard("Human's Best Friend", '3' ,'Hearts', ['Open', 'Road', 'Woods'], "A wild dog starts following the PCs. If they attack the mutt, it will run off, but come back later. If the PCs treat the dog well (PERSUASION roll), it will become their loyal companion for the rest of its life, and even defend them against attackers.");
EncounterCard.Hearts4 = new EncounterCard('The Smell of Victory', '4', 'Hearts', ['Open', 'Road'], "A dozen car wrecks, all burnt out, with charred corpses inside. The cars were hit by a napalm attack some weeks or months earlier. The corpses in the cars are such a depressing sight that it causes 1 point of stress. The wrecks are beyond repair but they can be scavenged for parts. There is plenty of scrap around (scrounging +2).");
EncounterCard.Hearts5 = new EncounterCard('The Watering Hole', '5', 'Hearts', ['Open', 'Road'], "A crater from a nuclear strike, 2D6x10 meters wide and one fifth as deep. D6 deer drink from a pond of scummy water at the bottom. The PCs can kill the deer for meat (eating it gives 1 rad). An area twice as wide as the crater is radioactive (1 rad per stretch). To pass, a vehicle needs to go off-road and lose one hex of movement this shift before it can continue.");
EncounterCard.Hearts6 = new EncounterCard('The Final Rest', '6', 'Hearts', ['Open', 'Road', 'Woods'], "A small farm, largely intact but deserted. Decomposing bodies of a family can be found inside. The father seems to have killed his family with a shotgun and then turned the weapon on himself (the sight causes 1 point of stress). 3D6 rounds of 12 gauge ammo can be found in the house, and scrounging rolls here get a +2 bonus.");
EncounterCard.Hearts7 = new EncounterCard('The Orphans', '7', 'Hearts', ['Open', 'Road', 'Woods'], "A farm with three children (10-15 years) living in it. Their parents left months ago to find help. The kids have 2D6 rations of domestic food and one shotgun with one reload. They are suspicious but can be appeased with a PERSUASION roll. If the PCs leave, a band of PCx2 marauders, armed with AKMs, approach the farm. They will attack the kids unless stopped.");
EncounterCard.Hearts8 = new EncounterCard('Good Company', '8', 'Hearts', ['Woods'], "A group of local hunters by a campfire. They are cooking a fresh kill (D6 rations of food) and are in a good mood. The hunters are on their guard, but can be assuaged with a PERSUASION roll. Some have dysentery.");
EncounterCard.Hearts9 = new EncounterCard('Join Us Or Die', '9', 'Hearts', ['Open', 'Road'], "Marauders with AKMs and a pickup truck (half tank) with a pintlemounted DShK-38 HMG (one reload) at a roadblock. They are not overtly hostile. Instead, they ask questions about the PCs’ gear, and then offer the PCs to join their group. If they decline, the marauders will threaten them, and might even attack them rather than let them leave.");
EncounterCard.Hearts10 = new EncounterCard('The Ambush', '10', 'Hearts', ['Open', 'Road', 'Woods'], "A column of black smoke rises ahead. If the PCs investigate, they find a recent ambush. US stragglers have been badly hit by marauders. Most of the soldiers are dead, but some are still alive, dying and pleading for help. They are all starving and hypothermic and have no gear.");
EncounterCard.HeartsJ = new EncounterCard('The Carnage', 'J', 'Hearts', ['Open', 'Road'], "An explosion is heard, and the PCs see a Soviet UAZ-469 jeep hit by a roadside bomb. It’s burning and inoperable but can be repaired. Dying Soviet soldiers lie on the road. After a stretch, the marauders who planted the bomb arrive (PCx2 in number, armed with AKMs).");
EncounterCard.HeartsQ = new EncounterCard('Death From Above', 'Q', 'Hearts', ['Open', 'Road'], "A Soviet army camp with PCx6 soldiers, a T-72 tank, four army tents, and trenches. If the PCs are spotted, the Soviets attack. Soon, the PCs hear a roar from a jet plane. It launches a missile at the Soviet camp, damaging the T-72 beyond repair. Only PCx1 Soviet soldiers remain. If the PCs make a RECON roll, they can recognize the plane as an A-10 Thunderbolt II. It is part of Operation Reset and the pilot can confirm this if contacted.");
EncounterCard.HeartsK = new EncounterCard('Prisoner Blues', 'K', 'Hearts', ['Open', 'Road'], "Three dozen prisoners are being herded along the road by Soviet soldiers. The prisoners are local civilians. If the PCs approach the Soviets will be on their guard and might attack. The prisoners are exhausted but can help the PCs and will be very grateful if set free. One or more of them is a CIA agent in hiding. Several of the prisoners have pneumonia.");
EncounterCard.HeartsA = new EncounterCard('The Magnificent Few', 'A', 'Hearts', ['Open', 'Road', 'Woods'], "A small village of 2D6 houses. The PCs are stopped by guards firing warning shots. If the PCs convince them that they come in peace (PERSUASION roll), the villagers will beg them for help against a local band of marauders. Later PCx2 marauders appear, armed with AKMs. They are careful and can be reasoned with, but their goal is to plunder the village.");
EncounterCard.Spades2 = new EncounterCard('Rain of Ash', '2', 'Spades', ['Open', 'Road', 'Woods'], "Suddenly, the air is filled with gray flakes of ash. This rain of ashes reduces combat visibility to 5 hexes during this shift and gives a -1 modifier to all ranged attacks. It also gives a -2 modifier to the DRIVING roll for traveling, and inflicts 1 rad.");
EncounterCard.Spades3 = new EncounterCard("Bear's Den", '3', 'Spades', ['Woods'], "The PCs stumble into the territory of a very hungry bear that has turned to attacking humans. If the PCs are on foot, it will attack them for food. It’s heavily irradiated, so any attack from it that causes damage will also inflict 1 rad on the victim. Eating the bear’s meat will also give 1 rad per ration.");
EncounterCard.Spades4 = new EncounterCard('The Battlefield', '4', 'Spades', ['Open', 'Road', 'Woods'], "An area where a big tank battle has taken place months ago. There is much unexploded ordnance in the area, and scrounging here requires a RECON roll – failure triggers a blast power C explosion. Most vehicles are damaged beyond repair, but with a successful TECH roll the PCs find a T-72 that is inoperable but can be repaired.");
EncounterCard.Spades5 = new EncounterCard('Armageddon', '5', 'Spades', ['Open', 'Road'], "A huge crater from a nuclear strike, 6D6x10 meters wide and one fifth as deep, with a lake of greenish water at the bottom. An area twice as wide as the crater is radioactive (1 rad/ stretch). Dozens of armored vehicles here are destroyed beyond repair, but D6 can be scavenged for parts. To pass, a vehicle needs to go off-road and lose one hex of movement this shift.");
EncounterCard.Spades6 = new EncounterCard('Watch Your Step', '6', 'Spades', ['Open', 'Road'], "An old industrial area with low buildings, overgrown and riddled with bullets. An area of 5x10 hexes is mined (page 68 of the Player’s Manual). If the PCs back out, they will need to find another way forward. If they are on foot or in an off-road vehicle, they can keep moving, but must choose another hex side on the travel map to exit the hex from.");
EncounterCard.Spades7 = new EncounterCard('The Old Wanderer', '7', 'Spades', ['Open', 'Road', 'Woods'], "The PCs come across a lone wanderer, a wizened old man who lost his family in a marauder attack months ago. Now, he’s a husk of a man, starving and suffers from typhoid fever and amnesia (stats as refugee). Still, there are grains of useful information about the area in his cryptic rants.");
EncounterCard.Spades8 = new EncounterCard('A Pound of Flesh', '8', 'Spades', ['Open', 'Road', 'Woods'], "Hunters gathered around a campfire, eating freshly cooked meat. They don’t want to share, and are eager to make the PCs move along. With a RECON roll, the PCs spot a bloody shoe or piece of clothing. These hunters have turned to cannibalism and will get very aggressive if found out.");
EncounterCard.Spades9 = new EncounterCard('Death From Below', '9', 'Spades', ['Open', 'Road'], "A roadside bomb is buried beneath the roadway. In a vehicle, a RECON roll at -2 is needed to avoid a blast power B shaped charge. If the bomb is detonated, marauders come driving (pickup truck with half tank and a DShK- 38 HMG with one reload) after a stretch. They have AKMs with one reload each.");
EncounterCard.Spades10 = new EncounterCard("That's An Order", '10', 'Spades', ['Open', 'Road', 'Woods'], "A band of stragglers from the US forces in the area. They are starving. One of them is an officer of higher rank than any of the PCs, and will use this fact to order the PCs to do what he wants, which is for them to become part of his unit. If denied, he will get very agitated and might even turn violent.");
EncounterCard.SpadesJ = new EncounterCard('Hammer of God', 'J', 'Spades', ['Open', 'Road', 'Woods'], "A Soviet recon unit ambushes the PCs. One has an SVD sniper rifle with one reload. The Soviets get a +3 bonus to the opposed RECON roll for the ambush. As soon as the Soviets spot the PCs, they call in artillery fire from a 152 mm howitzer located 300 hexes away, with 2D6 HE rounds.");
EncounterCard.SpadesQ = new EncounterCard('The Kill Zone', 'Q', 'Spades', ['Open', 'Road'], "Soviet forces have set up an ambush in order to capture or kill the PCs. They have spent a stretch setting it up (+2 modifier). A sniper with an SVD sniper rifle (one reload) attacks first to draw the characters out. The sniper will try to pick off one PC at a time. The unit has D6 field rations.");
EncounterCard.SpadesK = new EncounterCard('Prisoners of War', 'K', 'Spades', ['Open', 'Road'], "A Soviet convoy led by a T-72 tank (half tank, three HEAT rounds, one reload for the HMG). It’s followed by a GAZ-66 truck (half tank) that carries a dozen US prisoners of war in pretty bad shape. The Soviets will attack the PCs if they are spotted. The POWs are starving and sleep deprived, and will be very grateful if set free. Several of the prisoners are sick from typhoid fever. They have no gear.");
EncounterCard.SpadesA = new EncounterCard('The Mad King', 'A', 'Spades', ['Open', 'Road', 'Woods'], "A village of 3D6 houses, surrounded by barbed wire. It is defended by locals led by a power-mad leader. He offers the PCs to become part of his private army. If they refuse, he orders them to leave half of their gear. The leader has STR B, AGL C, INT B, EMP A, COMMAND B, and carries an Uzi with two reloads. The guards have hunting rifles with one reload each, and one RPG-16 (one reload).");


module.exports = {EncounterCard};