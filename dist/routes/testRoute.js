"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testHandler_1 = require("../handlers/testHandler");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: "This is the test request" });
});
router.get('/:id', (req, res) => {
    (0, testHandler_1.getById)(req, res);
});
router.post('/', (req, res) => {
    res.json({ message: "Post request received" });
});
exports.default = router;
