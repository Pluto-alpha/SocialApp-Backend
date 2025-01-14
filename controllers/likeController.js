import db from "../DB/Connect.js";

const getLikes = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";
    db.query(q, [req.params.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.userId));
    });
}

const addLike = (req, res) => {
        const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
        const values = [
            req.user.id,
            req.body.postId
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked.");
        });
};

const deleteLike = (req, res) => {
        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
        db.query(q, [req.user.id, req.params.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been disliked.");
        });
    
};

export default { getLikes, addLike, deleteLike }