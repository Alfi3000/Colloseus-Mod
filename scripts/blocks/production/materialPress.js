const F = require("func");

const press = extendContent(GenericSmelter, "material-press", {	
    update(tile){
        var e = tile.entity;

        if(e.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-copper-plate")) e.setNeeded(Items.copper);
        if(e.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-lead-plate")) e.setNeeded(Items.lead);
        if(e.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-titanium-plate")) e.setNeeded(Items.titanium);
        if(e.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-thorium-plate")) e.setNeeded(Items.thorium);
        if(e.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-palladium-plate")) e.setNeeded(Vars.content.getByName(ContentType.item, "colloseusmod-palladium"));
        if(e.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-meteorite-plate")) e.setNeeded(Vars.content.getByName(ContentType.item, "colloseusmod-meteorite"));

        if(e.getNeeded() == Items.copper) var amount = 3;
        if(e.getNeeded() == Items.lead) var amount = 3;
        if(e.getNeeded() == Items.titanium) var amount = 5;
        if(e.getNeeded() == Items.thorium) var amount = 5;
        if(e.getNeeded() == Vars.content.getByName(ContentType.item, "colloseusmod-palladium")) var amount = 15;
        if(e.getNeeded() == Vars.content.getByName(ContentType.item, "colloseusmod-meteorite")) var amount = 3;

        if(e.getNow() != null && e.getNeeded() != null) {
            if(e.items.has(e.getNeeded(), amount) && e.cons.valid()) {
		        if(e.timer.get(60)){
		            Effects.effect(Fx.smeltsmoke, tile);
                    Sounds.release.at(tile.worldx(), tile.worldy());

	                e.items.remove(e.getNeeded(), amount);
	                e.items.add(e.getNow(), 1)
			    };
                this.tryDump(tile, e.getNow())
		    }
	    }
    }, 

    drawSelect(tile){
        var e = tile.entity;
        if(e.getNow() != null && e.getNeeded() != null) {
	        Draw.rect(Core.atlas.find(e.getNow().name), tile.drawx()+(this.size*Vars.tilesize)/2, tile.drawy()+(this.size*Vars.tilesize)/2);
	    }
    },
	
	playerPlaced(tile){
		if(this.lastItem != null){
			Core.app.post(run(() => tile.entity.setNow(this.lastItem)));
		}
	},
	
	buildConfiguration(tile, table){
		entity = tile.ent();

		var array = [F.fi("copper-plate"), F.fi("lead-plate"), F.fi("titanium-plate"), F.fi("thorium-plate"), F.fi("palladium-plate"), F.fi("meteorite-plate")];
		var arcArray = new Packages.arc.struct.Array(array);
		
		ItemSelection.buildTable(table, arcArray, prov(() => entity.getNow()), cons(item => {
	        entity.setNow(item);
			this.lastItem = item;
		}));
    },
	
	outputsItems(){
		return true;
	}, 

    acceptItem(item, tile, source){
        var entity = tile.ent();

	    if(entity == null || entity.items == null) return false;
	    if(entity.items.get(item) >= this.itemCapacity) return false;
	    if(entity.items.total() >= this.itemCapacity) return false;
        if(item == entity.getNeeded()){
			return true;
		}
	}, 

	writeNums(item, entity){
        entity.setNow(item);
		this.lastItem = item;
    }
});

press.hasPower = true;
press.hasItems = true;
press.configurable = true;
press.entityType = prov(() => {
	entityB = extend(GenericCrafter.GenericCrafterEntity, {
		getNow(){
			return this._now;
		},
		
		setNow(a){
	        if(a == 1) var a = Vars.content.getByName(ContentType.item, "colloseusmod-copper-plate");
	        if(a == 2) var a = Vars.content.getByName(ContentType.item, "colloseusmod-lead-plate");
	        if(a == 3) var a = Vars.content.getByName(ContentType.item, "colloseusmod-titanium-plate");
	        if(a == 4) var a = Vars.content.getByName(ContentType.item, "colloseusmod-thorium-plate");
	        if(a == 5) var a = Vars.content.getByName(ContentType.item, "colloseusmod-palladium-plate");
	        if(a == 6) var a = Vars.content.getByName(ContentType.item, "colloseusmod-meteorite-plate");

			this._now = a;
		},
		
		getNeeded(){
			return this._needed;
		},
		
		setNeeded(a){
			this._needed = a;
		},
		
		write(stream){
			this.super$write(stream);
            
	        if(this.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-copper-plate")) var a = 1;
	        if(this.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-lead-plate")) var a = 2;
	        if(this.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-titanium-plate")) var a = 3;
	        if(this.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-thorium-plate")) var a = 4;
	        if(this.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-palladium-plate")) var a = 5;
	        if(this.getNow() == Vars.content.getByName(ContentType.item, "colloseusmod-meteorite-plate")) var a = 6;
			
            stream.writeFloat(a);
		},
		
		read(stream, revision){
			this.super$read(stream, revision);
            
		    this.setNow(stream.readFloat());
		}
	});
	entityB.setNow(F.fi("copper-plate"));
	entityB.setNeeded(Items.copper);
	
	return entityB;
});
press.itemCapacity = 45;
press.size = 3;
press.health = 150;
press.consumes.power(1.4);
press.category = Category.crafting;
press.requirements = ItemStack.with(Items.silicon, 45, Items.titanium, 60, Items.plastanium, 40);

F.techNode(Blocks.graphitePress, press, ItemStack.with(Items.silicon, 6500, Items.titanium, 7800, Items.plastanium, 4500));
