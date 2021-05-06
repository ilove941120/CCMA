"use strict";

(function () {

  var target = document.querySelector(".main_menu_span2");
  var links = document.querySelectorAll(".main_menu2");
  var colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "black", "darkblue"];

  function mouseenterFunc() {
    if (!this.classList.contains("active")) {
      for (var i = 0; i < links.length; i++) {
        if (links[i].classList.contains("active")) {
          links[i].classList.remove("active");
        }
        links[i].style.opacity = "1";
      }

      this.classList.add("active");
      this.style.opacity = "1";

    
      var width = this.getBoundingClientRect().width;
      var height = this.getBoundingClientRect().height;
      var left = this.getBoundingClientRect().left + window.pageXOffset;
      var top = this.getBoundingClientRect().top + window.pageYOffset;
      //var color = colors[Math.floor(Math.random() * colors.length)];
      var color = "red";

      target.style.width = width + "px";
      target.style.height = height + "px";
      target.style.left = left + "px";
      //target.style.top = top + "px";
      target.style.borderColor = color;
      target.style.transform = "none";
    }
  }

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
      //return e.preventDefault();
    });
    links[i].addEventListener("mouseenter", mouseenterFunc);
  }

  function resizeFunc() {
    var active = document.querySelector(".main_menu2.active");

    if (active) {
      var left = active.getBoundingClientRect().left + window.pageXOffset;
      var top = active.getBoundingClientRect().top + window.pageYOffset;

      target.style.left = left + "px";
      //target.style.top = top + "px";
    }
  }

  window.addEventListener("resize", resizeFunc);
})();