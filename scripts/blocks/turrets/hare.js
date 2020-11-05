const B = this.global.BULLETS;
const F = require("functions/f");

const Hare = extendContent(ItemTurret, "hare", {
	load(){
	    this.super$load();

	    this.baseRegion = Core.atlas.find("colloseusmod-block-6");
    }, 
	
	generateIcons: function(){
		return [
			Core.atlas.find("colloseusmod-block-" + this.size),
			Core.atlas.find(this.name)
		];
    }
});

Hare.size = 6;
Hare.health = 15400;
Hare.reload = 45;
Hare.range = 320;
Hare.inaccuracy = 0;
Hare.velocityInaccuracy = 0.2;
Hare.velocityRnd = 0.2;
Hare.recoil = 5;
Hare.rotatespeed = 1.6;
Hare.shootSound = Sounds.missile;
Hare.ammo(Items.surgealloy, B.hareSurge, F.fi("lux"), B.hareLux);
Hare.requirements(Category.turret, ItemStack.with(F.fi("amethyst"), 610, F.fi("palladium"), 400, Items.silicon, 525, Items.surgealloy, 360, Items.phasefabric, 165, F.fi("thorium-plate"), 285));

TechTree.create(F.fb("recoursi"), Hare);
