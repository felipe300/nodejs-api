import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company is required'],
      maxlength: [50, 'Company name must be less than 50 characters']
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      maxlength: [100, 'Position name must be less than 50 characters']
    },
    status: {
      type: String,
      enum: ['Interviewing', 'Rejected', 'Pending'],
      default: 'Pending'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'CreatedBy is required']
    }
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
