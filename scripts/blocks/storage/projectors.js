const F = require("func");
const E = this.global.EFFECTS;
const S = this.global.STATUSES;

const MendDome = extendContent(MendProjector, "mend-dome", {
    setStats() {
    	this.super$setStats();
    
        this.stats.remove(Stat.boostEffect);
    } 
});

MendDome.buildVisibility = BuildVisibility.shown;
MendDome.size = 3;
MendDome.health = 720;
MendDome.range = 200.0;
MendDome.healPercent = 20.0;
MendDome.reload = 300;
MendDome.phaseBoost = 0.0;
MendDome.phaseRangeBoost = 0.0;
MendDome.phaseColor = Color.valueOf("ffd59e");
MendDome.consumes.items(ItemStack.with(Items.phaseFabric, 1, Items.silicon, 1));
MendDome.category = Category.effect;
MendDome.consumes.power(10.0);
MendDome.requirements = ItemStack.with(Items.lead, 250, Items.thorium, 150, Items.silicon, 130, Items.phaseFabric, 70, Items.surgeAlloy, 100);

const ForceDome = extendContent(ForceProjector, "force-dome", {
    setStats() {
    	this.super$setStats();
    
        this.stats.remove(Stat.boostEffect);
    } 
});
ForceDome.buildVisibility = BuildVisibility.shown; 
ForceDome.size = 4;
ForceDome.health = 1750;
ForceDome.radius = 240.0;
ForceDome.phaseRadiusBoost = 0.0;
ForceDome.phaseShieldBoost = 0.0;
ForceDome.breakage = 2200;
ForceDome.cooldownNormal = 2.25;
ForceDome.cooldownLiquid = 1.75;
ForceDome.cooldownBrokenBase = 0.75;
ForceDome.consumes.items(ItemStack.with(Items.phaseFabric, 1, Items.silicon, 1));
ForceDome.category = Category.effect;
ForceDome.consumes.power(1500.0/60.0);
ForceDome.requirements = ItemStack.with(Items.copper, 300, Items.thorium, 200, Items.silicon, 280, F.fi("cutol"), 150, F.fi("palladium"), 225);

F.techNode(Blocks.mendProjector, MendDome, ItemStack.with(Items.lead, 18000, Items.thorium, 15000, Items.silicon, 12000, Items.phaseFabric, 5000, Items.surgeAlloy, 8000));
F.techNode(Blocks.forceProjector, ForceDome, ItemStack.with(Items.copper, 20000, Items.thorium, 17500, Items.silicon, 15000, F.fi("cutol"), 10000, F.fi("palladium"), 15000));

//////////////////////////////////////////////////////////////////////////////////////////////! ////////////////////////////////////////////////////////////////////

const PushProjector = extendContent(LiquidBlock, "push-projector", {
    icons(){
	    return [
	        F.tex("push-projector")
	    ] 
	}, 
		
    drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid);

        Draw.color(Pal.gray);
        Lines.stroke(3.0);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 120.0);
        Draw.color(Color.valueOf("#00A6FF"));
        Lines.stroke(1.0);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 120.0);
        Draw.color();
    }
});
PushProjector.hasItems = true;
PushProjector.hasLiquids = true;
PushProjector.buildType = () => {
	const ent = extendContent(LiquidBlock.LiquidBuild, PushProjector, { 
		init(tile, team, shouldAdd, rotation){
			if(!this.initialized) this.create(tile.block(), team);
            
			this.rotation = rotation;
			this.tile = tile;
			this.set(tile.drawx(), tile.drawy());
			if(shouldAdd) this.add();
			this.created();
			
			this.setRange(120.0);

			return this;
		},
		
	    updateTile() {
	        if(this.consValid() && this.timer.get(0, Mathf.round(Mathf.random(50.0, 70.0)))) {
				var range = this.getRange() + this.getRange()/4.0;
				
		        Units.nearby(this.x - range/2.0, this.y - range/2.0, range, range, cons(unit => { 
					if(typeof(unit["isBoss"]) == "function") {
					    if(unit.isBoss()) return;
					};
	
	                if(this.team != unit.team) {
		                if(!unit.type.flying) unit.apply(S.speedMul.get(18), 5);
		
						E.blueSquare.at(this.x, this.y);
						
					    var vec = new Vec2();
					    vec.trns(this.angleTo(unit.x, unit.y), 2.5);
					    unit.vel.add(vec.x, vec.y);
					
				        if(this.items.any()) this.items.remove(Items.plastanium, Math.min(3, this.items.total()));
				        if(this.liquids.total() > 0) this.liquids.remove(Liquids.cryofluid, Math.min(5.0, this.liquids.total())); 
	                } 
		        }));
		    } 
		},

	    drawSelect(){
	        Draw.color(Pal.gray);
	        Lines.stroke(3.0);
	        Lines.square(this.x * Vars.tilesize + this.block.offset, this.y * Vars.tilesize + this.block.offset, 120.0);
	        Draw.color(Color.valueOf("#00A6FF"));
	        Lines.stroke(1.0);
	        Lines.square(this.x * Vars.tilesize + this.block.offset, this.y * Vars.tilesize + this.block.offset, 120.0);
	        Draw.color();
        
			Draw.reset();
	    },
	
	    draw() {
	        Draw.rect(F.tex("push-projector"), this.x, this.y);
		},

		writeBase(write){
			this.super$writeBase(write);

			write.f(this._range);
		},

		readBase(read){
			this.super$readBase(read);

			this._range = read.f();
		},

		setRange(a){
			this._range = a;
		},

		getRange(){
			return this._range;
		}
	});
	return ent;
};

PushProjector.breakable = true;
PushProjector.update = true;
PushProjector.targetable = true;
PushProjector.hasLiquids = false;
PushProjector.outputsLiquid = false;
PushProjector.consumes.power(2000/60.0);
PushProjector.consumes.liquid(Liquids.cryofluid, 5.0/60.0);
PushProjector.consumes.items(new ItemStack(Items.plastanium, 3));
PushProjector.range = 160.0;
PushProjector.health = 3.0 * 340.0;
PushProjector.size = 3;
PushProjector.force = 450.0;
PushProjector.category = Category.effect;
PushProjector.buildVisibility = BuildVisibility.shown;
PushProjector.requirements = ItemStack.with(F.fi("cutol"), 200, Items.titanium, 300, Items.silicon, 200, F.fi("orbon"), 120, F.fi("palladium"), 175, Items.graphite, 250);

F.techNode(Blocks.mendProjector, PushProjector, ItemStack.with(F.fi("cutol"), 10000, Items.titanium, 15000, Items.silicon, 20000, F.fi("orbon"), 8000, F.fi("palladium"), 12000, Items.graphite, 22000));
