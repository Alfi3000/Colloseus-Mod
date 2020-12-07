const F = require("func");
const E = this.global.EFFECTS;

const createFireBullet = item => {
	const bullet = extend(BasicBulletType, {
	    hit(b, x, y){
	    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
	        this.hitSound.at(b);
        
	        Damage.createIncend(b.x, b.y, Mathf.clamp(item.flammability*5.0, 2.0, 12.0), Mathf.clamp(Mathf.round(item.flammability*5.0), 0, 10));
	    }, 

	    despawned(b){
	        this.hit(b, b.x, b.y);
	    }, 

		update(b){
			this.super$update(b);
			
			if(Mathf.chance((Mathf.clamp(item.flammability / 2.0, 0.2, 0.6)) * Time.delta)){
				this.trailEffect.at(b.x + Mathf.range(Mathf.clamp(item.flammability*12.0, 1.0, 8.0)), b.y + Mathf.range(Mathf.clamp(item.flammability*12.0, 1.0, 8.0)), b.rotation);
			};
		},
		
		draw(b){
			Draw.color(Pal.lightFlame, Pal.darkFlame, b.fin());
			Fill.circle(b.x, b.y, Mathf.clamp(item.flammability) + b.fin() * Mathf.clamp(item.flammability, 0.0, 3.0)*1.5);
			Draw.reset();
		}
	});
	bullet.damage = 10.0 + item.flammability * 10.0;
	bullet.speed = 2.5;
	bullet.lifetime = 45;
	bullet.statusDuration = Mathf.clamp(item.flammability * 300.0, 60.0, 300.0);
	bullet.status = StatusEffects.burning;
	bullet.collides = true;
	bullet.collidesTiles = true;
	bullet.collidesAir = true;
	bullet.pierce = true;
	bullet.trailEffect = Fx.ballfire;
	bullet.hitEffect = Fx.hitFlameSmall;
	bullet.despawnEffect = Fx.none;
	bullet.hitColor = Pal.darkFlame;
	bullet.shootEffect = Fx.none;
	return bullet
} 
	
const Fox = extendContent(ItemTurret, "fox", {});
Fox.size = 2;
Fox.health = 1850;
Fox.reload = 6;
Fox.range = 100;
Fox.inaccuracy = 10;
Fox.recoil = 2.5;
Fox.rotatespeed = 3.5;
Fox.shootSound = Sounds.flame;

var ammo = new ObjectMap();
Vars.content.items().each(
    cons(item => { 
		if(item.flammability >= 0.5 || item.name == "collos-ruby") ammo.put(item, createFireBullet(item));
	})
);
Fox.ammoTypes = ammo;
Fox.buildVisibility = BuildVisibility.shown;
Fox.category = Category.turret 
Fox.requirements = ItemStack.with(F.fi("ruby"), 75, Items.silicon, 45, Items.copper, 60);

F.techNode(Blocks.duo, Fox, ItemStack.with(F.fi("ruby"), 10000, Items.silicon, 6500, Items.copper, 8000));

//////
//////
//////
