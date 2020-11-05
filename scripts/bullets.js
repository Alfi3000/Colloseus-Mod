const F = require("func");
const C = this.global.COLORS;
const E = this.global.EFFECTS;

function nfb(range, amount, change, range2, startSize, multiplier, damage, speed, lifetime, statusDuration, hitSize){
    const bullet = extend(BasicBulletType, {
	    hit(b, x, y){
	        Damage.createIncend(b.x, b.y, range, amount);
	    }, 

	    despawned(b){
	        this.hit(b, b.x, b.y);
	    }, 

		update(b){
			this.super$update(b);
			
			if(Mathf.chance(change * Time.delta())){
				Effects.effect(this.trailEffect, this.backColor, b.x + Mathf.range(range2), b.y + Mathf.range(range2), b.rot());
			};
		},
		
		draw(b){
			Draw.color(Pal.lightFlame, Pal.darkFlame, b.fin());
			Fill.circle(b.x, b.y, startSize + b.fslope() * multiplier);
			Draw.reset();
		}
    });
	bullet.damage = damage;
	bullet.speed = speed;
	bullet.lifetime = lifetime;
	bullet.shootEffect = Fx.none;
	bullet.smokeEffect = Fx.none;
	bullet.trailEffect = Fx.ballfire;
	bullet.hitEffect = Fx.hitFlameSmall;
	bullet.despawnEffect = Fx.none;
	bullet.statusDuration = statusDuration;
	bullet.status = StatusEffects.burning;
	bullet.collides = true;
	bullet.collidesTiles = true;
	bullet.collidesAir = true;
	bullet.pierce = false;
	bullet.hitSize = hitSize;
    return bullet;
}

function nfbh(range, amount, change, range2, startSize, multiplier, damage, speed, lifetime, statusDuration, hitSize, homingPower, homingRange){
    const bullet = extend(BasicBulletType, {
	    hit(b, x, y){
	        Damage.createIncend(b.x, b.y, range, amount);
	    }, 

	    despawned(b){
	        this.hit(b, b.x, b.y);
	    }, 

		update(b){
			this.super$update(b);
			
			if(Mathf.chance(change * Time.delta())){
				Effects.effect(this.trailEffect, this.backColor, b.x + Mathf.range(range2), b.y + Mathf.range(range2), b.rot());
			};
		},
		
		draw(b){
			Draw.color(Pal.lightFlame, Pal.darkFlame, b.fin());
			Fill.circle(b.x, b.y, startSize + b.fslope() * multiplier);
			Draw.reset();
		}
    });
	bullet.damage = damage;
	bullet.speed = speed;
	bullet.lifetime = lifetime;
	bullet.shootEffect = Fx.none;
	bullet.smokeEffect = Fx.none;
	bullet.trailEffect = Fx.ballfire;
	bullet.hitEffect = Fx.hitFlameSmall;
	bullet.despawnEffect = Fx.none;
	bullet.statusDuration = statusDuration;
	bullet.status = StatusEffects.burning;
	bullet.collides = true;
	bullet.collidesTiles = true;
	bullet.collidesAir = true;
	bullet.pierce = false;
	bullet.hitSize = hitSize;
	bullet.homingPower = homingPower;
	bullet.homingRange = homingRange;
    return bullet;
}

const suppress = b => {
	b.deflect();
	b.time(b.getBulletType().lifetime);
};

function createTwins(startSize, multiplier, damage, speed, lifetime, splashDamage, splashDamageRadius, hitEffect, makeCircle, trailEffect, effectTime){
    const twin = extend(BasicBulletType, {
		draw(b){
			Draw.color(C.magicLight, C.magic, b.fout());
			Fill.circle(b.x, b.y, startSize + b.fout() * multiplier);
			Draw.reset();

            if(trailEffect != Fx.none) {
	            if(b.timer.get(effectTime)) Effects.effect(trailEffect, b.x, b.y);
            };
		},

	    hit(b, x, y){
            Effects.effect(hitEffect, b.x, b.y, b.rot());
	        if(b.data != null) {
                b.data.absorb();
                b.data = null;
            }
	    }, 

	    despawned(b){
	        this.hit(b, b.x, b.y);
	    }
    });
	twin.shootEffect = Fx.none;
	twin.smokeEffect = Fx.none;
	twin.despawnEffect = hitEffect;
    twin.splashDamage = splashDamage;
    twin.splashDamageRadius = splashDamageRadius;
    twin.damage = damage;
	twin.speed = 0;

    const bullet = extend(BasicBulletType, {
        _rndRot: Mathf.round(Mathf.random(0.0, 360.0)),
		update(b){
			this.super$update(b);

            if(trailEffect != Fx.none) {
	            if(b.timer.get(effectTime)) Effects.effect(trailEffect, b.x, b.y);
            };
			
            if(b.getData() == null) {
				var bullet = Bullet.create(twin, b.getOwner(), b.getTeam(), b.x + b.velocity().x, b.y + b.velocity().y, b.velocity().angle + Mathf.range(10), Mathf.dst(b.x + b.velocity().x * 3, b.y + b.velocity().y * 3, b.x, b.y));

	            bullet.time(b.time());
	            b.data = bullet;
	            bullet.data = b;
			};
			
            if(b.getData() != null && makeCircle) {
                var v = new Vec2();
                v.trns(b.fout()*720.0, 12);

				b.data.x = b.x + v.x;
				b.data.y = b.y + v.y;
			}
		},

	    hit(b, x, y){
            Effects.effect(hitEffect, b.x, b.y, b.rot());
	        if(this.fragBullet != null) {
		        for(var i = 0; i < this.fragBullets; i++){
		            var bullet = Bullet.create(this.fragBullet, b.getOwner(), b.getTeam(), b.x, b.y, Mathf.random(360.0), Mathf.random(1.0, 2.0));

	                var v = new Vec2();
	                v.trns(Mathf.random(360.0), Mathf.random(0.7, 1.3));

                    bullet.velocity().add(v);
		        };
            };

			if(b.data != null) {
                b.data.absorb();
                b.data = null;
            }
	    }, 

	    despawned(b){
            Effects.effect(hitEffect, b.x, b.y, b.rot());
	        if(this.fragBullet != null) {
		        for(var i = 0; i < this.fragBullets; i++){
		            var bullet = Bullet.create(this.fragBullet, b.getOwner(), b.getTeam(), b.x, b.y, Mathf.random(360.0), Mathf.random(1.0, 2.0));

	                var v = new Vec2();
	                v.trns(Mathf.random(360.0), Mathf.random(0.6, 1.1));

                    bullet.velocity().add(v);
		        };
            };

			if(b.data != null) {
                b.data.absorb();
                b.data = null;
            }
	    },  
		
		draw(b){
			Draw.color(C.magicLight, C.magic, b.fout());
			Fill.circle(b.x, b.y, startSize + b.fout() * multiplier);
			Draw.reset();

            if(b.data != null) {
				Draw.color(C.magicLight, C.magic, b.fout());
				Lines.stroke(startSize + multiplier * b.fout());
				Lines.line(b.data.x, b.data.y, b.x, b.y, CapStyle.none);
				Draw.reset();

                var v = new Vec2();
                v.trns(Time.time(), 16);

				if(!makeCircle) b.data.velocity().setAngle(Mathf.slerpDelta(b.data.velocity().angle(), b.data.angleTo(b), 0.2));
			}
		}
    });
    bullet.splashDamage = splashDamage;
    bullet.splashDamageRadius = splashDamageRadius;
	bullet.damage = damage;
	bullet.speed = speed;
	bullet.lifetime = lifetime == null ? bullet.lifetime : lifetime;
	bullet.shootEffect = Fx.none;
	bullet.smokeEffect = Fx.none;
	bullet.hitEffect = hitEffect;
	bullet.despawnEffect = hitEffect;
    return bullet;
}

this.global.BULLETS.mirrorAmethyst = createTwins(0.7, 2.4, 10, 5.4, null, 50, 5*Vars.tilesize, E.magicHit, false, Fx.none, 0);
this.global.BULLETS.mirrorLead = createTwins(0.6, 2.0, 20, 4.8, null, 20, 3*Vars.tilesize, E.magicHit, false, Fx.none, 0);

this.global.BULLETS.recoursiPlast = createTwins(0.8, 3.0, 80, 6.3, null, 60, 5*Vars.tilesize, E.magicHit, true, Fx.none, 0);
this.global.BULLETS.recoursiLead = createTwins(0.6, 2.2, 50, 6.3, null, 45, 3*Vars.tilesize, E.magicHit, true, Fx.none, 0);
this.global.BULLETS.recoursiAmethyst = createTwins(0.7, 2.6, 60, 5.8, null, 50, 4*Vars.tilesize, E.magicHit, true, Fx.none, 0);

this.global.BULLETS.hareLux = createTwins(2.2, 4.4, 80, 6.3, 70, 50, 5*Vars.tilesize, E.magicHitBig, false, E.magicBulletTrail, 10);
this.global.BULLETS.hareSurge = createTwins(2.0, 4.1, 50, 6.3, 70, 40, 3*Vars.tilesize, E.magicHitBig, false, E.magicBulletTrail, 10);
this.global.BULLETS.hare = createTwins(1.6, 3.8, 40, 3.0, 64, 35, 3*Vars.tilesize, E.magicHitBig, false, E.magicBulletTrail, 10);
this.global.BULLETS.hareLux.fragBullet = this.global.BULLETS.hare;
this.global.BULLETS.hareSurge.fragBullet = this.global.BULLETS.hare;
this.global.BULLETS.hareLux.fragBullets = 5;
this.global.BULLETS.hareSurge.fragBullets = 5;

this.global.BULLETS.magicTwinsBullet = createTwins(0.7, 2.8, 70, 5.0, 45, 40, 5*Vars.tilesize, E.magicBulletHit, true, E.magicBulletTrail, 0);

this.global.BULLETS.fireBomberBullet = nfb(0.3, 1, 0.2, 8, 0.5, 1.8, 25, 0.7, 20, 300, 8);
this.global.BULLETS.flameBullet = nfb(0.3, 1, 0.1, 1, 0.35, 1.4, 10, 2.5, 60, 300, 2);

this.global.BULLETS.foxCoal = nfb(0.5, 1, 0.2, 2, 0.34, 1.5, 6, 2.3, 60, 180, 2);
this.global.BULLETS.foxRuby = nfb(1.0, 2, 0.35, 3, 0.37, 1.6, 8, 2.6, 60, 240, 3);
this.global.BULLETS.foxPyratite = nfb(1.5, 3, 0.5, 4, 0.4, 1.7, 11, 3.3, 60, 300, 4);

this.global.BULLETS.napalmCoal = nfb(1.0, 2, 0.3, 2, 0.4, 1.5, 17, 3.0, 60, 300, 3);
this.global.BULLETS.napalmRuby = nfb(2.0, 3, 0.35, 2, 0.45, 1.6, 19, 3.5, 60, 240, 4);
this.global.BULLETS.napalmPyratite = nfb(3.0, 4, 0.4, 4, 0.5, 1.7, 21, 4.0, 60, 300, 5);
this.global.BULLETS.napalmBlast = nfb(8.0, 10, 0.35, 4, 0.6, 2.0, 26, 4.5, 60, 300, 7);

this.global.BULLETS.twinkleCoal = nfbh(2.0, 4, 0.3, 2, 0.5, 1.5, 34, 3.5, 60, 300, 4, 0.02, 80);
this.global.BULLETS.twinkleRuby = nfbh(3.5, 5, 0.35, 3, 0.55, 1.6, 36, 4.5, 60, 300, 5, 0.01, 120);
this.global.BULLETS.twinklePyratite = nfbh(5.0, 6, 0.4, 4, 0.6, 1.7, 40, 4.3, 60, 300, 6, 0.02, 80);
this.global.BULLETS.twinkleBlast = nfbh(8.0, 10, 0.45, 5, 0.65, 2.0, 50, 4.0, 60, 300, 7, 0.01, 120);

this.global.BULLETS.electraMechBullet = nfbh(2.0, 10, 0.3, 2, 0.5, 1.7, 20, 5.0, 120, 600, 8, 0.01, 200);

function newTriB(damage, bulletWidth, rowWidth, rowAngle, laserRange, offset, rows, rowOffset, speed, lifetime){
    const bullet = extend(BasicBulletType, {
		update(b){
	        if(b.timer.get(6)){
		        Damage.collideLine(b, b.getTeam(), Fx.hitLancer, b.x, b.y, b.rot(), laserRange/2 + b.fin() * offset);
	        }
		}, 
	
	    draw(b){
	        Draw.color(C.angel);
	
	        for(var i = 0; i < rows; i++){
	            Tmp.v1.trns(b.rot(), i * rowOffset + b.fout() * speed);
	            var sl = Mathf.clamp(b.fout() - 0.5) * (laserRange + b.fin() * offset - i * 6.0);
	            Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, rowWidth, sl, b.rot() + rowAngle);
	            Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, rowWidth, sl, b.rot() - rowAngle);
	        };
	
	        Drawf.tri(b.x, b.y, 17 * b.fout() * bulletWidth, laserRange + b.fin() * offset, b.rot());
	        Drawf.tri(b.x, b.y, 17 * b.fout() * bulletWidth , 20, b.rot() + 180);
	        Draw.reset();
		}
    });
	bullet.damage = damage;
	bullet.speed = speed;
	bullet.lifetime = lifetime;
	bullet.shootEffect = Fx.none;
	bullet.smokeEffect = Fx.none;
	bullet.hitEffect = Fx.none;
	bullet.despawnEffect = Fx.none;
	bullet.collides = false;
	bullet.collidesTiles = false;
	bullet.collidesAir = false;
	bullet.pierce = true;
    return bullet;
}

this.global.BULLETS.rapierPlast = newTriB(90, 1.0, 7.5, 70, 60, 40, 10, 6, 1.5, 96);
this.global.BULLETS.rapierDiamond = newTriB(60, 1.0, 5.0, 90, 50, 35, 7, 6, 1.5, 96);

this.global.BULLETS.spikePlast = newTriB(95, 1.0, 6.0, 95, 120, 40, 8, 10, 2.5, 96);
this.global.BULLETS.spikeLux = newTriB(125, 1.6, 9.0, 105, 200, 60, 8, 20, 1.5, 160);
this.global.BULLETS.spikeDiamond = newTriB(75, 1.0, 5.0, 90, 100, 30, 7, 8, 2.5, 96);
this.global.BULLETS.spikeSurge = newTriB(100, 1.0, 7.0, 70, 130, 45, 10, 10, 2.5, 96);
this.global.BULLETS.spikePallPlate = newTriB(115, 2.0, 7.6, 120, 160, 50, 7, 14, 2.5, 96);
