"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.post('/ddd', (req, res) => {
    console.log("Kurac");
    res.json({ "message": "ok" });
});
app.listen(4000, () => console.log(`Express server running on port 4002`));
//# sourceMappingURL=server.js.map