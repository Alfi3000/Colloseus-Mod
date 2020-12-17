const F = require("func");

const power1 = 4500.0/60.0;
const power2 = 15000.0/60.0;
const power3 = 62500.0/60.0;

const tetraReq = ItemStack.with(Items.lead, 4000, Items.silicon, 3000, Items.thorium, 1000, Items.plastanium, 600, Items.phaseFabric, 600, Items.surgeAlloy, 800);
const pentaReq = ItemStack.with(Items.lead, 8000, Items.silicon, 6500, Items.thorium, 1800, Items.plastanium, 1300, Items.phaseFabric, 1000, Items.surgeAlloy, 1400, Items.titanium, 4500, F.fi("palladium"), 1000, F.fi("cutol"), 600); 
const hextaReq = ItemStack.with(Items.lead, 14000, Items.silicon, 10000, Items.thorium, 3000, Items.plastanium, 2000, Items.phaseFabric, 1500, Items.surgeAlloy, 2200, Items.titanium, 8000, F.fi("palladium"), 2500, F.fi("cutol"), 1000, F.fi("orbon"), 750); 
const ultiReq = ItemStack.with(Items.lead, 25000, Items.silicon, 15000, Items.thorium, 5000, Items.plastanium, 3000, Items.phaseFabric, 2400, Items.surgeAlloy, 3000, Items.titanium, 15000, F.fi("palladium"), 5000, F.fi("cutol"), 1800, F.fi("orbon"), 1400, F.fi("contritum"), 1000, F.fi("laculis"), 2400); 
const projReq = ItemStack.with(Items.lead, 50000, Items.copper, 50000, Items.silicon, 50000, Items.titanium, 20000, Items.thorium, 20000, Items.plastanium, 10000, Items.phaseFabric, 7500, Items.surgeAlloy, 7500, F.fi("palladium"), 20000, F.fi("cutol"), 5000, F.fi("orbon"), 5000, F.fi("contritum"), 5000, F.fi("laculis"), 10000, F.fi("photonite"), 25000); 

const tetraCons = ItemStack.with(Items.silicon, 1000, Items.plastanium, 600, Items.surgeAlloy, 500, Items.phaseFabric, 350);
const pentaCons = ItemStack.with(Items.silicon, 1400, Items.plastanium, 850, Items.surgeAlloy, 800, Items.phaseFabric, 500, F.fi("cutol"), 600, F.fi("palladium"), 700);
const hextaCons = ItemStack.with(Items.silicon, 1850, Items.plastanium, 1200, Items.surgeAlloy, 1050, Items.phaseFabric, 850, F.fi("cutol"), 950, F.fi("palladium"), 1000, F.fi("orbon"), 600, F.fi("meteorite"), 500, Items.thorium, 1000);
const ultiCons = ItemStack.with(Items.silicon, 2500, Items.plastanium, 1800, Items.surgeAlloy, 1500, Items.phaseFabric, 1200, F.fi("cutol"), 1500, F.fi("palladium"), 1800, F.fi("orbon"), 1100, F.fi("meteorite"), 900, Items.thorium, 1750, F.fi("contritum"), 900, F.fi("laculis"), 1000);

const PentativeReconstructor = extendContent(Reconstructor, "pentative-reconstructor", {});
PentativeReconstructor.buildType = () => {
	const ent = extendContent(Reconstructor.ReconstructorBuild, PentativeReconstructor, {
	    displayConsumption(table){
	        table.left();
	        for(var i = 0; i < this.block.consumes.all().length; i++){
		        var cons = this.block.consumes.all()[i];
	            if(cons.isOptional() && cons.isBoost()) continue;
	            if(cons.type() == ConsumeType.item) {
			        for(var s = 0; s < cons.items.length; s++){
				        var stack = cons.items[s];
			            table.add(new ReqImage(new ItemImage(stack.item.icon(Cicon.medium), stack.amount),
			                () => this.items != null && this.items.has(stack.item, stack.amount))).padRight(8);
		
			            if(s % 4 == 3) table.row();
			        }
		        };
	            if(cons.type() != ConsumeType.item) cons.build(this, table);
	        }
	    }
	});
	return ent;
};
PentativeReconstructor.buildVisibility = BuildVisibility.shown;
PentativeReconstructor.size = 11;
PentativeReconstructor.upgrades.addAll();
PentativeReconstructor.consumes.liquid(F.fl("helium-liquid"), 50.0/60.0);
PentativeReconstructor.consumes.power(power1);
PentativeReconstructor.consumes.items(pentaCons);
PentativeReconstructor.category = Category.units;
PentativeReconstructor.requirements = pentaReq;
PentativeReconstructor.constructTime = 60.0 * 60.0 * 10.0;
PentativeReconstructor.liquidCapacity = 300.0;

const HextativeReconstructor = extendContent(Reconstructor, "hextative-reconstructor", {});
HextativeReconstructor.buildType = () => {
	const ent = extendContent(Reconstructor.ReconstructorBuild, HextativeReconstructor, {
	    displayConsumption(table){
	        table.left();
	        for(var i = 0; i < this.block.consumes.all().length; i++){
		        var cons = this.block.consumes.all()[i];
	            if(cons.isOptional() && cons.isBoost()) continue;
	            if(cons.type() == ConsumeType.item) {
			        for(var s = 0; s < cons.items.length; s++){
				        var stack = cons.items[s];
			            table.add(new ReqImage(new ItemImage(stack.item.icon(Cicon.medium), stack.amount),
			                () => this.items != null && this.items.has(stack.item, stack.amount))).padRight(8);
		
			            if(s % 4 == 3) table.row();
			        }
		        };
	            if(cons.type() != ConsumeType.item) cons.build(this, table);
	        }
	    }
	});
	return ent;
};
HextativeReconstructor.buildVisibility = BuildVisibility.shown;
HextativeReconstructor.size = 13;
HextativeReconstructor.upgrades.addAll();
HextativeReconstructor.consumes.liquid(F.fl("helium-liquid"), 120.0/60.0);
HextativeReconstructor.consumes.power(power2);
HextativeReconstructor.category = Category.units;
HextativeReconstructor.requirements = hextaReq;
HextativeReconstructor.constructTime = 60.0 * 60.0 * 25.0;
HextativeReconstructor.liquidCapacity = 1000.0; 
HextativeReconstructor.consumes.items(hextaCons); 

const UltimativeReconstructor = extendContent(Reconstructor, "ultimative-reconstructor", {});
UltimativeReconstructor.buildType = () => {
	const ent = extendContent(Reconstructor.ReconstructorBuild, UltimativeReconstructor, {
	    displayConsumption(table){
	        table.left();
	        for(var i = 0; i < this.block.consumes.all().length; i++){
		        var cons = this.block.consumes.all()[i];
	            if(cons.isOptional() && cons.isBoost()) continue;
	            if(cons.type() == ConsumeType.item) {
			        for(var s = 0; s < cons.items.length; s++){
				        var stack = cons.items[s];
			            table.add(new ReqImage(new ItemImage(stack.item.icon(Cicon.medium), stack.amount),
			                () => this.items != null && this.items.has(stack.item, stack.amount))).padRight(8);
		
			            if(s % 4 == 3) table.row();
			        }
		        };
	            if(cons.type() != ConsumeType.item) cons.build(this, table);
	        }
	    }
	});
	return ent;
};
UltimativeReconstructor.buildVisibility = BuildVisibility.shown;
UltimativeReconstructor.size = 15;
UltimativeReconstructor.upgrades.addAll();
UltimativeReconstructor.consumes.liquid(F.fl("helium-liquid"), 250.0/60.0);
UltimativeReconstructor.consumes.power(power3);
UltimativeReconstructor.consumes.items(ultiCons);
UltimativeReconstructor.category = Category.units;
UltimativeReconstructor.requirements = ultiReq;
UltimativeReconstructor.constructTime = 60.0 * 60.0 * 60.0;
UltimativeReconstructor.liquidCapacity = 2750.0;

///////////

const ProjectionReconstructor = extendContent(Block, "projection-reconstructor", {});
ProjectionReconstructor.buildType = () => extend(Building, {
	init(tile, team, shouldAdd, rotation){
		this.super$init(tile, team, shouldAdd, rotation);
		
		var rect = new Rect();
		var v = new Vec2();
		
		rect.setCentered(this.x, this.y, 30*8);
		v.trns(rotation*90, this.block.size + 4);
		
		rect.move(v.x, v.y);
		this.setRect(rect);

		return this;
	}, 
	
    draw(){
    	Draw.color(Pal.accent);
        var r = this.getRect();
        Lines.stroke(3.0);
    	Lines.line(r.x, r.y, r.x+r.width, r.y);
    	Lines.line(r.x, r.y, r.x, r.y+r.height);
    	Lines.line(r.x+r.width, r.y, r.x+r.width, r.y+r.height);
    	Lines.line(r.x, r.y+r.height, r.x+r.width, r.y+r.height);
        Draw.color();
        
        Draw.rect(F.tex("projection-reconstructor"), this.x, this.y);
        Draw.z(Layer.blockOver + 0.1);
        Draw.rect(F.tex("projection-reconstructor-top"), this.x, this.y);
    }, 
		
    displayConsumption(table){
        table.left();
        for(var i = 0; i < this.block.consumes.all().length; i++){
	        var cons = this.block.consumes.all()[i];
            if(cons.isOptional() && cons.isBoost()) continue;
            if(cons.type() == ConsumeType.item) {
		        for(var s = 0; s < cons.items.length; s++){
			        var stack = cons.items[s];
		            table.add(new ReqImage(new ItemImage(stack.item.icon(Cicon.medium), stack.amount),
		                () => this.items != null && this.items.has(stack.item, stack.amount))).padRight(8);
	
		            if(s % 4 == 3) table.row();
		        }
	        };
            if(cons.type() != ConsumeType.item) cons.build(this, table);
        }
    }, 

	setRect(rect){
		this._rect = rect;
	},

	getRect(){
		return this._rect;
	}
});
ProjectionReconstructor.group = BlockGroup.units;
ProjectionReconstructor.sync = true;
ProjectionReconstructor.solid = true;
ProjectionReconstructor.update = true;
ProjectionReconstructor.rotate = true;
ProjectionReconstructor.breakable = true;
//ProjectionReconstructor.buildVisibility = BuildVisibility.shown;
ProjectionReconstructor.size = 15;
ProjectionReconstructor.consumes.liquid(F.fl("helium-liquid"), 300.0/60.0);
ProjectionReconstructor.consumes.power(power3);
ProjectionReconstructor.consumes.items();
ProjectionReconstructor.category = Category.units;
ProjectionReconstructor.requirements = projReq;
ProjectionReconstructor.liquidCapacity = 3500.0;

F.techNode(Blocks.tetrativeReconstructor, PentativeReconstructor, ItemStack.with(Items.silicon, 140000, Items.phaseFabric, 65000, Items.lead, 240000, Items.thorium, 110000, Items.surgeAlloy, 55000));
F.techNode(PentativeReconstructor, HextativeReconstructor, ItemStack.with(Items.silicon, 140000, Items.phaseFabric, 65000, Items.lead, 240000, Items.thorium, 110000, Items.surgeAlloy, 55000));
F.techNode(HextativeReconstructor, UltimativeReconstructor, ItemStack.with(Items.silicon, 140000, Items.phaseFabric, 65000, Items.lead, 240000, Items.thorium, 110000, Items.surgeAlloy, 55000));
//F.techNode(UltimativeReconstructor, ProjectionReconstructor, ItemStack.with(Items.silicon, 140000, Items.phaseFabric, 65000, Items.lead, 240000, Items.thorium, 110000, Items.surgeAlloy, 55000));
