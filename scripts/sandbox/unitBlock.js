const UnitCommandBlock = extendContent(Block, "unit-block", {});
UnitCommandBlock.buildType = prov(() => extend(Building, {
    _mul: 1, 
    _units: [], 
    _team: Team.derelict, 
    addButtonTeam(t, table){
	    table.button(new TextureRegionDrawable(Core.atlas.find("collos-team")).tint(Team.baseTeams[t].color), 
	    Styles.clearTransi, run(() => {
	        this._team = Team.baseTeams[t];
	    }));
    },

    draw(){
        this.super$draw();

	    Draw.color(this._team.color);
	    Draw.rect(Core.atlas.find("collos-unit-block-team"), this.x, this.y);
	    Draw.color();
    },

	addUnit(arr){
        for(var i = arr[2]; i > 0; i--) {
			this._units.push([arr[0], arr[1]]); 
        }
	}, 

	createUnits(){
        if(this._units.length > 0) {
	        for(var s = 0; s < this._units.length; s++) {
                var unit = this._units[s][0].spawn(this._team, this.x, this.y);
			
			    var vec = new Vec2();
			    vec.trns(Mathf.random(0.0, 360), 5.0);
			    unit.vel.add(vec.x, vec.y);
			};
		};

		this._units = [];
	}, 

    buildUnitButtons(name, table) {
	    table.button(new TextureRegionDrawable(Vars.content.getByName(ContentType.unit, name).icon(Cicon.small)),
        Styles.clearFulli, 32.0, run(() => {
	    	this.addUnit([Vars.content.getByName(ContentType.unit, name), this._team, this._mul]);
	    }))
    }, 

    addButtonMultiplier(m, arr, table) {
	    table.button("[#3E8CFF]"+arr[m], run(() => {
	    	this._mul = arr[m];
	    })); 
    }, 
   
    buildConfiguration(table) {
        table.defaults().size(50);
        var sizes = [1, 3, 5, 10, 25, 50, 100, 250, 500, 999];
	
        for(var m = 0; m < sizes.length; m++){
            this.addButtonMultiplier(m, sizes, table)
        };
        table.row();

	    for(var u = 0; u < Vars.content.units().size; u++){
	        var unit = Vars.content.units().get(u);

            if(unit instanceof Building) continue;

	        var name = unit.name;
	        this.buildUnitButtons(name, table);
	        if(u % 10 == 9) table.row();
	    };
	    table.row();
	
	    for(var t = 0; t < Team.baseTeams.length; t++){
            this.addButtonTeam(t, table);
        }; 

	    table.button(new TextureRegionDrawable(Core.atlas.find("collos-spawnUnits-button")), 
	    Styles.clearFulli, run(() => {
	    	this.createUnits();
	    })),

        table.row();

	    table.button("[#A53AFF]skip", run(() => {
	        for(var i = this._mul; i > 0; i--) {
		    	Vars.logic.skipWave();
            } 
	    })),

	    table.button("[#DF66FF]wave", run(() => {
	        for(var i = this._mul; i > 0; i--) {
		    	Vars.logic.runWave();
            } 
	    })),
	
	    table.button("[#FF412F]kill", run(() => {
	    	Groups.unit.each(cons(unit => unit.kill()))
	    })),

	    table.button("[#90FF60]heal", run(() => {
	    	Groups.unit.each(cons(unit => unit.heal()))
	    })),

	    table.button("[#FFE609]tp", run(() => {
	    	Groups.unit.each(cons(unit => unit.set(this.x, this.y)))
	    })),

        table.row();

        table.defaults().reset()
	}
}));

UnitCommandBlock.configurable = true;
UnitCommandBlock.size = 2;
UnitCommandBlock.sync = true;
UnitCommandBlock.expanded = true;
UnitCommandBlock.breakable = true;
UnitCommandBlock.destructible = true;
UnitCommandBlock.category = Category.effect;
UnitCommandBlock.buildVisibility = BuildVisibility.sandboxOnly;
UnitCommandBlock.requirements = ItemStack.with();