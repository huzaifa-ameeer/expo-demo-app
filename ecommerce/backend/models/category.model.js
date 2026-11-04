import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "grid-outline",
      trim: true,
    },
  },
  { timestamps: true }
)

const Category = mongoose.model("Category", categorySchema)

export default Category
