import { Router } from 'express';

const router = Router();

//importer le controller index
import { indexHome } from '../controllers/index.controller'

router.route('/')
    .get(indexHome);

export default router;
