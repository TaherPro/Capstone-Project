import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Inventory endpoint working")
});

export default router;