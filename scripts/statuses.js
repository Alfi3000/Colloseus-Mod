const F = require("func");
const S = this.global.STATUSES;
const C = this.global.COLORS;
const E = this.global.EFFECTS;

const s = name => {
	const eff = extendContent(StatusEffect, name, {});
    return eff;
};

const statusArray = (amount, value, startValue, name) => {
	var seq = new Seq();

    for(var i = 0; i < amount; i++) {
    	try{
	    	const val = startValue + value * ( i + 1.0);
	        const n = String(name+val);
	    
			const e = extendContent(StatusEffect, n, {});
			e.speedMultiplier = name == "speedMul" ? val : 1.0;
			e.damageMultiplier = name == "damageMul" ? val : 1.0;
			e.armorMultiplier = name == "armorMul" ? val : 1.0;
			e.damage = name == "damage" ? val : 0.0;
			
			seq.add(e); 
		} catch(e) {
			print(e) 
		} 
	};
	
	return seq;
};

S.speedMul = statusArray(30, 0.1, 0.0, "speedMul");
S.damageMul = statusArray(30, 0.1, 0.0, "damageMul");
S.damage = statusArray(30, 0.1, 0.0, "damage");
S.armorMul = statusArray(30, 0.1, 0.0, "armorMul");

const curse = extendContent(StatusEffect, "curse", {});
curse.damageMultiplier = 0.8;
curse.damage = 300.0/60.0;
curse.speedMultiplier = 0.75;
curse.armorMultiplier = 0.5;
curse.color = C.unitOrangeLight;
curse.effect = E.curseEffect;
curse.init(run(() => {
	curse.opposite(StatusEffects.freezing, StatusEffects.wet);
	curse.trans(StatusEffects.melting, ((unit, time, newTime, result) => {
		unit.damagePierce(8.0);
		result.set(curse, Math.min(time + newTime, 600.0));
	}))
}));

S.curse = curse;
