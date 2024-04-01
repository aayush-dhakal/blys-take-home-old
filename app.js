const express = require("express");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.post("/api/verify", (req, res) => {
  const { code } = req.body;

  if (code.length !== 6 || code.charAt(5) === "7" || !/^\d+$/.test(code)) {
    return res.status(400).json({ error: "Verification Error" });
  }

  return res.json({ success: true });
});

app.use(express.static("frontend/build"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
