const F = require("func");
const C = this.global.COLORS;
const E = this.global.EFFECTS;

const FragYellowBall = extend(BasicBulletType, {
    draw(b) {
        Draw.color(this.backColor);
        Fill.circle(b.x, b.y, 4.0 + b.fout()*5.0);
        Draw.color(this.frontColor);
        Fill.circle(b.x, b.y, 2.0 + b.fout()*2.5);
        Draw.color();
    } 
});
FragYellowBall.trailColor = C.energy;
FragYellowBall.backColor = C.energy;
FragYellowBall.frontColor = C.energyLight;
FragYellowBall.hitEffect = E.giantYellowBallHitBig;
FragYellowBall.despawnEffect = E.giantYellowBallHitBig;

FragYellowBall.speed = 2.5;
FragYellowBall.lifetime = FragYellowBall.lifetime * 1.25;
FragYellowBall.damage = 130;

FragYellowBall.collides = true;
FragYellowBall.collidesTiles = true;

FragYellowBall.splashDamage = 85;
FragYellowBall.splashDamageRadius = 100;
FragYellowBall.hitSize = 24;
FragYellowBall.hitShake = 8;

FragYellowBall.lightning = 4;
FragYellowBall.lightningLength = 13;
FragYellowBall.lightningLengthRand = 6;
FragYellowBall.lightningColor = C.energy;

const ImpalerBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(this.backColor);
        Fill.circle(b.x, b.y, 4.5 + b.fout()*6.0);
        Draw.color(this.frontColor);
        Fill.circle(b.x, b.y, 2.2 + b.fout()*3.0);
        Draw.color();
    } 
});
ImpalerBullet.trailColor = C.energy;
ImpalerBullet.backColor = C.energy;
ImpalerBullet.frontColor = C.energyLight;
ImpalerBullet.hitEffect = E.giantYellowBallHitBig;
ImpalerBullet.despawnEffect = E.giantYellowBallHitBig;

ImpalerBullet.speed = 6.0;
ImpalerBullet.lifetime = ImpalerBullet.lifetime * 2;
ImpalerBullet.damage = 180;

ImpalerBullet.collides = true;
ImpalerBullet.collidesTiles = true;

ImpalerBullet.splashDamage = 135;
ImpalerBullet.splashDamageRadius = 100;
ImpalerBullet.hitSize = 24;
ImpalerBullet.hitShake = 8;

ImpalerBullet.lightning = 3;
ImpalerBullet.lightningLength = 11;
ImpalerBullet.lightningDamage = 40;
ImpalerBullet.lightningLengthRand = 4;
ImpalerBullet.lightningColor = C.energy;

const GiantYellowBall = extend(BasicBulletType, {
    draw(b) {
        Draw.color(this.backColor);
        Fill.circle(b.x, b.y, 8.0 + b.fout()*12.0);
        Draw.color(this.frontColor);
        Fill.circle(b.x, b.y, 4.0 + b.fout()*6.0);
        Draw.color();
    } 
});
GiantYellowBall.trailColor = C.energy;
GiantYellowBall.backColor = C.energy;
GiantYellowBall.frontColor = C.energyLight;
GiantYellowBall.hitEffect = E.giantYellowBallHitLarge;
GiantYellowBall.despawnEffect = E.giantYellowBallHitLarge;
GiantYellowBall.shootEffect = E.yellowBallCharge;

GiantYellowBall.speed = 2.0;
GiantYellowBall.lifetime = 240;
GiantYellowBall.damage = 600;

GiantYellowBall.collides = true;
GiantYellowBall.collidesTiles = true;

GiantYellowBall.splashDamage = 540;
GiantYellowBall.splashDamageRadius = 180;
GiantYellowBall.hitSize = 48;
GiantYellowBall.hitShake = 23;

GiantYellowBall.lightning = 10;
GiantYellowBall.lightningDamage = 60;
GiantYellowBall.lightningLength = 18;
GiantYellowBall.lightningLengthRand = 8;
GiantYellowBall.lightningColor = C.energy;

GiantYellowBall.fragBullet = FragYellowBall;
GiantYellowBall.fragVelocityMin = 0.6;
GiantYellowBall.fragVelocityMax = 1.1;

const GiantImpalerCannon = extendContent(Weapon, "giant-impaler-cannon", {});
GiantImpalerCannon.reload = 600.0;
GiantImpalerCannon.alternate = true;
GiantImpalerCannon.bullet = GiantYellowBall;
GiantImpalerCannon.shootSound = Sounds.laser;
GiantImpalerCannon.firstShotDelay = E.yellowBallCharge.lifetime;
GiantImpalerCannon.cooldownTime = 600.0;

GiantImpalerCannon.spacing = 0;
GiantImpalerCannon.shake = 10.0;
GiantImpalerCannon.inaccuracy = 2;
GiantImpalerCannon.shootCone = 0;
GiantImpalerCannon.recoil = 0.0;
GiantImpalerCannon.x = 0.0;
GiantImpalerCannon.y = 28.0;
GiantImpalerCannon.shootY = 12.0;

GiantImpalerCannon.top = false;
GiantImpalerCannon.mirror = false;
GiantImpalerCannon.shootStatusDuration = E.yellowBallCharge.lifetime;
GiantImpalerCannon.shootStatus = StatusEffects.unmoving;

const ImpalerWeapon = extendContent(Weapon, "impaler-weapon", {});
ImpalerWeapon.reload = 20;
ImpalerWeapon.alternate = true;
ImpalerWeapon.bullet = ImpalerBullet;
ImpalerWeapon.shootSound = Sounds.laser;

ImpalerWeapon.spacing = 0;
ImpalerWeapon.shake = 2.0;
ImpalerWeapon.inaccuracy = 3;
ImpalerWeapon.velocityRnd = 0.2;
ImpalerWeapon.shootCone = 0;
ImpalerWeapon.recoil = 0.0;
ImpalerWeapon.x = 0.0;
ImpalerWeapon.y = 12.0;
ImpalerWeapon.shootY = 6.0;

const Impaler = extendContent(UnitType, "impaler", {});
Impaler.engineSize = 0.0;
Impaler.health = 32500;
Impaler.hitSize = 100;
Impaler.speed = 0.58;
Impaler.flying = true;
Impaler.range = 60*Vars.tilesize;
Impaler.mass = 120;
Impaler.maxVelocity = 0.48;

Impaler.baseRotateSpeed = 0.7;
Impaler.rotateSpeed = 0.7;
Impaler.drag = 0.024;
Impaler.accel = 0.04;
Impaler.armor = 36;
Impaler.fallSpeed = 0.0025;
Impaler.commandLimit = 3;
Impaler.lowAltitude = true;
Impaler.weapons.add(GiantImpalerCannon, ImpalerWeapon);
Impaler.constructor = () => { 
	const unit = extend(UnitEntity, {});
	return unit
};
