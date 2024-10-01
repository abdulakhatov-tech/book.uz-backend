import { Router } from 'express';
import { getNewAgeLibraryBooks, getNewlyArrivedBooks, getRecentlyPublishedBooks } from '../../../controller/categories';

const router = Router();

router.get('/new-age-library', getNewAgeLibraryBooks);
router.get('/recently-published', getRecentlyPublishedBooks);
router.get('/newly-arrived', getNewlyArrivedBooks);

export default router;