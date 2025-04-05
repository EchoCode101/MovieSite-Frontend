/**
 * Function to dynamically create and display modal
 * @param {string} title - Title of the modal
 * @param {string} message - Message content of the modal
 * @param {string} type - Type of modal (success, error, info) to customize appearance
 */
function showModal(title, message, type = "error") {
  showLoadingScreen(false); // Ensure loading screen is hidden

  const existingModal = document.getElementById("modal-status");
  if (existingModal) {
    existingModal.remove();
  }

  const main = document.querySelector("main") || document.body;
  const modal = document.createElement("div");
  modal.id = "modal-status";
  modal.className = `zoom-anim-dialog mfp-hide modal ${type}`;
  modal.innerHTML = `
    <h6 class="modal__title">${title}</h6>
    <p class="modal__text">${message}</p>
    <button title="Close (Esc)" type="button" class="mfp-close">×</button>
  `;

  main.append(modal);

  // Open modal using magnificPopup
  $.magnificPopup.open({
    items: {
      src: modal,
      type: "inline",
    },
    preloader: false,
    removalDelay: 300,
    mainClass: "my-mfp-zoom-in",
  });
}

/**
 * Function to show or hide a loading screen with a GIF
 * @param {boolean} show - True to show, false to hide
 */
function showLoadingScreen(show) {
  let loadingScreen = document.getElementById("loading-screen");

  if (show) {
    if (!loadingScreen) {
      // Create a new loading screen container
      loadingScreen = document.createElement("div");
      loadingScreen.id = "loading-screen";
      loadingScreen.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex; justify-content: center; align-items: center;
        z-index: 9999;
      `;

      // Add the loading GIF
      const loadingGif = document.createElement("img");
      loadingGif.src = "./img/loading.gif"; // Replace with your loading GIF path
      loadingGif.alt = "Loading...";
      loadingGif.style.cssText = "width: 80px; height: 80px;";

      // Add the GIF to the loading screen
      loadingScreen.appendChild(loadingGif);

      // Append the loading screen to the body
      document.body.appendChild(loadingScreen);
    }
    loadingScreen.style.display = "flex";
  } else if (loadingScreen) {
    loadingScreen.style.display = "none";
  }
}
