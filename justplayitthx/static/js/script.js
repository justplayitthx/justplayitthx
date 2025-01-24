const submitButton = document.getElementById("submit");
let linkValue = {};

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function Submit() {
  const linkInput = document.getElementById("link");
  const resValue = document.getElementById("resolution").value;
  sessionStorage.setItem('linkValue', JSON.stringify({ link: linkInput.value.trim() }));
  console.log(linkInput.value.trim());

  if (linkInput.value.trim() === "") {
    alert("link shouldnt be empty!");
  }
  if (resValue.trim() === "") {
    alert("please insert the resolution!");
  }

  const div = document.getElementById("div");
  const waitMessage = document.createElement("p");
  waitMessage.textContent = "Please wait...";
  div.appendChild(waitMessage);

  try {
    const response = await fetch('/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link: linkInput.value.trim(),
        resolution: resValue,
      }),
    });

    const data = await response.json();

    if (data.redirect_url) {
      window.location.href = data.redirect_url;
    }
  } catch (error) {
    console.error('Error:', error);
    const responseElement = document.getElementById('response');
    if (responseElement) {
      responseElement.textContent = "Error processing your request.";
    }
  }
}


const messages = [
  "9/10 awful PCs reccomend!",
  "(almost) no CSS! (lie for now)",
  "infinite brainrot consuming",
  "i am a terrible programmer!",
  "your trash PC has a new purpose!",
  "distractionless experience frfr",
  "FUCK YEAH DARK MODE IS HERE!!111!",
  "does anyone actually read these?",
  "mmmm default HTML font...",
  "i know your PC is terrible, thats why your here :3",
  "your 1GB of ram will enjoy this!",
  "I BROKE THE GODDAMN WHEEL",
  "who needs polished UI?",
  "just play it, thx.",
  "if the website is laggy, dont worry. the server im using is terrible.",
  "fun fact: i was in bed when i came up with this project idea",
  "even new PCs reccomend!",
  "google please dont sue me",
  "someone please try this on a old nokia"
];

let index = 0;

function changeText() {
  document.getElementById('marquee').textContent = messages[index];
  index = (index + 1) % messages.length;
}

setInterval(changeText, 4000);

function HomePage() {
  window.location.href = "/goto_index";
}

function LinkPage() {
  const linkData = JSON.parse(sessionStorage.getItem('linkValue'));
  window.open(linkData.link, "_blank");
}

function DarkMode() {
  const body = document.getElementById("body");
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";

  if (darkModeEnabled) {
    body.style.backgroundColor = "#ffffff";
    body.style.color = "black";
    localStorage.setItem("darkMode", "false");
  } else {
    body.style.backgroundColor = "#161618";
    body.style.color = "white";
    localStorage.setItem("darkMode", "true");
  }
}


window.onload = function () {
  const body = document.getElementById("body");
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";

  if (darkModeEnabled) {
    body.style.backgroundColor = "#161618";
    body.style.color = "white";
  } else {
    body.style.backgroundColor = "#ffffff";
    body.style.color = "black";
  }
};
