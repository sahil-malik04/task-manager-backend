const { router } = require("../utils/express");
const { signUp, signIn } = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/login", signIn);

module.exports = router;
