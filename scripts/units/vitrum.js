const F = require("functions/f");

const FragVitrumBullet = extend(LiquidBulletType, {});
FragVitrumBullet.hitEffect = Fx.none;
FragVitrumBullet.despawnEffect = Fx.none;
FragVitrumBullet.speed = 0.9;
FragVitrumBullet.damage = 30;
FragVitrumBullet.liquid = Vars.content.getByName(ContentType.liquid, "colloseusmod-lava-liquid");

const VitrumBullet = extend(MissileBulletType, {
	hit(b, x, y){
        if(Mathf.chance(0.1)) Puddle.deposit(Vars.world.tileWorld(b.x, b.y), F.fl("lava-liquid"), Mathf.random(20.0, 70.0)); 
		for(var i = 0; i < 10; i++){
			Bullet.create(this.frags[Mathf.round(Mathf.random(0, 1))], b, b.x, b.y, b.rot() + Mathf.range(360.0), Mathf.random(0.25, 0.5));
		}
	},

    despawned(b){
        this.hit(b, b.x, b.y);
    }
});

VitrumBullet.frags = [FragVitrumBullet, Bullets.slagShot];
VitrumBullet.hitEffect = Fx.none;
VitrumBullet.despawnEffect = Fx.none;
VitrumBullet.speed = 10;
VitrumBullet.bulletWidth = 15;
VitrumBullet.bulletHeight = 29;
VitrumBullet.incendAmount = 10;
VitrumBullet.incendSpread = 7.5;
VitrumBullet.incendChance = 1.0;
VitrumBullet.damage = 160;
VitrumBullet.homingRange = 80;
VitrumBullet.fragBullets = 7;
VitrumBullet.fragBullet = FragVitrumBullet;

const VitrumWeap = extendContent(Weapon, "vitrum-weapon", {
	load: function(){
		this.region = Core.atlas.find("colloseusmod-vitrum-weapon");
	}
});

VitrumWeap.reload = 20;
VitrumWeap.alternate = false;
VitrumWeap.bullet = VitrumBullet;
VitrumWeap.shootEffect = Fx.none;
VitrumWeap.smokeEffect = Fx.none;
VitrumWeap.inaccuracy = 15;
VitrumWeap.shots = 3;
VitrumWeap.shootDelay = 2.5;
VitrumWeap.length = 0;
VitrumWeap.shake = 5.0;
VitrumWeap.ignoreRotation = true;
VitrumWeap.shootCone = 3;
VitrumWeap.recoil = 5.0;

const VitrumBase = prov(() => new JavaAdapter(HoverUnit, {
    getPowerCellRegion(){
	    return Core.atlas.find("colloseusmod-vitrum-cell");
    },

    drawStats(){
        Draw.color(Color.black, this.team.color, this.healthf() + Mathf.absin(Time.time(), Math.max(this.healthf() * 5, 1), 1 - this.healthf()));
        Draw.rect(this.getPowerCellRegion(), this.x, this.y, this.rotation-90);
        Draw.color();
    }
}));

const Vitrum = extendContent(UnitType, "vitrum", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	}
});

Vitrum.engineSize = 0.0;
Vitrum.weapon = VitrumWeap;
Vitrum.create(VitrumBase);
Vitrum.health = 63500;
Vitrum.hitsize = 40;
Vitrum.speed = 0.025;
Vitrum.flying = true;
Vitrum.range = 720;
Vitrum.mass = 70;
Vitrum.maxVelocity = 0.36;
Vitrum.attackLength = 350;
Vitrum.baseRotateSpeed = 0.25;
Vitrum.drag = 0.02;  