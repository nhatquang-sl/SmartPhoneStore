var heightSwipeScreen = $(document).height() - $(".navbar").height();
$(document).ready(function () {
    style();
    var listCard = $("#swipeScreen").children();
    var index = 0;
    $("#swipeScreen").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            console.log(direction);

            var right = 0;
            var left = 0;

            var curr = listCard[index];
            var next;

            var curClass = "";
            $(curr).removeClass("zoomIn");
            switch (direction) {
                case "left":
                    curClass = "fadeOutLeft";
                    next = listCard[index + 1];
                    left++;
                    index++;
                    break;
                case "right":
                    curClass = "fadeOutRight";
                    next = listCard[index - 1];
                    right++;
                    index--;
                    break;
            }
            if (direction.localeCompare("left") == 0 || direction.localeCompare("right") == 0) {
                $(curr).addClass("animated " + curClass);
                $(next).css({
                    "opacity": "1",
                    "z-index": "9"
                });
                $(next).addClass("zoomIn");
            }
        },
        threshold: 10
    }); //end of swipe
})

function style() {
    $("#swipeScreen").css("max-height", heightSwipeScreen);
    $("#swipeScreen").css("min-height", heightSwipeScreen);
    $(".img-responsive").css("max-width", $("#swipeScreen").width());
    $(".img-responsive").css("min-width", $("#swipeScreen").width());
    $(".img-responsive").css("max-height", heightSwipeScreen - 5);
}