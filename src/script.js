import { Shop, Item } from "../src/gilded-rose.js";

const shop = new Shop([
    new Item('Bread', 3, 6),
    new Item('Aged Brie', 3, 30),
    new Item('Sulfuras, Hand of Ragnaros', 6, 60)
]);


for (let d = 0; d < 6; d++) {
    shop.updateQuality();
    
    console.log(shop.items[1].name, shop.items[1].sellIn, shop.items[1].quality);
    console.log(shop.items[2].name, shop.items[2].sellIn, shop.items[2].quality);
}

