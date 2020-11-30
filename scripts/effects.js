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

this.global.EFFECTS.magicTrailSwirl = newSwEff(15, 0.3, 2.2, C.magicLight, C.magic, 10);
this.global.EFFECTS.magicBulletTrail = new Effect(30, Distance, e => {
    Draw.color(C.magicLight, C.magic, e.fout());
    Lines.stroke(e.fout() * 2);
    const d = new Floatc2({get(x, y){
        Fill.circle(e.x, e.y, 0.1 + e.fout() * 2);
    }});
    Angles.randLenVectors(e.id, 8, 8, 0, 360, d);
});   

this.global.EFFECTS.magicBulletHitTiny = new Effect(15, e => {
    Draw.color(C.magicLight, C.magicDark, e.fin());
    Lines.stroke(e.fout());
    Angles.randLenVectors(e.id, 4, 1.8 + e.fin() * 4.5, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 1.4 + 0.2);
    }}));
}); 

this.global.EFFECTS.magicBulletHitSmall = new Effect(15, e => {
    Draw.color(C.magicLight, C.magicDark, e.fin());
    Lines.stroke(0.1 + e.fout() * 1.1);
    Angles.randLenVectors(e.id, 5, 2.6 + e.fin() * 6.8, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 2.2 + 0.6);
    }}));
}); 

this.global.EFFECTS.magicBulletHit = new Effect(20, e => {
    Draw.color(C.magicLight, C.magicDark, e.fin());
    Lines.stroke(0.15 + e.fout() * 1.4);
    Angles.randLenVectors(e.id, 7, 3.2 + e.fin() * 10.2, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 2.8 + 0.75);
    }}));
}); 

this.global.EFFECTS.magicBulletHitBig = new Effect(25, e => {
    Draw.color(C.magicLight, C.magicDark, e.fin());
    Lines.stroke(0.22 + e.fout() * 1.8);
    Angles.randLenVectors(e.id, 7, 4.5 + e.fin() * 14.0, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 3.4 + 0.9);
    }}));
})

this.global.EFFECTS.magicShootEffectBig = new Effect(30, e => {
    Angles.randLenVectors(e.id, 9, 2.8 + e.fin() * 26.0, e.rotation, 22, new Floatc2({get(x, y){
        Draw.color(C.magicLight, C.magicDark, e.fin());
        Fill.square(e.x + x, e.y + y, 0.3 + e.fout() * 1.2, 45);
	}}))
});

this.global.EFFECTS.magicShootEffect = new Effect(25, e => {
    Angles.randLenVectors(e.id, 6, 2.4 + e.fin() * 20.0, e.rotation, 15, new Floatc2({get(x, y){
        Draw.color(C.magicLight, C.magicDark, e.fin());
        Fill.square(e.x + x, e.y + y, 0.2 + e.fout() * 1.1, 45);
	}}))
});

this.global.EFFECTS.magicShootEffectSmall = new Effect(20, e => {
    Angles.randLenVectors(e.id, 5, 2.0 + e.fin() * 16.0, e.rotation, 13, new Floatc2({get(x, y){
        Draw.color(Color.white, C.magic, e.fin());
        Fill.square(e.x + x, e.y + y, 0.16 + e.fout(), 45);
	}}))
});

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

this.global.EFFECTS.cutolCraft = new Effect(25, e => {
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

this.global.EFFECTS.orbonCraft = new Effect(25, e => {
    Angles.randLenVectors(e.id, 10, 4 + e.fin() * 10, new Floatc2({get(x, y){
        Draw.color(C.orbon, C.orbonDark, e.fin());
        Fill.circle(e.x + x, e.y + y, 0.4 + e.fout() * 1.3);

        Draw.color(C.orbonLight, C.orbon, e.fin());
        Fill.circle(e.x + x, e.y + y, 0.3 + e.fout());
	}}))
});

this.global.EFFECTS.contritumCraft = new Effect(40, e => {
    Angles.randLenVectors(e.id, 20, 6 + e.fin() * 20, new Floatc2({get(x, y){
        Draw.color(C.contritum, C.contritumDark, e.fin());
        Fill.square(e.x + x, e.y + y, 0.4 + e.fout() * 1.3, 90);
	}}))
});

this.global.EFFECTS.laserAdditionalEffect = new Effect(15, e => {
    Draw.color(C.unitOrangeLight, C.unitOrangeDark, e.fin());
    Fill.square(e.x , e.y, 0.8 + e.fout() * 2.0, Mathf.randomSeedRange(e.id, 360));
});

const energyShootsAngle = [-50, -25, 25, 50];
const energyShootsWidth = [7.6, 9.8, 9.8, 7.6];
const energyShootsHeight = [15.4, 22.8, 22.8, 15.4];
this.global.EFFECTS.energyShrapnelShoot = new Effect(8, e => {
    for(var i = 0; i < 4; i++) {
	    Draw.color(C.unitOrangeLight, C.unitOrangeDark, e.fout());
	    Drawf.tri(e.x, e.y, 
            energyShootsWidth[i], 
            energyShootsHeight[i],
            e.rotation+(energyShootsAngle[i])
        );
    } 
});

this.global.EFFECTS.energyShrapnelSmoke = new Effect(25, e => {
    Angles.randLenVectors(e.id, 8, 8 + e.fin() * 150, e.rotation, 15, new Floatc2({get(x, y){
        Draw.color(C.unitOrangeLight, C.unitOrangeDark, e.fout());
        Fill.square(e.x + x, e.y + y, 0.2 + e.fout() * 1.1, 45);
	}}))
});

this.global.EFFECTS.greenTinyHit = new Effect(10, e => {
    Draw.color(Pal.heal);
    Lines.stroke(1.2 * e.fout());
    Lines.circle(e.x, e.y, 0.8 + e.finpow() * 3.6);
});

this.global.EFFECTS.redArtilleryHit = new Effect(14, e => {
    Draw.color(C.unitOrangeLight, C.unitOrangeDark, e.fin());
    Lines.stroke(0.5 + e.fout() * 2.2);
    Lines.circle(e.x, e.y, e.fin() * 80.0);

    Angles.randLenVectors(e.id, 8, 5.6 + e.fin() * 25.0, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 14.5 + 3.0);
	}}))
}); 

this.global.EFFECTS.leviathanLaserCharge = new Effect(50, 100, e => {
    Draw.color(C.unitOrangeLight, C.unitOrangeDark);
	Angles.randLenVectors(e.id * 11, 30, e.fin() * 200, e.rotation, 360.0, new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 8.0 + 1.5);
    }}));

    Lines.stroke(e.fout() * 14.0);
    Lines.circle(e.x, e.y, 16.0 + e.fin() * 200.0);
});

this.global.EFFECTS.blueSquare = new Effect(25, e => {
    Draw.color(Color.valueOf("#00A6FF"));
    Lines.stroke(3.0 * e.fslope());
    Lines.square(e.x, e.y, e.fin() * 120.0);
});

this.global.EFFECTS.curseEffect = new Effect(33, e => {
    Draw.color(C.unitOrangeLight);
    Fill.circle(e.x, e.y, 0.5 + e.fout() * (0.5 + Mathf.randomSeedRange(e.id, 3.5)));
});

this.global.EFFECTS.magicUnitDamage = new Effect(40, e => {
    Draw.color(C.magic);
    Draw.alpha(0.1 + 0.5*e.fout());
    Draw.rect(Core.atlas.find(e.data[0], Core.atlas.find("error")), e.x, e.y, e.rotation - e.data[1]);
    Draw.alpha(1.0);
});

this.global.EFFECTS.thunderShoot = new Effect(50, e => {
    Angles.randLenVectors(e.id, 8, 10 + e.fin() * 80, e.rotation, 20, new Floatc2({get(x, y){
        Draw.color(Color.white, F.fi("topaz").color, e.fout());
        Fill.square(e.x + x, e.y + y, 0.5 + e.fout() * 2.5, 45);
	}}))
});

this.global.EFFECTS.hitMovingLaser = new Effect(30, e => {
    Angles.randLenVectors(e.id, 3, 4 + e.fin() * 10.0, 0, 360.0, new Floatc2({get(x, y){
        Draw.color(Color.white, F.fi("topaz").color, e.fout());
        Fill.square(e.x + x, e.y + y, 0.5 + e.fout() * 1.2, 45);
	}}))
});

this.global.EFFECTS.movingLaserOnExtend = new Effect(45, e => {
    Angles.randLenVectors(e.id, 5, 6 + e.fin() * 16.0, e.rotation, 10, new Floatc2({get(x, y){
        Draw.color(Color.white, F.fi("topaz").color, e.fout());
        Fill.square(e.x + x, e.y + y, 0.5 + e.fout() * 1.1, 45);
	}}))
});

/////////

this.global.EFFECTS.YellowBeamFlare = new Effect(30, e => {
  Draw.color(Color.valueOf("FFFFFF44"));
  Draw.alpha(e.fout() * 0.3);
  Draw.blend(Blending.additive);
  Draw.rect("collos-smoke", e.x, e.y, e.fin()*800, e.fin()*800*Mathf.random(1.5, 2.0));
  Draw.blend();
});       
      
this.global.EFFECTS.YellowBeamFlare2 = new Effect(30, e => {
  Draw.color(Color.valueOf("FFFFFF44"));
  Draw.alpha(e.fout() * 1);
  Draw.blend(Blending.additive);
  Draw.rect("collos-smoke", e.x, e.y, 50, 50);
  Draw.blend();
});          
      
this.global.EFFECTS.YellowBeamFlare3 = new Effect(30, e => {
  Draw.color(Color.valueOf("FFFFFF44"));
  Draw.alpha(e.fout() * 1);
  Draw.blend(Blending.additive);
  Draw.rect("collos-FlareWhite", e.x, e.y, 800*e.fin(), 800*e.fin());
  Draw.blend();
});    

this.global.EFFECTS.YellowBeamChargeBegin = new Effect(30, 300, e => {
    Draw.color(F.fi("topaz").color, Color.white, e.fin());
    Lines.stroke(e.fin() * 5);
    Lines.circle(e.x, e.y, e.fout() * 60);

    Angles.randLenVectors(e.id, 4, 10 + 80 * e.fout(), e.rotation, 50, new Floatc2({get(x, y){
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 24);
    }}));
});  

this.global.EFFECTS.YellowBeamCharge = new Effect(30, 300, e => {
    Draw.color(F.fi("topaz").color, Color.white, e.fin());
    Lines.stroke(e.fin() * 5);
    Lines.circle(e.x, e.y, e.fout() * 60);

    Angles.randLenVectors(e.id, 4, 15.0 + 160.0 * e.fout(), e.rotation, 10, new Floatc2({get(x, y){
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 32);
    }}));
});  
