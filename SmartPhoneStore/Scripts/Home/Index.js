(function () {
    var linkImage = [{ large: "../Images/1.jpg", small: "../Images/1_400.jpg" }, { large: "../Images/2.jpg", small: "../Images/2_400.jpg" }
        , { large: "../Images/3.jpg", small: "../Images/3_400.jpg" }, { large: "../Images/4.jpg", small: "../Images/4_400.jpg" }
        , { large: "../Images/5.jpg", small: "../Images/5_400.jpg" }];
    $(document).ready(function () {
        style();
        var swipeCards = new SwipeCards($("#swipeScreen"), linkImage);
        swipeCards.render();

    });


    $(window).resize(function () {
        style();
    });

    function style() {
        var restHeight = $(window).height() - $("#mainMenu").outerHeight();
        console.log($(document).height());
        $("#swipeScreen").css({
            "height": restHeight
        });
    }

    var SwipeCards = function (element, listImage) {
        this.element = element;
        this.listImage = listImage;

    }

    SwipeCards.prototype = {
        render: function () {
            for (var i = 0 ; i < this.listImage.length; i++) {
                this.element.append("<div class='card'>"
                    + "<img class='cardImage' src='" + this.listImage[i].large + "' srcset='../Images/" + this.listImage[i].small + " 500w' />"
                    + "</div>");
            }

            var parentPadding = parseInt(this.element.css("padding-right"), 10) + parseInt(this.element.css("padding-left"), 10);
            this.element.find(".card").css({
                "height": "100%",
                "width": "calc(100% - " + parentPadding + "px)"
            });

            this.element.find(".cardImage").css({
                "height": "100%",
                "width": "100%"
            });

            this.swipeStart();
        },
        swipeStart: function () {
            var listCard = this.element.children();
            var index = 0;
            var animate = {
                zoomIn: "zoomInCard", zoomOut: "zoomOutCard"
                , fadeOutLeft: "fadeOutLeftCard", fadeOutRight: "fadeOutRightCard"
                , fadeOutUp: "fadeOutUpCard", fadeOutDown: "fadeOutDownCard", fadeInBack: "fadeInBackCard"
            };
            var startPhase = null;
            var left = 0;
            var right = 0;
            var up = 0;
            var down = 0;

            this.element.swipe({
                swipeStatus: function (event, phase, direction, distance, duration, fingers) {
                    console.log(phase + " " + direction + " " + distance + " " + duration);
                    var curr = listCard[index];
                    var next = listCard[index + 1];
                    var proportion = distance / $(curr).width();

                    switch (phase) {
                        case "start":
                            this.startPhase = direction;
                            $(curr).removeClass(animate.zoomIn);
                            $(curr).removeClass(animate.fadeInBack);
                            $(curr).css({
                                "-webkit-transform": "scale3d(1, 1, 1)",
                                "transform": "scale3d(1, 1, 1)",
                                "opacity": "1"
                            });

                            $(next).removeClass(animate.zoomOut);
                            $(next).css({
                                "-webkit-transform": "scale3d(.1, .1, .1)",
                                "transform": "scale3d(.1, .1, .1)",
                                "opacity": "0"
                            });

                            break;
                        case "move":
                            if (startPhase == null) startPhase = direction;
                            switch (startPhase) {
                                case "left":
                                    $(curr).css({
                                        "-webkit-transform": "translate3d(-" + distance + "px, 0%, 0)",
                                        "transform": "translate3d(-" + distance + "px, 0%, 0)",
                                        "opacity": 1 - proportion
                                    });
                                    break;
                                case "right":
                                    $(curr).css({
                                        "-webkit-transform": "translate3d(" + distance + "px, 0%, 0)",
                                        "transform": "translate3d(" + distance + "px, 0%, 0)",
                                        "opacity": 1 - proportion
                                    });
                                    break;
                                case "up":
                                    proportion = distance / $(curr).height();
                                    $(curr).css({
                                        "-webkit-transform": "translate3d(0, -" + distance + "px, 0)",
                                        "transform": "translate3d(0, -" + distance + "px, 0)",
                                        "opacity": 1 - proportion
                                    });
                                    break;
                                case "down":
                                    proportion = distance / $(curr).height();
                                    $(curr).css({
                                        "-webkit-transform": "translate3d(0, " + distance + "px, 0)",
                                        "transform": "translate3d(0, " + distance + "px, 0)",
                                        "opacity": 1 - proportion
                                    });
                                    break;
                            }
                            if (startPhase != null) {
                                $(next).css({
                                    "-webkit-transform": "scale3d(" + proportion + ", " + proportion + ", " + proportion + ")",
                                    "transform": "scale3d(" + proportion + ", " + proportion + ", " + proportion + ")",
                                    "opacity": proportion
                                });
                            }
                            try {
                                endSwipePosition = event.touches[0];
                            } catch (error) {
                                endSwipePosition = event;
                            }
                            break;
                        case "end":
                            var startSwipeScreenPosition = $(this).position();
                            var bottomSwipeScreenPosition = startSwipeScreenPosition.top + $(this).height();

                            if ((endSwipePosition.pageX < startSwipeScreenPosition.left
                                || endSwipePosition.pageY < startSwipeScreenPosition.top
                                || endSwipePosition.pageY > bottomSwipeScreenPosition)
                                || (distance > $(this).swipe("option", "threshold") && duration < 200)) {
                                switch (startPhase) {
                                    case "left":
                                        $(curr).addClass(animate.fadeOutLeft);
                                        $(next).addClass(animate.zoomIn);
                                        left++;
                                        break;
                                    case "right":
                                        $(curr).addClass(animate.fadeOutRight);
                                        $(next).addClass(animate.zoomIn);
                                        right++;
                                        break;
                                    case "up":
                                        $(curr).addClass(animate.fadeOutUp);
                                        $(next).addClass(animate.zoomIn);
                                        up++;
                                        break;
                                    case "down":
                                        $(curr).addClass(animate.fadeOutDown);
                                        $(next).addClass(animate.zoomIn);
                                        down++;
                                        break;
                                }
                                if (startPhase != null) {
                                    index++;
                                }
                            } else {
                                $(curr).addClass(animate.fadeInBack);
                                $(next).addClass(animate.zoomOut);
                            }
                            startPhase = null;
                            break;
                    }
                }, threshold: 10
            });//end of swipe
        }

    };
})();