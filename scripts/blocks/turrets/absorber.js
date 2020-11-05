const F = require("func");
const C = this.global.COLORS;

const YellowBeamFlare = new Effect(30, e => {
  Draw.color(Color.valueOf("FFFFFF44"));
  Draw.alpha(e.fout() * 0.3);
  Draw.blend(Blending.additive);
  Draw.rect("collos-smoke", e.x, e.y, e.fin()*800, e.fin()*800*Mathf.random(1.5, 2.0));
  Draw.blend();
});       
      
const YellowBeamFlare2 = new Effect(30, e => {
  Draw.color(Color.valueOf("FFFFFF44"));
  Draw.alpha(e.fout() * 1);
  Draw.blend(Blending.additive);
  Draw.rect("collos-smoke", e.x, e.y, 50, 50);
  Draw.blend();
});          
      
const YellowBeamFlare3 = new Effect(30, e => {
  Draw.color(Color.valueOf("FFFFFF44"));
  Draw.alpha(e.fout() * 1);
  Draw.blend(Blending.additive);
  Draw.rect("collos-FlareWhite", e.x, e.y, 800*e.fin(), 800*e.fin());
  Draw.blend();
});    

const SunAbsorberLaser = extend(ContinuousLaserBulletType, {
	update: function(b){

		Effect.shake(5.0, 5.0, b.x, b.y);
        
        for(var i = 0; i < 2; i++) {
	        var v = new Vec2();
	        v.trns(b.rotation(), Mathf.random(25.0, 810.0));
	
	        var rot = Mathf.random(1.0) >= 0.5 ? 45 : -45;
	        Lightning.create(b.team, C.energy, 75, b.x + v.x, b.y + v.y, b.rotation()+(rot), Mathf.random(15, 20));
        };

        if(b.timer.get(1, 8)){
            YellowBeamFlare.at(b.x, b.y, b.rotation());
            YellowBeamFlare2.at(b.x, b.y, b.rotation()); 
            YellowBeamFlare3.at(b.x, b.y, b.rotation()); 
            Damage.collideLine(b, b.team, this.hitEffect, b.x, b.y, b.rotation(), 930.0, true);
        }
	}
});

SunAbsorberLaser.oscScl = 1.2;
SunAbsorberLaser.oscMag = 0.8;
SunAbsorberLaser.length = 900.0;
SunAbsorberLaser.width = 28.0;
SunAbsorberLaser.colors = [Color.valueOf("FFE93D44"), Color.valueOf("FFE93D66"), Color.valueOf("FFF43D99"), Color.white];
SunAbsorberLaser.strokes = [1.0, 0.85, 0.7, 0.5];
SunAbsorberLaser.tscales = [1.4, 1.1, 0.9, 0.55];
SunAbsorberLaser.lenscales = [0.8, 0.92, 0.98, 1.01];
SunAbsorberLaser.damage = 380;
SunAbsorberLaser.hitEffect = Fx.hitMeltdown;
SunAbsorberLaser.despawnEffect = Fx.none;
SunAbsorberLaser.hitSize = 28.0;
SunAbsorberLaser.drawSize = 1100; //870+130
SunAbsorberLaser.shootEffect = Fx.none;
SunAbsorberLaser.smokeEffect = Fx.none;

const SunAbsorber = extendContent(LaserTurret, "absorber", {
	load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("collos-block-" + this.size);
	},
	
	generateIcons: function(){
		return [
			Core.atlas.find("collos-block-" + this.size),
			Core.atlas.find(this.name)
		];
    }
});
SunAbsorber.buildVisibility = BuildVisibility.shown;
SunAbsorber.shootType = SunAbsorberLaser;
SunAbsorber.update = true;
SunAbsorber.health = 34500;
SunAbsorber.size = 8;
SunAbsorber.reloadTime = 1200;
SunAbsorber.coolantMultiplier = 2.0;
SunAbsorber.shootDuration = 600;
SunAbsorber.firingMoveFract = 0.0;
SunAbsorber.hasPower = true;
SunAbsorber.hasLiquids = true;
SunAbsorber.range = 870;
SunAbsorber.ammoUseEffect = Fx.none;
SunAbsorber.rotateSpeed = 0.4;
SunAbsorber.recoilAmount = 5.0;
SunAbsorber.restitution = 0.001;
SunAbsorber.powerUse = 225;
SunAbsorber.buildCostMultiplier = 0.3;
SunAbsorber.consumes.liquid(F.fl("helium-liquid"), 0.5);
SunAbsorber.category = Category.turret;
SunAbsorber.requirements = ItemStack.with(F.fi("topaz"), 740, F.fi("laculis"), 230, F.fi("lux"), 320, F.fi("meteorite-plate"), 260, Items.silicon, 550, Items.phaseFabric, 340, Items.surgeAlloy, 465);

SunAbsorber.activeSound = Sounds.beam;
SunAbsorber.activeSoundVolume = 3.0;
SunAbsorber.shootSound = Sounds.laserbig;
SunAbsorber.shootShake = 5.0;
