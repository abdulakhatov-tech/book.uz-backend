import { Router } from 'express';
import { createAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById } from '../../../controller/authors';
import { verifyToken } from '../../../middlewares/verifyToken';
import { verifyRoles } from '../../../middlewares/verifyRole';

const router = Router();

router.get('/', getAllAuthors);
router.get('/:authorId', getAuthorById);
router.post('/', verifyToken, verifyRoles('admin', 'owner'), createAuthor);
router.put('/:authorId', verifyToken, verifyRoles('admin', 'owner'), updateAuthorById);
router.delete('/:authorId', verifyToken, verifyRoles('admin', 'owner'), deleteAuthorById);


export default router;