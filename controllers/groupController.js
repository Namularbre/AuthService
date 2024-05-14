const GroupModel = require("../models/groupModel");

class GroupController {
    static async userIsInGroup(req, res) {
        const {groupName} = req.params;

        if (groupName && req.user) {
            const group = await GroupModel.getGroup(groupName);

            if (group) {
                const idGroup = group.idGroup;
                const idUser = req.user.idUser;

                const isInGroup = await GroupModel.userIsInGroup(idUser, idGroup);

                res.json({
                    isInGroup,
                });
            } else {
                res.status(404).json({
                    message: 'Group not found',
                });
            }
        } else {
            res.status(400).json({
                message: 'Missing groupName in request payload (or you are not logged)',
            });
        }
    }
}

module.exports = GroupController;
