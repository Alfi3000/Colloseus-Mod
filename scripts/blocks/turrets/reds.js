const B = this.global.BULLETS;
const F = require("functions/f");

const Fox = extendContent(ItemTurret, "firefox", {});

Fox.size = 2;
Fox.health = 1850;
Fox.reload = 6;
Fox.range = 100;
Fox.inaccuracy = 10;
Fox.recoil = 2.5;
Fox.rotatespeed = 3.5;
Fox.shootSound = Sounds.flame;
Fox.ammo(Items.coal, B.foxCoal, F.fi("ruby"), B.foxRuby, Items.pyratite, B.foxPyratite);
Fox.requirements(Category.turret, ItemStack.with(F.fi("ruby"), 75, Items.silicon, 45, Items.copper, 60));

const Napalm = extendContent(ItemTurret, "ruby-napalm", {});
Napalm.size = 3;
Napalm.health = 3470;
Napalm.reload = 5;
Napalm.range = 180;
Napalm.inaccuracy = 5;
Napalm.recoil = 2;
Napalm.xRand = 8;
Napalm.velocityInaccuracy = 0.2;
Napalm.velocityRnd = 0.2;
Napalm.shootSound = Sounds.flame;
Napalm.ammo(Items.coal, B.napalmCoal, F.fi("ruby"), B.napalmRuby, Items.pyratite, B.napalmPyratite, Items.blastCompound, B.napalmBlast);
Napalm.requirements(Category.turret, ItemStack.with(F.fi("ruby"), 120, F.fi("lead-plate"), 50, Items.silicon, 80, Items.plastanium, 65));

const Twinkle = extendContent(ItemTurret, "twinkle", {
	load(){
	    this.super$load();

	    this.baseRegion = Core.atlas.find("colloseusmod-block-5");
    }, 
	
	generateIcons: function(){
		return [
			Core.atlas.find("colloseusmod-block-" + this.size),
			Core.atlas.find(this.name)
		];
    }
});
Twinkle.size = 5;
Twinkle.health = 12450;
Twinkle.reload = 5;
Twinkle.range = 260;
Twinkle.inaccuracy = 24;
Twinkle.velocityInaccuracy = 0.2;
Twinkle.velocityRnd = 0.2;
Twinkle.recoil = 6;
Twinkle.rotatespeed = 2.0;
Twinkle.xRand = 2;
Twinkle.shootSound = Sounds.flame;
Twinkle.ammo(Items.coal, B.twinkleCoal , Items.pyratite, B.twinklePyratite, Items.blastCompound, B.twinkleBlast, F.fi("ruby"), B.twinkleRuby);
Twinkle.requirements(Category.turret, ItemStack.with(F.fi("ruby"), 435, F.fi("palladium-plate"), 230, Items.silicon, 320, Items.surgealloy, 360, Items.phasefabric, 165));

TechTree.create(Blocks.duo, Fox);
TechTree.create(Fox, Napalm);
TechTree.create(Napalm, Twinkle);
