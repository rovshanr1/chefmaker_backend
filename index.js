//index.js

const express = require("express");
const admin = require("firebase-admin")
const dotenv = require("dotenv");
const imagekit = require("./imagekit");
const cors = require("cors");
const fs = require("fs");
const { error } = require("console");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "10mb"}));

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Token Verification middleware
async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split("Bearer ")[1];
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        } catch (error) {
            res.status(401).json({ error: "Invalid token" });
        }
    } else{
        res.status(401).json({error: "Unauthorized"});
    }
}

//upload endpoint
app.post('/upload', verifyToken, async (req, res) => {
    const { file, fileName  } = req.body;
    const folder = `/users/${req.user.uid}`;

    try {
        const response = await imagekit.upload({
            file,
            fileName,
            folder
        });
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to upload image" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, `0.0.0.0`, () => {
    console.log(`Server is running on port ${PORT}`);
});
