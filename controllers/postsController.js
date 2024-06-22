import db from "../DB/Connect.js";
import moment from 'moment';
import {__dirname} from '../utils/dirPath.js';
import { join } from 'path';
import fs from 'fs';

const GetAllPost = async (req, res) => {
    const userId = req.user.id;
    const q =
        userId !== "undefined"
            ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
            : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;
    const values =
        userId !== "undefined" ? [userId] : [req.user.id, req.user.id];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
const addPost = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/public/${req.file.filename}`;
    const q = "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
        req.body.desc,
        imageUrl,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.user.id,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data:data[0], msg: "Post has been created" });
    });
};

export const deletePost = (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;
    const getPostQuery = "SELECT img FROM posts WHERE `id`=? AND `userId`=?";
    db.query(getPostQuery, [postId, userId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(403).json("You can delete only your post");
        const imageUrl = result[0].img;
        const imageFilePath = join(__dirname, '..', imageUrl.replace(`${req.protocol}://${req.get('host')}/`, ''));
        fs.unlink(imageFilePath, (err) => {
            if (err) return res.status(500).json(err);
            const deletePostQuery = "DELETE FROM posts WHERE `id`=? AND `userId`=?";
            db.query(deletePostQuery, [postId, userId], (err, data) => {
                if (err) return res.status(500).json(err);
                if (data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
                return res.status(403).json("You can delete only your post");
            });
        });
    });
};

export default { GetAllPost, addPost, deletePost };