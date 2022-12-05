{
  function add(x: number, y: number): number {
    return x + y;
  }

  let myAdd = function (x: number, y: number): number {
    return x + y;
  };
}

// 完整函数类型
{
  let myAdd: (x: number, y: number) => number = function (
    x: number,
    y: number
  ): number {
    return x + y;
  };
}

// 可选参数
{
  function buildName(firstName: string, lastName: string = "Smith") {
    return firstName + " " + lastName;
  }

  let result1 = buildName("Bob");
  let result2 = buildName("Bob", undefined);
  // let result3 = buildName("Bob", "Adams", "Sr."); // Error
  let result4 = buildName("Bob", "Adams");
}

{
  function buildName2(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
  }

  let result = buildName2(undefined, "Adams");
}

// 
{
  function buildName3(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ")
  }

  let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");
}

// this指向问题
{
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
      // 改成箭头函数即可
      return function() {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard * 13);

        return {
          // this指向window，严格模式下是undefined
          suit: this.suits[pickedSuit],
          card: pickedCard % 13
        }
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();
  console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

// 提供一个显式的 this参数
{
  interface Card {
    suit: string;
    card: number;
  }

  interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
  } 

  let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
      return function() {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard * 13);

        return {
          suit: this.suits[pickedSuit],
          card: pickedCard % 13
        }
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();
  console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

// 重载
{
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  function pickCard(x): any {
    if (typeof x === "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    } else if (typeof x === "number") {
      let pickedSuit = Math.floor(x / 13);
      return {
        suit: suits[pickedSuit],
        card: x % 13
      }
    }
  }

  let myDeck = [
    {
      suit: "diamonds",
      card: 2
    },
    {
      suit: "spades",
      card: 10
    },
    {
      suit: "hearts",
      card: 4
    }
  ];

  let pickedCard1 = myDeck[pickCard(myDeck)];
  let pickedCard2 = myDeck[15];
}

// 重载
{
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  // 定义多个函数类型来进行函数重载
  function PickCard(x: { suit: string; card: number; }[]): number;
  function PickCard(x: number): { suit: string; card: number; };
  function PickCard(x): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
  }

  let myDeck = [
    {
      suit: "diamonds",
      card: 2
    },
    {
      suit: "spades",
      card: 10
    },
    {
      suit: "hearts",
      card: 4
    }
  ];

  let pickedCard1 = myDeck[PickCard(myDeck)];
  let pickedCard2 = myDeck[15];

}