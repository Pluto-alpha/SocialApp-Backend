import db from "../DB/Connect.js";
import moment from "moment";
import {__dirname} from '../utils/dirPath.js';
import { join } from 'path';
import fs from 'fs';

const getStories = (req, res) => {
    const q = `SELECT s.*, name FROM stories AS s JOIN users AS u ON (u.id = s.userId)
    LEFT JOIN relationships AS r ON (s.userId = r.followedUserId AND r.followerUserId= ?) LIMIT 4`;
        db.query(q, [req.user.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
};

const addStory = (req, res) => {
        const q = "INSERT INTO stories(`img`, `createdAt`, `userId`) VALUES (?)";
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/public/${req.file.filename}`;
        const values = [
            imageUrl,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.user.id,
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Story has been created.");
        });
};

const deleteStory = (req, res) => {
    const userId = req.user.id;
    const storyId = req.params.id;
    const imgQuery = "SELECT img FROM stories WHERE `id`=? AND `userId`=?";
    db.query(imgQuery, [storyId, userId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(403).json("You can delete only your story");
        const imageUrl = result[0].img;
        const imageFilePath = join(__dirname, '..', imageUrl.replace(`${req.protocol}://${req.get('host')}/`, ''));
        fs.unlink(imageFilePath, (err) => {
            if (err) return res.status(500).json(err);
            const deleteStory = "DELETE FROM stories WHERE `id`=? AND `userId` = ?";
            db.query(deleteStory, [storyId, userId], (err, data) => {
                if (err) return res.status(500).json(err);
                if (data.affectedRows > 0) return res.status(200).json("Story has been deleted.");
                return res.status(403).json("You can delete only your post");
            });
        });
    });
};

export default { getStories, addStory, deleteStory }
