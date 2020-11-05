const F = require("func");

const power1 = 4500.0/60.0;
const power2 = 15000.0/60.0;
const power3 = 62500.0/60.0;

const PentativeReconstructor = extendContent(Reconstructor, "pentative-reconstructor", {});
PentativeReconstructor.buildVisibility = BuildVisibility.shown;
PentativeReconstructor.size = 11;
PentativeReconstructor.upgrades.addAll();
PentativeReconstructor.consumes.liquid(F.fl("helium-liquid"), 1.0);
PentativeReconstructor.consumes.power(power1);
PentativeReconstructor.consumes.items(ItemStack.with(Items.silicon, 2200, Items.phaseFabric, 950, F.fi("cutol"), 650, Items.surgeAlloy, 875)); 
PentativeReconstructor.category = Category.units;
PentativeReconstructor.requirements = ItemStack.with(Items.silicon, 5000, Items.phaseFabric, 2500, Items.lead, 8500, Items.thorium, 6000, F.fi("thorium-plate"), 3000, F.fi("titanium-plate"), 3000, Items.surgeAlloy, 4750, F.fi("copper-plate"), 4750, F.fi("lead-plate"), 3000);
PentativeReconstructor.constructTime = 60.0 * 60.0 * 10.0;
PentativeReconstructor.liquidCapacity = 300.0;

const HextativeReconstructor = extendContent(Reconstructor, "hextative-reconstructor", {});
HextativeReconstructor.buildVisibility = BuildVisibility.shown;
HextativeReconstructor.size = 13;
HextativeReconstructor.upgrades.addAll();
HextativeReconstructor.consumes.liquid(F.fl("helium-liquid"), 2.5);
HextativeReconstructor.consumes.power(power2);
HextativeReconstructor.consumes.items(ItemStack.with(Items.silicon, 3500, Items.phaseFabric, 2200, F.fi("palladium"), 5000, F.fi("cutol"), 5400));
HextativeReconstructor.category = Category.units;
HextativeReconstructor.requirements = ItemStack.with(Items.silicon, 5000, Items.phaseFabric, 4750, Items.lead, 8500, Items.thorium, 6000, F.fi("cutol"), 9000, F.fi("palladium"), 3000, Items.surgeAlloy, 5250);
HextativeReconstructor.constructTime = 60.0 * 60.0 * 25.0;
HextativeReconstructor.liquidCapacity = 1000.0;

const ProjectionReconstructor = extendContent(Reconstructor, "melioration-reconstructor", {});
ProjectionReconstructor.buildVisibility = BuildVisibility.shown;
ProjectionReconstructor.size = 13;
ProjectionReconstructor.upgrades.addAll();
ProjectionReconstructor.consumes.liquid(F.fl("helium-liquid"), 6.0);
ProjectionReconstructor.consumes.power(power3);
ProjectionReconstructor.consumes.items(ItemStack.with(Items.silicon, 13500, F.fi("cutol"), 3000, F.fi("meteorite"), 7500, F.fi("lux"), 8500));
ProjectionReconstructor.category = Category.units;
ProjectionReconstructor.requirements = ItemStack.with(F.fi("amethyst"), 9000, Items.silicon, 13500, Items.phaseFabric, 7500, Items.lead, 12000, Items.thorium, 8000, Items.surgeAlloy, 6500, F.fi("meteorite"), 7500);
ProjectionReconstructor.constructTime = 60.0 * 60.0 * 60.0;
ProjectionReconstructor.liquidCapacity = 2750.0;

F.techNode(Blocks.tetrativeReconstructor, PentativeReconstructor, ItemStack.with(Items.silicon, 140000, Items.phaseFabric, 65000, Items.lead, 240000, Items.thorium, 110000, F.fi("thorium-plate"), 40000, F.fi("titanium-plate"), 40000, Items.surgeAlloy, 55000, F.fi("copper-plate"), 45000, F.fi("lead-plate"), 45000));
F.techNode(PentativeReconstructor, HextativeReconstructor, ItemStack.with(Items.silicon, 140000, Items.phaseFabric, 65000, Items.lead, 240000, Items.thorium, 110000, F.fi("thorium-plate"), 40000, F.fi("titanium-plate"), 40000, Items.surgeAlloy, 55000, F.fi("copper-plate"), 45000, F.fi("lead-plate"), 45000));
F.techNode(HextativeReconstructor, ProjectionReconstructor, ItemStack.with(Items.silicon, 140000, Items.phaseFabric, 65000, Items.lead, 240000, Items.thorium, 110000, F.fi("thorium-plate"), 40000, F.fi("titanium-plate"), 40000, Items.surgeAlloy, 55000, F.fi("copper-plate"), 45000, F.fi("lead-plate"), 45000));
