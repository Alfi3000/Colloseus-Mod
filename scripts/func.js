module.exports = {	
    techNode(parent, block, requirements){
        var neededParent = TechTree.all.find(node => node.content == parent);
        new TechTree.TechNode(neededParent, block, requirements);
	}, 

    c(string) {
	    return Color.valueOf(string);
	}, 

    fi(name) {
	    return Vars.content.getByName(ContentType.item, "collos-"+name);
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