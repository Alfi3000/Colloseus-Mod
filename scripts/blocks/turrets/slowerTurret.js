const slowest = extendContent(StatusEffect, "slower", {});
slowest.speedMultiplier = 0.3;

const slowBullet = extend(BasicBulletType,{
    hit(b, x, y){
        Units.nearby(b.x, b.y, 8, 8, cons(e => {
		    e.applyEffect(slowest, 180); 
        }));
    } 
});

slowBullet.trailColor = Pal.lancerLaser;
slowBullet.backColor = Pal.lancerLaser;
slowBullet.frontColor = Pal.lancerLaser;
slowBullet.damage = 3;
slowBullet.speed = 6.5;

const slowerTurret = extendContent(PowerTurret, "grabber", {});
slowerTurret.shootType = slowBullet;
slowerTurret.shots = 4;
slowerTurret.recoil = 2.5;
slowerTurret.reload = 60;
slowerTurret.inaccuracy = 5;
slowerTurret.powerUse = 1.5;
slowerTurret.targetGround = false;
slowerTurret.targetAir = true;
slowerTurret.shootSound = Sounds.splash;
slowerTurret.shootCone = 3;
slowerTurret.range = 125;
slowerTurret.size = 2;
slowerTurret.health = 945;
slowerTurret.requirements(Category.turret, ItemStack.with(Items.silicon, 45, Items.lead, 35, Items.titanium, 75));

////////////////////

const SniperLeadBullet = extend(BasicBulletType, {});
SniperLeadBullet.speed = 15;
SniperLeadBullet.damage = 9;
SniperLeadBullet.bulletWidth  = 5;
SniperLeadBullet.bulletHeight = 10;
SniperLeadBullet.shootEffect  = Fx.shootBig;
SniperLeadBullet.ammoMultiplier = 1.5;

const SniperCopperBullet = extend(BasicBulletType, {});
SniperCopperBullet.speed = 14;
SniperCopperBullet.damage = 6;
SniperCopperBullet.bulletWidth  = 5;
SniperCopperBullet.bulletHeight = 5;
SniperCopperBullet.shootEffect  = Fx.shootSmall;
SniperCopperBullet.ammoMultiplier = 1.5;

const Sniper = extendContent(ItemTurret, "lead-sniper-turret", {});
Sniper.size = 2;
Sniper.health = 1740;
Sniper.reload = 30;
Sniper.range = 420;
Sniper.ammo(Items.lead, SniperLeadBullet, Items.copper, SniperCopperBullet);
Sniper.requirements(Category.turret, ItemStack.with(Items.lead, 75, Items.copper, 30));

TechTree.create(Blocks.duo, Sniper);
TechTree.create(Blocks.lancer, slowerTurret);
