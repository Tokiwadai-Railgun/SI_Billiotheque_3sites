"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
function loginMiddleware(request, _response, next) {
    const body = request.body;
    const userName = body.name;
    if (!userName) {
        return next(new Error("Name is required"));
    }
    next();
}
router.post('/', loginMiddleware, (req, res) => {
    const body = req.body;
    console.log("Body is ", body);
    res.json({ token: "sample" });
});
exports.default = router;
