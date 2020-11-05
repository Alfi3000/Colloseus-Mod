const F = require("functions/f"); 

const mineDrill = extendContent(GenericSmelter, "mine-drill", {	
	load(){
		this.super$load();

		this.spinnerRegion = Core.atlas.find(this.name + "-spinner");
	},
	
	generateIcons(){
		return [
			Core.atlas.find(this.name),
			Core.atlas.find(this.name + "-spinner")
		];
    },
	
	playerPlaced(tile){
		if(this.lastItem != null){
			Core.app.post(run(() => tile.configure(this.lastItem.id)));
		}
	},
	
	setStats(){
		this.super$setStats();
		
		var craftTimeB = 165;
		if(this.craftTime != null) craftTimeB = this.craftTime;
		var numberA = (craftTimeB * (1 / 1.7)) / 60;
		var numberB = (craftTimeB * (1 / 0.3)) / 60;
		
		this.stats.remove(BlockStat.productionTime);
		this.stats.add(BlockStat.productionTime, "{0}-{1}/s", numberA.toFixed(1), numberB.toFixed(1));
		
		this.stats.add(BlockStat.output, "{0}, {1}, {2}, {3}, {4}, {5}, {6}",
		"Diamond",
		"Emerald",
		"Amethyst",
		"Ruby",
		"Topaz",
		"Sapphire", 
		"Palladium");
	},
	
	outputsItems(){
		return true;
	},
	
	shouldConsume(tile){
		entity = tile.ent();
		
        if(entity.getItemStack() != null && entity.items.get(entity.getItemStack().item) >= this.itemCapacity){
            return false;
        };
        return true;
    },
	
	setBars(){
		this.super$setBars();
		
		if(this.hasItems && this.configurable){
			this.bars.remove("items");
			this.bars.add("items", new Func({
				get: function(entity){
					return new Bar(prov(() => Core.bundle.format("bar.items", (entity != null && entity.getItemStack() != null) ? entity.items.get(entity.getItemStack().item) : 0)), prov(() => Pal.powerBar), new Floatp({get: function(){
							if(entity != null && entity.getItemStack() != null){
								var items = entity.items.get(entity.getItemStack().item);
								var sssss = items / mineDrill.itemCapacity;
								
								return sssss.toFixed(7);
							};
							return 0;
						}
					}));
				}
			}));
		};
	},

	draw(tile){
		entity = tile.ent();
		
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.color();
		Draw.rect(this.spinnerRegion, tile.drawx(), tile.drawy(), entity.totalProgress * 1.6);
	},
	
	getMultiplier(entity){
		if(entity.getSequence() == 0) return 1;
		if(entity.getSequence() == 1) return 1;
		if(entity.getSequence() == 2) return 1;
		if(entity.getSequence() == 3) return 1;
		if(entity.getSequence() == 4) return 1;
		if(entity.getSequence() == 5) return 1;
		if(entity.getSequence() == 6) return 1;
		if(entity.getSequence() == 7) return 0.6;
	},
	
	getProgressIncrease(entity, baseTime){
		if(entity.getSequence() == 0) return 0;
		return 1 / baseTime * entity.block.getMultiplier(entity) * entity.delta() * entity.efficiency();
	},
	
	buildConfiguration(tile, table){
		entity = tile.ent();

		var array = [F.fi("diamond"), F.fi("emerald"), F.fi("amethyst"), F.fi("ruby"), F.fi("topaz"), F.fi("sapphire"), F.fi("palladium")];
		var arcArray = new Packages.arc.struct.Array(array);
		var stack = entity.getItemStack() == null ? null : entity.getItemStack().item;
		
		ItemSelection.buildTable(table, arcArray, prov(() => stack), cons(item => {
			this.lastItem = item;
			tile.configure(item == null ? -1 : item.id);
		}));
	},
	
	configured(tile, player, value){
		entity = tile.ent();
		
		entity.progress = 0;
		
		if(value != -1){
			entity.setSequence(this.getItemSequence(value));
			var items = new ItemStack(Vars.content.item(value), this.getItemAmount(this.getItemSequence(value)));
			entity.setItemStack(items);
		}else{
			entity.setSequence(0);
			entity.setItemStack(null);
		}
	},
	
	getItemAmount(value){
		var arrayb = [8, 6, 7, 8, 6, 9, 7, 3];
		
		return arrayb[value];
	},
	
	getItemSequence(value){
		var itemV = Vars.content.item(value);
		
		if(itemV == F.fi("diamond")) return 1;
		if(itemV == F.fi("emerald")) return 2;
		if(itemV == F.fi("amethyst")) return 3;
		if(itemV == F.fi("ruby")) return 4;
		if(itemV == F.fi("topaz")) return 5;
		if(itemV == F.fi("sapphire")) return 6;
		if(itemV == F.fi("palladium")) return 7;
		return 0;
	},
	
	customTryDump(tile){
		var arrayd = [F.fi("diamond"), F.fi("emerald"), F.fi("amethyst"), F.fi("ruby"), F.fi("topaz"), F.fi("sapphire"), F.fi("palladium")];

		for(var i = 0; i < arrayd.length; i++){
			this.tryDump(tile, arrayd[i]);
		}
	},
	
	update(tile){
		entity = tile.ent();

		if(entity.cons.valid() && entity.getSequence() != 0){

			entity.progress += this.getProgressIncrease(entity, this.craftTime);
			entity.totalProgress += entity.delta() * entity.warmup;
			entity.warmup = Mathf.lerpDelta(entity.warmup, 1, 0.02);

			if(Mathf.chance(Time.delta() * this.updateEffectChance)){
				Effects.effect(this.updateEffect, entity.x + Mathf.range(this.size * Vars.tilesize / 2), entity.y + Mathf.range(this.size * Vars.tilesize / 2));
			}
		}else{
			entity.warmup = Mathf.lerp(entity.warmup, 0, 0.02);
			entity.totalProgress += entity.delta() * entity.warmup;
		};
		
		if(entity.progress >= 1){
			entity.cons.trigger();

			if(entity.getItemStack() != null){
				this.useContent(tile, entity.getItemStack().item);
				for(var i = 0; i < entity.getItemStack().amount; i++){
					this.offloadNear(tile, entity.getItemStack().item);
				}
			};

			Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
			entity.progress = 0;
        };
		
		if(entity.timer.get(this.timerDump, this.dumpTime)){
			//this.tryDump(tile, entity.getItemStack().item);
			//this.tryDump(tile);
			this.customTryDump(tile);
		}
	}
});
mineDrill.health = 840;
mineDrill.hasItems = true;
mineDrill.hasPower = true;
mineDrill.size = 4;
mineDrill.craftTime = 90;
mineDrill.consumes.power(30);
mineDrill.idleSound = Sounds.respawning;
mineDrill.idleSoundVolume = 0.05;
mineDrill.updateEffect = Fx.fuelburn;
mineDrill.craftEffect = Fx.smeltsmoke;
mineDrill.configurable = true;
mineDrill.lastItem = null;
mineDrill.entityType = prov(() => {
	entityB = extend(GenericCrafter.GenericCrafterEntity, {
		getSequence(){
			return this._sequence;
		},
		
		setSequence(a){
			this._sequence = a
		},
		
		getItemStack(){
			return this._outputStack;
		},
		
		setItemStack(a){
			this._outputStack = a;
		},
		
		config(){
			return this._outputStack == null ? -1 : this._outputStack.item.id;
		},
		
		write(stream){
			this.super$write(stream);
			stream.writeShort(this.getItemStack() == null ? -1 : this.getItemStack().item.id);
		},
		
		read(stream, revision){
			this.super$read(stream, revision);
			
			var itemId = stream.readShort();
			
			if(itemId != -1){
				this._outputStack = new ItemStack(Vars.content.item(itemId), this.block.getItemAmount(this.block.getItemSequence(itemId)));
				this._sequence = this.block.getItemSequence(itemId);
			}else{
				this._outputStack = null;
				this._sequence = 0;
			};
		}
	});
	entityB.setSequence(0);
	entityB.setItemStack(null);
	
	return entityB;
});
mineDrill.requirements(Category.crafting, ItemStack.with(F.fi("thorium-plate"), 135, F.fi("titanium-plate"), 125, Items.silicon, 180, Items.surgealloy, 80, Items.phasefabric, 160));

TechTree.create(Blocks.blastDrill, mineDrill);
