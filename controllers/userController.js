import { findUserByRoleAndId, findAllUsersByRole, findUserByRoleAndKeyWord } from '../helpers/userHelper';


const viewSingleManager = async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try {
        const foundManager = await findUserByRoleAndId('MANAGER', id);
        if (foundManager) {
            return res.status(200).json({
                status: 200,
                object: foundManager
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'manager not found'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const viewAllManagers = async (req, res) => {
    try {
        const foundManagers = await findAllUsersByRole('MANAGER');
        if (foundManagers.length) {
            return res.status(200).json({
                status: 200,
                objects: foundManagers
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'No managers were found!'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const searchManagers = async (req, res) => {
    const { key } = req.params;
    try {
        const foundManagers = await findUserByRoleAndKeyWord('MANAGER', key);
        if (foundManagers.length) {
            return res.status(200).json({
                status: 200,
                objects: foundManagers
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'No match was found!'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!',
            errors: error
        });
    }
};

export {
    viewSingleManager,
    viewAllManagers,
    searchManagers
}