const C = this.global.COLORS;
const F = require("func");
const gemColors = [C.rubyLight, C.emeraldLight, C.sapphireUnitDecalLight, C.angel, C.topazLight, C.amethystLight];
const gemColorsBack = [C.rubyDark, C.emeraldDark, C.sapphireUnitDecalDark, C.angelDark, C.topazDark, C.amethystDark];

const Distance = Core.camera.width + Core.camera.height + 30*Vars.tilesize;
function newSwEff(lifetime, startSize, multiplier, color1, color2, finion){
    const effect = new Effect(lifetime, e => {
	    Draw.color(color1, color2, e.fout());
	    Lines.stroke(startSize + multiplier * e.fout());
		Lines.swirl(e.x, e.y, startSize + multiplier * e.fin(), finion, 0);
	}); 
    return effect
}

function newCiEff(lifetime, startSize, multiplier, color1, color2){
    const effect = new Effect(lifetime, e => {
	    Draw.color(color1, color2, e.fout());
        Fill.circle(e.x, e.y, startSize + e.fout() * multiplier);
	}); 
    return effect
}

function newMagicHit(lifetime, startSize, multiplier, color1, color2){
    const effect = new Effect(lifetime, e => {
	    Draw.color(color1, color2, e.fin());

        Lines.stroke(startSize/2.0 + e.fout());

        Angles.randLenVectors(e.id, multiplier - 2.0, e.fin() * lifetime, new Floatc2({get(x, y){
            var ang = Mathf.angle(x, y);
            Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * multiplier + startSize);
        }}));
	}); 
    return effect
}

this.global.EFFECTS.magicTrailSwirl = newSwEff(15, 0.3, 2.2, C.magicLight, C.magic, 10);
this.global.EFFECTS.magicBulletTrail = new Effect(30, Distance, e => {
    Draw.color(C.magicLight, C.magic, e.fout());
    Lines.stroke(e.fout() * 2);
    const d = new Floatc2({get(x, y){
        Fill.circle(e.x, e.y, 0.1 + e.fout() * 2);
    }});
    Angles.randLenVectors(e.id, 8, 8, 0, 360, d);
});   

this.global.EFFECTS.magicBulletTrail = newCiEff(5, 0.1, 1.5, C.magicLight, C.magic);
this.global.EFFECTS.magicBulletHit = newCiEff(15, 0.3, 2.2, C.magicLight, C.magic);
this.global.EFFECTS.magicBulletHitBig = newCiEff(30, 0.45, 3.0, C.magicLight, C.magic);

this.global.EFFECTS.magicHit = newMagicHit(14, 1.0, 5.0, Color.white, C.magic);
this.global.EFFECTS.magicHitBig = newMagicHit(20, 1.5, 7.5, Color.white, C.magic);

this.global.EFFECTS.yellowBallCharge = new Effect(120, Distance, e => {
    Draw.color(C.energy);
    Lines.stroke(e.fin() * 5.0);
    Lines.circle(e.x, e.y, 20.0 + e.fout() * 140.0);

    Angles.randLenVectors(e.id, 30, 80.0 * e.fout(), new Floatc2({get(x, y){
        Fill.circle(e.x + x, e.y + y, e.fin() * 10.0);
    }}));

    Draw.color(C.energyLight);
    Fill.circle(e.x, e.y, e.fin() * 30.0);

    Draw.color();
    Fill.circle(e.x, e.y, e.fin() * 15);
});

this.global.EFFECTS.giantYellowBallHitBig = new Effect(24, Distance, e => {
    Draw.color(C.energy);
	Angles.randLenVectors(e.id * 11, 8, e.fin() * 64.0, e.rotation, 360.0, new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 8 + 1.5);
    }}));

    Lines.stroke(e.fout() * 4.0);
    Lines.circle(e.x, e.y, 10.0 + e.fin() * 80.0);
});

this.global.EFFECTS.giantYellowBallHitLarge = new Effect(38, Distance, e => {
    Draw.color(C.energy);
	Angles.randLenVectors(e.id * 11, 13, e.fin() * 120.0, e.rotation, 360.0, new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 12 + 3.0);
    }}));

    Lines.stroke(e.fout() * 8.0);
    Lines.circle(e.x, e.y, 20.0 + e.fin() * 100.0);
});

this.global.EFFECTS.cutolCraft = new Effect(60, e => {
    Angles.randLenVectors(e.id, 6, 8 + e.fin() * 13, new Floatc2({get(x, y){
        Draw.color(Color.valueOf("#718DDB"), Color.valueOf("#4C5F93"), e.fin());
        Fill.square(e.x + x, e.y + y, 0.2 + e.fout() * 3, 45);
	}}));
});

this.global.EFFECTS.luxCraft = new Effect(50, e => {
    Angles.randLenVectors(e.id, 20, 8 + e.fin() * 16, new Floatc2({get(x, y){
        Draw.color(gemColors[e.id % 6], gemColorsBack[e.id % 6], e.fin());
        Fill.square(e.x + x, e.y + y, 0.1 + e.fout() * 1.3, 45);
	}}))
});

this.global.EFFECTS.energyBlastTiny = new Effect(30, e => {
    Angles.randLenVectors(e.id, 15, 4 + e.fin() * 10, new Floatc2({get(x, y){
        Draw.color(C.crystalizerDecalLight, C.crystalizerDecal, e.fin());
        Fill.circle(e.x + x, e.y + y, 0.1 + e.fout() * 1.3);
	}}))
});

this.global.EFFECTS.orbonCraft = new Effect(30, e => {
    Angles.randLenVectors(e.id, 10, 4 + e.fin() * 10, new Floatc2({get(x, y){
        Draw.color(C.orbon, C.orbonDark, e.fin());
        Fill.circle(e.x + x, e.y + y, 0.4 + e.fout() * 1.3);

        Draw.color(C.orbonLight, C.orbon, e.fin());
        Fill.circle(e.x + x, e.y + y, 0.3 + e.fout());
	}}))
});

this.global.EFFECTS.contritumCraft = new Effect(30, e => {
    Angles.randLenVectors(e.id, 20, 5 + e.fin() * 14, new Floatc2({get(x, y){
        Draw.color(C.contritum, C.contritumDark, e.fin());
        Fill.square(e.x + x, e.y + y, 0.4 + e.fout() * 1.3, 90);
	}}))
});

