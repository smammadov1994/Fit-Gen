$(document).ready(function() {
  console.log("ready!");
});

// arrow down

$(".ham-burger").click(function() {
  $(".nav").toggleClass("open");
  $(".ham-burger").toggleClass("active");
});
//

// contact button
const $contact = $(".start-color");
$contact.click(function() {
  alert("Call (203)-550-5246?");
});
//

//header-slide
if (screen.width > 600) {
  $("header").animate({ opacity: 1, marginLeft: "-2.5in" }, 1500);
}
//

//header text wiggles//
$("#home-text").css("animation", "wiggle 1s infinite");
//

//scroll about pops up//
window.addEventListener("scroll", function(event) {
  let scroll = this.scrollY;
  if (screen.width > 800 && scroll >= 620) {
    $("#container-2").css("animation", "slideIn .5s forwards");
  } else if (screen.width < 800 && scroll < 620) {
    $("#container-2").css("animation", "slideIn .5s forwards");
  }
});
window.addEventListener("scroll", function(event) {
  let scroll = this.scrollY;
  if (scroll >= 1600) {
    $("#contact").css("animation", "slideContact 2s forwards");
  }
});

const imageClick = document.querySelector("#legs");
imageClick.addEventListener("click", function() {
  $("#first-grid").css("visibility", "visible");
});
const imageClickTwo = document.querySelector("#shoulders");
imageClickTwo.addEventListener("click", function() {
  console.log("clicked!");
  $("#first-grid").css("visibility", "visible");
});
const imageClickThree = document.querySelector("#chest");
imageClickThree.addEventListener("click", function() {
  console.log("clicked!");
  $("#first-grid").css("visibility", "visible");
});
const imageClickFour = document.querySelector("#back");
imageClickFour.addEventListener("click", function() {
  console.log("clicked!");
  $("#first-grid").css("visibility", "visible");
});
const imageClickFive = document.querySelector("#arms");
imageClickFive.addEventListener("click", function() {
  console.log("clicked!");
  $("#first-grid").css("visibility", "visible");
});
const imageClickSix = document.querySelector("#core");
imageClickSix.addEventListener("click", function() {
  console.log("clicked!");
  $("#first-grid").css("visibility", "visible");
});
