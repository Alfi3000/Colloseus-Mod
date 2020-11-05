const B = this.global.BULLETS;
const F = require("functions/f");

const Rapier = extendContent(ItemTurret, "rapier", {});
Rapier.size = 4;
Rapier.health = 5250;
Rapier.reload = 60;
Rapier.range = 160;
Rapier.inaccuracy = 0;
Rapier.recoil = 3.5;
Rapier.shootSound = Sounds.shotgun;
Rapier.alternate = true;
Rapier.ammo(Items.plastanium, B.rapierPlast, F.fi("diamond"), B.rapierDiamond);
Rapier.requirements(Category.turret, ItemStack.with(F.fi("diamond"), 380, Items.surgealloy, 350, Items.silicon, 285, Items.phasefabric, 240, F.fi("titanium-plate"), 425));

const Spike = extendContent(DoubleTurret, "spike", {
	load(){
	    this.super$load();

	    this.baseRegion = Core.atlas.find("colloseusmod-block-" + this.size);
    }, 
	
	generateIcons: function(){
		return [
			Core.atlas.find("colloseusmod-block-" + this.size),
			Core.atlas.find(this.name)
		];
    }
});
Spike.size = 6;
Spike.health = 13270;
Spike.reload = 45;
Spike.range = 240;
Spike.inaccuracy = 0;
Spike.recoil = 4.0;
Spike.spacing = 16;
Spike.shootSound = Sounds.shotgun;
Spike.alternate = true;
Spike.buildCostMultiplier = 0.5;
Spike.ammo(Items.plastanium, B.spikePlast, Items.surgealloy, B.spikeSurge, F.fi("diamond"), B.spikeDiamond, F.fi("lux"), B.spikeLux, F.fi("palladium-plate"), B.spikePallPlate);
Spike.requirements(Category.turret, ItemStack.with(F.fi("diamond"), 635, Items.surgealloy, 570, Items.silicon, 460, F.fi("palladium-plate"), 440, Items.thorium, 350, F.fi("thorium-plate"), 380));

TechTree.create(Blocks.duo, Rapier);
TechTree.create(Rapier, Spike);
