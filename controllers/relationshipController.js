import db from "../DB/Connect.js";

const getRelationships = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
    db.query(q, [req.params.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship => relationship.followerUserId));
    });
}

const addRelationship = (req, res) => {
        const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
        const values = [
            req.params.id,
            req.body.userId
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Following");
        });
};

const deleteRelationship = (req, res) => {
        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
        db.query(q, [req.params.id, req.params.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollow");
        });
};

export default { getRelationships, addRelationship, deleteRelationship };