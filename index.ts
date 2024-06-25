#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.yellow("\n\t<<<<< Wellcome To The FaizCode Adventure-Game >>>>\n"));

console.log(`\t\t #########     #########   `);
console.log(`\t\t ##     ##     ##          `);
console.log(`\t\t ##     ##     ##          `);
console.log(`\t\t #########     ##  ######  `);
console.log(`\t\t ##     ##     ##  ##  ##  `);
console.log(`\t\t ##     ##  @  ######  ##  `);
console.log(`\n\t\t ADVENTURE  .   GAME`);
console.log(`\t=======================================\n`);

//my player class start.....

class Player {
  name: string;
  fuel: number = 100;

  constructor(myPlayerName: string) {
    this.name = myPlayerName;
  }

  fuelDecrease() {
    this.fuel = this.fuel - 25;
  }

  fuelIncreases() {
    this.fuel = this.fuel + 25;
  }
}
// my player class end......

//opponent class start......

class Opponent {
  name: string;
  fuel: number = 100;

  constructor(opponentName: string) {
    this.name = opponentName;
  }

  fuelDecrease() {
    this.fuel = this.fuel - 25;
  }
}

//opponent class ends......

//ask user name and opponent name....

let userInput = await inquirer.prompt([
  {
    type: "input",
    name: "myName",
    message: "Enter Your Name:",
  },
  {
    type: "list",
    name: "opponentName",
    message: "Select Your Opponent:",
    choices: ["Skeleton", "Alien", "Zombie"],
  },
]);

let { myName, opponentName } = userInput;

console.log(
  `\n${chalk.bold.green(myName)} VS ${chalk.bold.red(opponentName)}\n`
);

//no make objects from the classes created above....

let myPlayer = new Player(myName);
let myOpponent = new Opponent(opponentName);

// while loop starts.....
while (true) {
  let startMatch = await inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Select Your Option:",
      choices: ["Attack", "Increase Health", "Run For Life.."],
    },
  ]);

  let { options } = startMatch;

  //conditions....
  if (options === "Attack") attackFun();
  if (options === "Increase Health") increaseHealthFun();
  if (options === "Run For Life..") runForLifeFun();

  //attact function starts....
  function attackFun() {
    //generate random number 0 and 1
    let number = Math.floor(Math.random() * 2);

    //when random number is equal to 0, decraese the fuel of my player!
    if (number === 0) {
      myPlayer.fuelDecrease();
      console.log(
        `\n${myPlayer.name}'s Fuel Is ${chalk.bold.red(myPlayer.fuel)}`
      );
      console.log(
        `${myOpponent.name}'s Fuel Is ${chalk.bold.green(myOpponent.fuel)}\n`
      );

      if (myPlayer.fuel === 0) {
        console.log(
          `${chalk.bold.red(myPlayer.name)} Lost! Better Luck Next Time`
        );
        process.exit();
      }
    }

    //when random number is equal to 1, increase the fuel of opponent!

    if (number === 1) {
      myOpponent.fuelDecrease();
      console.log(
        `\n${myPlayer.name}'s Fuel Is ${chalk.bold.green(myPlayer.fuel)}`
      );

      console.log(
        `${myOpponent.name}'s Fuel Is ${chalk.bold.red(myOpponent.fuel)}\n`
      );

      if (myOpponent.fuel === 0) {
        console.log(
          `Congratulations ${chalk.bold.green(
            myPlayer.name
          )}! You Won The Match.`
        );
        process.exit();
      }
    }
  }
  //attact function ends......

  //increase health function start......
  function increaseHealthFun() {
    myPlayer.fuelIncreases();
    console.log(
      `\n${myPlayer.name}'s Fuel Is Increased To ${chalk.bold.green(
        myPlayer.fuel
      )}\n`
    );
  }
  //increase function ends......

  //runforlife function start......
  function runForLifeFun() {
    console.log(
      `\n${chalk.bold.red(myPlayer.name)} Lost! Better Luck Next Time.`
    );
    process.exit();
  }

  //runforlife function endsss....
}
//while loop ends.....
