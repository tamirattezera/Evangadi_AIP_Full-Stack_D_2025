import http from "node:http";

const server = http.createServer((req, res) => {
  // Application data
  const profile = {
    name: "Tamirat",
    role: "AI-Powered Full-Stack Engineer",
    runtime: "Node.js",
  };

  // 1. Convert JavaScript object → JSON string
  const jsonProfile = JSON.stringify(profile);

  // 2. Tell the client that the response contains JSON
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // 3. Send JSON response
  res.end(jsonProfile);
});

server.listen(3000, () => {
  console.log("JSON server running on http://localhost:3000");
});
