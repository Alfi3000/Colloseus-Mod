const F = require("func");
const simplex = new Packages.arc.util.noise.Simplex();
const rid = new Packages.arc.util.noise.RidgedPerlin(1, 2);

const BetiafGenerator = extend(PlanetGenerator, {
    getColor(position){
        var block = this.getBlock(position);

        Tmp.c1.set(block.mapColor).a = 1 - block.albedo;
        return Tmp.c1
    },
    
    getBlock(pos){
	    var height = this.rawHeight(pos);
	
	    Tmp.v31.set(pos);
	    pos = Tmp.v33.set(pos).scl(BetiafGenerator.scl);
	    var rad = BetiafGenerator.scl;
	    var temp = Mathf.clamp(Math.abs(pos.y * 2) / rad);
	    var tnoise = simplex.octaveNoise3D(7, 0.56, 1 / 3, pos.x, pos.y + 999, pos.z);
	    temp = Mathf.lerp(temp, tnoise, 0.5);
	    height *= 1.2
	    height = Mathf.clamp(height);
	
	    var tar = simplex.octaveNoise3D(4, 0.55, 0.5, pos.x, pos.y + 999, pos.z) * 0.3 + Tmp.v31.dst(0, 0, 1) * 0.2;
	    var res = BetiafGenerator.arr[
	       Mathf.clamp(Mathf.floor(temp * BetiafGenerator.arr.length), 0, BetiafGenerator.arr[0].length - 1)][ Mathf.clamp(Mathf.floor(height * BetiafGenerator.arr[0].length), 0, BetiafGenerator.arr[0].length - 1)
	    ];
	
	    if (tar > 0.5){
	        return BetiafGenerator.tars.get(res, res);
	    } else {
	        return res;
	    };
    },
    
    rawHeight(pos){
		var pos = Tmp.v33.set(pos);
		pos.scl(BetiafGenerator.scl);
		
		return (Mathf.pow(simplex.octaveNoise3D(7, 0.5, 1 / 3, pos.x, pos.y, pos.z), 2.3) + BetiafGenerator.waterOffset) / (1 + BetiafGenerator.waterOffset);  
    },
    
    getHeight(position){
        var height = this.rawHeight(position);
        return Math.max(height, BetiafGenerator.water);
    },
    
    genTile(position, tile){
        tile.floor = this.getBlock(position);
        tile.block = tile.floor.asFloor().wall;

        if(rid.getValue(position.x, position.y, position.z, 22) > 0.32){
            tile.block = Blocks.air;
        }
    }
});

BetiafGenerator.arr = [
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sandWater, Blocks.stone, Blocks.stone],
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sandWater, Blocks.stone, Blocks.stone, Blocks.stone],
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.salt, Blocks.sand, Blocks.salt, Blocks.sand, Blocks.sand, Blocks.sandWater, Blocks.stone, Blocks.stone, Blocks.stone],
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.salt, Blocks.salt, Blocks.dacite, Blocks.sand, Blocks.stone, Blocks.stone, Blocks.stone, Blocks.snow, Blocks.iceSnow, Blocks.ice],  
    [Blocks.deepwater, Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.salt, Blocks.salt, Blocks.dacite, Blocks.dacite, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice],  
    [Blocks.deepwater, Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.stone, Blocks.iceSnow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice],  
    [Blocks.deepwater, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.stone, Blocks.stone, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.snow, Blocks.ice],  
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.craters, Blocks.stone, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.snow, Blocks.ice, Blocks.ice],  
    [Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.stone, Blocks.grass, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice],
    [Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.grass, Blocks.ice, Blocks.ice, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice], 
    [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.salt, Blocks.salt, Blocks.dacite, Blocks.dacite, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice], 
    [Blocks.sandWater, Blocks.sandWater, Blocks.sand, Blocks.salt, Blocks.salt, Blocks.dacite, Blocks.iceSnow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice],
    [Blocks.dacite, Blocks.dacite, Blocks.snow, Blocks.ice, Blocks.iceSnow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice]
];
BetiafGenerator.scl = 5.0;
BetiafGenerator.waterOffset = 0.05;
BetiafGenerator.basegen = new BaseGenerator();
BetiafGenerator.water = 0.05;

BetiafGenerator.dec = new ObjectMap().of(
    Blocks.grass, Blocks.stone,
    Blocks.grass, Blocks.stone,
    Blocks.water, Blocks.water,
    Blocks.darksandWater, Blocks.darksandWater
);

BetiafGenerator.tars = new ObjectMap().of(
    Blocks.grass, Blocks.shale,
    Blocks.stone, Blocks.shale
);

const BetiafPlanet = new JavaAdapter(Planet, {}, "betiaf", Planets.sun, 5, 0.65);
BetiafPlanet.generator = BetiafGenerator;
BetiafPlanet.startSector = 1;
BetiafPlanet.hasAtmosphere = true;
BetiafPlanet.atmosphereColor = Color.valueOf("#FF43AA70");
BetiafPlanet.meshLoader = prov(() => new HexMesh(BetiafPlanet, 8));
BetiafPlanet.orbitSpacing = 14.0;
BetiafPlanet.rotateTime = 52.0 * 60.0; //~2.2 days
BetiafPlanet.orbitTime = Mathf.pow((2.0 + 14.0 + 0.66), 1.5) * 1000;

