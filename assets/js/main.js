$(document).ready(function () {



    var awesomeShows = ["The Office", "Futurama", "Scrubs", "Firefly", "30 Rock", "Parks and Recreation", "Breaking Bad", "Dexter", "Spongebob", "House", "Friends", "Seinfeld", "The Simpsons"];


    var buttons = $("#buttonContainer");
    button = $("<button>")
    function renderButtons() {
        $(buttons).empty();
        for (i = 0; i < awesomeShows.length; i++) {

            $(buttons).append("<button class = 'showButton' show-name='" + awesomeShows[i] + "'>" + awesomeShows[i] + "</button")

        }
    }
    renderButtons();

    


    $("body").on("click", ".showButton", function () {

        
        var show = $(this).attr('show-name');
        console.log(show);
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=3h1jGoQFBeboB5WoAwTcNZIjaeGb7tmv&q=" + show + "&limit=10&offset=0&rating=PG-13&lang=en"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $("#gifs").empty();


            var results = response.data



            console.log(response);
            for (i = 0; i < results.length; i++) {
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                
                var rating = results[i].rating;
                var ratingDiv = $("<div>");
                $(ratingDiv).text("Rating: " + rating.toUpperCase()).attr("id", "ratings");

                var img = $("<img>").attr("src", still).attr("state", "still").attr("animated", animated).attr("stillImg", still);
               


                $("#gifs").prepend(img);
                $("#gifs").prepend(ratingDiv);


            }



        })

    })



    $("#submit").on("click", function () {
        var textBox = $("#textBox").val().trim();

        awesomeShows.push(textBox);
        console.log(awesomeShows);
        renderButtons()



    })
    $("body").on("click", "img", function () {
        if ($(this).attr("state") == "still") {
            $(this).attr("src", $(this).attr("animated"));
            $(this).attr("state", "animated");
        } else {
            $(this).attr("src", $(this).attr("stillImg"))
            $(this).attr("state", "still");
        }
    })


});