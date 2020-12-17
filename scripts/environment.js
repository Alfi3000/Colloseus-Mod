const F = require("func");

function nb(name) {
    const block = extendContent(StaticWall, name, {});
}

function no(name, item) {
    const ore = extendContent(OreBlock, name, {});
    ore.itemDrop = item;
}

function nt(name, item) {
    const tree = extendContent(TreeBlock, name, {});
}

function nf(name, itemDrop, liquidDrop, playerUnmineable, speedMultiplier, dragMultiplier, variants){
    const floor = extendContent(Floor, name, {});
	floor.itemDrop = itemDrop;
	floor.liquidDrop = liquidDrop;
    floor.playerUnmineable = playerUnmineable;
	floor.speedMultiplier = speedMultiplier;
	floor.dragMultiplier = dragMultiplier;
	floor.variants = variants;
}

nt("dead-tree");
nt("jungle-tree");
nt("jungle-plant");

no("ore-diamond", F.fi("diamond"));
no("ore-ruby", F.fi("ruby"));
no("ore-emerald", F.fi("emerald"));
no("ore-sapphire", F.fi("sapphire"));
no("ore-amethyst", F.fi("amethyst"));
no("ore-topaz", F.fi("topaz"));
no("ore-palladium", F.fi("palladium"));
no("ore-meteorite", F.fi("meteorite"));

nb("dirt-rocks");
nb("jungle-wall");
nb("blass-wall");
nb("lights-block");
nb("purple-block");
nb("crimzes-block");
nb("salts-block");

nf("dirt", Items.sand, null, true, 0.8, 2.0, 3);
nf("jungle-floor", null, null, true, 1.0, 1.0, 4);
nf("blass", null, null, true, 1.0, 1.0, 3);
nf("lights-floor", null, null, true, 1.0, 1.0, 3);
nf("purple-floor", null, null, true, 1.0, 1.0, 3);
nf("crimzes-floor", null, null, true, 1.0, 1.0, 3);
nf("salts-floor", null, null, true, 1.0, 0.8, 6);

const lava = extendContent(Floor, "lava", {});
lava.variants = 4;
lava.status = StatusEffects.burning;
lava.statusDuration = 600;
lava.drownTime = 30;
lava.isLiquid = true;
lava.liquidDrop = F.fl("lava-liquid");
lava.walkEffect = Fx.melting;
lava.drownUpdateEffect = Fx.melting;
//lava.blendGroup = CacheLayer.water;
lava.cacheLayer = CacheLayer.water; 

const jungleWater = extendContent(Floor, "jungle-water", {});
jungleWater.variants = 4;
jungleWater.status = StatusEffects.wet;
jungleWater.statusDuration = 60;
jungleWater.drownTime = 120;
jungleWater.isLiquid = true;
jungleWater.liquidDrop = Liquids.water;
jungleWater.speedMultiplier = 0.25;
jungleWater.cacheLayer = CacheLayer.water; 
