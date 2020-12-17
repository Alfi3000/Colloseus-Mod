StatusEffects.burning.color = Pal.lightFlame;
StatusEffects.freezing.color = Liquids.cryofluid.color;
StatusEffects.wet.color = Liquids.water.color;
StatusEffects.tarred.color = Liquids.oil.color;
StatusEffects.melting.color = Liquids.slag.color;
StatusEffects.shocked.color = Pal.lancerLaser;
StatusEffects.boss.color = Pal.health;

//why not? 
Blocks.illuminator.buildVisibility = BuildVisibility.shown;

this.global.SOUNDS = {};
this.global.UNITS = {};
this.global.WEATHERS = {};
this.global.COLORS = {};
this.global.WALLS = {};
this.global.EFFECTS = {};
this.global.STATUSES = {};
this.global.TURRETS = {};

print(Vars.mods.mods);

var mod = Vars.mods.locateMod("collos");
var a = mod.meta;
a.displayName = Core.bundle.get("modName");
a.description = Core.bundle.get("modDescription");
a.version = "[#EC5EFF]1.2.1[]";
a.minGameVersion = "121";
a.author = "[#AA2DFF]MoTRona[] & [GOLD]Kostolom_12[]";
