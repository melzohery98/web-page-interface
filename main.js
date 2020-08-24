//getting the last chosen color setting
document.documentElement.style.setProperty(
  "--main--color",
  localStorage.getItem("pageColor") || "#FF9800"
);

//create array of photos
let backgroundArray = ["Lp1.jpg", "Lp2.jpg", "Lp3.jpg", "Lp4.png", "Lp5.jpg"];

//Access the class of background element
let landingPage = document.querySelector(".landing-page");
//setting variable for background interval.
var changeBackground;

//set changing function
var imageCounter = parseInt(localStorage.getItem("lastImageIndex")) || 0;
landingPage.style.backgroundImage = `url(images/${backgroundArray[imageCounter]})`;

//Setting function for changing back ground.
function backgroundInterval() {
  changeBackground = setInterval((_) => {
    if (imageCounter >= backgroundArray.length - 1) {
      imageCounter = -1;
    }
    //save the last background before halt.
    imageCounter++;
    landingPage.style.backgroundImage = `url(images/${backgroundArray[imageCounter]})`;
    localStorage.setItem("lastImageIndex", imageCounter);
  }, 1000);
}

//toggle classes on settings box elements
document.querySelector("#gear-icon").onclick = function () {
  this.firstElementChild.classList.toggle("fa-spin");
  this.parentElement.classList.toggle("open");
};

//Changing colors on clicks
let colorList = document.querySelectorAll(
  ".settings-options .setting-option ul li"
);
let colorArray = Array.from(colorList);

//getting the last chosen color icon active.
colorList[localStorage.getItem("lastSelected") || 0].classList.add("active");
colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    colorList.forEach((r) => r.classList.remove("active"));
    e.target.classList.add("active");
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    //Save last preferred settings.
    localStorage.setItem("pageColor", e.target.getAttribute("data-color"));
    localStorage.setItem("lastSelected", colorArray.indexOf(e.target));
  });
});

//Background randomly change handling.
let backgroundOptions = document.querySelectorAll(".background-setting span");
let backGroundOptionsArray = Array.from(backgroundOptions);
backGroundOptionsArray[
  localStorage.getItem("lastBackgroundoption") || 0
].classList.add("active");

//See which option is selected
if (backGroundOptionsArray[0].classList.contains("active")) {
  backgroundInterval();
}
//loop on yes & no spans.
backGroundOptionsArray.forEach((span) => {
  //Add action on click.
  span.addEventListener("click", (el) => {
    backGroundOptionsArray.forEach((e) => e.classList.remove("active"));
    el.target.classList.add("active");
    localStorage.setItem(
      "lastBackgroundoption",
      backGroundOptionsArray.indexOf(el.target)
    );
    if (backGroundOptionsArray[0].classList.contains("active")) {
      clearInterval(changeBackground);
      backgroundInterval();
    } else {
      clearInterval(changeBackground);
    }
  });
});

//Show and hide bullets
//Bullets randomly change handling.
let bulletsOption = document.querySelectorAll(".bullets-setting span");
let bulletsOptionsArray = Array.from(bulletsOption);
bulletsOptionsArray[
  localStorage.getItem("lastBulletOption") || 0
].classList.add("active");

//Set default to bullets style of display option.
document.querySelector(".nav-bullets").style.display =
  localStorage.getItem("lastBulletVisibility") || "block";

//loop on yes & no spans.
bulletsOptionsArray.forEach((span) => {
  //Add action on click.
  span.addEventListener("click", (el) => {
    bulletsOptionsArray.forEach((e) => e.classList.remove("active"));
    el.target.classList.add("active");
    localStorage.setItem(
      "lastBulletOption",
      bulletsOptionsArray.indexOf(el.target)
    );
    if (bulletsOptionsArray[0].classList.contains("active")) {
      document.querySelector(".nav-bullets").style.display = "block";
    } else {
      document.querySelector(".nav-bullets").style.display = "none";
    }
    localStorage.setItem(
      "lastBulletVisibility",
      document.querySelector(".nav-bullets").style.display
    );
  });
});

window.onscroll = (_) => {
  //Apply Animation on scrolling to skills.
  let mySkills = document.querySelector(".skills");

  //Get the total height of section skills.
  let mySkillsHeight = mySkills.offsetHeight;

  //get mySkill section All way from top.
  let mySkillDistance = mySkills.offsetTop;

  //get window reached distance on scrolling;
  let windowDistance = this.scrollY;

  //get window outer height.
  let windowHeight = this.outerHeight;

  if (windowDistance > mySkillDistance - mySkillsHeight) {
    document
      .querySelectorAll(".skills .skill-progress span")
      .forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
  }
};
document.querySelectorAll(".gallery .image-box img").forEach((img) => {
  img.addEventListener("click", (e) => {
    //create main overlay div.
    let popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popUp");
    document.body.appendChild(popupOverlay);

    //create container div for image.
    let imgBox = document.createElement("div");
    imgBox.classList.add("image-box-overlay");
    document.body.appendChild(imgBox);

    //Get the image from selected source image.
    let popupImage = document.createElement("img");
    popupImage.setAttribute("src", e.target.getAttribute("src"));
    imgBox.appendChild(popupImage);

    //Add Title for images from alternative text,
    let imageTitle = document.createElement("h3");
    let imageTitleText = document.createTextNode(e.target.alt);
    imageTitle.appendChild(imageTitleText);
    imgBox.insertBefore(imageTitle, imgBox.childNodes[0]);

    //Add Close Bottom to the overlay photo.
    let closeSpan = document.createElement("span");
    closeSpan.classList.add("close-button");
    let closeSpanText = document.createTextNode("X");
    closeSpan.appendChild(closeSpanText);
    imgBox.appendChild(closeSpan);
  });
});
//Add Action to close button on imgBox div.
closeOverlay = (r) => {
  if (r.target.classList.contains("close-button")) {
    r.target.parentElement.remove();
    document.querySelector(".popUp").remove();
  }
};

document.addEventListener("click", closeOverlay);

//navigate through bullets.
let navBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".list li a");

//create nav function
function navToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("." + e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
navToSection(navBullets);
navToSection(allLinks);

//Add reset function.
function resetOptions() {
  localStorage.clear();
  window.location.reload();
}
document.querySelector(".reset").onclick = resetOptions;

let tlinks = document.querySelector(".list");
let buttonMenu = document.querySelector(".toggle-button");

//Stop propagation for menu amd menu button
function stopProp(e) {
  e.stopPropagation();
}

tlinks.onclick = stopProp; /*-------Important-------*/

//make display function for toggle button.
function openMenu(e) {
  e.stopPropagation();
  buttonMenu.classList.toggle("active-menu");
  tlinks.classList.toggle("open");
}

buttonMenu.onclick = openMenu;

document.addEventListener("click", (e) => {
  if (e.target !== tlinks && e.target !== buttonMenu) {
    buttonMenu.classList.remove("active-menu");
    tlinks.classList.remove("open");
  }
});
