const F = require("functions/f");

const FlameWeap = extendContent(Weapon, "flame-weapon", {});
FlameWeap.reload = 90;
FlameWeap.alternate = false;
FlameWeap.bullet = this.global.BULLETS.flameBullet;
FlameWeap.shootEffect = Fx.none;
FlameWeap.smokeEffect = Fx.none;
FlameWeap.inaccuracy = 10;
FlameWeap.spacing = 2;

const FlameBase = prov(() => new JavaAdapter(GroundUnit, {}));
const Flame = extendContent(UnitType, "flame", {});
Flame.weapon = FlameWeap;
Flame.create(FlameBase);
Flame.health = 125;
Flame.hitsize = 8;
Flame.speed = 0.4;
Flame.flying = false;
Flame.range = 250;
Flame.mass = 5.0;
Flame.maxVelocity = 1.0;
Flame.baseRotateSpeed = 0.4;
Flame.rotatespeed = 2.0;
Flame.drag = 0.4; 

const FlameFactory = extendContent(UnitFactory, "flame-factory", {});
FlameFactory.unitType = Flame;
FlameFactory.size = 2;
FlameFactory.health = 275;
FlameFactory.produceTime = 737;
FlameFactory.requirements(Category.units, ItemStack.with(Items.silicon, 40, F.fi("ruby"), 75, Items.lead, 55));
FlameFactory.consumes.power(0.75);
FlameFactory.consumes.items(new ItemStack(F.fi("ruby"), 6));

//////. 

const FireBomberWeap = extendContent(Weapon, "fire-bomber-weapon", {});
FireBomberWeap.reload = 12;
FireBomberWeap.alternate = true;
FireBomberWeap.bullet = this.global.BULLETS.fireBomberBullet;
FireBomberWeap.shootEffect = Fx.none;
FireBomberWeap.shootSound = Sounds.flame;
FireBomberWeap.smokeEffect = Fx.none;
FireBomberWeap.inaccuracy = 10;
FireBomberWeap.spacing = 2;

const FireBomberBase = prov(() => new JavaAdapter(FlyingUnit, {}));
const FireBomber = extendContent(UnitType, "fire-bomber", {});
FireBomber.weapon = FireBomberWeap;
FireBomber.create(FireBomberBase);
FireBomber.health = 200;
FireBomber.hitsize = 8;
FireBomber.speed = 0.3;
FireBomber.flying = true;
FireBomber.targetAir = false;
FireBomber.range = 10;
FireBomber.mass = 5.0;
FireBomber.maxVelocity = 1.4;
FireBomber.baseRotateSpeed = 0.25;
FireBomber.engineSize = 2.7;
FireBomber.drag = 0.01; 

const FireBomberFactory = extendContent(UnitFactory, "fire-bomber-factory", {});
FireBomberFactory.unitType = FireBomber;
FireBomberFactory.size = 3;
FireBomberFactory.health = 385;
FireBomberFactory.produceTime = 1060;
FireBomberFactory.requirements(Category.units, ItemStack.with(Items.graphite, 45, F.fi("ruby"), 105, Items.titanium, 75));
FireBomberFactory.consumes.power(1.3);
FireBomberFactory.consumes.items(new ItemStack(F.fi("ruby"), 15), new ItemStack(Items.silicon, 10)); 

TechTree.create(Blocks.daggerFactory, FlameFactory);
TechTree.create(FlameFactory, FireBomberFactory);
