const F = require("func");
const E = this.global.EFFECTS;
const C = this.global.COLORS;

const GemLightningBullet = extend(LightningBulletType, {}); 
GemLightningBullet.lightningColor = C.diamondDark;
GemLightningBullet.lightningLength = 90;
GemLightningBullet.lightningLengthRand = 15;
GemLightningBullet.damage = 800;
GemLightningBullet.drawSize = 900;

const GemTrailBullet = extend(ArtilleryBulletType, {
    draw(b) {
        Tmp.c1.set(C.diamond.cpy().mul(0.9)).lerp(C.diamondDark, b.fin());
        
    	if(b.data != null) b.data.draw(Tmp.c1, 1.6);
    }, 
    
    update(b) {
        if(this.homingPower > 0.0001 && b.time >= this.homingDelay){
            var target = Units.closestTarget(b.team, b.x, b.y, this.homingRange, boolf(e => (e.isGrounded() && this.collidesGround) || (e.isFlying() && this.collidesAir)), boolf(t => this.collidesGround));
            if(target != null){
                b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target), this.homingPower/5 + this.homingPower * 2 * b.fin()));
            } else if(target == null && this.weaveMag > 0){
	            var scl = Mathf.randomSeed(this.id, 0.9, 1.1);
	            b.vel.rotate(Mathf.sin(b.time + Mathf.PI * this.weaveScale/2.0 * scl, this.weaveScale * scl, this.weaveMag) * Time.delta);
	        } 
        };
    
        var tx = Angles.trnsx(b.rotation, 0.0, 0.0) + b.x;
        var ty = Angles.trnsy(b.rotation, 0.0, 0.0) + b.y;
        if(b.data != null) b.data.update(tx, ty);
        
        b.vel.scl(1.01);
    }, 
    
    despawned(b) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
    
    	b.data = null;
    }, 
    
    hit(b, x, y) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
        
        E.angelLight.at(b.x, b.y, b.rotation(), C.diamondDark);
    } 
});

GemTrailBullet.weaveScale = 4.0;
GemTrailBullet.weaveMag = 3.5;
GemTrailBullet.homingPower = 0.1;
GemTrailBullet.homingRange = 240;
GemTrailBullet.homingDelay = 5;
GemTrailBullet.hitEffect = E.gemLaserHit;
GemTrailBullet.hitColor = C.diamondDark;
GemTrailBullet.speed = 6.5;
GemTrailBullet.damage = 700;
GemTrailBullet.drawSize = 900;
GemTrailBullet.lifetime = 60.0;
GemTrailBullet.despawnEffect = Fx.none;
GemTrailBullet.pierce = true;
GemTrailBullet.collidesAir = true;
GemTrailBullet.shootEffect = Fx.none;
GemTrailBullet.smokeEffect = Fx.none;

const Gem = extendContent(ItemTurret, "gem", {
	init(){
        this.consumes.powerCond(this.powerUse, entity => entity.target != null || entity.wasShooting);
        this.super$init();
    }, 
    
	load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("collos-block-" + this.size);
	},
	
	icons(){
		return [
			Core.atlas.find("collos-block-" + this.size),
			Core.atlas.find(this.name)
		];
	}
});
Gem.buildType = () => {
	const ent = extendContent(ItemTurret.ItemTurretBuild, Gem, {
		init(tile, team, shouldAdd, rotation){
			this.super$init(tile, team, shouldAdd, rotation);
			
			this.setBullets([GemTrailBullet, GemTrailBullet, GemLightningBullet, GemLightningBullet]);

			return this;
		}, 
		
        updateShooting(){
            var type = this.getBullets().get(this.shotCounter % this.getBullets().size);
            this.shoot(type);
        }, 
        
        shoot(type){
            var i = (this.shotCounter % this.block.shots) - (this.block.shots-1) / 2.0;
            var r = this.shotCounter % 2 == 0 ? -1 : 1;
            
            var AdditionalRandAngle = 0;
            var AdditionalAngle = 0;
            if(type instanceof LightningBulletType) AdditionalRandAngle += 10;
            if(type.weaveScale > 0) AdditionalAngle -= (type.weaveScale + type.weaveMag)/2.0;

            if(type instanceof LightningBulletType || (type instanceof ArtilleryBulletType && type.speed == 6.5)) {
	            this.block.tr.trns(this.rotation - 90, this.block.spread * i + 44 * r, this.block.size * 4 - 51);
	            this.bullet(type, this.rotation + Mathf.range(this.block.inaccuracy + AdditionalAngle));
            } else{
	            this.block.tr.trns(this.rotation - 90, this.block.spread * i + 0 * r, this.block.size * 4 - 2);
	            this.bullet(type, this.rotation - AdditionalAngle + Mathf.range(this.block.inaccuracy + AdditionalRandAngle));
	        };

            this.recoil = this.block.recoilAmount;
            this.heat = 1.0;
            this.effects();
            //this.useAmmo(); there is no ammo, lol
            
            this.shotCounter++; 
        }, 
        
        hasAmmo(){
            return true;
        }, 
	
        effects(){
            var type = this.getBullets().get(this.shotCounter % this.getBullets().size);

            type.shootEffect.at(this.x + this.block.tr.x, this.y + this.block.tr.y, this.rotation);
            type.smokeEffect.at(this.x + this.block.tr.x, this.y + this.block.tr.y, this.rotation);
            this.block.shootSound.at(this.tile);

            if(this.block.shootShake > 0){
                Effect.shake(this.block.shootShake, this.block.shootShake, this.tile.build);
            };

            this.recoil = this.block.recoilAmount;
        },

       targetPosition(pos){
            this.targetPos.set(Predict.intercept(this, pos, 1.0e7));
            if(this.targetPos.isZero()){
                this.targetPos.set(this.target);
            }
        }, 
        
        bullet(type, angle){
        	type
            var lifeScl = type.scaleVelocity ? Mathf.clamp(Mathf.dst(this.x + this.block.tr.x, this.y + this.block.tr.y, this.targetPos.x, this.targetPos.y) / type.range(), this.block.minRange / type.range(), this.block.range / type.range()) : 1.0;

            var bu = type.create(this, this.team, this.x + this.block.tr.x, this.y + this.block.tr.y, angle, 1.0 + Mathf.range(this.block.velocityInaccuracy), lifeScl);
            bu.data = new Trail(4);
        }, 

		readBase(read){
			this.super$readBase(read);

			this.setBullets([GemTrailBullet, GemTrailBullet, GemLightningBullet, GemLightningBullet]); 
		}, 

		setBullets(a){
			this._bullets = new Seq(a);
		},

		getBullets(){
			return this._bullets;
		}
	});
	return ent;
};
Gem.hasLiquids = true;
Gem.hasPower = true;
Gem.consumesPower = true;
Gem.outputsPower = false;
Gem.update = true;
//Gem.reloadTime = 1; this turret has no reload.
Gem.size = 14;
Gem.range = 520;
Gem.ammoUseEffect = Fx.none;
Gem.inaccuracy = 15;
Gem.recoilAmount = 5.0;
Gem.powerUse = 120000.0/60.0;
Gem.consumes.liquid(F.fl("helium-liquid"), 0.5);
Gem.category = Category.turret;
Gem.buildCostMultiplier = 0.5;
Gem.buildVisibility = BuildVisibility.shown;
Gem.requirements = ItemStack.with(Items.surgeAlloy, 1800, F.fi("meteorite"), 1500, F.fi("palladium"), 1650, Items.titanium, 800, Items.thorium, 800, F.fi("photonite"), 1200, Items.metaglass, 1450, Items.silicon, 1200);

F.node(F.fb("duo"), Gem, ItemStack.with(Items.surgeAlloy, 1800, F.fi("meteorite"), 1500, F.fi("palladium"), 1650, Items.titanium, 800, Items.thorium, 800, F.fi("photonite"), 1200, Items.metaglass, 1450, Items.silicon, 1200), Seq.with(new Objectives.Research(F.fi("meteorite")), new Objectives.Research(F.fi("contritum")), new Objectives.Research(F.fb("absorber"))));
