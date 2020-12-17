const F = require("func");

const BigSolarPanel = extendContent(SolarGenerator, "big-solar-panel", {});
BigSolarPanel.buildVisibility = BuildVisibility.shown;
BigSolarPanel.size = 2;
BigSolarPanel.powerProduction = 0.35;
BigSolarPanel.health = 220;
BigSolarPanel.category = Category.power;
BigSolarPanel.requirements = ItemStack.with(Items.graphite, 30, Items.lead, 45, Items.silicon, 20);

const BigBattery = extendContent(Battery, "big-battery", {});
BigBattery.buildVisibility = BuildVisibility.shown;
BigBattery.size = 2;
BigBattery.health = 220;
BigBattery.category = Category.power;
BigBattery.requirements = ItemStack.with(Items.graphite, 30, Items.lead, 50);
BigBattery.consumes.powerBuffered(20000);

const HugeSolarPanel = extendContent(SolarGenerator, "huge-solar-panel", {});
HugeSolarPanel.buildVisibility = BuildVisibility.shown;
HugeSolarPanel.size = 4;
HugeSolarPanel.powerProduction = 4.0;
HugeSolarPanel.health = 430;
HugeSolarPanel.category = Category.power;
HugeSolarPanel.requirements = ItemStack.with(Items.silicon, 300, Items.phaseFabric, 75, Items.surgeAlloy, 100);

const HugeBattery = extendContent(Battery, "huge-battery", {});
HugeBattery.buildVisibility = BuildVisibility.shown;
HugeBattery.size = 4;
HugeBattery.health = 750;
HugeBattery.category = Category.power;
HugeBattery.requirements = ItemStack.with(Items.surgeAlloy, 45, Items.phaseFabric, 30, Items.silicon, 50);
HugeBattery.consumes.powerBuffered(150000);

const windmill = extendContent(PowerBlock, "windmill-generator", {
    setBars(){
        this.super$setBars();

	    this.bars.add("power",
            func(e =>
		        new Bar(
	                Core.bundle.format("bar.poweroutput", Strings.fixed(e.getPowerProduction() * 60, 1)),
			        Pal.powerBar, floatp(() => 1.0)
	            )
	        )
        )
    }
});
windmill.buildType = () => extend(Building, {
    draw(){
        this.super$draw();
       
        var z = Draw.z();
        Draw.z(Layer.blockOver);
        Draw.rect(Core.atlas.find("collos-windmill-generator-rotator"), this.x, this.y, Time.time*3);
        Draw.z(z);
    }, 

    getPowerProduction(tile){
        return 75.0/60.0;
    }
});
windmill.buildVisibility = BuildVisibility.shown;
windmill.layer = Layer.turret;
windmill.hasPower = true;
windmill.outputsPower = true;
windmill.consumesPower = false;
windmill.size = 2;
windmill.health = 70;
windmill.buildCostMultiplier = 0.7;
windmill.breakable = true;
windmill.solid = true;
windmill.category = Category.power;
windmill.requirements = ItemStack.with(Items.graphite, 95, Items.metaglass, 85, F.fi("emerald"), 105, Items.titanium, 120);

const windmillLarge = extendContent(PowerBlock, "windmill-generator-large", {
    setBars(){
        this.super$setBars();

	    this.bars.add("power",
            func(e =>
		        new Bar(
	                Core.bundle.format("bar.poweroutput", Strings.fixed(e.getPowerProduction() * 60, 1)),
			        Pal.powerBar, floatp(() => 1.0)
	            )
	        )
        )
    }
});
windmillLarge.buildType = () => extend(Building, {
    draw(){
        this.super$draw();
       
        var z = Draw.z();
        Draw.z(Layer.blockOver);
        Draw.rect(Core.atlas.find("collos-windmill-generator-large-rotator"), this.x, this.y, Time.time*3);
        Draw.z(z);
    }, 

    getPowerProduction(tile){
        return 200.0/60.0;
    }
}); 
windmillLarge.buildVisibility = BuildVisibility.shown;
windmillLarge.layer = Layer.turret;
windmillLarge.hasPower = true;
windmillLarge.outputsPower = true;
windmillLarge.consumesPower = false;
windmillLarge.size = 3;
windmillLarge.health = 165;
windmillLarge.buildCostMultiplier = 0.7;
windmillLarge.breakable = true;
windmillLarge.solid = true;
windmillLarge.category = Category.power;
windmillLarge.requirements = ItemStack.with(Items.graphite, 275, Items.metaglass, 150, F.fi("emerald"), 375, Items.plastanium, 200);

F.techNode(Blocks.solarPanel, BigSolarPanel, ItemStack.with(Items.graphite, 2000, Items.lead, 3000, Items.silicon, 2500));
F.techNode(Blocks.solarPanel, windmill, ItemStack.with(Items.graphite, 5000, Items.metaglass, 7500, F.fi("emerald"), 10000, Items.titanium, 9000));
F.techNode(Blocks.battery, BigBattery, ItemStack.with(Items.graphite, 2000, Items.lead, 3000));
F.techNode(Blocks.batteryLarge, HugeBattery, ItemStack.with(Items.surgeAlloy, 2000, Items.phaseFabric, 1500, Items.silicon, 1500));
F.techNode(Blocks.largeSolarPanel, HugeSolarPanel, ItemStack.with(Items.silicon, 12000, Items.phaseFabric, 3000, Items.surgeAlloy, 5000));
F.techNode(windmill, windmillLarge, ItemStack.with(Items.graphite, 20000, Items.metaglass, 18000, F.fi("emerald"), 30000, Items.plastanium, 22000));
