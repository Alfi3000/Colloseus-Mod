const F = require("functions/f");

const presstick = 12;
const timerid = 0;

const wall = extendContent(Wall, "palladium-energy-wall", {
    placed(tile) {
	    this.super$placed(tile);

	    tile.entity.timer.reset(timerid, presstick+1);
    },

	handleBulletHit(entity, bullet){
		this.super$handleBulletHit(entity, bullet);

        entity.timer.reset(timerid, 0);
    },

    getPowerProduction(tile){
	    return (tile.entity.timer.check(timerid, presstick)) ? 0 : 10;
    }
});

wall.health = 420;
wall.size = 1;
wall.hasPower = true;
wall.outputsPower = true;
wall.consumesPower = false;
wall.requirements(Category.defense, ItemStack.with(F.fi("palladium"), 6)); 

const largeWall = extendContent(Wall, "palladium-energy-wall-large", {
    placed(tile) {
	    this.super$placed(tile);

	    tile.entity.timer.reset(timerid, presstick+1);
    },

	handleBulletHit(entity, bullet){
		this.super$handleBulletHit(entity, bullet);

        entity.timer.reset(timerid, 0);
    },

    getPowerProduction(tile){
        return (tile.entity.timer.check(timerid, presstick)) ? 0 : 15;
    }
});

largeWall.size = 2;
largeWall.health = 2180;
largeWall.hasPower = true;
largeWall.outputsPower = true;
largeWall.consumesPower = false;
largeWall.requirements(Category.defense, ItemStack.with(F.fi("palladium"), 24));

TechTree.create(Blocks.phaseWallLarge, wall);
TechTree.create(wall, largeWall);
