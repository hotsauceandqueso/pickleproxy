const form = document.getElementById("proxy-form");
const input = document.getElementById("url-input");

// Wait until UV SW is registered
async function registerSW() {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("/ultraviolet/uv.sw.js", {
      scope: "/ultraviolet/",
    });
  }
}

registerSW();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let url = input.value.trim();
  if (!url) return;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  // Encode using Ultraviolet’s encoder
  const encoded = __uv$config.encodeUrl(url);
  location.href = __uv$config.prefix + encoded;
});
