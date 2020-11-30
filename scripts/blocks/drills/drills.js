const F = require("func");
const E = this.global.EFFECTS;
const C = this.global.COLORS;

const ElectroDrill = extendContent(Drill, "electro-drill", {});
ElectroDrill.buildVisibility = BuildVisibility.shown;
ElectroDrill.size = 5;
ElectroDrill.health = 1350;
ElectroDrill.tier = 8;
ElectroDrill.drillTime = 200;
ElectroDrill.rotateSpeed = 8;
ElectroDrill.drawRim = true;
ElectroDrill.updateEffect = Fx.pulverizeRed;
ElectroDrill.updateEffectChance = 0.03;
ElectroDrill.liquidBoostIntensity = 1.2;
ElectroDrill.warmupSpeed = 0.005;
ElectroDrill.consumes.power(10.0);
ElectroDrill.consumes.liquid(Liquids.water, 0.25);
ElectroDrill.category = Category.production;
ElectroDrill.buildCostMultiplier = 0.5;
ElectroDrill.heatColor = F.fi("topaz").color.cpy().mul(0.9);
ElectroDrill.requirements = ItemStack.with(Items.phaseFabric, 200, Items.surgeAlloy, 250, Items.graphite, 100, Items.silicon, 150, F.fi("cutol"), 125);

////////////////////

const CrystalDrill = extendContent(Drill, "crystal-drill", {});
CrystalDrill.buildVisibility = BuildVisibility.shown;
CrystalDrill.size = 6;
CrystalDrill.health = 2385;
CrystalDrill.tier = 10;
CrystalDrill.drillTime = 110;
CrystalDrill.rotateSpeed = 11;
CrystalDrill.drawRim = true;
CrystalDrill.updateEffect = Fx.pulverizeRed;
CrystalDrill.updateEffectChance = 0.05;
CrystalDrill.liquidBoostIntensity = 1.0;
CrystalDrill.warmupSpeed = 0.005;
CrystalDrill.consumes.power(35.0);
CrystalDrill.consumes.liquid(F.fl("helium-liquid"), 0.33333);
CrystalDrill.category = Category.production;
CrystalDrill.buildCostMultiplier = 0.5;
CrystalDrill.heatColor = F.fi("sapphire").color.cpy().mul(0.9);
CrystalDrill.requirements = ItemStack.with(F.fi("lux"), 400, F.fi("ruby"), 240, F.fi("amethyst"), 450, Items.silicon, 360, F.fi("orbon"), 200, Items.thorium, 280);

F.techNode(Blocks.oilExtractor, ElectroDrill, ItemStack.with(Items.phaseFabric, 10000, Items.surgeAlloy, 12000, Items.graphite, 8000, Items.silicon, 15000, F.fi("cutol"), 7500));
F.techNode(ElectroDrill, CrystalDrill, ItemStack.with(F.fi("lux"), 11000, F.fi("ruby"), 18000, F.fi("amethyst"), 30000, Items.silicon, 22000, F.fi("orbon"), 14000, Items.thorium, 26500));
