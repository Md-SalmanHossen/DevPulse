import express from 'express';
import *as issueController from '../issue/issue.controller'
import auth from '../../middlewares/auth.middleware';
import authorize from '../../middlewares/authorize.middleware';

const router = express.Router();

router.post('/', auth, issueController.createIssue);
router.get('/', issueController.getAllIssues);
router.get('/:id', auth, issueController.getSingleIssues);
router.put('/:id', auth, issueController.updateIssue);
router.delete('/:id', auth, authorize('maintainer'), issueController.deleteIssues);

export default router;