const F = require("func");
const C = this.global.COLORS;
const E = this.global.EFFECTS;
const S = this.global.STATUSES;
const SO = this.global.SOUNDS;

const DarkRedBrown = C.unitOrangeDark.cpy();
DarkRedBrown.r = 0.9;
DarkRedBrown.mul(0.85);

const coordX = [48.0, 28.0, -28.0, -48.0];
const coordY = [-64.0, -88.0, -88.0, -64.0];

F.name = "black-hole-distortion-large";
const ld = [F.fs(""), F.fs(""), F.fs("")];
const lds = [-Mathf.random(0.2, 0.45), 0.6, - 0.55, Mathf.random(0.4, 0.8)];

F.name = "black-hole-distortion";
const d = [F.fs(""), F.fs(""), F.fs(""), F.fs("")];
const ds = [Mathf.random(0.3, 0.5), -0.5, 0.8, -1.0, - 1.15, Mathf.random(0.6, 1.3)];

F.name = "black-hole-distortion-small";
const sd = [F.fs(""), F.fs(""), F.fs(""), F.fs(""), F.fs("")];
const sds = [2.0, -2.0, -2.0, 2.0, 2.0, -2.0, 2.0, - 2.0];
F.name = "error";

const distortions = [];
const smallDistortions = [];
const largeDistortions = [];
for(var i = 0; i < d.length; i++) {
    distortions.push([d[i], ds[i], 0]);
};

for(var i = 0; i < sd.length; i++) {
    smallDistortions.push([sd[i], sds[i], 0]);
};

for(var i = 0; i < ld.length; i++) {
    largeDistortions.push([ld[i], lds[i], 0]);
};

const SmallHealBullet = extend(LaserBoltBulletType, {});
SmallHealBullet.hitEffect = E.greenTinyHit;
SmallHealBullet.despawnEffect = E.greenTinyHit;

SmallHealBullet.shootEffect = Fx.none;
SmallHealBullet.smokeEffect = Fx.none;
SmallHealBullet.damage = 140;
SmallHealBullet.height = 7.0;
SmallHealBullet.width = 1.7;

SmallHealBullet.absorbable = true;
SmallHealBullet.reflectable = true;
SmallHealBullet.hittable = true;
SmallHealBullet.collidesTeam = true;

SmallHealBullet.speed = 15.0;
SmallHealBullet.lifetime = 25;
SmallHealBullet.hitSize = 4.0;
SmallHealBullet.healPercent = 5.0;

SmallHealBullet.backColor = Pal.heal;
SmallHealBullet.frontColor = Color.white;

function createSwords(x, y, rot, amount, speed, offset) {
	const Swords = extend(BasicBulletType, {
	    draw(b) {
	        var v = new Vec2();
	        var v2 = new Vec2();
	        for(var i = 0; i < amount; i++) {
		        v.trns(i*(360.0/amount), offset);
		        Drawf.tri(b.x - v.x, b.y - v.y, 8, 24, v.angle()); 
		
		        v2.trns(i*(360.0/amount), offset - offset / 3.0);
		        Lines.lineAngle(b.x - v2.x, b.y - v2.y, v.angle(), offset + offset / 3.0 ); 
	        } 
	    } 
	});
	Swords.hitEffect = E.greenTinyHit;
	Swords.despawnEffect = E.greenTinyHit;
	
	Swords.shootEffect = Fx.none;
	Swords.smokeEffect = Fx.none;
	Swords.damage = 140;
	
	Swords.absorbable = false;
	Swords.reflectable = false;
	Swords.hittable = false;
	
	Swords.speed = 0.0;
	Swords.lifetime = 150;
	Swords.hitSize = 4.0;
	
	return Swords
} 

const FireArtilleryBullet = extend(ArtilleryBulletType, {
    draw(b) {
        Draw.color(C.unitOrangeLight, C.unitOrangeDark, b.fin());
        Fill.circle(b.x, b.y, 2.8 + b.fslope() * 6.8); 
    } 
});
FireArtilleryBullet.hitEffect = E.redArtilleryHit;
FireArtilleryBullet.despawnEffect = E.redArtilleryHit;

FireArtilleryBullet.shootEffect = Fx.none;
FireArtilleryBullet.smokeEffect = Fx.none;
FireArtilleryBullet.damage = 400;
FireArtilleryBullet.height = 6.0;
FireArtilleryBullet.width = 1.7;

FireArtilleryBullet.status = S.curse;
FireArtilleryBullet.statusDuration = 60.0 * 15.0;
FireArtilleryBullet.hitSound = Sounds.explosion;

FireArtilleryBullet.splashDamageRadius = 50;
FireArtilleryBullet.splashDamage = 300;

FireArtilleryBullet.incendChance = 0.2;
FireArtilleryBullet.incendSpread = 18.0;
FireArtilleryBullet.incendAmount = 5;

FireArtilleryBullet.lightRadius = 30.0;
FireArtilleryBullet.lightOpacity = 0.5;
FireArtilleryBullet.lightColor = DarkRedBrown;

FireArtilleryBullet.lightningColor = C.unitOrangeDark;
FireArtilleryBullet.lightning = 4;
FireArtilleryBullet.lightningLength = 5;
FireArtilleryBullet.lightningLengthRand = 7;
FireArtilleryBullet.lightningDamage = 60;

FireArtilleryBullet.reloadMultiplier = 0.4;
FireArtilleryBullet.knockback = 2.4;

FireArtilleryBullet.trailColor = C.unitOrange;
FireArtilleryBullet.trailChance = 0.15;
FireArtilleryBullet.trailSize = 6.0;

FireArtilleryBullet.absorbable = true;
FireArtilleryBullet.reflectable = false;
FireArtilleryBullet.hittable = false;
FireArtilleryBullet.collidesAir = true;

FireArtilleryBullet.lifetime = 60;
FireArtilleryBullet.speed = 5.2;
FireArtilleryBullet.hitSize = 16.0;
FireArtilleryBullet.hitShake = 6.5;

FireArtilleryBullet.hitColor = DarkRedBrown;
FireArtilleryBullet.backColor = C.unitOrangeLight;
FireArtilleryBullet.frontColor = C.unitOrangeDark;

FireArtilleryBullet.status = S.curse;
FireArtilleryBullet.statusDuration = 60.0 * 15.0;

const MissileBullet = extend(MissileBulletType, {});
MissileBullet.hitEffect = Fx.none;
MissileBullet.despawnEffect = Fx.none;

MissileBullet.shootEffect = Fx.none;
MissileBullet.smokeEffect = Fx.none;
MissileBullet.damage = 180;
MissileBullet.height = 20.0;
MissileBullet.width = 10.0;

MissileBullet.status = StatusEffects.burning;
MissileBullet.statusDuration = 60.0 * 10.0;
MissileBullet.hitSound = Sounds.explosion;

MissileBullet.lightRadius = 12.0;
MissileBullet.lightOpacity = 0.5;
MissileBullet.lightColor = DarkRedBrown;

MissileBullet.lightningColor = C.unitOrangeDark;
MissileBullet.lightning = 2;
MissileBullet.lightningLength = 4;
MissileBullet.lightningLengthRand = 4;
MissileBullet.lightningDamage = 120;

MissileBullet.knockback = 0.7;
MissileBullet.homingPower = 0.5;
MissileBullet.homingRange = 80;

MissileBullet.trailColor = C.unitOrange;
MissileBullet.trailChance = 0.14;
MissileBullet.trailSize = 3.0;

MissileBullet.absorbable = true;
MissileBullet.reflectable = false;
MissileBullet.hittable = false;
MissileBullet.collidesAir = true;

MissileBullet.lifetime = 80;
MissileBullet.speed = 8.0;
MissileBullet.hitSize = 6.0;

MissileBullet.hitColor = DarkRedBrown;
MissileBullet.backColor = C.unitOrangeLight;
MissileBullet.frontColor = C.unitOrangeDark;

MissileBullet.status = S.curse;
MissileBullet.statusDuration = 60.0 * 15.0;
MissileBullet.splashDamageRadius = 40.0;
MissileBullet.splashDamage = 0.0;

const GiantRedLaser = extend(ContinuousLaserBulletType, {
    draw(b){
        const fout = Mathf.clamp(b.time > b.lifetime - this.fadeTime ? 1.0 - (b.time - (this.lifetime - this.fadeTime)) / this.fadeTime : 1.0);
        const baseLen = this.length * fout;

        Lines.lineAngle(b.x, b.y, b.rotation(), baseLen);
        for(var s = 0; s < this.colors.length; s++){
            Draw.color(Tmp.c1.set(this.colors[s]).mul(1.0 + Mathf.absin(Time.time, 1.0, 0.1)));
            for(var i = 0; i < this.tscales.length; i++){
                Tmp.v1.trns(b.rotation() + 180.0, (this.lenscales[i] - 1.0) * 35.0);
                Lines.stroke((this.width + Mathf.absin(Time.time, this.oscScl, this.oscMag)) * fout * this.strokes[s] * this.tscales[i]);
                Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rotation(), baseLen * this.lenscales[i], false);
            }
        };

        Tmp.v1.trns(b.rotation(), baseLen * 1.1);

        Drawf.light(b.team, b.x, b.y, b.x + Tmp.v1.x, b.y + Tmp.v1.y, 40, this.lightColor, 0.7);
        Draw.reset();

        if(!Vars.state.isPaused()){
	        var v = new Vec2();
	        for(var i = 0; i < 2; i++) {
		        var side = Mathf.random(1.0) >= 0.5 ? this.width/2.0 - 4 : -this.width/2.0 + 4;
		        v.trns(b.rotation(), Mathf.random(25.0, this.length - 40.0), side);
		
		        E.laserAdditionalEffect.at(b.x + v.x, b.y + v.y);
	        }
	    }
    }
});
GiantRedLaser.hitEffect = Fx.none;
GiantRedLaser.despawnEffect = Fx.none;
GiantRedLaser.shootEffect = E.leviathanLaserCharge;

const c1 = C.unitOrangeDark.cpy();
const c2 = C.unitOrange.cpy();
c1.a = 0.77;
c2.a = 0.99;
GiantRedLaser.colors = [c1, c2, C.unitOrangeLight, C.unitOrangeLight.cpy().mul(1.4), Color.white];
GiantRedLaser.strokes = [1.0, 0.72, 0.46, 0.28, 0.1];
GiantRedLaser.lenscales = [0.8, 1.0, 1.15, 1.175, 1.19];
GiantRedLaser.tscales = [1.0, 0.72, 0.46, 0.28, 0.1];

GiantRedLaser.oscScl = 1.3;
GiantRedLaser.oscMag = 0.4;

GiantRedLaser.drawSize = 1070.0;
GiantRedLaser.length = 800.0;
GiantRedLaser.width = 40.0;
GiantRedLaser.lifetime = 600.0;
GiantRedLaser.damage = 1200;

GiantRedLaser.hitSize = 40.0;
GiantRedLaser.shake = 5.0;

GiantRedLaser.status = S.curse;
GiantRedLaser.statusDuration = 60.0 * 15.0;
GiantRedLaser.splashDamageRadius = 40.0;
GiantRedLaser.splashDamage = 0.0;

const GiantLaserWeapon = extendContent(Weapon, "giant-leviathan-laser-weapon", {});
GiantLaserWeapon.reload = 3600.0;
GiantLaserWeapon.alternate = false;
GiantLaserWeapon.mirror = false;
GiantLaserWeapon.rotate = true;
GiantLaserWeapon.bullet = GiantRedLaser;
GiantLaserWeapon.shootSound = Sounds.beam;
GiantLaserWeapon.firstShotDelay = E.yellowBallCharge.lifetime;
GiantLaserWeapon.cooldownTime = 3600.0;
GiantLaserWeapon.continuous = true;

GiantLaserWeapon.spacing = 0;
GiantLaserWeapon.shake = 10.0;
GiantLaserWeapon.shootCone = 0;
GiantLaserWeapon.recoil = 0.0;
GiantLaserWeapon.x = -7.0;
GiantLaserWeapon.y = 0.0;
GiantLaserWeapon.shootY = 18.0;
GiantLaserWeapon.rotateSpeed = 15.0/60.0;
GiantLaserWeapon.shootSound = SO.bigLaserShoot;

const EnergyShrapnelBullet = extend(ShrapnelBulletType, {});
EnergyShrapnelBullet.hitEffect = Fx.none;
EnergyShrapnelBullet.despawnEffect = Fx.none;

EnergyShrapnelBullet.shootEffect = E.energyShrapnelShoot;
EnergyShrapnelBullet.smokeEffect = E.energyShrapnelSmoke;
EnergyShrapnelBullet.damage = 960;
EnergyShrapnelBullet.length = 280.0;
EnergyShrapnelBullet.width = 15.0;

EnergyShrapnelBullet.absorbable = false;
EnergyShrapnelBullet.reflectable = false;
EnergyShrapnelBullet.hittable = false;

EnergyShrapnelBullet.serrations = 10;
EnergyShrapnelBullet.serrationLenScl = 20.0;
EnergyShrapnelBullet.serrationSpacing = 20.0;
EnergyShrapnelBullet.serrationWidth = 5.6;
EnergyShrapnelBullet.serrationFadeOffset = 0.8;
EnergyShrapnelBullet.serrationSpaceOffset = 260.0;

EnergyShrapnelBullet.fromColor = C.unitOrangeLight;
EnergyShrapnelBullet.toColor = C.unitOrangeDark;

EnergyShrapnelBullet.hitSize = 8.0;
EnergyShrapnelBullet.hitShake = 2.5;

EnergyShrapnelBullet.status = S.curse;
EnergyShrapnelBullet.statusDuration = 60.0 * 15.0;
EnergyShrapnelBullet.splashDamageRadius = 40.0;
EnergyShrapnelBullet.splashDamage = 0.0;


const PierceBullet = extend(BasicBulletType, {});
PierceBullet.speed = 10.5; 
PierceBullet.damage = 240;
PierceBullet.pierceBuilding = true;
PierceBullet.reflectable = false;
PierceBullet.pierceCap = 4;
PierceBullet.width = 13.0;
PierceBullet.height = 20.0;
PierceBullet.hitSize = 10.0;
PierceBullet.lifetime = PierceBullet.lifetime * 1.5;

PierceBullet.knockback = 1.08;
PierceBullet.hitColor = DarkRedBrown;
PierceBullet.backColor = C.unitOrangeDark;
PierceBullet.frontColor = C.unitOrangeLight;

PierceBullet.status = S.curse;
PierceBullet.statusDuration = 60.0 * 15.0;
PierceBullet.splashDamageRadius = 40.0;
PierceBullet.splashDamage = 0.0;

/////
/////
/////

const OctalBullet = extend(BasicBulletType, {
    draw(b) {
    	var rad = b.data == null ? 24.0 : 5.0 + b.data[0] * 1.9;
    
        Draw.color(C.unitOrangeLight, C.unitOrangeDark, b.fin());
        Fill.circle(b.x, b.y, rad/10.0 + b.fout() * rad); 
    }, 
    
    hit(b, x, y) {
    	if(b.data == null) b.data = [10, b];
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
        
        if(b.data != null && b.data[0] > 0) {
        	b.data[0]--;
        
            for(var i = 0; i < 2; i++) {
	            var bullet = b.type.create(b, b.x, b.y, Mathf.random(360.0));
	            bullet.data = b.data;
	            bullet.damage = 120.0 + 120.0 * b.data[0];
	            bullet.vel.scl(0.05 + 0.08 * b.data[0]);
	        } 
        } 
    } 
});
OctalBullet.speed = 5.0; 
OctalBullet.damage = 1500;
OctalBullet.pierceBuilding = true;
OctalBullet.reflectable = false;
OctalBullet.width = 13.0;
OctalBullet.height = 20.0;
OctalBullet.hitSize = 10.0;
OctalBullet.lifetime = 50;

OctalBullet.hitColor = DarkRedBrown;
OctalBullet.backColor = C.unitOrangeDark;
OctalBullet.frontColor = C.unitOrangeLight;

OctalBullet.status = S.curse;
OctalBullet.statusDuration = 60.0 * 15.0;
OctalBullet.splashDamageRadius = 40.0;
OctalBullet.splashDamage = 0.0;

const OctalBlackWeapon = extendContent(Weapon, "leviathan-octal-weapon", {});
OctalBlackWeapon.reload = 5000.0;
OctalBlackWeapon.alternate = false;
OctalBlackWeapon.mirror = false;
OctalBlackWeapon.rotate = true;
OctalBlackWeapon.bullet = OctalBullet;
OctalBlackWeapon.shots = 3;
OctalBlackWeapon.shotDelay = 10;
OctalBlackWeapon.velocityRnd = 0.3;
OctalBlackWeapon.shootSound = Sounds.beam;

OctalBlackWeapon.spacing = 0;
OctalBlackWeapon.shake = 10.0;
OctalBlackWeapon.shootCone = 0;
OctalBlackWeapon.recoil = 0.0;
OctalBlackWeapon.x = -7.0;
OctalBlackWeapon.y = 0.0;
OctalBlackWeapon.shootY = 18.0;

const Leviathan = extendContent(UnitType, "leviathan", {  
    _smallDistortions: smallDistortions,
    _largeDistortions: largeDistortions, 
    _distortions: distortions,
    draw(unit){
    	if(Mathf.random() >= 0.99) { 
    	    var rot = unit.rotation-90;
    	    var v = new Vec2();
            v.trns(Mathf.random() >= 0.5 ? rot - 90 : rot + 90, Mathf.random() >= 0.5 ? 40 + Mathf.random(40.0) : -40 - Mathf.random(40.0));
            
            createSwords(unit.x + v.x, unit.y + v.x, Mathf.round(Mathf.random(8.0)), 3.0, 12.0);
    	};
    
        var z = unit.elevation > 0.5 ? (this.lowAltitude ? Layer.flyingUnitLow : Layer.flyingUnit) : this.groundLayer + Mathf.clamp(this.hitSize / 4000.0, 0, 0.01);

        unit.heal(150.0/60.0);
        
        Draw.z(Math.max(10, z - 15));
        Draw.color(Pal.shadow);
        var e = (unit.health/4000.0)/20.0;
        Draw.rect(Vars.content.getByName(ContentType.unit, "collos-leviathan").icon(Cicon.full), unit.x - e, unit.y - e, unit.rotation - 90);
        Draw.color();

        if(unit.controller.isBeingControlled(Vars.player.unit())){
            this.drawControl(unit);
        };

        Draw.z(Math.min(z - 0.01, Layer.bullet - 1.0));

        this.drawOcclusion(unit);

        Draw.z(z - this.outlineSpace);

        this.drawOutline(unit);

        Draw.z(z);
        this.drawBody(unit);

        this.applyColor(unit);

        Draw.color(this.cellColor(unit));
        Draw.rect(this.cellRegion, unit.x, unit.y, unit.rotation - 90);
        Draw.reset();

        //draw back items
        if(unit.item() != null && unit.itemTime > 0.01){
            var size = (this.itemSize + Mathf.absin(Time.time, 5.0, 1.0)) * unit.itemTime;

            Draw.mixcol(Pal.accent, Mathf.absin(Time.time, 5.0, 0.5));
            Draw.rect(unit.item().icon(Cicon.medium),
            unit.x + Angles.trnsx(unit.rotation + 180.0, this.itemOffsetY),
            unit.y + Angles.trnsy(unit.rotation + 180.0, this.itemOffsetY),
            size, size, unit.rotation);

            Draw.mixcol();

            Lines.stroke(1.0, Pal.accent);
            Lines.circle(
            unit.x + Angles.trnsx(unit.rotation + 180.0, this.itemOffsetY),
            unit.y + Angles.trnsy(unit.rotation + 180.0, this.itemOffsetY),
            (3.0 + Mathf.absin(Time.time, 5.0, 1.0)) * unit.itemTime);

            if(unit.isLocal() && !Vars.renderer.pixelator.enabled()){
                Fonts.outline.draw(unit.stack.amount + "",
	                unit.x + Angles.trnsx(unit.rotation + 180.0, this.itemOffsetY),
	                unit.y + Angles.trnsy(unit.rotation + 180.0, this.itemOffsetY) - 3,
	                Pal.accent, 0.25 * unit.itemTime / Scl.scl(1.0), false, Align.center
                );
            };

            Draw.reset();
        };

        if(this.lightRadius > 0){
            Drawf.light(unit.team, unit.x, unit.y, this.lightRadius, this.lightColor, this.lightOpacity);
        };

        this.drawWeapons(unit);

        if(unit.shieldAlpha > 0 && this.drawShields){
            this.drawShield(unit);
        };

        if(unit.abilities.size > 0){
            for(var i = 0; i < unit.abilities.size; i++){
                Draw.reset();
                
                unit.abilities.get(i).draw(unit);
            };

            Draw.reset();
        };

        this.drawBlackHole(unit);
    },

    drawBlackHole(unit){  
        var v = new Vec2();
        v.trns(unit.rotation, 7);

        var speed = Mathf.clamp(25000.0/unit.health, 0.0, 2.5);
		var size = 1.0 + Mathf.sin(Time.time*(speed)) * 0.1;
		var speed2 = 1.0 + speed * 0.05;
        var speed2 = Mathf.clamp(speed2, 1.0, 25000000.0);

        Draw.xscl = size*0.85;
        Draw.yscl = size*0.85;
        Draw.rect(Core.atlas.find("collos-black-hole-base"), unit.x - v.x, unit.y - v.y, Time.time); 
        Draw.xscl = 1.0;
        Draw.yscl = 1.0;
        for(var i = 0; i < this._distortions.length; i++) {
	        var vec = new Vec2();
            var rot = i*72 + this._distortions[i][2];
	        vec.trns(rot, size*5.0);

            var distortion = distortions[i][0];

	        Draw.rect(Core.atlas.find(distortion), unit.x - v.x + vec.x, unit.y - v.y + vec.y, rot-90); 
            this._distortions[i][2] += this._distortions[i][1]+speed2;
        };

        for(var i = 0; i < this._smallDistortions.length; i++) {
	        var vec = new Vec2();
            var rot = i*51+this._smallDistortions[i][2];
	        vec.trns(rot, size*5.0);

            var smallDistortion = this._smallDistortions[i][0];

	        Draw.rect(Core.atlas.find(smallDistortion), unit.x - v.x + vec.x, unit.y - v.y + vec.y, rot-90); 
            this._smallDistortions[i][2] += this._smallDistortions[i][1]+speed2;
        };

        for(var i = 0; i < this._largeDistortions.length; i++) {
	        var vec = new Vec2();
            var rot = i*90+this._largeDistortions[i][2];
	        vec.trns(rot, size*5.0);

            var largeDistortion = this._largeDistortions[i][0];

	        Draw.rect(Core.atlas.find(largeDistortion), unit.x - v.x + vec.x, unit.y - v.y + vec.y, rot-90); 
            this._largeDistortions[i][2] += this._largeDistortions[i][1]+speed2;
        };

        Draw.xscl = 1.0;
        Draw.yscl = 1.0;
    }
});
Leviathan.health = 1000000;
Leviathan.hitSize = 140;
Leviathan.range = 1000;
Leviathan.mass = 150;

Leviathan.baseRotateSpeed = 0.6;
Leviathan.rotateSpeed = 0.65;
Leviathan.rotateShooting = false;
Leviathan.accel = 0.4;
Leviathan.visualElevation = -24.0;

Leviathan.speed = 0.3;
Leviathan.drag = 0.1;

Leviathan.armor = 72;
Leviathan.commandLimit = 2;

function createCoilWeapon(x, y) {
	const CoilWeapon = extendContent(Weapon, "coil-weapon", {
	    load() {
	        this.outlineRegion = Core.atlas.find("collos-coil-weapon");
	        this.heatRegion = Core.atlas.find("collos-coil-weapon-heat");
	        this.region = Core.atlas.find("collos-coil-weapon");
	    } 
	});
	CoilWeapon.cooldownTime = 50.0;
	CoilWeapon.reload = 45.0;
	CoilWeapon.alternate = true;
	CoilWeapon.rotate = true;
	CoilWeapon.mirror = false;
	CoilWeapon.top = false;
	CoilWeapon.bullet = EnergyShrapnelBullet;
	CoilWeapon.shootSound = Sounds.laser;
	
	CoilWeapon.rotateSpeed = 2.2; 
	CoilWeapon.spacing = 0;
	CoilWeapon.shake = 3.0;
	CoilWeapon.shootCone = 0;
	CoilWeapon.recoil = 4.0;
	CoilWeapon.inaccuracy = 2;

	CoilWeapon.range = 210;
	CoilWeapon.shots = 1;
	
	CoilWeapon.x = x;
	CoilWeapon.y = y;
	CoilWeapon.shootY = 18.0;

    CoilWeapon.heatColor = DarkRedBrown;
    CoilWeapon.ejectEffect = Fx.none;

    return CoilWeapon;
};

function createHealWeapon(x, y) {
	const HealWeapon = extendContent(Weapon, "heal-weapon", {
	    load() {
	        this.outlineRegion = Core.atlas.find("collos-heal-weapon");
	        this.heatRegion = Core.atlas.find("collos-heal-weapon-heat");
	        this.region = Core.atlas.find("collos-heal-weapon");
	    } 
	});
	HealWeapon.cooldownTime = 20.0;
	HealWeapon.reload = 15.0;
	HealWeapon.alternate = true;
	HealWeapon.rotate = true;
	HealWeapon.mirror = false;
	HealWeapon.top = false;
	HealWeapon.bullet = SmallHealBullet;
	HealWeapon.shootSound = Sounds.laser;
	
	HealWeapon.rotateSpeed = 4.8; 
	HealWeapon.spacing = 0;
	HealWeapon.shake = 0.0;
	HealWeapon.shootCone = 0;
	HealWeapon.recoil = 1.2;
	HealWeapon.inaccuracy = 2;

	HealWeapon.range = 350;
	HealWeapon.shots = 1;
	
	HealWeapon.x = x;
	HealWeapon.y = y;
	HealWeapon.shootY = 6.0;

    HealWeapon.heatColor = Pal.heal;
    HealWeapon.ejectEffect = Fx.none;

    return HealWeapon;
};

function createMissileWeapon(x, y) {
	const MissileWeapon = extendContent(Weapon, "missile-weapon", {
	    load() {
	        this.outlineRegion = Core.atlas.find("collos-missile-weapon");
	        this.heatRegion = Core.atlas.find("collos-missile-weapon-heat");
	        this.region = Core.atlas.find("collos-missile-weapon");
	    } 
	});
	MissileWeapon.cooldownTime = 35.0;
	MissileWeapon.reload = 30;
	MissileWeapon.alternate = true;
	MissileWeapon.rotate = true;
	MissileWeapon.mirror = false;
	MissileWeapon.top = false;
	MissileWeapon.bullet = MissileBullet;
	MissileWeapon.shootSound = Sounds.missile;
	
	MissileWeapon.rotateSpeed = 3.4; 
	MissileWeapon.spacing = 0;
	MissileWeapon.shake = 0.0;
	MissileWeapon.shootCone = 0;
	MissileWeapon.recoil = 0.9;
	MissileWeapon.inaccuracy = 2;

	MissileWeapon.range = 300;
	MissileWeapon.shots = 1;
	
	MissileWeapon.x = x;
	MissileWeapon.y = y;
	MissileWeapon.shootY = 6.0;
	MissileWeapon.xRand = 4.0;

    MissileWeapon.heatColor = Pal.heal;
    MissileWeapon.ejectEffect = Fx.none;

    return MissileWeapon;
};

function createArtilleryWeapon(x, y) {
	const ArtilleryWeapon = extendContent(Weapon, "artillery-weapon", {
	    load() {
	        this.outlineRegion = Core.atlas.find("collos-artillery-weapon");
	        this.heatRegion = Core.atlas.find("collos-artillery-weapon-heat");
	        this.region = Core.atlas.find("collos-artillery-weapon");
	    } 
	});
    ArtilleryWeapon.cooldownTime = 12;
	ArtilleryWeapon.reload = 10;
	ArtilleryWeapon.alternate = true;
	ArtilleryWeapon.rotate = true;
	ArtilleryWeapon.mirror = false;
	ArtilleryWeapon.top = false;
	ArtilleryWeapon.bullet = PierceBullet;
	ArtilleryWeapon.shootSound = Sounds.shoot;
	
	ArtilleryWeapon.rotateSpeed = 1.5; 
	ArtilleryWeapon.spacing = 0;
	ArtilleryWeapon.shake = 0.0;
	ArtilleryWeapon.shootCone = 0;

	ArtilleryWeapon.recoil = 2.4;
	ArtilleryWeapon.inaccuracy = 8;
	ArtilleryWeapon.velocityRnd = 0.1;

	ArtilleryWeapon.range = 380.0;
	ArtilleryWeapon.shots = 1;
	
	ArtilleryWeapon.x = x;
	ArtilleryWeapon.y = y;
	ArtilleryWeapon.shootY = 12.0;

    ArtilleryWeapon.heatColor = DarkRedBrown;
    ArtilleryWeapon.ejectEffect = Fx.none;

    return ArtilleryWeapon;
};

function createPierceWeapon(x, y) {
	const PierceWeapon = extendContent(Weapon, "pierce-weapon", {
	    load() {
	        this.outlineRegion = Core.atlas.find("collos-pierce-weapon");
	        this.heatRegion = Core.atlas.find("collos-pierce-weapon-heat");
	        this.region = Core.atlas.find("collos-pierce-weapon");
	    } 
	});
    PierceWeapon.cooldownTime = 55;
	PierceWeapon.reload = 50;
	PierceWeapon.alternate = true;
	PierceWeapon.rotate = true;
	PierceWeapon.mirror = false;
	PierceWeapon.top = false;
	PierceWeapon.bullet = FireArtilleryBullet;
	PierceWeapon.shootSound = Sounds.artillery;
	
	PierceWeapon.rotateSpeed = 1.2; 
	PierceWeapon.spacing = 0;
	PierceWeapon.shake = 0.0;
	PierceWeapon.shootCone = 0;

	PierceWeapon.recoil = 1.2;
	PierceWeapon.inaccuracy = 12;
	PierceWeapon.velocityRnd = 0.3;

	PierceWeapon.range = 280;
	PierceWeapon.shots = 2;
	
	PierceWeapon.x = x;
	PierceWeapon.y = y;
	PierceWeapon.shootY = 12.0;

    PierceWeapon.heatColor = DarkRedBrown;
    PierceWeapon.ejectEffect = Fx.none;

    return PierceWeapon;
};

Leviathan.weapons.add(
    GiantLaserWeapon, 
    OctalBlackWeapon 
);
Leviathan.weapons.add(
    createCoilWeapon(26.0, 105.0),
    createCoilWeapon(52.0, 76.0), 
    createCoilWeapon(-26.0, 105.0),
    createCoilWeapon(-52.0, 76.0)
);
Leviathan.weapons.add(
    createMissileWeapon(36.0, 44.0), 
    createMissileWeapon(-36.0, 44.0),
    createMissileWeapon(44.0, -48.0), 
    createMissileWeapon(-44.0, -48.0)
);
Leviathan.weapons.add(
    createHealWeapon(-28.0, 8.0),
    createHealWeapon(28.0, 8.0),
    createHealWeapon(-25.5, 59.0),
    createHealWeapon(25.5, 59.0) 
); 

Leviathan.weapons.add(
    createArtilleryWeapon(-56.0, 28.0),
    createArtilleryWeapon(56.0, 28.0), 
    createArtilleryWeapon(-60.0, -16.0),
    createArtilleryWeapon(60.0, -16.0)
); 

Leviathan.weapons.add(
    createPierceWeapon(0.0, 48.0),
    createPierceWeapon(-48.0, -96.0), 
    createPierceWeapon(48.0, -96.0),
); 

Leviathan.constructor = () => { 
	const unit = extend(UnitWaterMove, {
	    damage(amount){
		     this.super$damage(amount/10.0)
	    }
	});
	
	return unit
};

Leviathan.ammoCapacity = 3250;

Leviathan.trailX = 37.0;
Leviathan.trailY = -104.0;
Leviathan.trailScl = 3.5;
Leviathan.trailLength = 120.0;
Leviathan.trailColor = Blocks.water.mapColor.cpy().mul(1.5);

Leviathan.targetFlag = BlockFlag.generator;

Leviathan.lightRadius = 320;
Leviathan.lightOpacity = 0.8;
Leviathan.lightColor = DarkRedBrown;

Leviathan.abilities.add(
    new UnitSpawnAbility(UnitTypes.zenith, 1200, -29.0, -88), 
    new UnitSpawnAbility(UnitTypes.zenith, 1200, 29.0, -88),
    new UnitSpawnAbility(UnitTypes.zenith, 1320, -58.5, -77.0),
    new UnitSpawnAbility(UnitTypes.zenith, 1320, 58.5, -77.0)
);
