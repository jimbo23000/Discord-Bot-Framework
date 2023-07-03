var suits = ["hearts", "spades", "diamonds", "clubs"]
var values = ["A", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

function getDeck() {
    let deck = new Array();
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = {Value: values[j], Suit: suit[i]};
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck) {
    let index = deck.length, random;
    while (index != 0) {
        random = Math.floor(Math.random() * index);
        index--;
        [deck[index], deck[random]] = [deck[random], deck[index]];
    }
    return deck;
}