const Safe = extendContent(StorageBlock, "safe", {});
Safe.size = 4;
Safe.health = 2350;
Safe.category = Category.effect;
Safe.flags = EnumSet.of(BlockFlag.storage);
Safe.itemCapacity = 3500;