// define all npms and keys
require("dotenv").config();

const keys = require("./keys.js");
const request = require("request");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const fs = require('fs');
const chalk = require('chalk');

// define arguments

let action = process.argv[2];
let userInput = process.argv[3];

// switchcase handles the first argument action

switch (action) {
    case "concert-this":
        bit(userInput);
        break;

    case "spotify-this-song":
        spotify(userInput);
        break;

    case "movie-this":
        movie(userInput);
        break;

    case "do-what-it-says":
        doit();
        break;
};

// function to run the bands in town search

function bit(userInput) {
    // bit = new Request(keys.bit);
    artistname = userInput;
    request(`https://rest.bandsintown.com/artists/${artistname}/events?app_id=codingbootcamp&date=upcoming`, { json: true }, function (err, res, body) {
        if (err) throw err
        const showDate = moment(body[0].datetime).format("DD-MM-YYYY");

        console.log(chalk.black.bgRed(`==================================================================`));
        console.log("");
        console.log(chalk.red(" .o88b.  .d88b.  d8b   db  .o88b. d88888b d8888b. d888888b .d8888."));
        console.log(chalk.red("d8P  Y8 .8P  Y8. 888o  88 d8P  Y8 88'     88  `8D `~~88~~' 88'  YP"));
        console.log(chalk.red("8P      88    88 88V8o 88 8P      88ooooo 88oobY'    88    `8bo.  "));
        console.log(chalk.red("8b      88    88 88 V8o88 8b      88~~~~~ 88`8b      88      `Y8b."));
        console.log(chalk.red("Y8b  d8 `8b  d8' 88  V888 Y8b  d8 88.     88 `88.    88    db   8D"));
        console.log(chalk.red(" `Y88P'  `Y88P'  VP   V8P  `Y88P' Y88888P 88   YD    YP    `8888Y'"));
        console.log(chalk.red("------------------------------------------------------------------"));
        console.log("");
        console.log("");
        console.log(("                     "), `Venue: ${body[0].venue.name}`);
        console.log(("                     "), `Location: ${body[0].venue.city}, ${body[0].venue.region}`);
        console.log(("                     "), `Date: ${showDate}`);
        console.log("");
        console.log(("                     "), `Venue: ${body[1].venue.name}`);
        console.log(("                     "), `Location: ${body[1].venue.city}, ${body[1].venue.region}`);
        console.log(("                     "), `Date: ${showDate}`);
        console.log("");
        console.log(("                     "), `Venue: ${body[2].venue.name}`);
        console.log(("                     "), `Location: ${body[2].venue.city}, ${body[2].venue.region}`);
        console.log(("                     "), `Date: ${showDate}`);
        console.log("");
        console.log(chalk.red("------------------------------------------------------------------"));
        console.log(chalk.black.bgRed("=================================================================="));
    });
};

// fucntion to run spotify search

function spotify(userInput) {
    if (!userInput) {
        console.log("add a song title");
        return false;
    };
    spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: userInput }, function (err, data) {
        if (err) throw err
        let songInfo = data.tracks.items;
        if (!err) {
            console.log(chalk.black.bgGreen(`==================================================================`));
            console.log("");
            console.log(chalk.green(".d8888. d8888b.  .d88b.  d888888b d888888b d88888b db    db"));
            console.log(chalk.green("88'  YP 88  `8D .8P  Y8. `~~88~~'   `88'   88'     `8b  d8'"));
            console.log(chalk.green("`8bo.   88oodD' 88    88    88       88    88ooo    `8bd8'"));
            console.log(chalk.green("  `Y8b. 88~~~   88    88    88       88    88~~~      88"));
            console.log(chalk.green("db   8D 88      `8b  d8'    88      .88.   88         88"));
            console.log(chalk.green("`8888Y' 88       `Y88P'     YP    Y888888P YP         YP"));
            console.log(chalk.green("------------------------------------------------------------------"));
            console.log("");
            console.log("");
            console.log(("                     "),`Artist(s): ${songInfo[0].artists[0].name}`);
            console.log(("                     "),`Song Name: ${songInfo[0].name}`);
            console.log(("                     "),`Album: ${songInfo[0].album.name}`);
            console.log("");
            console.log(chalk.green("------------------------------------------------------------------"));
            console.log(chalk.black.bgGreen("=================================================================="));
        };
    });
};

// function for OMDB

function movie(userInput) {
    const queryUrl = `http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=40e9cece`;
    request(queryUrl, { json: true }, function (error, response, body) {
        if (!userInput) {
            console.log("Add a movie");
            return false;
        };
        if (!error && response.statusCode === 200) {

            console.log(chalk.black.bgBlue(`==================================================================`));
            console.log("");
            console.log(chalk.blue(".88b  d88.  .d88b.  db    db d888888b d88888b .d8888."));
            console.log(chalk.blue("88'YbdP`88 .8P  Y8. 88    88   `88'   88'     88'  YP"));
            console.log(chalk.blue("88  88  88 88    88 Y8    8P    88    88ooooo `8bo.  "));
            console.log(chalk.blue("88  88  88 88    88 `8b  d8'    88    88~~~~~   `Y8b."));
            console.log(chalk.blue("88  88  88 `8b  d8'  `8bd8'    .88.   88.     db   8D"));
            console.log(chalk.blue("YP  YP  YP  `Y88P'     YP    Y888888P Y88888P `8888Y'"));
            console.log(chalk.blue("--------------------------------------------------------------"));
            console.log("");
            console.log("");
            console.log(("                   "), `Title: ${body.Title}`);
            console.log(("                   "), `Release Year: ${body.Year}`);
            console.log(("                   "), `IMDB Rating: ${body.imdbRating}`);
            console.log(("                   "), `Rotten Tomatoes Rating: ${body.Ratings.Value}`);
            console.log(("                   "), `Country: ${body.Country}`);
            console.log(("                   "), `Language: ${body.Language}`);
            console.log(("                   "), `Actors: ${body.Actors}`);
            console.log("");
            console.log(chalk.blue("------------------------------------------------------------------"));
            console.log(chalk.black.bgBlue("=================================================================="));
        };
    });
};

// Function for random txt

function doit() {
    fs.readFile('random.txt', "utf8", function (err, data) {
        if (err) throw err
        let dataArr = data.split(",");
        if (dataArr[0] === "spotify-this-song") {
            let song = dataArr[1].slice(1, -1);
            spotify(song);
        } else if (dataArr[0] === "concert-this") {
            let concertName = dataArr[1].slice(1, -1);
            twitter(concertName);
        } else if (dataArr[0] === "movie-this") {
            let movie = dataArr[1].slice(1, -1);
            movie(movie);
        }
    });
}

