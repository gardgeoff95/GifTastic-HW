$(document).ready(function () {



    // Creating initial array of shows
    var awesomeShows = ["The Office", "Futurama", "Scrubs", "Firefly", "30 Rock", "Parks and Recreation", "Breaking Bad", "Dexter", "Spongebob", "House", "Friends", "Seinfeld", "The Simpsons"];

    //Referencing the ID using $$$
    var buttons = $("#buttonContainer");
    // Function that takes in the array and turns each item into a button
    function renderButtons() {
        $(buttons).empty();
        for (i = 0; i < awesomeShows.length; i++) {
            // creates custom attribute "show-name" equal to the name of the show to be used later for ajax querying
            // sets each button to have the class "showbutton"

            $(buttons).append("<button class = 'showButton' show-name='" + awesomeShows[i] + "'>" + awesomeShows[i] + "</button")

        }
    }
    // calls the above function
    renderButtons();

    

    // On click of button with class "showButton" perform ajax query to Gihpy API
    $("body").on("click", ".showButton", function () {

        //Stores value of show-name attribute
        var show = $(this).attr('show-name');
        console.log(show);
        //URL to query the giphy API 
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=3h1jGoQFBeboB5WoAwTcNZIjaeGb7tmv&q=" + show + "&limit=10&offset=0&rating=PG-13&lang=en"
        // Ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //empties gif div so there's no overlapping gifs
            $("#gifs").empty();

            //variable for easy access reponse referencing
            var results = response.data

            console.log(response);
            //loops through each gif of the show and gets the animated and still gifs for the specific show
            for (i = 0; i < results.length; i++) {
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                //grabs the rating for each show and puts it into a new div to appended with the gif
                var rating = results[i].rating;
                var ratingDiv = $("<div>");
                $(ratingDiv).text("Rating: " + rating.toUpperCase()).attr("id", "ratings");


                //creates a new image with the src of the still gif and custom attributes to be switched out for the moving gif on click later on
                var img = $("<img>").attr("src", still).attr("state", "still").attr("animated", animated).attr("stillImg", still);
               

                //prepends each gif and rating to the gifs div
                $("#gifs").prepend(img);
                $("#gifs").prepend(ratingDiv);


            }

        })

    })


    //On click function to check the value within input box and add to array, then call the previously created renderButtons() function

    $("#submit").on("click", function () {
        var textBox = $("#textBox").val().trim();

        awesomeShows.push(textBox);
        console.log(awesomeShows);
        renderButtons()



    })

    //on click function for images so it swithces the src with the animated gif if still
    $("body").on("click", "img", function () {
        if ($(this).attr("state") == "still") {
            $(this).attr("src", $(this).attr("animated"));
            $(this).attr("state", "animated");
        } else {
            //if animated switch src to stillImg
            $(this).attr("src", $(this).attr("stillImg"))
            $(this).attr("state", "still");
        }
    })


});