const F = require("func");
function newLiquid(name, color, heatCapacity, temperature, flammability, viscosity, explosiveness){
    const liquid = extendContent(Liquid, name, {});
	liquid.color = Color.valueOf(color);
	liquid.heatCapacity = heatCapacity;
	liquid.temperature = temperature;
	liquid.flammability = flammability;
	liquid.viscosity = viscosity;
	liquid.explosiveness = explosiveness;
	return liquid;
}

const heliumLiquid = newLiquid("helium-liquid", "#9E9E9E", 2.0, 0.0, 0, 0.9, 0);
const lavaLiquid = newLiquid("lava-liquid", "#FF6700", 1.0, 2.5, 4.5, 0.95, 3.5);

F.techNode(Blocks.cryofluidMixer, heliumLiquid, ItemStack.with(F.fi("diamond"), 30000, F.fi("palladium"), 8000, Items.metaglass, 18000));
F.techNode(Liquids.slag, lavaLiquid, ItemStack.with(Items.metaglass, 145000, Items.scrap, 180000, Items.lead, 300000));
