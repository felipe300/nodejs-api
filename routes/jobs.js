import express from 'express'
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobs.js'

const router = express.Router()

router.get('/', getAllJobs)
router.get('/:id', getJob)
router.post('/', createJob)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)

export default router
