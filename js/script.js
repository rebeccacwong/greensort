var stepText = {
  1: "document your waste. what are you discarding?",
  2: "is it compostable, recyclable, or landfill?",
  3: "discard your waste in the appropriate bin.",
};
var CURRENT = 0;

var interval = setInterval(function () {
  $(".selected-step").removeClass("selected-step");
  if (CURRENT == 3) {
    CURRENT = 0;
    $("#1").addClass("selected-step");
    $("#step-instruction em").html(stepText[1]);
  } else {
    CURRENT += 1;
    $("#" + CURRENT).addClass("selected-step");
    $("#step-instruction em").html(stepText[CURRENT]);
  }
}, 6000);

/** LEAF DECOR */
function editLeaves(init) {
  // data array: [top, left, right, width/height, rotation]
  var topPrac = "110em";
  console.log($(".container")[1].clientHeight);
  console.log($(".container")[1].offsetTop);
  var dataArray = [
    [
      $(".container")[1].offsetTop -
        $(".container")[1].clientHeight * 0.6 +
        "px",
      null,
      "-6em",
      "20vw",
      "-70deg",
    ],
    [
      $(".container")[2].offsetTop -
        $(".container")[2].clientHeight * 0.6 +
        "px",
      "-2em",
      null,
      "20vw",
      null,
    ],
    [
      $(".container")[3].offsetTop -
        $(".container")[3].clientHeight * 2.2 +
        "px",
      null,
      "-3em",
      "20vw",
      "-190deg",
    ],
    [
      $(".footer")[0].offsetTop - $(".container")[3].clientHeight * 1.5 + "px",
      "-4em",
      null,
      "25vw",
      "-65deg",
    ],
  ];

  var arr;
  var leaf;

  for (var i = 0; i < dataArray.length; i++) {
    arr = dataArray[i];
    if (init) {
      leaf = document.createElement("div");
      leaf.setAttribute("class", "leaf");
    } else {
      leaf = $(".all-leaves")[i];
    }

    if (arr[0] != null) {
      leaf.style.top = arr[0];
    }
    if (arr[1] != null) {
      leaf.style.left = arr[1];
    }
    if (arr[2] != null) {
      leaf.style.right = arr[2];
    }
    if (arr[3] != null) {
      leaf.style.width = arr[3];
      leaf.style.height = arr[3];
    }
    if (arr[4] != null) {
      leaf.style.transform = "rotate(" + arr[4] + ")";
    }
    document.getElementById("all-leaves").appendChild(leaf);
    console.log(leaf);
  }
}

/** ANIMATIONS */
var os = new OnScreen();

var discardData = {
  container: document.getElementById("anim2"),
  renderer: "svg",
  prerender: true,
  autoplay: false,
  loop: false,
  path: "js/discard.json",
};
var discardAnimation = lottie.loadAnimation(discardData);
discardAnimation.setSpeed(2);

os.on("enter", "#anim2", (element, event) => {
  discardAnimation.play(); // If animation becomes visible, play it
});

var compostAnimation = lottie.loadAnimation({
  container: document.getElementById("anim0"),
  renderer: "svg",
  autoplay: false,
  loop: false,
  path: "js/compostStats.json",
});

os.on("enter", "#anim0", (element, event) => {
  compostAnimation.play();
});

var discard2Data = {
  container: document.getElementById("anim1"),
  renderer: "svg",
  autoplay: false,
  loop: true,
  path: "js/data.json",
};
var discard2Animation = lottie.loadAnimation(discard2Data);
discard2Animation.setSpeed(0.7);

os.on("enter", "#anim1", (element, event) => {
  discard2Animation.play();
});

/** RESPONSIVE RESIZING */
function checkWindow(initLeaves) {
  var windowsize = $(window).width();
  if (windowsize > 768) {
    editLeaves(initLeaves);
    $("#anim1").css("height", "30vw");
    $("#anim1").css("width", "30vw");
  } else {
    // $("#anim1").css("height", "30em");
    // $("#anim1").css("width", "30em");
    $("#all-leaves").empty();
  }

  // $(".lightgreen-back").css("margin-top", $("#anim1").offset().top + 10);
}

checkWindow(true);

window.onresize = () => checkWindow(false);
