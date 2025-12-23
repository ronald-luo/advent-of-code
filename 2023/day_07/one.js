const processData = () => {
  let fs = require("fs");
  let data = fs.readFileSync("large.txt").toLocaleString();
  let temp = data.split("\n");

  let cardsHash = {};

  temp.map((node) => {
    let tmp = node.trim().split(" ");

    let hand = tmp[0];
    let bid = tmp[1];

    cardsHash[hand] = Number(bid);
  });

  return { cardsHash };
};

const determineType = (cardsHash) => {
  let fiveofAKind = [];
  let fourofAKind = [];
  let fullHouse = [];
  let threeofAKind = [];
  let twoPair = [];
  let onePair = [];
  let highCard = [];

  for (let hand of Object.keys(cardsHash)) {
    let handHash = {};

    for (let char of hand) {
      if (char in handHash) {
        handHash[char] += 1;
      } else {
        handHash[char] = 1;
      }
    }

    let handHashReverse = {};
    let temp = Object.values(handHash);
    temp.map((node) => {
      if (node in handHashReverse) {
        handHashReverse[node] += 1;
      } else {
        handHashReverse[node] = 1;
      }
    });

    hand = {
      cards: hand,
      score: cardsHash[hand],
    };

    if (temp.length === 1) {
      fiveofAKind.push(hand); // five of a kind
    } else if (String(4) in handHashReverse) {
      fourofAKind.push(hand); // four of a kind
    } else if (String(3) in handHashReverse) {
      if (temp.length === 2) {
        fullHouse.push(hand); // full house
      }
      if (temp.length === 3) {
        threeofAKind.push(hand); // three of a kind
      }
    } else if (String(2) in handHashReverse) {
      if (handHashReverse[2] === 2) {
        twoPair.push(hand); // two pair
      }

      if (handHashReverse[2] === 1) {
        onePair.push(hand); // one pair
      }
    } else if (temp.length === 5) {
      highCard.push(hand); // high card
    }
  }

  return {
    fiveofAKind,
    fourofAKind,
    fullHouse,
    threeofAKind,
    twoPair,
    onePair,
    highCard,
  };
};

const rankWithinType = (handArray) => {
  let cardPriority = {
    A: 12,
    K: 11,
    Q: 10,
    J: 9,
    T: 8,
    9: 7,
    8: 6,
    7: 5,
    6: 4,
    5: 3,
    4: 2,
    3: 1,
    2: 0,
  };

  const compareHands = (hand1, hand2) => {
    let cards1 = hand1.cards;
    let cards2 = hand2.cards;

    for (let i = 0; i < cards1.length; i++) {
      let card1Priority = cardPriority[cards1[i]];
      let card2Priority = cardPriority[cards2[i]];

      if (card1Priority > card2Priority) {
        return -1;
      } else if (card1Priority < card2Priority) {
        return 1;
      }
      // If cards are the same, continue to the next card
    }

    // If all cards are the same, consider hands equal
    return 0;
  };

  let result = handArray.sort(compareHands);
  return result;
};

let main = () => {
  let { cardsHash } = processData();
  let {
    fiveofAKind,
    fourofAKind,
    fullHouse,
    threeofAKind,
    twoPair,
    onePair,
    highCard,
  } = determineType(cardsHash);

  let handArrays = [
    fiveofAKind,
    fourofAKind,
    fullHouse,
    threeofAKind,
    twoPair,
    onePair,
    highCard,
  ];

  let ansArray = [];
  let ans = 0;

  for (let handArray of handArrays) {
    let temp = rankWithinType(handArray);
    for (let item of temp) {
      ansArray.unshift(item);
    }
  }

  for (let i = 0; i < ansArray.length; i++) {
    ans += (i + 1) * ansArray[i].score;
  }

  console.log(ans);
};

main();
