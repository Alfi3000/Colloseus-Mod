module.exports = {	
    name: null, 
    techNode(parent2, block, requirements){
        var parent = TechTree.all.find(node => node.content == parent2);
        var node = new TechTree.TechNode(parent, block, requirements);
	  
	    if(parent != null) parent.children.add(node);
	}, 

    tex(name) {
	    return Core.atlas.find("collos-"+name);
	}, 

    blends(build, direction) {
	    return PayloadAcceptor.blends(build, direction);
	}, 
	
    node(parent2, block, requirements, objectives){
	    var parent = TechTree.all.find(node => node.content == parent2);
	    var node = new TechTree.TechNode(parent, block, requirements);
	
	    node.objectives.add(objectives);
	    if(parent != null) parent.children.add(node);
	}, 

    c(string) {
	    return Color.valueOf(string);
	}, 

    fi(name) {
	    return Vars.content.getByName(ContentType.item, "collos-"+name);
	},

    fs(index) {	
        var spriteName = "collos-"+this.name+index;
	    return spriteName;
	}, 

    fu(name) {
	    return Vars.content.getByName(ContentType.unit, "collos-"+name);
	}, 
	
    fl(name) {
	    return Vars.content.getByName(ContentType.liquid, "collos-"+name);
	}, 

	fb(name) {
	    return Vars.content.getByName(ContentType.block, "collos-"+name);
	}
}