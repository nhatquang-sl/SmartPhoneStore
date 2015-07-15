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
        this.animate = {
            zoomIn: "zoomInCard", zoomOut: "zoomOutCard"
                , fadeOutLeft: "fadeOutLeftCard", fadeOutRight: "fadeOutRightCard"
                , fadeOutUp: "fadeOutUpCard", fadeOutDown: "fadeOutDownCard", fadeInBack: "fadeInBackCard"
        };

        this.fadeOutLeftCard = [];
        this.fadeOutRightCard = [];
        this.fadeOutUpCard = [];
        this.fadeOutDownCard = [];
        this.currentCard;
        this.nextCard;
        this.index = 0;
        this.left = 0;
        this.right = 0;
        this.up = 0;
        this.down = 0;
        this.speed;
        this.remainDistance;
        this.remainDuration;
        this.proportion;
        this.startPhase;
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

            var ss = document.styleSheets;
            for (var i = 0; i < ss.length; ++i) {
                for (var x = 0; x < ss[i].cssRules.length; ++x) {
                    if (ss[i].cssRules[x].type == CSSRule.KEYFRAMES_RULE) {
                        switch (ss[i].cssRules[x].name) {
                            case this.animate.fadeOutLeft:
                                this.fadeOutLeftCard.push(ss[i].cssRules[x]);
                                break;
                            case this.animate.fadeOutRight:
                                this.fadeOutRightCard.push(ss[i].cssRules[x]);
                                break;
                            case this.animate.fadeOutUp:
                                this.fadeOutUpCard.push(ss[i].cssRules[x]);
                                break;
                            case this.animate.fadeOutDown:
                                this.fadeOutDownCard.push(ss[i].cssRules[x]);
                                break;
                        }
                    }
                }
            }

            this.swipeStart();
        },
        swipeStart: function () {
            var listCard = this.element.children();

            var self = this;

            this.element.swipe({
                swipeStatus: function (event, phase, direction, distance, duration, fingers) {
                    console.log(phase + " " + direction + " " + distance + " " + duration);
                    self.currentCard = listCard[self.index];
                    self.nextCard = listCard[self.index + 1];
                    self.proportion = distance / $(self.currentCard).width();

                    switch (phase) {
                        case "start":
                            self.startSwipe(direction);
                            break;
                        case "move":
                            if (self.startPhase == null) self.startPhase = direction;
                            switch (self.startPhase) {
                                case "left":
                                    self.remainDistance = $(self.currentCard).width() - distance;
                                    $(self.currentCard).css({
                                        "-webkit-transform": "translate3d(-" + distance + "px, 0%, 0)",
                                        "transform": "translate3d(-" + distance + "px, 0%, 0)",
                                        "opacity": 1 - self.proportion
                                    });
                                    break;
                                case "right":
                                    self.remainDistance = $(self.currentCard).width() - distance;
                                    $(self.currentCard).css({
                                        "-webkit-transform": "translate3d(" + distance + "px, 0%, 0)",
                                        "transform": "translate3d(" + distance + "px, 0%, 0)",
                                        "opacity": 1 - self.proportion
                                    });
                                    break;
                                case "up":
                                    self.remainDistance = $(self.currentCard).height() - distance;
                                    self.proportion = distance / $(self.currentCard).height();
                                    $(self.currentCard).css({
                                        "-webkit-transform": "translate3d(0, -" + distance + "px, 0)",
                                        "transform": "translate3d(0, -" + distance + "px, 0)",
                                        "opacity": 1 - self.proportion
                                    });
                                    break;
                                case "down":
                                    self.remainDistance = $(self.currentCard).height() - distance;
                                    self.proportion = distance / $(self.currentCard).height();
                                    $(self.currentCard).css({
                                        "-webkit-transform": "translate3d(0, " + distance + "px, 0)",
                                        "transform": "translate3d(0, " + distance + "px, 0)",
                                        "opacity": 1 - self.proportion
                                    });
                                    break;
                            }
                            if (self.startPhase != null) {
                                $(self.nextCard).css({
                                    "-webkit-transform": "scale3d(" + self.proportion + ", " + self.proportion + ", " + self.proportion + ")",
                                    "transform": "scale3d(" + self.proportion + ", " + self.proportion + ", " + self.proportion + ")",
                                    "opacity": self.proportion
                                });
                            }
                            try {
                                endSwipePosition = event.touches[0];
                            } catch (error) {
                                endSwipePosition = event;
                            }
                            self.speed = duration / distance;
                            self.remainDuration = self.speed * self.remainDistance;

                            break;
                        case "end":
                            var startSwipeScreenPosition = $(this).position();
                            var bottomSwipeScreenPosition = startSwipeScreenPosition.top + $(this).height();

                            if ((endSwipePosition.pageX < startSwipeScreenPosition.left
                                || endSwipePosition.pageY < startSwipeScreenPosition.top
                                || endSwipePosition.pageY > bottomSwipeScreenPosition)
                                || (distance > $(this).swipe("option", "threshold") && duration < 200)) {
                                console.log(self.startPhase);
                                self.remainDuration /= 1000;
                                $(".card").css({
                                    "-webkit-animation-duration": self.remainDuration + "s",
                                    "animation-duration": self.remainDuration + "s"
                                });
                                switch (self.startPhase) {
                                    case "left":
                                        self.moveOutLeft();
                                        break;
                                    case "right":
                                        self.moveOutRight();
                                        break;
                                    case "up":
                                        self.moveOutUp();
                                        break;
                                    case "down":
                                        self.moveOutDown();
                                        break;
                                }
                                if (self.startPhase != null) {
                                    $(self.nextCard).addClass(self.animate.zoomIn);
                                    self.index++;
                                }
                            } else {
                                $(".card").css({
                                    "-webkit-animation-duration": "1s",
                                    "animation-duration": "1s"
                                });
                                $(self.currentCard).addClass(self.animate.fadeInBack);
                                $(self.nextCard).addClass(self.animate.zoomOut);
                            }
                            self.startPhase = null;
                            break;
                    }
                }, threshold: 10
            });//end of swipe
        },
        startSwipe: function (direction) {
            this.startPhase = direction;
            $(this.currentCard).removeClass(this.animate.zoomIn);
            $(this.currentCard).removeClass(this.animate.fadeInBack);
            $(this.currentCard).css({
                "-webkit-transform": "scale3d(1, 1, 1)",
                "transform": "scale3d(1, 1, 1)",
                "opacity": "1"
            });

            $(this.nextCard).removeClass(this.animate.zoomOut);
            $(this.nextCard).css({
                "-webkit-transform": "scale3d(.1, .1, .1)",
                "transform": "scale3d(.1, .1, .1)",
                "opacity": "0"
            });
        },
        moveOutLeft: function () {
            for (var i = 0; i < this.fadeOutLeftCard.length; i++) {
                this.fadeOutLeftCard[i].deleteRule("100%");

                this.fadeOutLeftCard[i].appendRule("100% { opacity: 0; -webkit-transform: translate3d(-"
                     + this.remainDistance + "px, 0, 0); transform: translate3d(-"
                     + this.remainDistance + "px, 0, 0);}");
                $(this.currentCard).addClass(this.animate.fadeOutLeft);
                this.left++;
            }
        }, moveOutRight: function () {
            for (var i = 0; i < this.fadeOutRightCard.length; i++) {
                this.fadeOutRightCard[i].deleteRule("100%");

                this.fadeOutRightCard[i].appendRule("100% { opacity: 0; -webkit-transform: translate3d("
                     + this.remainDistance + "px, 0, 0); transform: translate3d("
                     + this.remainDistance + "px, 0, 0);}");

                $(this.currentCard).addClass(this.animate.fadeOutRight);
                this.right++;
            }
        }, moveOutUp: function () {
            for (var i = 0; i < this.fadeOutUpCard.length; i++) {
                this.fadeOutUpCard[i].deleteRule("100%");

                this.fadeOutUpCard[i].appendRule("100% { opacity: 0; -webkit-transform: translate3d(0, -"
                     + this.remainDistance + "px, 0); transform: translate3d(0, -"
                     + this.remainDistance + "px, 0);}");

                $(this.currentCard).addClass(this.animate.fadeOutUp);
                this.up++;
            }
        }, moveOutDown: function () {
            for (var i = 0; i < this.fadeOutDownCard.length; i++) {
                this.fadeOutDownCard[i].deleteRule("100%");

                this.fadeOutDownCard[i].appendRule("100% { opacity: 0; -webkit-transform: translate3d(0, "
                     + this.remainDistance + "px, 0); transform: translate3d(0, "
                     + this.remainDistance + "px, 0);}");

                $(this.currentCard).addClass(this.animate.fadeOutDown);
                this.down++;
            }
        }

    };
})();