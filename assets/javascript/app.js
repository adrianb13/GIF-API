$(document).ready(function() {

var topics = ["NSX", "GT-R", "Koenigsegg", "McLaren", "Bugatti", "Lamborghini", "Ferrari", "Bentley Flying Spur", "Maserati","Aston Martin", "Porsche 918", "Pagani Huayra", "BMW i8", "Audi RS8", "Mercedes Benz AMG", "Ford GT", "Ford Mustang", "Chevy Camaro", "Pontiac Firebird", "Dodge Charger",  "Toyota Supra",  "Subara WRX"];

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

function displayCars () {

    var car = $(this).attr("car-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&limit=10&api_key=wAQl5lk5Qi3Yu8pN1WEI95I2fmC2yPuf";

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
        var ratingGIF = $("<div>");
            ratingGIF.addClass("rating");
            ratingGIF.text("Above Rated: " + response.data[j].rating.toUpperCase());
            $("#gif-section").append(newGIF);
            $("#gif-section").append(ratingGIF);
        }    
    });
};

$(document).on("click", ".cars", displayCars);

$("#add-car").on("click", function(event) {
    event.preventDefault();
    var car = $("#car-input").val().trim();
    topics.push(car);
    createButtons();
});

var counter = 1
function playStop () {
    counter++;
    console.log(counter);
    if (counter % 2 === 0) {
        carInfo.data[j].images.fixed_height_still.url = carInfo.data[j].images.fixed_height.url
    } 
    console.log(response.data[j].rating);
    console.log(response.data[j].url);
}
$(document).on("click",".car-gif", playStop)

});