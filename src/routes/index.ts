import { Router } from 'express';
import { authRouting, newsRouting, genresRouting, booksRouting, uploadRouting, authorsRouting, categoriesRouting, usersRouting } from './api';

const router = Router();

router.use('/auth', authRouting);
router.use('/users', usersRouting);
router.use('/genres', genresRouting);
router.use('/books', booksRouting);
router.use('/upload', uploadRouting);
router.use('/authors', authorsRouting);
router.use('/category', categoriesRouting);
router.use('/news', newsRouting);

export default router;