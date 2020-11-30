const F = require("func");
const simplex = new Packages.arc.util.noise.Simplex();
const rid = new Packages.arc.util.noise.RidgedPerlin(1, 2);

const PretiosoGenerator = extend(PlanetGenerator, {
    getColor(position){
        var block = this.getBlock(position);

        Tmp.c1.set(block.mapColor).a = 1 - block.albedo;
        return Tmp.c1
    },
    
    getBlock(pos){
	    var height = this.rawHeight(pos);
	
	    Tmp.v31.set(pos);
	    pos = Tmp.v33.set(pos).scl(PretiosoGenerator.scl);
	    var rad = PretiosoGenerator.scl;
	    var temp = Mathf.clamp(Math.abs(pos.y * 2) / rad);
	    var tnoise = simplex.octaveNoise3D(7, 0.56, 1 / 3, pos.x, pos.y + 999, pos.z);
	    temp = Mathf.lerp(temp, tnoise, 0.5);
	    height *= 1.2
	    height = Mathf.clamp(height);
	
	    var tar = simplex.octaveNoise3D(4, 0.55, 0.5, pos.x, pos.y + 999, pos.z) * 0.3 + Tmp.v31.dst(0, 0, 1) * 0.2;
	    var res = PretiosoGenerator.arr[
	       Mathf.clamp(Mathf.floor(temp * PretiosoGenerator.arr.length), 0, PretiosoGenerator.arr[0].length - 1)][ Mathf.clamp(Mathf.floor(height * PretiosoGenerator.arr[0].length), 0, PretiosoGenerator.arr[0].length - 1)
	    ];
	
	    if (tar > 0.5){
	        return PretiosoGenerator.tars.get(res, res);
	    } else {
	        return res;
	    };
    },
    
    rawHeight(pos){
		var pos = Tmp.v33.set(pos);
		pos.scl(PretiosoGenerator.scl);
		
		return (Mathf.pow(simplex.octaveNoise3D(7, 0.5, 1 / 3, pos.x, pos.y, pos.z), 2.3) + PretiosoGenerator.waterOffset) / (1 + PretiosoGenerator.waterOffset);  
    },
    
    getHeight(position){
        var height = this.rawHeight(position);
        return Math.max(height, PretiosoGenerator.water);
    },
    
    genTile(position, tile){
        tile.floor = this.getBlock(position);
        tile.block = tile.floor.asFloor().wall;

        if(rid.getValue(position.x, position.y, position.z, 22) > 0.32){
            tile.block = Blocks.air;
        }
    }
    
});

PretiosoGenerator.arr = [
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sandWater, Blocks.stone, Blocks.stone],

    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sandWater, Blocks.stone, Blocks.stone, Blocks.stone],
  
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.salt, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sandWater, Blocks.stone, Blocks.stone, Blocks.stone],
  
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.salt, Blocks.salt, Blocks.salt, Blocks.sand, Blocks.stone, Blocks.stone, Blocks.stone, Blocks.snow, Blocks.iceSnow, Blocks.ice],
  
    [Blocks.deepwater, Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.salt, Blocks.sand, Blocks.sand, Blocks.craters, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice],
  
    [Blocks.deepwater, Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.stone, Blocks.iceSnow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.snow, Blocks.ice],
  
    [Blocks.deepwater, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.stone, Blocks.stone, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.snow, Blocks.ice],
  
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.craters, Blocks.stone, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.snow, Blocks.ice, Blocks.ice],
  
    [Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.stone, Blocks.grass, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice],
  
    [Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.grass, Blocks.ice, Blocks.ice, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice],
  
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.grass, Blocks.grass, Blocks.ice, Blocks.ice, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice],
  
    [Blocks.sandWater, Blocks.sandWater, Blocks.sand, Blocks.grass, Blocks.stone, Blocks.grass, Blocks.iceSnow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice],
  
    [Blocks.sandWater, Blocks.sand, Blocks.snow, Blocks.ice, Blocks.iceSnow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice]
];
PretiosoGenerator.scl = 5;
PretiosoGenerator.waterOffset = 0.001;
PretiosoGenerator.basegen = new BaseGenerator();
PretiosoGenerator.water = 0.1;

PretiosoGenerator.dec = new ObjectMap().of(
    Blocks.grass, Blocks.stone,
    Blocks.grass, Blocks.stone,
    Blocks.water, Blocks.water,
    Blocks.darksandWater, Blocks.darksandWater
);

PretiosoGenerator.tars = new ObjectMap().of(
    Blocks.grass, Blocks.shale,
    Blocks.stone, Blocks.shale
);
const PretiosoPlanet = new JavaAdapter(Planet, {}, "pretioso", Planets.sun, 3, 1);
PretiosoPlanet.generator = PretiosoGenerator;
PretiosoPlanet.startSector = 25;
PretiosoPlanet.hasAtmosphere = true;
PretiosoPlanet.atmosphereColor = Color.valueOf("#FF43AA70");
PretiosoPlanet.lightColor = Color.valueOf("#BC4CFF70"); 
PretiosoPlanet.meshLoader = prov(() => new HexMesh(PretiosoPlanet, 8));

const PretiosoSectors = new JavaAdapter(SectorPreset, {}, "ice-cave", PretiosoPlanet, 25);
PretiosoSectors.alwaysUnlocked = true;
PretiosoSectors.captureWave = 20;
PretiosoSectors.difficulty = 1;

print(Maps.all());
print(Maps.byName("ice-cave"));
