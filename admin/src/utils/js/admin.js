$(document).ready(function () {
  ("use strict"); // start of use strict
  var delay = 100;
  /*==============================
  Menu
  ==============================*/
  // setTimeout(() => {
    $(".header__btn").on("click", function () {
      console.log("Sidebar toggle clicked");
      $(this).toggleClass("header__btn--active");
      $(".header").toggleClass("header--active");
      $(".sidebar").toggleClass("sidebar--active");
    });
  // }, delay);
  /*==============================
  Filter
  ==============================*/
  // setTimeout(() => {
    $(".filter__item-menu li").each(function () {
      $(this).attr("data-value", $(this).text().toLowerCase());
    });
  // }, delay);
  // setTimeout(() => {
    $(".filter__item-menu li").on("click", function () {
      var text = $(this).text();
      var item = $(this);
      var id = item.closest(".filter").attr("id");
      $("#" + id)
        .find(".filter__item-btn input")
        .val(text);
    });
  // }, delay); // Delay of 500ms
  /*==============================
  Tabs
  ==============================*/
  // setTimeout(() => {
    $(".profile__mobile-tabs-menu li").each(function () {
      $(this).attr("data-value", $(this).text().toLowerCase());
    });
  // }, delay);
  // setTimeout(() => {
    $(".profile__mobile-tabs-menu li").on("click", function () {
      var text = $(this).text();
      var item = $(this);
      var id = item.closest(".profile__mobile-tabs").attr("id");
      $("#" + id)
        .find(".profile__mobile-tabs-btn input")
        .val(text);
    });
  // }, delay); // Delay of 500ms
  /*==============================
  Modal
  ==============================*/
  // setTimeout(() => {
    $(".open-modal").magnificPopup({
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: "auto",
      type: "inline",
      preloader: false,
      focus: "#username",
      modal: false,
      removalDelay: 300,
      mainClass: "my-mfp-zoom-in",
    });
  // }, delay);
  // setTimeout(() => {
    $(".modal__btn--dismiss").on("click", function (e) {
      e.preventDefault();
      $.magnificPopup.close();
    });
  // }, delay); // Delay of 500ms
  /*==============================
  Select2
  ==============================*/
  // setTimeout(() => {
    $("#quality").select2({
      placeholder: "Choose quality",
      allowClear: true,
    });
  // }, delay);
  // setTimeout(() => {
    $("#country").select2({
      placeholder: "Choose country / countries",
    });
  // }, delay);
  // setTimeout(() => {
    $("#genre").select2({
      placeholder: "Choose genre / genres",
    });
  // }, delay);
  // setTimeout(() => {
    $("#subscription, #status").select2();
  // }, delay); // Delay of 500ms
  /*==============================
  Upload cover
  ==============================*/
  function readURL(input) {
    // setTimeout(() => {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $("#form__img").attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    // }, delay);
  }
  // setTimeout(() => {
    $("#form__img-upload").on("change", function () {
      readURL(this);
    });
  // }, delay);
  /*==============================
	Upload video
	==============================*/
  // setTimeout(() => {
    $(".form__video-upload").on("change", function () {
      var videoLabel = $(this).attr("data-name");

      if ($(this).val() != "") {
        $(videoLabel).text($(this)[0].files[0].name);
      } else {
        $(videoLabel).text("Upload video");
      }
    });
  // }, delay); // Delay of 500ms
  /*==============================
	Upload gallery
	==============================*/
  // setTimeout(() => {
    $(".form__gallery-upload").on("change", function () {
      var length = $(this).get(0).files.length;
      var galleryLabel = $(this).attr("data-name");

      if (length > 1) {
        $(galleryLabel).text(length + " files selected");
      } else {
        $(galleryLabel).text($(this)[0].files[0].name);
      }
    });
  // }, delay); // Delay of 500ms

  /*==============================
	Scrollbar
	==============================*/
  var Scrollbar = window.Scrollbar;
  // setTimeout(() => {
    if ($(".sidebar__nav").length) {
      Scrollbar.init(document.querySelector(".sidebar__nav"), {
        damping: 0.1,
        renderByPixels: true,
        alwaysShowTracks: true,
        continuousScrolling: true,
      });
    }
  // }, delay); // Delay of 500ms
  // setTimeout(() => {
    document.querySelectorAll(".dashbox__table-wrap").forEach((element) => {
      Scrollbar.init(element, {
        damping: 0.1,
        renderByPixels: true,
        alwaysShowTracks: true,
        continuousScrolling: true,
      });
      // console.log(`Smooth Scrollbar initialized for ${element.className}`);
    });
  // }, delay); // Delay of 500ms

  // setTimeout(() => {
    if ($(".main__table-wrap").length) {
      Scrollbar.init(document.querySelector(".main__table-wrap"), {
        damping: 0.1,
        renderByPixels: true,
        alwaysShowTracks: true,
        continuousScrolling: true,
      });
    }
  // }, delay); // Delay of 500ms
  /*==============================
	Bg
	==============================*/
  // setTimeout(() => {
    $(".section--bg").each(function () {
      if ($(this).attr("data-bg")) {
        $(this).css({
          background: "url(" + $(this).data("bg") + ")",
          "background-position": "center center",
          "background-repeat": "no-repeat",
          "background-size": "cover",
        });
      }
    });
  // }, delay); // Delay of 500ms
});
