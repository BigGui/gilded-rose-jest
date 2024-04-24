import { Shop, Item } from "../src/gilded-rose";

describe("Gilded Rose item", function () {

  it("should keep name", function () {
    const gildedRose = new Shop([new Item("Stuff", 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Stuff");
  });

  it("should decrease sellIn", function () {
    const gildedRose = new Shop([new Item("Stuff", 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(5 - 1);
  });

  it("should decrease sellIn each days", function () {
    const gildedRose = new Shop([new Item("Stuff", 10, 5)]);
    let items;
    for (let days = 1; days <= 5; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(10 - days);
    }
  });

  it("should decrease quality", function () {
    const gildedRose = new Shop([new Item("Stuff", 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5 - 1);
  });

  it("should decrease quality each day", function () {
    const gildedRose = new Shop([new Item("Stuff", 5, 14)]);
    let items;
    for (let days = 1; days <= 5; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(14 - days);
    }
  });

  //"Once the sell by date has passed, Quality degrades twice as fast (sellin <0, quality -2)
  it("the quality should decreased by 2 Once the sell by date has passed.", function () {
    const gildedRose = new Shop([new Item("Stuff", 0, 14)]);
    let items;
    for (let days = 1; days <= 5; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(14 - 2 * days);
    }
  });

  //"Once the sell by date has passed, Quality degrades twice as fast (sellin <0, quality -2)
  it("the quality should decrease by 2 Once the sell by date has passed. one value", function () {
    const gildedRose = new Shop([new Item("Stuff", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(20 - 2);
  });


  it("Should never decrease quality below 0", function () {
    const gildedRose = new Shop([new Item("Stuff", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Should never decrease in quality once it has reached 0", function () {
    const gildedRose = new Shop([new Item("Stuff", 10, 3)]);
    let items;
    for (let days = 1; days <= 5; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(3 - days < 0 ? 0 : 3 - days);
    }
  });

});


describe("Aged Brie", function () {

  it("should increase in quality", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 20, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22 + 1);
  });

  it("should never increase in quality over 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 20, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should never get over 50 in quality", function () {
    const q = 45;
    const gildedRose = new Shop([new Item("Aged Brie", 20, q)]);
    for (let days = 1; days < 20; days++) {
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(q + days > 50 ? 50 : q + days);
    }
  });

  it("should increase in quality twice faster once sellin is below 0", function () {
    const gildedRose = new Shop([new Item("Aged Brie", -4, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22 + 2);
  });

});


describe("Sulfuras", function () {

  it("should never decrease in quality and quality is always 80", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 20, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });


  it("should never decrease in sell in", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 20, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(20);
  });

});

const backstage = "Backstage passes to a TAFKAL80ETC concert";

describe("Backstage passes", function () {

  it("should increase in quality", function () {
    const gildedRose = new Shop([new Item(backstage, 20, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22 + 1);
  });

  
  it("should lower qualty to 0 when sellin reaching 0", function () {
    const gildedRose = new Shop([new Item(backstage, 0, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should increase in quality by 2 when sellin is between 10 to 6", function () {
    const quality = 10;
    [10, 9, 8, 7, 6].forEach(sellIn => {
      const gildedRose = new Shop([new Item(backstage, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality + 2);
    });
  });

  it("should increase in quality by 3 when sellin is between 5 to 1", function () {
    const quality = 10;
    [5, 4, 3, 2, 1].forEach(sellIn => {
      const gildedRose = new Shop([new Item(backstage, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality + 3);
    });
  });


});