module.exports = {	
    name: null, 
    techNode(parent, block, requirements){
        var neededParent = TechTree.all.find(node => node.content == parent);
        new TechTree.TechNode(neededParent, block, requirements);
	}, 

    tex(name) {
	    return Core.atlas.find("collos-"+name);
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