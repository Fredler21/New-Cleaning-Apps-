const https = require("https");

const data = JSON.stringify({ email: "testcheck99@gmail.com" });

const options = {
  hostname: "trycleaninghacks.com",
  port: 443,
  path: "/api/subscribe",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
  timeout: 30000,
};

const req = https.request(options, (res) => {
  let body = "";
  console.log("Status:", res.statusCode);
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    console.log("Response:", body);
    process.exit(0);
  });
});

req.on("error", (e) => {
  console.error("Request error:", e.message);
  process.exit(1);
});

req.on("timeout", () => {
  console.error("Request timed out");
  req.destroy();
  process.exit(1);
});

req.write(data);
req.end();
