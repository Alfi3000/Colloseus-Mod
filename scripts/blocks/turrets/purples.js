const B = this.global.BULLETS;
const F = require("functions/f");

const Mirror = extendContent(ItemTurret, "mirror", {});
Mirror.size = 2;
Mirror.health = 1850;
Mirror.reload = 20;
Mirror.range = 160;
Mirror.inaccuracy = 2;
Mirror.recoil = 2.0;
Mirror.shootSound = Sounds.missile;
Mirror.alternate = false;
Mirror.ammo(Items.lead, B.mirrorLead, F.fi("amethyst"), B.mirrorAmethyst);
Mirror.requirements(Category.turret, ItemStack.with(F.fi("amethyst"), 75, Items.graphite, 80, Items.lead, 120));

const Recours = extendContent(ItemTurret, "recoursi", {});
Recours.size = 4;
Recours.health = 5240;
Recours.reload = 20;
Recours.range = 240;
Recours.inaccuracy = 4;
Recours.shootSound = Sounds.missile;
Recours.ammo(Items.plastanium, B.recoursiPlast, F.fi("amethyst"), B.recoursiAmethyst, Items.lead, B.recoursiLead);
Recours.requirements(Category.turret, ItemStack.with(F.fi("amethyst"), 260, F.fi("titanium-plate"), 160, Items.silicon, 300, Items.plastanium, 140, Items.thorium, 235));

TechTree.create(Blocks.duo, Mirror);
TechTree.create(Mirror, Recours);
