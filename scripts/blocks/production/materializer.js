const F = require("func");

const Materializer = extendContent(GenericSmelter, "materializer", {
    setStats(){
	    this.super$setStats();

	    this.stats.remove(Stat.itemCapacity);
    }, 


	setBars(){
	    this.super$setBars();

	    this.bars.remove("items");
	    this.bars.add("progress",
            func(e =>
		        new Bar(
	                prov(() => Core.bundle.get("progress")+": "+e.getTotal().toFixed(0)+"/"+e.getCost()),
			        prov(() => e.getItem() == null ? Color.valueOf("#FFFFFF") : e.getItem().color),
			        floatp(() => e.getTotal()/e.getCost())
	            )
	        )
        )
    }
});
Materializer.buildType = () => {
	const ent = extendContent(GenericSmelter.SmelterBuild, Materializer, {
		init(tile, team, shouldAdd, rotation){
			if(!this.initialized) this.create(tile.block(), team);

			this.setItem(F.fi("diamond"));
			this.setTotal(0);
			this.setCost(85);

			this.rotation = rotation;
			this.tile = tile;
			this.set(tile.drawx(), tile.drawy());
			if(shouldAdd) this.add();
			this.created();

			return this;
		}, 
		
	    updateTile(){
	        if(this.getItem() == F.fi("diamond")) this.setCost(85);
	        if(this.getItem() == F.fi("topaz")) this.setCost(50);
	        if(this.getItem() == F.fi("ruby")) this.setCost(45);
	        if(this.getItem() == F.fi("emerald")) this.setCost(65);
	        if(this.getItem() == F.fi("sapphire")) this.setCost(60);
	        if(this.getItem() == F.fi("amethyst")) this.setCost(70);
	
		    if(this.getTotal() > this.getCost()) this.setTotal(this.getCost())
		
	        if(this.getItem() != null) {
	            if(this.getTotal() == this.getCost() && this.consValid()) {
			        if(this.timer.get(5)){
		                this.setTotal(0);
		                this.offload(this.getItem())
				    }
			    }
		    };
		
            if(this.getItem() != null){
                this.dump(this.getItem());
            }
	    }, 
		
		playerPlaced(tile){
			if(this.lastItem != null){
				Corthis.app.post(run(() => this.setItem(this.lastItem)));
			}
		},
	
		draw(tile){
	        var speed = 0;
	        speed = Mathf.lerp(speed, this.consValid() && this.getItem() != null && this.getTotal() > 0 ? 1.0 : 0.0, 0.01); 
	
			Draw.rect(Core.atlas.find("collos-materializer"), this.x, this.y);
	        if(this.getItem() != null) {
				Draw.color(this.getItem().color);
				Draw.alpha(0.5 + Mathf.sin(Time.time()*0.1)*0.15);
				Draw.rect(Core.atlas.find("collos-materializer-color"), this.x, this.y);
				Draw.alpha(1.0);
				Draw.color(); 
		    }
	    }, 
	
		buildConfiguration(table){
			var array = [F.fi("diamond"), F.fi("emerald"), F.fi("amethyst"), F.fi("ruby"), F.fi("sapphire"), F.fi("topaz")];
			var arcArray = new Packages.arc.struct.Seq(array);
			var stack = this.getItem() == null ? null : this.getItem();
			
			ItemSelection.buildTable(table, arcArray, prov(() => stack), cons(item => {
				this.lastItem = item;
				this.setItem(item == null ? null : item);
			}));
		},
	
	    acceptItem(source, item){
		    if(!this.consValid()) return false;
		    if(item == F.fi("diamond") || item == F.fi("ruby") || item == F.fi("sapphire") || item == F.fi("emerald") || item == F.fi("amethyst") || item == F.fi("topaz") || item == F.fi("lux")) return false;
		
		    if(this == null || this.items == null) return false;
		    if(this.items.get(item) >= this.itemCapacity) return false;
		    if(this.getTotal() >= this.getCost()) return false;
		
		    if(this.items.total() >= this.itemCapacity) return false;
		
		    if(item.hardness != null && item.cost != null) {
			    if(item.hardness >= 0.1 && item.cost >= 0.1) {
	                this.addTotal((item.hardness + item.cost)/5.0);
			        if(this.items.total() > 0) {
	                    this.items.remove(item, this.items.total());
					};
					return true;
				}
			} else {
		        this.setItem(null);
	            return false
			}
		}, 
		
		getItem(){
			return this._item;
		},
		
		setItem(a){
	        if(a == 1) a = F.fi("diamond");
	        if(a == 2) a = F.fi("sapphire");
	        if(a == 3) a = F.fi("amethyst");
	        if(a == 4) a = F.fi("emerald");
	        if(a == 5) a = F.fi("topaz");
	        if(a == 6) a = F.fi("ruby");

			this._item = a;
		},
	
		getCost(){
			return this._cost;
		},

		setCost(a){
			this._cost = a;
		}, 
		
		getTotal(){
			return this._total;
		},
		
		setTotal(a){
			this._total = a;
		}, 

		addTotal(a){
			this._total += a;
		},
		
		writeBase(write){
			this.super$writeBase(write);
            
	        if(this.getItem() == F.fi("diamond")) var a = 1;
	        if(this.getItem() == F.fi("sapphire")) var a = 2;
	        if(this.getItem() == F.fi("amethyst")) var a = 3;
	        if(this.getItem() == F.fi("emerald")) var a = 4;
	        if(this.getItem() == F.fi("topaz")) var a = 5;
	        if(this.getItem() == F.fi("ruby")) var a = 6;

            write.i(a);
		},
		
		readBase(read){
			this.super$readBase(read);
            
		    this.setItem(read.i());
		} 
	});
	
	return ent;
};

Materializer.buildVisibility = BuildVisibility.shown;
Materializer.liquidCapacity = 50;
Materializer.itemCapacity = 999999;
Materializer.hasPower = true;
Materializer.hasPower = true;
Materializer.hasItems = true;
Materializer.hasLiquids = true;
Materializer.configurable = true;
Materializer.consumes.power(3.0);
Materializer.consumes.liquid(Liquids.water, 0.5);
Materializer.size = 2;
Materializer.health = 230;
Materializer.category = Category.crafting;
Materializer.requirements = ItemStack.with(Items.silicon, 45, Items.titanium, 90, Items.lead, 60);

F.techNode(Blocks.blastDrill, Materializer, ItemStack.with(Items.silicon, 3000, Items.titanium, 7000, Items.lead, 4500));
