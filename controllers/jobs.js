import { BadRequestError, NotFoundError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
import JobsSchema from '../models/Job.js'

const getAllJobs = async (req, res) => {
  const jobs = await JobsSchema.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  )
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId }
  } = req
  const job = await JobsSchema.findOne({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new NotFoundError(`Job not found with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await JobsSchema.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position }
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Please provide company or position')
  }

  const job = await JobsSchema.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId
    },
    req.body,
    { new: true, runValidators: true }
  )

  if (!job) {
    throw new NotFoundError(`Job not found with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId }
  } = req

  const job = await JobsSchema.findOneAndRemove({
    _id: jobId,
    createdBy: userId
  })

  if (!job) {
    throw new NotFoundError(`Job not found with id ${jobId}`)
  }
  res.status(StatusCodes.OK).send()
}

export { getAllJobs, getJob, createJob, updateJob, deleteJob }
