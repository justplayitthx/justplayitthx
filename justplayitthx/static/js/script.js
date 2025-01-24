const submitButton = document.getElementById("submit");

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function Submit() {
  const linkInput = document.getElementById("link");
  const resValue = document.getElementById("resolution").value; // Assuming it's an input field
  const linkValue = linkInput.value.trim();

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
        link: linkValue,
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
  "(almost) no CSS!",
  "infinite brainrot consuming",
  "i am a terrible programmer!",
  "your trash PC has a new purpose!",
  "distractionless experience frfr",
  "dark mode coming soon",
  "does anyone actually read these?",
  "mmmm default HTML font...",
  "i know your PC is terrible, thats why your here :3",
  "your 1GB of ram will enjoy this!",
  "who needs polished UI?",
  "just play it, thx.",
  "if the website is laggy, dont worry. the server im using is terrible."
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
