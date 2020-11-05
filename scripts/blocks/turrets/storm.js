const F = require("functions/f");

const StormBullet = extend(BasicBulletType,{
	draw(b){
        Draw.blend(Blending.additive);
        Draw.color(Color.valueOf("#FFE5B2"));
        Fill.circle(b.x, b.y, 2.5)
        Draw.color();
        Draw.blend();
    }  
});

StormBullet.homingRange = 9999;
StormBullet.homingPower = 10.0;
StormBullet.speed = 7.5;
StormBullet.lifetime = 180;
StormBullet.damage = 20;

const GlassBullet = extend(BasicBulletType,{
	draw(b){
        Draw.blend(Blending.additive);
        Draw.color(Color.valueOf("#F6FFFE"));
        Fill.circle(b.x, b.y, 3.5)
        Draw.color();
        Draw.blend();
    }  
});

GlassBullet.homingRange = 9999;
GlassBullet.homingPower = 15.0;
GlassBullet.speed = 10.0;
GlassBullet.lifetime = 180;
GlassBullet.damage = 45;

const Storm = extendContent(ItemTurret, "storm", {
   canPlaceOn(tile){
	   sum = 0;
	   tiles = tile.getLinkedTilesAs(this, this.tempTiles).toArray();

	   for(i = 0; i < tiles.length; i++){
		   other = tiles[i];
	       sum += this.isValid(other);
	   };

	   return sum >= 1;
   }, 

   isValid(tile){
	   if(tile != null){
		   if(tile.floor().itemDrop == Items.sand) return 1;
	   };

	   return 0;
   } 
});

Storm.ammo(Items.sand, StormBullet, Items.metaglass, GlassBullet);
Storm.size = 2;
Storm.health = 1260;
Storm.reload = 40;
Storm.range = 40*Vars.tilesize;
Storm.recoil = 3;
Storm.requirements(Category.turret, ItemStack.with(Items.graphite, 75, Items.lead, 60, Items.titanium, 45));

TechTree.create(F.fb("grabber"), Storm);
