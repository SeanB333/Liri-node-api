// define all npms and keys
require("dotenv").config();

const keys = require("./keys.js");
const request = require("request");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const fs = require('fs');

let action = process.argv[2];
let userInput = process.argv[3];

switch (action) {
    case "concert-this":
        BIT(userInput);
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

function BIT(userInput) {
    artistname = userInput;
    request(`https://rest.bandsintown.com/artists/${artistname}/events?app_id=codingbootcamp&date=upcoming`,{json:true}, function (err, res, body) {
        if (err) throw err
        const showDate = moment(body[0].datetime).format("DD-MM-YYYY");
        console.log(`Venue: ${body[0].venue.name}`);
        console.log(`Location: ${body[0].venue.city}, ${body[0].venue.region}`);
        console.log(`Date: ${showDate}`);
    });
};

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
            console.log("Artist(s): " + songInfo[0].artists[0].name);
            console.log("Song Name: " + songInfo[0].name);
            console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);
        };
    });
};

function movie(userInput) {

    const queryUrl = `http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=40e9cece`;

    request(queryUrl, {json:true}, function (error, response, body) {
        if (!userInput) {
            console.log("Add a movie");
            return false;
        };
        if (!error && response.statusCode === 200) {

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.Ratings.Value);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
        };
    });
};

function doit() {
    fs.readFile('random.txt', "utf8", function (err, data) {
        if (err) throw err
        let dataArr = data.split(",");
        if (dataArr[0] === "spotify-this-song") {
            var songcheck = dataArr[1].slice(1, -1);
            spotify(songcheck);
        } else if (dataArr[0] === "my-tweets") {
            var tweetname = dataArr[1].slice(1, -1);
            twitter(tweetname);
        } else if (dataArr[0] === "movie-this") {
            var movie_name = dataArr[1].slice(1, -1);
            movie(movie_name);
        }
    });







}

