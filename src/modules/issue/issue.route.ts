import express from 'express';
import *as issueController from '../issue/issue.controller'
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/', auth, issueController.createIssue);
router.get('/', auth, issueController.getAllIssues);
router.get('/:id', auth, issueController.getSingleIssues);

export default router;