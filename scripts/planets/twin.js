const TwinGenerator = extend(PlanetGenerator, {
    getColor(position){
        var block = this.getBlock(position);

        Tmp.c1.set(block.mapColor).a = 1 - block.albedo;
        return Tmp.c1
    },
    
    getBlock(pos){
	    var height = this.rawHeight(pos);
	
	    Tmp.v31.set(pos);
	    pos = Tmp.v33.set(pos).scl(TwinGenerator.scl);
	    var rad = TwinGenerator.scl;
	    var temp = Mathf.clamp(Math.abs(pos.y * 2) / rad);
	    var tnoise = simplex.octaveNoise3D(7, 0.56, 1 / 3, pos.x, pos.y + 999, pos.z);
	    temp = Mathf.lerp(temp, tnoise, 0.5);
	    height *= 1.2
	    height = Mathf.clamp(height);
	
	    var tar = simplex.octaveNoise3D(4, 0.55, 0.5, pos.x, pos.y + 999, pos.z) * 0.3 + Tmp.v31.dst(0, 0, 1) * 0.2;
	    var res = TwinGenerator.arr[
	       Mathf.clamp(Mathf.floor(temp * TwinGenerator.arr.length), 0, TwinGenerator.arr[0].length - 1)][ Mathf.clamp(Mathf.floor(height * TwinGenerator.arr[0].length), 0, TwinGenerator.arr[0].length - 1)
	    ];
	
	    if (tar > 0.5){
	        return TwinGenerator.tars.get(res, res);
	    } else {
	        return res;
	    };
    },
    
    rawHeight(pos){
		var pos = Tmp.v33.set(pos);
		pos.scl(TwinGenerator.scl);
		
		return (Mathf.pow(simplex.octaveNoise3D(7, 0.5, 1 / 3, pos.x, pos.y, pos.z), 2.3) + TwinGenerator.waterOffset) / (1 + TwinGenerator.waterOffset);  
    },
    
    getHeight(position){
        var height = this.rawHeight(position);
        return Math.max(height, TwinGenerator.water);
    },
    
    genTile(position, tile){
        tile.floor = this.getBlock(position);
        tile.block = tile.floor.asFloor().wall;

        if(rid.getValue(position.x, position.y, position.z, 22) > 0.32){
            tile.block = Blocks.air;
        }
    }
    
});

TwinGenerator.arr = [
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
TwinGenerator.scl = 5;
TwinGenerator.waterOffset = 0.001;
TwinGenerator.basegen = new BaseGenerator();
TwinGenerator.water = 2 / TwinGenerator.arr[0].length;

TwinGenerator.dec = new ObjectMap().of(
    Blocks.grass, Blocks.stone,
    Blocks.grass, Blocks.stone,
    Blocks.water, Blocks.water,
    Blocks.darksandWater, Blocks.darksandWater
);

TwinGenerator.tars = new ObjectMap().of(
    Blocks.grass, Blocks.shale,
    Blocks.stone, Blocks.shale
);

const simplex = new Packages.arc.util.noise.Simplex();
const rid = new Packages.arc.util.noise.RidgedPerlin(1, 2);
const TwinPlanet = new JavaAdapter(Planet, {}, "twin", Planets.sun, 3, 1);
TwinPlanet.generator = TwinGenerator;
TwinPlanet.startSector = 25;
TwinPlanet.hasAtmosphere = true;
TwinPlanet.atmosphereColor = Pal.accent.cpy().a(0.7);
TwinPlanet.lightColor = Pal.accent.cpy().a(0.7); 
TwinPlanet.meshLoader = prov(() => new HexMesh(TwinPlanet, 8));

const TwinSectors = new JavaAdapter(SectorPreset, {}, "card", TwinPlanet, 25);
TwinSectors.alwaysUnlocked = true;
TwinSectors.captureWave = 5;