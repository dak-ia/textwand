const BEACON_URL = "https://static.cloudflareinsights.com/beacon.min.js";

const token = import.meta.env.VITE_CF_ANALYTICS_TOKEN;

if (token) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = BEACON_URL;
  script.setAttribute("data-cf-beacon", JSON.stringify({ token }));
  document.head.appendChild(script);
}
