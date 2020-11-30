const F = require("func");
function newConveyor(name, speed, health, itemStack){
    const conveyor = extendContent(Conveyor, name, {});
	conveyor.size = 1;
	conveyor.speed = speed;
	conveyor.health = health;
	conveyor.category = Category.distribution;
	conveyor.requirements = itemStack;
    conveyor.buildVisibility = BuildVisibility.shown;
	
	return conveyor; 
}

function newJunct(name, speed, capacity, health, buildCostMultiplier, itemStack){
    const junction = extendContent(Junction, name, {});
	junction.size = 1;
	junction.speed = speed;
	junction.capacity = capacity;
	junction.health = health;
	junction.buildCostMultiplier = buildCostMultiplier;
	junction.category = Category.distribution;
	junction.requirements = itemStack;
    junction.buildVisibility = BuildVisibility.shown;
	
	return junction; 
}

function newRouter(name, speed, health, buildCostMultiplier, itemStack){
    const router = extendContent(Router, name, {});
	router.size = 1;
	router.speed = speed;
	router.health = health;
	router.buildCostMultiplier = buildCostMultiplier;
	router.category = Category.distribution;
	router.requirements = itemStack;
    router.buildVisibility = BuildVisibility.shown;
	
	return router; 
}

const surgeConveyor = newConveyor("surge-conveyor", 0.15, 275, ItemStack.with(Items.surgeAlloy, 1));
const laculisConveyor = newConveyor("laculis-conveyor", 0.22, 625, ItemStack.with(Items.phaseFabric, 1, F.fi("laculis"), 1));

const titaniumRouter = newRouter("titanium-router", 2.6, 70.0, 2.5, ItemStack.with(Items.titanium, 3));
const armoredRouter = newRouter("armored-router", 2.6, 160.0, 5.0, ItemStack.with(Items.metaglass, 3, Items.thorium, 3, Items.plastanium, 3));
const surgeRouter = newRouter("surge-router", 10.0, 350.0, 7.0, ItemStack.with(Items.surgeAlloy, 3));

const titaniumJunction = newJunct("titanium-junction", 9.5, 16, 70.0, 5.0, ItemStack.with(Items.titanium, 3));
const armoredJunction = newJunct("armored-junction", 9.5, 16, 160.0, 5.0, ItemStack.with(Items.metaglass, 3, Items.thorium, 3, Items.plastanium, 3));
const surgeJunction = newJunct("surge-junction", 18.0, 30, 350.0, 7.0, ItemStack.with(Items.surgeAlloy, 3));

F.techNode(Blocks.router, titaniumRouter, ItemStack.with(Items.titanium, 100));
F.techNode(titaniumRouter, armoredRouter, ItemStack.with(Items.metaglass, 100, Items.thorium, 100, Items.plastanium, 100));
F.techNode(armoredRouter, surgeRouter, ItemStack.with(Items.surgeAlloy, 100));
 
F.techNode(Blocks.junction, titaniumJunction, ItemStack.with(Items.titanium, 100));
F.techNode(titaniumJunction, armoredJunction, ItemStack.with(Items.metaglass, 100, Items.thorium, 100, Items.plastanium, 100));
F.techNode(armoredJunction, surgeJunction, ItemStack.with(Items.surgeAlloy, 100));

F.techNode(Blocks.armoredConveyor, surgeConveyor, ItemStack.with(Items.surgeAlloy, 50));
F.techNode(surgeConveyor, laculisConveyor, ItemStack.with(Items.phaseFabric, 50, F.fi("laculis"), 50));
 