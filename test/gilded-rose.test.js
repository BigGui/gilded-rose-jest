import { Shop, Item } from "../src/gilded-rose";

const names = {
  Brie: "Aged Brie",
  Sulfuras: "Sulfuras, Hand of Ragnaros",
  Backstage: "Backstage passes to a TAFKAL80ETC concert"
};

describe("Gilded Rose item", function () {

  it("should keep name", function () {
    const gildedRose = new Shop([new Item("Stuff", 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Stuff");
  });

  it("should decrease sellIn", function () {
    const quality = 5;
    const gildedRose = new Shop([new Item("Stuff", 5, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(quality - 1);
  });

  it("should decrease sellIn each day", function () {
    const sellIn = 10;
    const gildedRose = new Shop([new Item("Stuff", sellIn, 5)]);
    let items;
    for (let days = 1; days <= 5; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(sellIn - days);
    }
  });

  it("should decrease quality", function () {
    const quality = 5;
    const gildedRose = new Shop([new Item("Stuff", 5, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(quality - 1);
  });
  
  it("should decrease quality each day", function () {
    const quality = 14;
    const gildedRose = new Shop([new Item("Stuff", 5, quality)]);
    let items;
    for (let days = 1; days <= 5; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality - days);
    }
  });

  it("should decreased in quality by 2 once the sell by date has passed", function () {
    const quality = 20;
    const gildedRose = new Shop([new Item("Stuff", 0, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(quality - 2);
  });

  it("should decreased in quality by 2 every day once the sell by date has passed", function () {
    const quality = 14;
    const gildedRose = new Shop([new Item("Stuff", 0, quality)]);
    let items;
    for (let days = 1; days <= 5; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality - 2 * days);
    }
  });

  it("Should never decrease quality below 0", function () {
    const quality = 0;
    const gildedRose = new Shop([new Item("Stuff", 10, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(quality);
  });

  it("Should never decrease in quality once it has reached 0", function () {
    const quality = 3;
    const gildedRose = new Shop([new Item("Stuff", 10, quality)]);
    let items;
    for (let days = 1; days <= 5; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality - days < 0 ? 0 : quality - days);
    }
  });
  
});


describe("Aged Brie", function () {
  
  it("should increase in quality", function () {
    const quality = 22;
    const gildedRose = new Shop([new Item("Aged Brie", 20, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(quality + 1);
  });

  it("should never increase in quality over 50", function () {
    const quality = 50;
    const gildedRose = new Shop([new Item("Aged Brie", 20, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(quality);
  });

  it("should never get over 50 in quality", function () {
    const quality = 45;
    const gildedRose = new Shop([new Item(names.Brie, 20, quality)]);
    for (let days = 1; days < 20; days++) {
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality + days > 50 ? 50 : quality + days);
    }
  });

  it("should increase in quality twice faster once sellin is below 0", function () {
    const quality = 22;
    const gildedRose = new Shop([new Item(names.Brie, -4, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(quality + 2);
  });
  
});


describe("Sulfuras", function () {
  
  it("should never decrease in quality and quality is always 80", function () {
    const gildedRose = new Shop([new Item(names.Sulfuras, 20, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });
  

  it("should never decrease in sell in", function () {
    const quality = 20;
    const gildedRose = new Shop([new Item(names.Sulfuras, 20, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(quality);
  });
  
});

const backstage = "Backstage passes to a TAFKAL80ETC concert";

describe("Backstage passes", function () {

  it("should increase in quality", function () {
    const quality = 22;
    const gildedRose = new Shop([new Item(names.Backstage, 20, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(quality + 1);
  });

  
  it("should lower qualty to 0 when sellin reaching 0", function () {
    const gildedRose = new Shop([new Item(names.Backstage, 0, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should increase in quality by 2 when sellin is between 10 to 6", function () {
    const quality = 10;
    [10, 9, 8, 7, 6].forEach(sellIn => {
      const gildedRose = new Shop([new Item(names.Backstage, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality + 2);
    });
  });

  it("should increase in quality by 3 when sellin is between 5 to 1", function () {
    const quality = 10;
    [5, 4, 3, 2, 1].forEach(sellIn => {
      const gildedRose = new Shop([new Item(names.Backstage, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality + 3);
    });
  });


});