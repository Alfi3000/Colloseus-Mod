const F = require("func");
function h(name, amount){ 
	var block = F.fb(name);
	if(block != null) block.health = amount * block.size * block.size;
};
//TURRETS

//1
//duo.health = 250
//arc.health = 260
//scorch.health = 400
//hail.health = 260

//2
//scatter.health = 200 * 2 * 2 = 800
//wave.health = 250 * 2 * 2 = 1000
//lancer.health = 280 * 2 * 2 = 1120
//parallax.health = 160 * 2 * 2 = 640
//swarmer.health = 300 * 2 * 2 = 1200
//salvo.health = 240 * 2 * 2 = 960
//segment.health = 250 * 2 * 2 = 1000
h("mirror", 180);
h("fox", 220);

//3
//tsunami.health = 250 * 3 * 3 = 2250
//fuse.health = 220 * 3 * 3 = 1980
//ripple.health = 130 * 3 * 3 = 1470
//cyclone.health = 145 * 3 * 3 = 1305
h("discharge", 180);
h("napalm", 210);

//4
//foreshadow.health = 150 * 4 * 4 = 2400
//spectre.health = 160 * 4 * 4 = 2560
//meltdown.health = 200 * 4 * 4 = 3200
h("recoursi", 180);
h("rapier", 260);
h("flood", 250);

//5
h("thunder", 240);
h("twinkle", 250);

//6
h("reflection", 200);
h("spike", 260);

//7

//8
h("absorber", 220);
h("decomposer", 200);
h("needle", 280);

//9

//10
h("gem", 320);
