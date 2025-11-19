import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Requests endpoint working")
});

export default router;