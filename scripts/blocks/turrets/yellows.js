var LaserLenght = 320
const F = require("functions/f");

const SquareCharge = newEffect(90, e => {
    Draw.color(Color.valueOf("#FFE93D"));
    Lines.stroke(e.fin()*11.0);      
    Lines.square(e.x, e.y, e.fin(), Time.time()*4);
    Draw.color();
});

const laser2 = extend(BasicBulletType,{
    draw(b) {
		
		const colors = [Color.valueOf("#FFE93D44"), Color.valueOf("FFE93D66"), Color.valueOf("FFE93D99"), Color.valueOf("#FFF43D"), Color.valueOf("#FFD53D"), Color.valueOf("ffffff")];
		const tscales = [1.4, 1.1, 0.9, 0.55];
		const strokes = [1.3, 1.2, 1.1, 0.9, 0.72, 0.5];
		const lenscales = [1.0, 1.10, 1.15, 1.167];
		const tmpColor = new Color(); //.shiftHue((s * 17) + (Time.time() * 2.0)) 

		for(var s = 0; s < 6; s++){
			
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.2, 0.4)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 1.0) * 34.0);
				Lines.stroke((8 + Mathf.absin(Time.time() + (2 * s), 1.9, 1.3)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), 180 * b.fout() * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
 },
 
     update(b){
		if(b.timer.get(12)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), 180.0, false);
		};
	},
});

laser2.hitEffect = Fx.hitLancer;
laser2.despawnEffect = Fx.none;
laser2.pierce = true;
laser2.lifetime = 16;
laser2.damage = 20;
laser2.speed = 0.001;
 
 const Dbl = extendContent(PowerTurret, "yellow1-laser-turret", {});
Dbl.shootType = laser2;
Dbl.health = 2370;
Dbl.reload = 10;
Dbl.powerUse = 2.0;
Dbl.shotWidth = 8.0;
Dbl.size = 3;
Dbl.inaccuracy = 5;
Dbl.range = 200;
Dbl.buildCostMultiplier = 0.8;
Dbl.requirements(Category.turret, ItemStack.with(F.fi("topaz"), 80, Items.silicon, 55, Items.titanium, 40, Items.plastanium, 35));

const l = extend(BasicBulletType,{
    draw(b) {
        Draw.color(Color.valueOf("#FFE93D44"));
        Lines.stroke(11.0);      
        Lines.square(b.x, b.y, 11.0, Time.time()*4);
        Draw.color();     
        Draw.color(Color.valueOf("#FFE93D"));
        Lines.stroke(9.0);      
        Lines.square(b.x, b.y, 9.0, Time.time()*4);
        Draw.color();     
        Draw.color(Color.valueOf("#FFFFFF"));
        Lines.stroke(5.0);      
        Lines.square(b.x, b.y, 3.5, Time.time()*4);
        Draw.color();     
    },
 
    update(b){
        if(b.timer.get(3)){
            Damage.damage(b.getTeam(), b.x, b.y, 4*Vars.tilesize, this.damage);
        }
    }
});

l.hitEffect = Fx.hitMeltdown;
l.despawnEffect = Fx.none;
l.pierce = false;
l.collidesTiles = false;
l.collides = false;
l.hittable = false;
l.damage = 320;
l.speed = 15.0;
 
 const t = extendContent(ChargeTurret,"laser-turret",{
	load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("colloseusmod-block-" + this.size);
		/////this.heatRegion = Core.atlas.find(this.name + "-heat");
	},
	
	generateIcons: function(){
		return [
			Core.atlas.find("colloseusmod-block-" + this.size),
			Core.atlas.find(this.name)
		];
    }
});

t.shootType = l;
t.chargeEffect = SquareCharge;
t.targetAir = true;
t.targetFalse = true;
t.inaccuracy = 0;
t.powerUse = 20;
t.reload = 240;
t.ammoUseEffect = Fx.none;
t.recoil = 5;
t.chargeEffects = 1;
t.chargeMaxDelay = 1;
t.chargeTime = 90;
t.range = 360;
t.health = 4375;
t.size = 5;
t.buildCostMultiplier = 0.8;
t.requirements(Category.turret, ItemStack.with(F.fi("topaz"), 375, Items.silicon, 280, F.fi("palladium-plate"), 145, F.fi("lux"), 235, Items.surgealloy, 320));
 
TechTree.create(Blocks.duo, Dbl);
TechTree.create(Dbl, t);
