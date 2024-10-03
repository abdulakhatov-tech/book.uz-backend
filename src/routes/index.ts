import { Router } from 'express';
import { authRouting, newsRouting, genresRouting, booksRouting, uploadRouting, authorsRouting, categoriesRouting, usersRouting, reviewsRouting } from './api';

const router = Router();

router.use('/auth', authRouting);
router.use('/news', newsRouting);
router.use('/users', usersRouting);
router.use('/books', booksRouting);
router.use('/genres', genresRouting);
router.use('/upload', uploadRouting);
router.use('/authors', authorsRouting);
router.use('/reviews', reviewsRouting);
router.use('/category', categoriesRouting);

export default router;