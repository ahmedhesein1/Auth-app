const auth = require("./../middlewares/auth");
const router = require("express").Router();
router.get("/", auth.isAuthinticated, (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "TV",
      price: 20000,
    },
  ]);
});
module.exports = router;
