const F = require("func");
const E = this.global.EFFECTS;
const TpEffectStart = new Effect(25, e => {
    Draw.color(Pal.accent, Pal.surge, e.fin());
    Lines.stroke(2*e.fin());
	Lines.circle(e.x, e.y, 50*e.fout());
}); 

const TpEffectEnd = new Effect(25, e => {
    Draw.color(Pal.accent, Pal.surge, e.fin());
    Lines.stroke(2*e.fin());
	Lines.circle(e.x, e.y, 50*e.finpow());
}); 

const TeleportPad = extendContent(LiquidBlock, "teleport-pad", {
	icons(){
		return [
			F.tex("teleport-pad")
		]
    }
});
TeleportPad.buildType = () => {
	const ent = extendContent(LiquidBlock.LiquidBuild, TeleportPad, { 
		init(tile, team, shouldAdd, rotation){
			if(!this.initialized) this.create(tile.block(), team);

			this.rotation = rotation;
			this.tile = tile;
			this.set(tile.drawx(), tile.drawy());
			if(shouldAdd) this.add();
			this.created();
			
			this.setLink(0);

			return this;
		},
		
	    updateTile(){
	        var other = this.getLink();
	
	        if(other != null && other != 0) {
		        if(other.block.name != "collos-teleport-pad") {
			        this.setLink(0);
		        }
	        }
	    },
	    
	    onConfigureTileTapped(other){
	        Drawf.dashCircle(this.x, this.y, 60.0*Vars.tilesize, Pal.accent);
	 
	        if(this.getLink() == other){
	            this.setLink(0);
	            return false;
	
	        } else if(this.getLink() == 0 && 
	            other.block.name == this.block.name && 
	            other.dst(this) <= 60*Vars.tilesize && 
	            other != this && other.team == this.team){
	            this.setLink(other);
	            return false;
	        };
	     
	        return this != other;
	    }, 
	
	    drawPlace(x, y, rotation, valid){
	        Drawf.dashCircle(x * Vars.tilesize, y * Vars.tilesize, 60*Vars.tilesize, Pal.accent);
	    }, 
	
	    drawConfigure(){
	        Drawf.dashCircle(this.x, this.y, 60.0*Vars.tilesize, Pal.accent);
	
	        var sin = Mathf.absin(Time.time(), 6.0, 1.0);
	        Drawf.circles(this.x, this.y, (this.block.size / 2.0 + 1.0) * Vars.tilesize + sin - 2.0, Pal.accent);
	        
	        var other = this.getLink();
	        if(other != null && other != 0){
	            Drawf.circles(other.x, other.y, (other.block.size / 2 + 1) * Vars.tilesize + sin*0.5 - 2, Color.valueOf("#EE7FFF"));
		    }
	    },
	
		draw(){
			Draw.rect(F.tex("teleport-pad"), this.x, this.y);
			
			Draw.color(Pal.accent);
			Draw.alpha(0.5 + Mathf.sin(Time.time() * 0.25) * 0.1);
			Draw.rect(F.tex("teleport-pad-light"), this.x, this.y);
			Draw.alpha(1.0);
			Draw.color();
	    },
	
		teleportUnits(){
	        var other = this.getLink();
	
	        TpEffectStart.at(this.x, this.y);
	        TpEffectEnd.at(other.x, other.y);
	
	        try{
		        Units.nearby(this.team, this.x, this.y, 80, cons(unit => {
	                unit.set(other.x, other.y); 
	
	                var vec = new Vec2();
	                vec.trns(Mathf.random(0.0, 360), 2.0);
	                unit.vel.add(vec.x, vec.y); 
	
	                if(unit.isPlayer()) {
	                    Core.camera.position.lerp(new Vec2(other.x, other.y), 0.5)
			        }
	            }))
	        } catch(err) {
	            print("[E]: "+err);
	        }
		}, 
	
	    buildConfiguration(table) {
	        var other = this.getLink();
	
		    table.button(Icon.play, 
		    Styles.clearTransi, run(() => {
		        if(other != 0 && other != null && this.consValid()) {
			    	this.teleportUnits()
		        }
		    })).size(60) 
		},

		writeBase(write){
			this.super$writeBase(write);

			write.i(this.getLink() == 0 || this.getLink() == null ? 0 : this.getLink().tile.pos());
		},

		readBase(read){
			this.super$readBase(read);

            var integ = read.i();
			this.setLink(integ == 0 ? 0 : Vars.world.build(integ));
		},

		setLink(a){
			this._link = a;
		},

		getLink(){
			return this._link;
		} 
	});
	return ent;
};

TeleportPad.buildVisibility = BuildVisibility.shown;
TeleportPad.configurable = true;
TeleportPad.update = true;
TeleportPad.breakable = true;
TeleportPad.consumesTap = true;
TeleportPad.health = 425;
TeleportPad.hasPower = true;
TeleportPad.hasItems = false;
TeleportPad.hasLiquids = false;
TeleportPad.outputsLiquid = false;
TeleportPad.solid = false;
TeleportPad.size = 3;
TeleportPad.consumes.power(500.0/60.0);
TeleportPad.category = Category.units;
TeleportPad.requirements = ItemStack.with(Items.silicon, 120, F.fi("cutol"), 70, Items.surgeAlloy, 80, Items.metaglass, 100);

F.techNode(Blocks.commandCenter, TeleportPad, ItemStack.with(Items.silicon, 10000, F.fi("cutol"), 7500, Items.surgeAlloy, 8000, Items.metaglass, 8000));
