document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementsByClassName("close")[0];
    const addDataButton = document.getElementById("add-data-button");
  
    if (addDataButton) {
      addDataButton.addEventListener("click", function () {
        if (modal) modal.style.display = "block";
      });
    }
  
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        if (modal) modal.style.display = "none";
      });
    }
  
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal2");
    const closeBtn = document.getElementsByClassName("close")[0];
    const addDataButton = document.getElementById("add-data-button");
  
    if (addDataButton) {
      addDataButton.addEventListener("click", function () {
        if (modal) modal.style.display = "block";
      });
    }
  
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        if (modal) modal.style.display = "none";
      });
    }
  
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });