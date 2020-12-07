const F = require("func");
function newItem(name, color, hardness, cost, flammability, radioactivity, explosiveness){
    const item = extendContent(Item, name, {});
	item.color = Color.valueOf(color);
	item.hardness = hardness;
	item.cost = cost;
	item.flammability = flammability;
	item.radioactivity = radioactivity;
	item.explosiveness = explosiveness;
	return item;
}

const emerald = newItem("emerald", "#21FF00", 1.0, 0.5, 0.0, 0.0, 0.0);
const diamond = newItem("diamond", "#EFFFFF", 1.0, 0.5, 0.0, 0.0, 0.0);
const ruby = newItem("ruby", "#FF3B4A", 1.0, 0.5, 0.3, 0.0, 0.0);
const amethyst = newItem("amethyst", "#CD00FF", 1.0, 0.5, 0.0, 0.0, 0.0);
const sapphire = newItem("sapphire", "#008BFF", 1.0, 0.5, 0.0, 0.0, 0.0);
const topaz = newItem("topaz", "#FFE200", 1.0, 0.5, 0.0, 0.0, 0.0); 

const contritum = newItem("contritum", "#7CCEFF", 14.6, 4.3, 0.0, 0.0, 0.0);
const orbon = newItem("orbon", "#C09142", 10.3, 5.8, 0.0, 0.0, 0.0);
const cutol = newItem("cutol", "#2C89C7", 8.4, 2.1, 0.0, 0.0, 0.0);

const lux = newItem("lux", "#78FFB2", 5.4, 1.0, 0.0, 0.0, 0.0);
const laculis = newItem("laculis", "#5BFCFF", 1.6, 1.2, 0.0, 5.7, 0.0);
const palladium = newItem("palladium", "#FEFFB1", 6.0, 1.5, 0.0, 0.0, 0.0);
const meteorite = newItem("meteorite", "#E85400", 7.0, 1.8, 2.35, 0.0, 0.0);

F.techNode(Blocks.coreShard, topaz, ItemStack.with(Items.copper, 4000));
F.techNode(topaz, sapphire, ItemStack.with(Items.copper, 4000));
F.techNode(sapphire, ruby, ItemStack.with(Items.copper, 4000));
F.techNode(ruby, amethyst, ItemStack.with(Items.copper, 4000));
F.techNode(amethyst, diamond, ItemStack.with(Items.copper, 4000));
F.techNode(diamond, emerald, ItemStack.with(Items.copper, 4000));

F.techNode(Blocks.blastMixer, lux, ItemStack.with(diamond, 25000, ruby, 25000, emerald, 25000, amethyst, 25000, topaz, 25000, sapphire, 25000));
F.techNode(lux, laculis, ItemStack.with(Items.silicon, 35000, Items.thorium, 18500, Items.titanium, 27000));
F.techNode(Blocks.blastDrill, palladium, ItemStack.with(Items.surgeAlloy, 22000, Items.lead, 145000, Items.phaseFabric, 12000, Items.titanium, 48000));
F.techNode(palladium, meteorite, ItemStack.with(palladium, 5000, Items.thorium, 45000, Items.copper, 70000, Items.lead, 70000));

F.techNode(Blocks.surgeSmelter, cutol, ItemStack.with(Items.surgeAlloy, 25000, Items.plastanium, 25000, Items.graphite, 40000));
F.techNode(cutol, orbon, ItemStack.with(diamond, 25000, ruby, 25000, emerald, 25000, amethyst, 25000, topaz, 25000, sapphire, 25000));
F.techNode(orbon, contritum, ItemStack.with(Items.lead, 80000, Items.silicon, 30000, laculis, 8000, palladium, 25000, meteorite, 25000, cutol, 10000, orbon, 7000));
