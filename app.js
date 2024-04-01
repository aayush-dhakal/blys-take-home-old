const express = require("express");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  return res.json({ message: "api working" });
});

app.post("/api/verify", (req, res) => {
  const { code } = req.body;

  if (code.length !== 6 || code.charAt(5) === "7" || !/^\d+$/.test(code)) {
    return res.status(400).json({ error: "Verification Error" });
  }

  return res.json({ success: true });
});

app.use(express.static("frontend/build"));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

module.exports = app;
