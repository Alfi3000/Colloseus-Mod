const F = require("func");
const Safe = extendContent(StorageBlock, "safe", {
    icons(){
	    return [
	        F.tex("safe-iicon")
	    ] 
	}
});
Safe.buildVisibility = BuildVisibility.shown;
Safe.size = 4;
Safe.health = 2350;
Safe.category = Category.effect;
Safe.flags = EnumSet.of(BlockFlag.storage);
Safe.itemCapacity = 3500;
Safe.requirements = ItemStack.with(Items.plastanium, 250, Items.titanium, 500, Items.surgeAlloy, 150)

F.techNode(Blocks.vault, Safe, ItemStack.with(Items.plastanium, 10000, Items.titanium, 25000, Items.surgeAlloy, 7500));

/////////
/*.  
const Warehouse = extendContent(StorageBlock, "warehouse", {
    generateIcons: function(){
	    return [
	        F.tex("warehouse-iicon")
	    ] 
	}
}); 
Warehouse.buildVisibility = BuildVisibility.shown; 
Warehouse.size = 5;
Warehouse.health = 4650;
Warehouse.category = Category.effect;
Warehouse.flags = EnumSet.of(BlockFlag.storage); 
Warehouse.itemCapacity = 10000; 
Warehouse.requirements = ItemStack.with(F.fi("cutol"), 300, Items.titanium, 600, Items.surgeAlloy, 250, Items.phaseFabric, 400);

F.techNode(Safe, Warehouse, ItemStack.with(F.fi("cutol"), 35000, Items.titanium, 75000, Items.surgeAlloy, 30000, Items.phaseFabric, 45000));
*/