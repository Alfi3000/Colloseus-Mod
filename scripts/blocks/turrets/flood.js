const F = require("func");
const C = this.global.COLORS;
const E = this.global.EFFECTS;

const cryo = Liquids.cryofluid;
const oil = Liquids.oil;
const water = Liquids.water;
const slag = Liquids.slag;

const cryoBullet = extend(LiquidBulletType, {});
JsonIO.copy(Bullets.heavyCryoShot, cryoBullet);
cryoBullet.speed = 7.8;
cryoBullet.drag = 0.0025;
cryoBullet.lifetime = 30;
cryoBullet.puddleSize = 8;
cryoBullet.damage = 0.5;
cryoBullet.knockback = 1;

const slagBullet = extend(LiquidBulletType, {});
JsonIO.copy(Bullets.heavySlagShot, slagBullet);
slagBullet.speed = 7.8 ;
slagBullet.drag = 0.0025;
slagBullet.lifetime = 30;
slagBullet.puddleSize = 8;
slagBullet.damage = 7.5;
slagBullet.knockback = 1;

const oilBullet = extend(LiquidBulletType, {});
JsonIO.copy(Bullets.heavyOilShot, oilBullet);
oilBullet.speed = 5.7 * 1.5;
oilBullet.drag = 0.003;
oilBullet.lifetime = 30;
oilBullet.puddleSize = 8;
oilBullet.damage = 0.5;
oilBullet.knockback = 1;

const waterBullet = extend(LiquidBulletType, {});
JsonIO.copy(Bullets.heavyWaterShot, waterBullet);
waterBullet.speed = 7.8;
waterBullet.drag = 0.0025;
waterBullet.lifetime = 30;
waterBullet.puddleSize = 8;
waterBullet.damage = 0.5;
waterBullet.knockback = 1.3;

const heliumBullet = extend(LiquidBulletType, {});
JsonIO.copy(Bullets.heavyWaterShot, heliumBullet);
heliumBullet.liquid = F.fl("helium-liquid");
heliumBullet.speed = 7.8;
heliumBullet.drag = 0.0025;
heliumBullet.lifetime = 30;
heliumBullet.puddleSize = 8;
heliumBullet.damage = 0.5;
heliumBullet.knockback = 1.3;

const Flood = extendContent(LiquidTurret, "flood", {
    setBars(){
    	this.super$setBars();
    
        this.bars.add("liquid",
            func(e =>
		        new Bar(
	                prov(() => Core.bundle.get("bar.liquid")),
			        prov(() => (
                        (e.getLiquids().size) > 0 ? 
                           ((e.getLiquids().size == 1) ? 
                           (e.getLiquids().get(0).barColor) : 
                           (Tmp.c1.set(e.getLiquids().get(1).barColor).lerp(e.getLiquids().get(0).barColor, Mathf.sin(Time.time*0.05)*0.5+0.5))) : 
                      (Color.black) 
                    )),
			        floatp(() => Math.max(e.getLiquidsAmounts().get(0), e.getLiquidsAmounts().get(1))/e.block.liquidCapacity)
	            )
	        )
        )
    }
});
Flood.buildType = () => {
	const ent = extendContent(LiquidTurret.LiquidTurretBuild, Flood, {
		init(tile, team, shouldAdd, rotation){
			this.super$init(tile, team, shouldAdd, rotation);
			
			this.setStandartLiquids();
			this.setLiquidsAmounts(0.0, 0.0);

			return this;
		},
		
        sense(sensor){
            switch(sensor){
                case LAccess.ammo: return Math.max(this.getLiquidsAmounts().get(0), this.getLiquidsAmounts().get(1));
                case LAccess.ammoCapacity: return this.block.liquidCapacity;
                case LAccess.rotation: return this.rotation;
                case LAccess.shootX: return World.conv(this.targetPos.x);
                case LAccess.shootY: return World.conv(this.targetPos.y);
                case LAccess.shooting: return this.isShooting() ? 1 : 0;
                default: return this.super$sense(sensor);
            }
        },  
		
        shoot(type){
            var i = (this.shotCounter % this.block.shots) - (this.block.shots-1) / 2.0;
            var r = this.shotCounter % 2 == 0 ? -1 : 1;

            this.block.tr.trns(this.rotation - 90, this.block.spread * i + 4 * r , this.block.size * 4 - 2); 
            this.bullet(type, this.rotation + Mathf.range(this.block.inaccuracy));
            
            this.recoil = this.block.recoilAmount;
            this.heat = 1.0;
            this.effects();
            this.useAmmo();
            
            this.shotCounter++;
        }, 

        updateShooting(){
        	if(this.getLiquids().size > 0){
        	    try{
                var type = this.peekAmmo();
	
	            if(this.reload >= this.block.reloadTime){
	                this.shoot(type);
	
	                this.reload = 0.0;
	            }else{
	                this.reload += this.delta() * type.reloadMultiplier * this.baseReloadSpeed();
	            };
	
	            } catch(e) {
		            print(e);
		            print(e.stack)
		        };
		
	            this.recoil = this.block.recoilAmount; 
	        } 
        }, 
        
	    handleLiquid(source, liquid, amount){
	        //no
	    }, 
	
        effects(){
            var r = this.shotCounter % 2 == 0 ? 0 : Mathf.clamp(1, 0, this.getLiquids().size-1);
            var liquid = this.getLiquids().get(r);
            var type = this.block.ammoTypes.get(this.getLiquids().get(r));

            type.shootEffect.at(this.x + this.block.tr.x, this.y + this.block.tr.y, this.rotation, liquid.color);
            type.smokeEffect.at(this.x + this.block.tr.x, this.y + this.block.tr.y, this.rotation, liquid.color);
            this.block.shootSound.at(this.tile);

            if(this.block.shootShake > 0){
                Effect.shake(this.block.shootShake, this.block.shootShake, this.tile.build);
            };

            this.recoil = this.block.recoilAmount;
        },
	
        useAmmo(){
            if(this.cheating()) return;
            
            var r = this.shotCounter % 2 == 0 ? 0 : Mathf.clamp(1, 0, this.getLiquids().size-1);
            var ammo = this.getLiquidsAmounts().get(r);
            var type = this.getLiquidBullet(r);
                
            var one = r == 0 ? this.getLiquidsAmounts().get(0)-1.0 : this.getLiquidsAmounts().get(0);        
            var two = r == 1 ? this.getLiquidsAmounts().get(1)-1.0 : this.getLiquidsAmounts().get(1);
            
            this.setLiquidsAmounts(one, two);
                
            if(this.getLiquidsAmounts().get(r) <= 0.0) {
                this.setLiquidsAmounts(r == 0 ? 0.0 : this.getLiquidsAmounts().get(0), r == 1 ? 0.0 : this.getLiquidsAmounts().get(1));
                
                if(this.getLiquids().size > 1) {
		        	this.getLiquids().swap(0, 1);
		        	this.getLiquidsAmounts().swap(0, 1);
		        };
            
                this.getLiquids().pop();
            };
            
            return type;
        }, 
        
        peekAmmo(){
            var r = this.shotCounter % 2 == 0 ? 0 : 1;
            
        	if(this.getLiquids().size == 0) return null;
        	if(this.getLiquids().size == 1) return new Seq([this.getLiquidBullet(0), this.getLiquidBullet(0)]).get(r);
        
            return new Seq([this.getLiquidBullet(0), this.getLiquidBullet(1)]).get(r);
        }, 
        
        hasAmmo(){
        	if(this.getLiquids().size == 0) return false;
        	if(this.getLiquids().size == 1) return this.getLiquidsAmounts().get(0) > 0.0;
            return this.getLiquidsAmounts().get(0) > 0.0 || this.getLiquidsAmounts().get(1) > 0.0;
        }, 
    
        draw(){
            this.super$draw();
            
            if(this.getLiquids().size == 1) {
                Drawf.liquid(F.tex("flood-liquid1"), this.x + this.block.tr2.x, this.y + this.block.tr2.y, this.getLiquidsAmounts().get(0) / this.block.liquidCapacity, this.getLiquids().get(0).color, this.rotation - 90);
                Drawf.liquid(F.tex("flood-liquid2"), this.x + this.block.tr2.x, this.y + this.block.tr2.y, this.getLiquidsAmounts().get(0) / this.block.liquidCapacity, this.getLiquids().get(0).color, this.rotation - 90);
            };
            
            if(this.getLiquids().size == 2) {
                Drawf.liquid(F.tex("flood-liquid1"), this.x + this.block.tr2.x, this.y + this.block.tr2.y, this.getLiquidsAmounts().get(0) / this.block.liquidCapacity, this.getLiquids().get(0).color, this.rotation - 90);
                Drawf.liquid(F.tex("flood-liquid2"), this.x + this.block.tr2.x, this.y + this.block.tr2.y, this.getLiquidsAmounts().get(1) / this.block.liquidCapacity, this.getLiquids().get(1).color, this.rotation - 90);
            };
            
            Draw.rect(F.tex("flood-top"), this.x + this.block.tr2.x, this.y + this.block.tr2.y, this.rotation - 90);
        }, 
        
        acceptLiquid(source, liquid){
            if(this.block.ammoTypes.get(liquid) == null) return false;
            if(!(this.block.ammoTypes.containsKey(liquid))) return false;
            
            if(this.getLiquids().size > 0 && this.getLiquids().contains(liquid)) {
            };
            
            if(this.getLiquids().size == 2 && !this.getLiquids().contains(liquid)){
            	this.getLiquids().swap(0, 1);
            	this.getLiquidsAmounts().swap(0, 1);
            
            	this.getLiquids().pop();
                this.getLiquids().add(liquid);
                
                this.setLiquidsAmounts(this.getLiquidsAmounts().get(0), 1.0);
                return true
            };

            if(this.getLiquids().size < 2 && !this.getLiquids().contains(liquid)){
                this.getLiquids().add(liquid);
                
                this.setLiquidsAmounts(this.getLiquidsAmounts().get(0), 1.0);
                return true
            };

            if(this.getLiquids().size > 0 && this.getLiquids().contains(liquid)){
                if(this.getLiquidsAmounts().get(this.getLiquids().indexOf(liquid)) >= this.block.liquidCapacity) return false
                
                var index = this.getLiquids().indexOf(liquid);
                
                var one = index == 0 ? this.getLiquidsAmounts().get(0)+1.0 : this.getLiquidsAmounts().get(0);        
                var two = index == 1 ? this.getLiquidsAmounts().get(1)+1.0 : this.getLiquidsAmounts().get(1);
                
                this.setLiquidsAmounts(one, two);
                return true;
            };
              
            return false;
        }, 

		writeBase(write){
			this.super$writeBase(write);

			write.i(this.getLiquidsAmounts().get(0));
			write.i(this.getLiquidsAmounts().get(1));
			
			if(this.getLiquids().size == 0){
				write.i(-1);
				write.i(-1);
			} else if(this.getLiquids().size == 1) {
				write.i(this.getLiquids().get(0).id);
				write.i(-1);
			} else if(this.getLiquids().size == 2) {
				write.i(this.getLiquids().get(0).id);
				write.i(this.getLiquids().get(1).id);
			}
		},

		readBase(read){
			this.super$readBase(read);

			var a = read.i();
			var b = read.i();
			this.setLiquidsAmounts(a, b);
			
			var id1 = read.i();
			var id2 = read.i();
			if(id1 == -1 && id2 == -1){
				this.resetLiquids(new Seq());
			} else if(id1 != -1 && id2 == -1) {
				this.resetLiquids(new Seq([Vars.content.getByID(ContentType.liquid, id1)]));
			} else if(id1 != -1 && id2 != -1) {
				this.resetLiquids(new Seq([Vars.content.getByID(ContentType.liquid, id1), Vars.content.getByID(ContentType.liquid, id2)]));
			} 
		},

		setStandartLiquids(){
			this._liquids = new Seq();
		},

		setLiquids(a, b){
			this._liquids = new Seq([a, b]);
		},

		getLiquidBullet(index){
			return this.block.ammoTypes.get(this.getLiquids().get(index));
		},

		getLiquids(){
			return this._liquids;
		},

		setLiquidsAmounts(a, b){
			this._liquidsAmounts = new Seq([a, b]);
		},

		resetLiquids(a){
			this._liquids = a;
		},

		getLiquidsAmounts(){
			return this._liquidsAmounts;
		}  
	});
	return ent;
};

Flood.health = 180 * 4 * 4;
Flood.reloadTime = 1;
Flood.liquidCapacity = 100;
Flood.inaccuracy = 5;
Flood.range = 240.0;
Flood.size = 4;
Flood.recoilAmount = 1.2;
Flood.restitution = 0.05;
Flood.velocityInaccuracy = 0.1;
Flood.category = Category.turret;
Flood.ammo(
    cryo, cryoBullet, 
    water, waterBullet, 
    oil, oilBullet, 
    slag, slagBullet, 
    F.fl("helium-liquid"), heliumBullet
);
Flood.buildVisibility = BuildVisibility.shown;
Flood.requirements = ItemStack.with(Items.graphite, 300, Items.copper, 150, Items.titanium, 200, Items.surgeAlloy, 225, Items.silicon, 250);

F.techNode(Blocks.tsunami, Flood, ItemStack.with(Items.graphite, 35000, Items.copper, 20000, Items.titanium, 22500, Items.surgeAlloy, 28000, Items.silicon, 32000));
