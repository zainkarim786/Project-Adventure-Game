const readline = require('readline');

interface Room {
    description: string;
    options: { [key: string]: string };
}

class AdventureGame {
    private rooms: { [key: string]: Room } = {
        start: {
            description: "You are in a dark room. There is a door to the north.",
            options: { n: "hallway" }
        },
        hallway: {
            description: "You are in a long hallway. There are doors to the north, south, and east.",
            options: { n: "treasure", s: "start", e: "monster" }
        },
        treasure: {
            description: "You found the treasure room! You win!",
            options: {}
        },
        monster: {
            description: "A monster attacks you! Game over.",
            options: {}
        }
    };
    private currentRoom: string = "start";
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    private askQuestion(question: string): Promise<string> {
        return new Promise((resolve) => this.rl.question(question, resolve));
    }

    public async play() {
        console.log("Welcome to the Adventure Game!");
        while (true) {
            console.log(this.rooms[this.currentRoom].description);
            if (Object.keys(this.rooms[this.currentRoom].options).length === 0) {
                console.log("The game is over.");
                this.rl.close();
                break;
            }
            const direction = await this.askQuestion("Which direction do you want to go? (n/s/e/w): ");
            if (this.rooms[this.currentRoom].options[direction]) {
                this.currentRoom = this.rooms[this.currentRoom].options[direction];
            } else {
                console.log("You can't go that way.");
            }
        }
    }
}

const game = new AdventureGame();
game.play();
