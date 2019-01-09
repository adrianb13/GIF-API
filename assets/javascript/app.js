$(document).ready(function() {

var topics = ["NSX", "GT-R", "Koenigsegg", "McLaren", "Bugatti", "Lamborghini", "Ferrari", "Bentley Flying Spur", "Maserati","Aston Martin", "Porsche 918", "Pagani Huayra", "BMW i8", "Audi RS8", "Mercedes Benz AMG", "Ford GT", "Ford Mustang", "Chevy Camaro", "Pontiac Firebird", "Dodge Charger",  "Toyota Supra",  "Subara WRX"];
var arrGIF = [];


// Original Buttons Created
function createButtons() {
    $("#buttons-section").empty();

    for (i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("cars");
        button.attr("car-name", topics[i]);
        button.text(topics[i]);
        $("#buttons-section").append(button);
    };
};
createButtons();

// Display 10 GIFs when above buttons are clicked
function displayCars () {

    var car = $(this).attr("car-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&limit=10&api_key=wAQl5lk5Qi3Yu8pN1WEI95I2fmC2yPuf";
    var arrGIF = [];
    var objGIF = {};

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        carInfo = response
        console.log(response);
        $("#gif-section").empty();
        
        for (j = 0; j < 10; j++) {

        var newGIF = $("<img>");
            newGIF.addClass("car-gif");
            newGIF.attr("src", response.data[j].images.fixed_height_still.url);
            newGIF.attr("pausePlay","still");
            newGIF.attr("paused", response.data[j].images.fixed_height_still.url);
            newGIF.attr("animated", response.data[j].images.fixed_height.url);
            
        var ratingGIF = $("<div>");
            ratingGIF.addClass("rating");
            ratingGIF.text("Rated: " + response.data[j].rating.toUpperCase());
            $("#gif-section").append(newGIF);
            $("#gif-section").append(ratingGIF);
        }
    // Play/Stop Image when clicked
        $(".car-gif").on("click", function(){
            var state = $(this).attr("pausePlay");
    
            if (state === "still") {
                $(this).attr("src", $(this).attr("animated"));
                $(this).attr("pausePlay", "playing")
            } else if (state === "playing"){
                $(this).attr("src", $(this).attr("paused"));
                $(this).attr("pausePlay", "still")
            };
        })
    
    });
};
$(document).on("click", ".cars", displayCars);

// Adds New Car Button from User Input
$("#add-car").on("click", function(event) {
    event.preventDefault();
    var car = $("#car-input").val().trim();
    topics.push(car);
    createButtons();
});


});