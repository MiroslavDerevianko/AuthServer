const express = require('express')
const router = express.Router()
const multer = require('multer');

const db = require('../services/database');


const storage_photo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../res/photo/`);
    },
    filename: (req, file, cb) => {
        const name = 'Photo';// file.originalname.split('.')[0];
        const extension = file.originalname.split('.')[1];
        cb(null, `${name}-${Date.now()}.${extension}`);
    }
});

const upload_photo = multer({ dest: `${__dirname}/../res/photo/`, storage: storage_photo });

const photo = upload_photo.single('photo');

const check = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({ message: "Not auth" });
    }
}


const updatephotodb = (req, res, next) => {
    const url = `/photo/${req.file.filename}`;
    db.updateUserPhoto(req.user, url, req.file.filename, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send("Server error");
        } else {
            next();
        }
    });
}

/* POST upload file */
router.post('/upload/userphoto', check, photo, updatephotodb, function (req, res, next) {

    res.json({ message: "Upload success" });
})

module.exports = router
