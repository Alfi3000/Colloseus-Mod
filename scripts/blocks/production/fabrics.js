const F = require("func");
const C = this.global.COLORS;
const E = this.global.EFFECTS;
const SO = this.global.SOUNDS;

const CutolCrafter = extendContent(GenericSmelter, "cutol-crafter", {});
CutolCrafter.hasPower = true;
CutolCrafter.hasItems = true;
CutolCrafter.health = 800;
CutolCrafter.size = 3;
CutolCrafter.craftTime = 60;
CutolCrafter.consumes.power(7.5);
CutolCrafter.craftEffect = E.cutolCraft;
CutolCrafter.consumes.items(new ItemStack(Items.graphite, 4), new ItemStack(Items.surgeAlloy, 1), new ItemStack(Items.plastanium, 2));
CutolCrafter.requirements = ItemStack.with(Items.surgeAlloy, 100, Items.thorium, 80, Items.silicon, 120, Items.lead, 90);
CutolCrafter.outputItem = new ItemStack(F.fi("cutol"), 1);
CutolCrafter.ambientSound = Sounds.respawn;
CutolCrafter.ambientSoundVolume = 0.4;
CutolCrafter.itemCapacity = 10;
CutolCrafter.category = Category.crafting;
CutolCrafter.buildVisibility = BuildVisibility.shown;

const LargePhaseWeaver = extendContent(GenericSmelter, "large-phase-weaver", {});
LargePhaseWeaver.buildVisibility = BuildVisibility.shown;
LargePhaseWeaver.hasPower = true;
LargePhaseWeaver.hasLiquids = true;
LargePhaseWeaver.hasItems = true;
LargePhaseWeaver.health = 300;
LargePhaseWeaver.size = 3;
LargePhaseWeaver.craftTime = 300;
LargePhaseWeaver.consumes.power(12.5);
LargePhaseWeaver.consumes.liquid(Liquids.cryofluid, 3.0/60.0);
LargePhaseWeaver.consumes.items(new ItemStack(Items.thorium, 7), new ItemStack(Items.sand, 12));
LargePhaseWeaver.requirements = ItemStack.with(Items.phaseFabric, 120, Items.titanium, 150, Items.silicon, 90, Items.surgeAlloy, 75);
LargePhaseWeaver.outputItem = new ItemStack(Items.phaseFabric, 6);
LargePhaseWeaver.ambientSound = Sounds.respawning;
LargePhaseWeaver.ambientSoundVolume = 0.05;
LargePhaseWeaver.itemCapacity = 30;
LargePhaseWeaver.liquidCapacity = 35;
LargePhaseWeaver.category = Category.crafting;

const Diluent = extendContent(GenericSmelter, "diluent", {});
Diluent.buildVisibility = BuildVisibility.shown;
Diluent.hasPower = true;
Diluent.hasItems = true;
Diluent.hasLiquids = true;
Diluent.health = 425;
Diluent.size = 3;
Diluent.craftTime = 60;
Diluent.updateEffect = Fx.smeltsmoke;
Diluent.consumes.power(15);
Diluent.consumes.liquid(Liquids.water, 0.175);
Diluent.consumes.items(new ItemStack(F.fi("palladium"), 1), new ItemStack(Items.copper, 4));
Diluent.requirements = ItemStack.with(F.fi("palladium"), 75, Items.thorium, 90, Items.silicon, 60);
Diluent.outputLiquid = new LiquidStack(F.fl("helium-liquid"), 15);
Diluent.buildCostMultiplier = 0.3;
Diluent.itemCapacity = 10;
Diluent.liquidCapacity = 60;
Diluent.category = Category.crafting;

const EnergySealer = extendContent(GenericCrafter, "energy-sealer", {
	draw(){
		this.super$draw();

	    Tmp.c1.set(C.crystalizerDecal).lerp(C.crystalizerDecalLight, Mathf.sin(Time.time()*0.1)*0.5+0.5);
		
		Draw.mixcol(Tmp.c1, 1);
		Draw.rect(Core.atlas.find("collos-energy-sealer-anim"), this.x, this.y);
		Draw.mixcol();
	}
});
EnergySealer.buildVisibility = BuildVisibility.shown;
EnergySealer.hasPower = true;
EnergySealer.hasItems = true;
EnergySealer.health = 740;
EnergySealer.size = 4;
EnergySealer.craftTime = 45;
EnergySealer.craftEffect = E.energyBlastTiny;
EnergySealer.consumes.power(250);
EnergySealer.consumes.items(new ItemStack(F.fi("palladium"), 1), new ItemStack(Items.titanium, 2), new ItemStack(Items.thorium, 2));
EnergySealer.outputItem = new ItemStack(F.fi("laculis"), 1);
EnergySealer.buildCostMultiplier = 0.7;
EnergySealer.itemCapacity = 10;
EnergySealer.category = Category.crafting;
EnergySealer.requirements = ItemStack.with(F.fi("palladium"), 100, Items.titanium, 120, Items.silicon, 75, Items.surgeAlloy, 80, Items.plastanium, 50);

const Crystalizer = extendContent(GenericCrafter, "crystalizer", {});
const Glow = DrawGlow();
Glow.glowAmount = 1.0;
Glow.glowScale = 2.0;

Crystalizer.drawer = Glow;
Crystalizer.buildVisibility = BuildVisibility.shown;
Crystalizer.hasPower = true;
Crystalizer.hasItems = true;
Crystalizer.health = 1260;
Crystalizer.size = 5;
Crystalizer.craftTime = 75;
Crystalizer.craftEffect = E.luxCraft;
Crystalizer.consumes.power(20);
Crystalizer.consumes.items(new ItemStack(F.fi("ruby"), 1), new ItemStack(F.fi("sapphire"), 1), new ItemStack(F.fi("amethyst"), 1), new ItemStack(F.fi("emerald"), 1), new ItemStack(F.fi("diamond"), 1), new ItemStack(F.fi("topaz"), 1));
Crystalizer.requirements = ItemStack.with(F.fi("ruby"), 130, F.fi("diamond"), 85, Items.graphite, 125, Items.surgeAlloy, 75, Items.plastanium, 60);
Crystalizer.outputItem = new ItemStack(F.fi("lux"), 1);
Crystalizer.ambientSound = SO.pulse;
Crystalizer.ambientSoundVolume = 0.2;
Crystalizer.buildCostMultiplier = 0.7;
Crystalizer.itemCapacity = 5;
Crystalizer.category = Category.crafting;

const OrbonCrafter = extendContent(GenericSmelter, "orbon-crafter", {});
OrbonCrafter.hasPower = true;
OrbonCrafter.hasItems = true;
OrbonCrafter.health = 450;
OrbonCrafter.size = 3;
OrbonCrafter.craftTime = 70;
OrbonCrafter.updateEffect = E.orbonCraft;
OrbonCrafter.consumes.power(11.5);
OrbonCrafter.craftEffect = E.orbonCraft;
OrbonCrafter.consumes.items(new ItemStack(Items.silicon, 3), new ItemStack(Items.phaseFabric, 2), new ItemStack(F.fi("palladium"), 4));
OrbonCrafter.requirements = ItemStack.with(Items.surgeAlloy, 200, Items.silicon, 150, Items.lead, 240, F.fi("cutol"), 75, F.fi("lux"), 100);
OrbonCrafter.outputItem = new ItemStack(F.fi("orbon"), 1);
OrbonCrafter.itemCapacity = 10;
OrbonCrafter.category = Category.crafting;
OrbonCrafter.buildVisibility = BuildVisibility.shown;

const ContritumCrafter = extendContent(GenericSmelter, "contritum-crafter", {});
const contritumPower = 2000.0/60.0;
const contritumLiquid = 5.0/60.0;
ContritumCrafter.hasPower = true;
ContritumCrafter.hasItems = true;
ContritumCrafter.health = 2350;
ContritumCrafter.size = 4;
ContritumCrafter.craftTime = 90;
ContritumCrafter.updateEffect = E.contritumCraft;
ContritumCrafter.consumes.power(contritumPower);
ContritumCrafter.craftEffect = E.contritumCraft;
ContritumCrafter.consumes.liquid(F.fl("helium-liquid"), contritumLiquid);
ContritumCrafter.consumes.items(new ItemStack(F.fi("meteorite"), 3), new ItemStack(F.fi("cutol"), 1), new ItemStack(F.fi("laculis"), 1));
ContritumCrafter.requirements = ItemStack.with(Items.silicon, 300, Items.lead, 280, F.fi("orbon"), 250, F.fi("meteorite"), 200);
ContritumCrafter.outputItem = new ItemStack(F.fi("contritum"), 1);
ContritumCrafter.itemCapacity = 10;
ContritumCrafter.category = Category.crafting;
ContritumCrafter.buildVisibility = BuildVisibility.shown;

F.techNode(F.fi("orbon"), OrbonCrafter, ItemStack.with(Items.surgeAlloy, 12000, Items.phaseFabric, 8500, Items.silicon, 15000, Items.thorium, 11000, F.fi("cutol"), 8000, F.fi("lux"), 10000));
F.techNode(F.fi("contritum"), ContritumCrafter, ItemStack.with(F.fi("orbon"), 5000, F.fi("meteorite"), 6000, F.fi("laculis"), 6000, Items.thorium, 11000, F.fi("cutol"), 13000, Items.silicon, 9000));
F.techNode(F.fi("cutol"), CutolCrafter, ItemStack.with(Items.surgeAlloy, 10000, Items.thorium, 5000, Items.silicon, 15000, Items.lead, 7500));
F.techNode(Blocks.phaseWeaver, LargePhaseWeaver, ItemStack.with(Items.phaseFabric, 4000, Items.titanium, 7500, Items.silicon, 8500, Items.surgeAlloy, 5500));
F.techNode(F.fi("lux"), Crystalizer, ItemStack.with(F.fi("ruby"), 20000, F.fi("diamond"), 20000, Items.graphite, 32000, Items.surgeAlloy, 12000, Items.plastanium, 13500));
F.techNode(F.fi("laculis"), EnergySealer, ItemStack.with(F.fi("palladium"), 15000, Items.titanium, 18000, Items.silicon, 22000, Items.surgeAlloy, 7500, Items.plastanium, 13500));
F.techNode(F.fl("helium-liquid"), Diluent, ItemStack.with(F.fi("palladium"), 7500, Items.thorium, 9000, Items.silicon, 14500));
