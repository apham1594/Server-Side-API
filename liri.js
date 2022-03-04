//read and set enviromental variables
require ("dotenv").config();
var keys = require ("./keys.js");
var axios = require ("axios");
var fs = require ("fs");
var moment = require ("moment");

var command= process.argv[2]
var input= process.argv[3]
var bandsApi= keys.apiKeys.bands;
var omdApi= keys.apiKeys.omdb;
//spotify//
// var Spotify= require ("node-spotify-api")
// var spotify= new Spotify (keys.spotify);

//movie-this

function getMovie(input) {
    console.log("inside movie-this")
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=full&tomatoes=true&apikey=" + omdApi)
    .then(function (response) {
        //console.log(response.data);
        var moviedata = response.data;
        //console.log(moviedata)
        console.log("title: " + moviedata.Title)
        console.log("year: " + moviedata.Year)
        console.log("rated: " + moviedata.Rated)
        console.log("released: " + moviedata.Released)
        console.log("director: " + moviedata.Director)
        console.log("writer: " + moviedata.Writer)
        console.log("actors: " + moviedata.Actors)
        console.log("plot: " + moviedata.Plot)
    })
}
//Bandsintown
function showConcert(input) {
    // console.log("inside concert-this")
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsApi).then(function (response) {
        var concerts = response.data
        console.log("Venue Name: " + concerts[0].venue.name);
        console.log("Venue Location: " + concerts[0].venue.city)
        console.log("Date of Event: " + moment(concerts[0].datetime).format("MM/DD/YYYY h:mm A"))
    }
    );

}
//concert-this
function findSong(input) {
    console.log("inside spotify-this-song")
    //launch spotify// 
    spotify.search({ type: 'track', query: input }, function (err, data) {

        if (err) {
            return console.log('Error Occured' + err);
        }
        var spotifyArr = data.tracks.items;
        //console.log(data.tracks.items[0])
        for (i = 0; i < 2; i++) {
            console.log("song name: " + spotifyArr[i].name)
            console.log("artist: " + spotifyArr[i].artists[0].name)
            console.log("----------------------")
        }
    })


}

//do what I say//

function doThis() {
    console.log("inside the function dothis")
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
             console.log(error);
        }
        console.log("data: " +data)
        var dataArr = data.split(",");
        startProg(dataArr[0], dataArr[1]);

    })
}

//case-switch//
function startProg(command, input) {
    switch (command) {
        case "concert-this": showConcert(input);
            break;
        case "spotify-this-song": findSong(input);
            break;
        case "movie-this": getMovie(input);
            break;
        case "do-what-it-says":
            console.log("do what it says");
            doThis();
            break;
        default:
            console.log("LIRI doesn't know what you are talking about");
    }
 
 
}
startProg (command, input);



