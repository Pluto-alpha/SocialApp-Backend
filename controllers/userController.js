import db from "../DB/Connect.js";

const getUser = (req, res) => {
    const userId = req.params.id;
    const q = "SELECT * FROM users WHERE id=?";
    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...info } = data[0];
        return res.json(info);
    });
};

const updateUser = (req, res) => {
    if (!req.files || !req.files.profilePic || !req.files.coverPic) {
        return res.status(400).json({ msg: 'Both files must be uploaded' });
    }
    const profilePic = `${req.protocol}://${req.get('host')}/public/${req.files.profilePic[0].filename}`;
    const coverPic = `${req.protocol}://${req.get('host')}/public/${req.files.coverPic[0].filename}`;
    const q =
        "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";
    db.query(
        q,
        [
            req.body.name,
            req.body.city,
            req.body.website,
            coverPic,
            profilePic,
            req.user.id,
        ],
        (err, data) => {
            if (err) res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("You can update only your post!");
        }
    );
};

export default { getUser, updateUser };