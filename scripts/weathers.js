const F = require("func");
const W = this.global.WEATHERS;
const C = this.global.COLORS;

const BloodyRain = extendContent(RainWeather, "bloody-rain", {});
BloodyRain.yspeed = 12.0;
BloodyRain.xspeed = 3.8;
BloodyRain.padding = 21;
BloodyRain.density = 2000;
BloodyRain.stroke = 1.3;
BloodyRain.sizeMin = 10.0;
BloodyRain.sizeMax = 26.0;
BloodyRain.splashTimeScale = 14.0;
BloodyRain.color = Color.valueOf("#FF0007FF");
BloodyRain.opacityMultiplier = 2.0;
BloodyRain.attrs.set(Attribute.water, -0.2);
BloodyRain.attrs.set(Attribute.light, -0.98);
BloodyRain.attrs.set(Attribute.heat, -0.4);
BloodyRain.attrs.set(Attribute.oil, -0.65)
BloodyRain.attrs.set(Attribute.spores, -0.72);

W.bloodyRain = BloodyRain;


const Storm = extendContent(ParticleWeather, "storm", {});
Storm.yspeed = -3.5;
Storm.xspeed = 19.6;
Storm.padding = 20;
Storm.density = 1600;
Storm.minAlpha = 0.0;
Storm.maxAlpha = 0.28;
Storm.sizeMin = 80.0;
Storm.sizeMax = 160.0;
Storm.baseSpeed = 12.4;
Storm.force = 0.31;
Storm.opacityMultiplier = 0.6;
Storm.color = Storm.noiseColor = Color.valueOf("#3A465F");
Storm.attrs.set(Attribute.water, 0.3);
Storm.attrs.set(Attribute.light, -0.4);
Storm.attrs.set(Attribute.heat, -0.25);
Storm.attrs.set(Attribute.oil, -0.05);

W.storm = Storm;


const NorthernLights = extendContent(ParticleWeather, "northern-lights", {});
NorthernLights.duration = 2.4 * Time.toMinutes;
NorthernLights.noiseLayerSclM = 0.15;
NorthernLights.noiseLayers = 2.0;
NorthernLights.noiseLayerAlphaM = 1.2;
NorthernLights.noiseLayerSpeedM = 2.8;
NorthernLights.noiseScale = 12000.0;
NorthernLights.noisePath = "fog";

NorthernLights.baseSpeed = 0.11;
NorthernLights.density = 2000;

NorthernLights.xspeed = 0.34;
NorthernLights.yspeed = -0.42;

NorthernLights.minAlpha = 0.0;
NorthernLights.maxAlpha = 0.2;
NorthernLights.sizeMin = 20.0;
NorthernLights.sizeMax = 80.0;
NorthernLights.drawParticles = true;

NorthernLights.drawNoise = true;
NorthernLights.useWindVector = false;

NorthernLights.opacityMultiplier = 0.64;

NorthernLights.color = C.NorthernLightsColor;
NorthernLights.noiseColor = C.NorthernLightsNoiseColor;
NorthernLights.attrs.set(Attribute.light, 1.0);
NorthernLights.attrs.set(Attribute.heat, -0.7);
NorthernLights.attrs.set(Attribute.spores, 0.2);

W.northernLights = NorthernLights;

/////
/////
/////

const AshRain = extendContent(ParticleWeather, "ash-rain", {});
AshRain.baseSpeed = 0.15;
AshRain.xspeed = -0.42;
AshRain.yspeed = -0.42;

AshRain.minAlpha = 0.0;
AshRain.maxAlpha = 0.2;
AshRain.sizeMin = 10.0;
AshRain.sizeMax = 40.0;
AshRain.color = Color.valueOf("#343434");

AshRain.drawParticles = true;
AshRain.drawNoise = false;
AshRain.useWindVector = false;

AshRain.attrs.set(Attribute.light, -0.2);
AshRain.attrs.set(Attribute.heat, -0.1);
AshRain.attrs.set(Attribute.spores, -0.2);
AshRain.attrs.set(Attribute.oil, -0.2);
AshRain.attrs.set(Attribute.water, -0.45);

W.northernLights = AshRain;
