const F = require("func");
const Safe = extendContent(StorageBlock, "safe", {
    icons(){
	    return [
	        F.tex("safe"), 
	        F.tex("safe-team") 
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