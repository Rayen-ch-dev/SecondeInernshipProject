import express from 'express';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientStats,
} from '../controllers/clientController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getClients)
  .post(createClient);

router.route('/stats')
  .get(getClientStats);

router.route('/:id')
  .get(getClientById)
  .put(updateClient)
  .delete(deleteClient);

export default router;