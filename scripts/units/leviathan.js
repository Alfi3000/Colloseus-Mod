const F = require("func");
const C = this.global.COLORS;
const E = this.global.EFFECTS;

const GiantRainbowLaser = extend(ContinuousLaserBulletType, {
    draw(b){
        print(this);
        const realLength = Damage.findLaserLength(b, this.length);
        const fout = Mathf.clamp(b.time > b.lifetime - this.fadeTime ? 1.0 - (b.time - (this.lifetime - this.fadeTime)) / this.fadeTime : 1.0);
        const baseLen = realLength * fout;

        Lines.lineAngle(b.x, b.y, b.rotation(), baseLen);
        for(var s = 0; s < this.colors.length; s++){
            Draw.color(Tmp.c1.set(this.colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.1)));
            for(var i = 0; i < this.tscales.length; i++){
                Tmp.v1.trns(b.rotation() + 180.0, (this.lenscales[i] - 1.0) * 35.0);
                Lines.stroke((this.width + Mathf.absin(Time.time(), this.oscScl, this.oscMag)) * fout * this.strokes[s] * this.tscales[i]);
                Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rotation(), baseLen * this.lenscales[i], false);
            }
        };

        Tmp.v1.trns(b.rotation(), baseLen * 1.1);

        Drawf.light(b.team, b.x, b.y, b.x + Tmp.v1.x, b.y + Tmp.v1.y, 40, this.lightColor, 0.7);
        Draw.reset();
    }
});
GiantRainbowLaser.hitEffect = Fx.none;
GiantRainbowLaser.despawnEffect = Fx.none;
GiantRainbowLaser.shootEffect = E.yellowBallCharge;

GiantRainbowLaser.colors = [F.c("#AF33FF44"), F.c("#BF5BFF66"), F.c("#CA77FF"), F.c("#D695FF"), F.c("#E2B5FF"), F.c("#EED3FF"), Color.white];
GiantRainbowLaser.strokes = [1.0, 0.85, 0.7, 0.55, 0.4, 0.25, 0.1];
GiantRainbowLaser.lenscales = [0.8, 1.0, 1.1, 1.15, 1.175, 1.19, 1.195];
GiantRainbowLaser.tscales = [1.0, 0.85, 0.7, 0.55, 0.4, 0.25, 0.1];

GiantRainbowLaser.oscScl = 1.3;
GiantRainbowLaser.oscMag = 0.4;

GiantRainbowLaser.length = 1000.0;
GiantRainbowLaser.width = 22.0;
GiantRainbowLaser.lifetime = 360;
GiantRainbowLaser.damage = 600;

GiantRainbowLaser.hitSize = 22.0;
GiantRainbowLaser.shake = 5.0;

const GiantLaserWeapon = extendContent(Weapon, "giant-impaler-cannon", {});
GiantLaserWeapon.reload = 600.0;
GiantLaserWeapon.alternate = true;
GiantLaserWeapon.rotate = true;
GiantLaserWeapon.mirror = false;
GiantLaserWeapon.bullet = GiantRainbowLaser;
GiantLaserWeapon.shootSound = Sounds.laser;
GiantLaserWeapon.firstShotDelay = E.yellowBallCharge.lifetime;
GiantLaserWeapon.cooldownTime = 600.0;

GiantLaserWeapon.spacing = 0;
GiantLaserWeapon.shake = 10.0;
GiantLaserWeapon.inaccuracy = 2;
GiantLaserWeapon.shootCone = 0;
GiantLaserWeapon.recoil = 0.0;
GiantLaserWeapon.x = 0.0;
GiantLaserWeapon.y = 0.0;
GiantLaserWeapon.shootY = 16.0;

GiantLaserWeapon.shootStatusDuration = E.yellowBallCharge.lifetime;
GiantLaserWeapon.shootStatus = StatusEffects.unmoving;

const Leviathan = extendContent(UnitType, "leviathan", {});
Leviathan.health = 400000;
Leviathan.hitSize = 120;
Leviathan.range = 200*Vars.tilesize;
Leviathan.mass = 260;

Leviathan.baseRotateSpeed = 0.76;
Leviathan.rotateSpeed = 1.12;
Leviathan.rotateShooting = false;

Leviathan.maxVelocity = 0.58;
Leviathan.speed = 0.5;
Leviathan.drag = 0.9;

Leviathan.armor = 72;
Leviathan.commandLimit = 2;
Leviathan.weapons.add(GiantLaserWeapon);
Leviathan.constructor = () => { 
	const unit = extend(UnitWaterMove, {});
	return unit
};

Leviathan.trailScl = 12.0;
Leviathan.trailX = 32.0;
Leviathan.trailY = -48.0;
Leviathan.trailLength = 320.0;
