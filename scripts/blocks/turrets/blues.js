const F = require("functions/f");
const C = this.global.COLORS;
const E = this.global.EFFECTS;

const MoskitSapphireBullet = extend(MissileBulletType, {});
MoskitSapphireBullet.speed = 7;
MoskitSapphireBullet.damage = 30;
MoskitSapphireBullet.homingRange = 70;
MoskitSapphireBullet.homingPower = 0.05;
MoskitSapphireBullet.shootEffect = Fx.shootBig;
MoskitSapphireBullet.smokeEffect = Fx.none;
MoskitSapphireBullet.backColor = Color.valueOf("00ABFF");
MoskitSapphireBullet.frontColor = Color.valueOf("00ABFF");
MoskitSapphireBullet.splashDamageRadius = 12;
MoskitSapphireBullet.splashDamage = 16;
MoskitSapphireBullet.ammoMultiplier = 1.0;

const MoskitSiliconBullet = extend(MissileBulletType, {});
MoskitSiliconBullet.speed = 7;
MoskitSiliconBullet.damage = 45;
MoskitSiliconBullet.homingRange = 70;
MoskitSiliconBullet.homingPower = 0.1;
MoskitSiliconBullet.shootEffect = Fx.shootBig;
MoskitSiliconBullet.smokeEffect = Fx.none;
MoskitSiliconBullet.backColor = Color.valueOf("00ABFF");
MoskitSiliconBullet.frontColor = Color.valueOf("00ABFF");
MoskitSiliconBullet.splashDamageRadius = 24;
MoskitSiliconBullet.splashDamage = 25;
MoskitSiliconBullet.ammoMultiplier = 2.0;

const Moskit = extendContent(DoubleTurret, "blue1-double-missile-turret", {});
Moskit.health = 1340;
Moskit.size = 2;
Moskit.reload = 75;
Moskit.range = 140;
Moskit.ammoUseEffect = Fx.shellEjectSmall;
Moskit.inaccuracy = 5;
Moskit.recoil = 5.0;
Moskit.rotatespeed = 0.8;
Moskit.buildCostMultiplier = 0.7;
Moskit.requirements(Category.turret, ItemStack.with(Items.metaglass, 30, F.fi("sapphire"), 45, Items.lead, 60, Items.silicon, 40));
Moskit.ammo(Items.silicon, MoskitSiliconBullet, F.fi("sapphire"), MoskitSapphireBullet);

/////////////////////////

const BeeLuxBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(this.frontColor);
        Draw.rect(Core.atlas.find("colloseusmod-blue2-bullet"), b.x, b.y, this.bulletWidth, this.bulletHeigth, b.rot()-90);
        Draw.color();
    } 
});
BeeLuxBullet.speed = 50;
BeeLuxBullet.damage = 1100;
BeeLuxBullet.shootEffect = Fx.shootBig;
BeeLuxBullet.smokeEffect = Fx.none;
BeeLuxBullet.backColor = Color.valueOf("00ABFF");
BeeLuxBullet.frontColor = Color.valueOf("00ABFF");
BeeLuxBullet.bulletWidth = 100;
BeeLuxBullet.bulletHeigth = 170;
BeeLuxBullet.ammoMultiplier = 2.0;

const BeeSiliconBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(this.frontColor);
        Draw.rect(Core.atlas.find("colloseusmod-blue2-bullet"), b.x, b.y, this.bulletWidth, this.bulletHeigth, b.rot()-90);
        Draw.color();
    } 
});
BeeSiliconBullet.speed = 30;
BeeSiliconBullet.damage = 550;
BeeSiliconBullet.homingRange = 450;
BeeSiliconBullet.homingPower = 5.0;
BeeSiliconBullet.shootEffect = Fx.shootBig;
BeeSiliconBullet.smokeEffect = Fx.none;
BeeSiliconBullet.backColor = Color.valueOf("00ABFF");
BeeSiliconBullet.frontColor = Color.valueOf("00ABFF");
BeeSiliconBullet.bulletWidth = 90;
BeeSiliconBullet.bulletHeigth = 120;
BeeSiliconBullet.ammoMultiplier = 1.5;

const BeePlastBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(this.frontColor);
        Draw.rect(Core.atlas.find("colloseusmod-blue2-bullet"), b.x, b.y, this.bulletWidth, this.bulletHeigth, b.rot()-90);
        Draw.color();
    } 
});
BeePlastBullet.speed = 35;
BeePlastBullet.damage = 300;
BeePlastBullet.homingRange = 450;
BeePlastBullet.homingPower = 5.0;
BeePlastBullet.shootEffect = Fx.shootBig;
BeePlastBullet.smokeEffect = Fx.none;
BeePlastBullet.backColor = Color.valueOf("00ABFF");
BeePlastBullet.frontColor = Color.valueOf("00ABFF");
BeePlastBullet.bulletWidth = 90;
BeePlastBullet.bulletHeigth = 120;
BeePlastBullet.ammoMultiplier = 1.3;
BeePlastBullet.splashDamageRadius = 48;
BeePlastBullet.splashDamage = 475;

const BeeSurgeBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(this.frontColor);
        Draw.rect(Core.atlas.find("colloseusmod-blue2-bullet"), b.x, b.y, this.bulletWidth, this.bulletHeigth, b.rot()-90);
        Draw.color();
    } 
});
BeeSurgeBullet.speed = 40;
BeeSurgeBullet.damage = 875;
BeeSurgeBullet.shootEffect = Fx.shootBig;
BeeSurgeBullet.smokeEffect = Fx.none;
BeeSurgeBullet.backColor = Color.valueOf("00ABFF");
BeeSurgeBullet.frontColor = Color.valueOf("00ABFF");
BeeSurgeBullet.bulletWidth = 50;
BeeSurgeBullet.bulletHeigth = 90;
BeeSurgeBullet.ammoMultiplier = 3.0;

const Bee = extendContent(DoubleTurret, "blue2-range-turret", {});
Bee.health = 4850;
Bee.size = 4;
Bee.reload = 1800;
Bee.range = 100*Vars.tilesize;
Bee.ammoUseEffect = Fx.shellEjectBig;
Bee.targetAir = false;
Bee.inaccuracy = 0;
Bee.recoil = 10.0;
Bee.rotatespeed = 0.4;
Bee.buildCostMultiplier = 0.7;
Bee.requirements(Category.turret, ItemStack.with(Items.metaglass, 250, F.fi("sapphire"), 320, Items.lead, 475, Items.silicon, 280, Items.surgealloy, 210, F.fi("titanium-plate"), 160));
Bee.ammo(Items.silicon, BeeSiliconBullet, F.fi("lux"), BeeLuxBullet, Items.plastanium, BeePlastBullet, Items.surgealloy, BeeSurgeBullet);

/////////////////////////

const PalachLuxBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(this.frontColor);
        Draw.rect(Core.atlas.find("colloseusmod-blue2-bullet"), b.x, b.y, this.bulletWidth, this.bulletHeigth, b.rot()-90);
        Draw.color();
    } 
});
PalachLuxBullet.homingRange = 350.0;
PalachLuxBullet.homingPower = 0.5;
PalachLuxBullet.speed = 20;
PalachLuxBullet.damage = 185;
PalachLuxBullet.shootEffect = Fx.shootBig;
PalachLuxBullet.smokeEffect = Fx.none;
PalachLuxBullet.bulletWidth = 50;
PalachLuxBullet.bulletHeigth = 90;
PalachLuxBullet.ammoMultiplier = 2.5;

const PalachSiliconBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(this.frontColor);
        Draw.rect(Core.atlas.find("colloseusmod-blue2-bullet"), b.x, b.y, this.bulletWidth, this.bulletHeigth, b.rot()-90);
        Draw.color();
    } 
});
PalachSiliconBullet.speed = 10;
PalachSiliconBullet.damage = 110;
PalachSiliconBullet.homingRange = 200;
PalachSiliconBullet.homingPower = 0.3;
PalachSiliconBullet.shootEffect = Fx.shootBig;
PalachSiliconBullet.smokeEffect = Fx.none;
PalachSiliconBullet.bulletWidth = 40;
PalachSiliconBullet.bulletHeigth = 70;
PalachSiliconBullet.ammoMultiplier = 1.5;

const PalachPlastBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(this.frontColor);
        Draw.rect(Core.atlas.find("colloseusmod-blue2-bullet"), b.x, b.y, this.bulletWidth, this.bulletHeigth, b.rot()-90);
        Draw.color();
    } 
});
PalachPlastBullet.speed = 12;
PalachPlastBullet.damage = 150;
PalachPlastBullet.homingRange = 270;
PalachPlastBullet.homingPower = 0.4;
PalachPlastBullet.shootEffect = Fx.shootBig;
PalachPlastBullet.smokeEffect = Fx.none;
PalachPlastBullet.backColor = Color.valueOf("00ABFF");
PalachPlastBullet.frontColor = Color.valueOf("00ABFF");
PalachPlastBullet.bulletWidth = 40;
PalachPlastBullet.bulletHeigth = 80;
PalachPlastBullet.ammoMultiplier = 3.5;

const PalachSurgeBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(this.frontColor);
        Draw.rect(Core.atlas.find("colloseusmod-blue2-bullet"), b.x, b.y, this.bulletWidth, this.bulletHeigth, b.rot()-90);
        Draw.color();
    } 
});
PalachSurgeBullet.speed = 15;
PalachSurgeBullet.damage = 160;
PalachSurgeBullet.shootEffect = Fx.shootBig;
PalachSurgeBullet.smokeEffect = Fx.none;
PalachSurgeBullet.backColor = Color.valueOf("00ABFF");
PalachSurgeBullet.frontColor = Color.valueOf("00ABFF");
PalachSurgeBullet.bulletWidth = 40;
PalachSurgeBullet.bulletHeigth = 80;
PalachSurgeBullet.ammoMultiplier = 2.0;
PalachSurgeBullet.homingRange = 240;
PalachSurgeBullet.homingPower = 0.5;

const Palach = extendContent(DoubleTurret, "blue3-missile-turret", {
	load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("colloseusmod-block-" + this.size);
	},
	
	generateIcons: function(){
		return [
			Core.atlas.find("colloseusmod-block-" + this.size),
			Core.atlas.find(this.name)
		];
    },

    shoot(tile, ammo){
        entity = tile.ent();
        entity.shots++;

        var i = Mathf.round(Mathf.signs[entity.shots % 2]);

        this.tr.trns(entity.rotation - 90, this.shotHeight * i, this.size * Vars.tilesize / 2 + (this.shotWidth));
        this.bullet(tile, ammo, entity.rotation + Mathf.range(this.inaccuracy));

        this.effects(tile);
        this.useAmmo(tile);
    }
});
Palach.health = 9350;
Palach.size = 6;
Palach.reload = 15;
Palach.range = 360;
Palach.ammoEjectBack = 12;
Palach.ammoUseEffect = E.shellEjectHuge;
Palach.targetAir = true;
Palach.inaccuracy = 5.0;
Palach.shotWidth = 2.0; 
Palach.shotHeight = 2.0;
Palach.recoil = 5.0;
Palach.rotatespeed = 0.8;
Palach.buildCostMultiplier = 0.5;
Palach.requirements(Category.turret, ItemStack.with(Items.metaglass, 340, F.fi("sapphire"), 480, F.fi("lead-plate"), 170, Items.silicon, 325, Items.surgealloy, 225, F.fi("palladium-plate"), 230));
Palach.ammo(Items.silicon, PalachSiliconBullet, F.fi("lux"), PalachLuxBullet, Items.plastanium, PalachPlastBullet, Items.surgealloy, PalachSurgeBullet);

TechTree.create(Blocks.duo, Moskit);
TechTree.create(Moskit, Bee);
TechTree.create(Bee, Palach);
