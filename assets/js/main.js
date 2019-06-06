$(document).ready(function () {



    var awesomeShows = ["The Office", "Futurama", "Scrubs", "Firefly", "30 Rock", "Parks and Recreation",];
    $("#submit").on("click", function(){
        var textBox = $("#textBox").val()
        if (textBox != ""){
            awesomeShows.push(textBox);
            console.log(awesomeShows);
            
        }
    })

    var buttons = $("#buttonContainer");
    button = $("<button>")

    for (i = 0; i < awesomeShows.length; i++) {
        $(buttons).append("<button class = 'showButton' show-name='" + awesomeShows[i] + "'>" + awesomeShows[i] + "</button")

    }

    $(".showButton").on("click", function () {


        var show = $(this).attr('show-name');
        console.log(show);
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=3h1jGoQFBeboB5WoAwTcNZIjaeGb7tmv&q=" + show + "&limit=10&offset=0&rating=G&lang=en"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $("#gifs").empty();
            var results = response.data
            console.log(response);
            for (i = 0; i < results.length; i++) {
                var img = $("<img>").attr("src", results[i].images.fixed_height.url);


                $("#gifs").prepend(img);
            }


        })

    })
   
});