import { Router } from 'express';
import { verifyToken } from '../../../middlewares/verifyToken';
import { verifyRoles } from '../../../middlewares/verifyRole';
import { deleteUserById, demoteAdminToUser, getAllUsers, getUserByI, promoteUserToAdmin, updateUserById } from '../../../controller/users';

const router = Router();

// user 
router.get('/', verifyToken, getAllUsers);
router.get('/:userId', verifyToken, getUserByI);
router.put('/:userId', verifyToken, updateUserById);
router.delete('/:userId', verifyToken, verifyRoles('admin', 'owner'), deleteUserById);


// user | admin promotion
router.put('/promote/:userId', verifyToken, verifyRoles('admin', 'owner'), promoteUserToAdmin);
router.put('/demote/:userId', verifyToken, verifyRoles('owner'), demoteAdminToUser);

export default router;