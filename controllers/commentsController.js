import db from "../DB/Connect.js";
import moment from "moment";

const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePic 
    FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC`;

    db.query(q, [req.params.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

const addComment = (req, res) => {
    const userId = req.user.id;
    const q = "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
    const values = [
        req.body.desc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userId,
        req.params.postId,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
    });
};

const deleteComment = (req, res) => {
    const commentId = req.params.id;
    const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";
    db.query(q, [commentId, req.user.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Comment has been deleted!");
        return res.status(403).json("You can delete only your comment!");

    })
};

export default { getComments, addComment, deleteComment }