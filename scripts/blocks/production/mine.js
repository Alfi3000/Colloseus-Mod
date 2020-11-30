const F = require("func"); 

const MineDrill = extendContent(GenericSmelter, "mine-drill", {
	outputsItems(){
		return true;
	},
	
	setBars(){
		this.super$setBars();
		
		this.bars.add("items", 
            func(e =>
			    new Bar(
                    prov(() => Core.bundle.format("bar.items",
                        e.getStack() != null ? e.items.get(e.getStack().item) : 0)
                    ),
                    prov(() => e.getStack() != null ? e.getStack().item.color : Pal.powerBar),
                    floatp(() => ((this != null && e.getStack() != null) ? (e.items.get(e.getStack().item) / this.itemCapacity) : 0)) 
				)
			)
		)
	}, 

	icons(){
		return [
			F.tex("mine-drill"),
			F.tex("mine-drill-rotator")
		]
    }
});

MineDrill.buildType = () => {
	const ent = extendContent(GenericSmelter.SmelterBuild, MineDrill, {
		init(tile, team, shouldAdd, rotation){
			if(!this.initialized) this.create(tile.block(), team);

			this.setStack(null);
			this.setSequence(0);

			this.rotation = rotation;
			this.tile = tile;
			this.set(tile.drawx(), tile.drawy());
			if(shouldAdd) this.add();
			this.created();

			return this;
		}, 
		
		playerPlaced(config){
			if(this.lastItem != null){
				Core.app.post(run(() => this.configure(this.lastItem.id)));
			}
		},
		       
		shouldConsume(){
	        if(this.getStack() != null && this.items.get(this.getStack().item) >= this.itemCapacity){
	            return false;
	        };
	        return true;
	    },
	
		draw(){
			Draw.rect(Core.atlas.find("collos-mine-drill"), this.x, this.y);
			Draw.rect(Core.atlas.find("collos-mine-drill-rotator"), this.x, this.y, this.totalProgress * 1.6);
		},
		
		getProgressIncrease(baseTime){
			if(this.getSequence() == 0) return 0;
			return 1 / baseTime * this.delta() * this.efficiency();
		},
		
		buildConfiguration(table){
			var array = [F.fi("diamond"), F.fi("emerald"), F.fi("amethyst"), F.fi("ruby"), F.fi("topaz"), F.fi("sapphire"), F.fi("palladium")];
			var arcArray = new Packages.arc.struct.Seq(array);
			var stack = this.getStack() == null ? null : this.getStack().item;
			
			ItemSelection.buildTable(table, arcArray, prov(() => stack), cons(item => {
				this.lastItem = item;
				this.configure(item == null ? -1 : item.id);
			}));
		},
		
		configure(value){
			this.progress = 0;
			
			if(value != -1){
				this.setSequence(this.getItemSequence(value));
				var items = new ItemStack(Vars.content.item(value), this.getItemAmount(this.getItemSequence(value)));
				this.setStack(items);
			} else {
				this.setSequence(0);
				this.setStack(null);
			}
		},
		
		getItemAmount(v){
			var a = [8, 6, 7, 8, 6, 9, 7, 3];
			
			return a[v];
		}, 
		
		getItemSequence(v){
			var i = Vars.content.item(v);
			
			if(i == F.fi("diamond")) return 1;
			if(i == F.fi("emerald")) return 2;
			if(i == F.fi("amethyst")) return 3;
			if(i == F.fi("ruby")) return 4;
			if(i == F.fi("topaz")) return 5;
			if(i == F.fi("sapphire")) return 6;
			if(i == F.fi("palladium")) return 7;
			return 0;
		},
		
		updateTile(){
			if(this.consValid() && this.getSequence() != 0 && this.getStack() != null && this.items.get(this.getStack().item) < 50){
	
				this.progress += this.getProgressIncrease(160);
				this.totalProgress += this.delta() * this.warmup;
				this.warmup = Mathf.lerpDelta(this.warmup, 1, 0.02);
	
				if(Mathf.chance(Time.delta * 0.1)){
					Fx.fuelburn.at(this.x + Mathf.range(this.size * 4), this.y + Mathf.range(this.size * 4));
				}
			} else {
				this.warmup = Mathf.lerp(this.warmup, 0, 0.02);
				this.totalProgress += this.delta() * this.warmup;
			};
			
			if(this.progress >= 1) {
				this.consume();
	
				if(this.getStack() != null){
					for(var i = 0; i < this.getStack().amount; i++){
					    if(this.items.get(this.getStack().item) < 50) this.offload(this.getStack().item);
					}
				};
	
				Fx.smeltsmoke.at(this.x, this.y);
				this.progress = 0;
	        }
	
            if(this.getStack() != null){
                this.dump(this.getStack().item);
            }
		}, 

		writeBase(write){
			this.super$writeBase(write);

			write.s(this.getStack() == null ? -1 : this.getStack().item.id);
		},

		readBase(read){
			this.super$readBase(read);

            var id = read.s();
            
			if(id != -1){
				this._stack = new ItemStack(Vars.content.item(id), this.getItemAmount(this.getItemSequence(id))); 
				this._seq = this.getItemSequence(id);
			}else{
				this._stack = null;
				this._seq = 0;
			};
		},
		
		getStack() {
			return this._stack
		}, 
		
		setStack(a) {
		    this._stack = a
		},
		
		setSequence(a) {
		    this._seq = a
		}, 
		
		getSequence() {
		    return this._seq
		}
	});
	
	return ent;
};

MineDrill.itemCapacity = 50;
MineDrill.buildVisibility = BuildVisibility.shown;
MineDrill.health = 840;
MineDrill.hasItems = true;
MineDrill.hasPower = true;
MineDrill.size = 4;
MineDrill.craftTime = 90;
MineDrill.consumes.power(30);
MineDrill.idleSound = Sounds.respawning;
MineDrill.idleSoundVolume = 0.05;
MineDrill.configurable = true;
MineDrill.lastItem = null;
MineDrill.category = Category.crafting;
MineDrill.requirements = ItemStack.with(F.fi("cutol"), 175, Items.silicon, 300, Items.surgeAlloy, 180, Items.phaseFabric, 240, Items.sand, 300);

F.techNode(Blocks.blastDrill, MineDrill, ItemStack.with(F.fi("cutol"), 6000, Items.silicon, 16500, Items.surgeAlloy, 10000, Items.phaseFabric, 12500, Items.sand, 20000));
