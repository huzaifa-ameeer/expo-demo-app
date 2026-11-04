import Category from "../models/category.model.js"

const sendError = (res, error, fallbackMessage) => {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid category id" })
  }
  if (error.code === 11000) {
    return res.status(409).json({ message: "A category with this name already exists" })
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message })
  }
  return res.status(500).json({ message: fallbackMessage, error: error.message })
}

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 })
    res.status(200).json(categories)
  } catch (error) {
    sendError(res, error, "Failed to fetch categories")
  }
}

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }
    res.status(200).json(category)
  } catch (error) {
    sendError(res, error, "Failed to fetch category")
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body ?? {}

    if (!name) {
      return res.status(400).json({ message: "Name is required" })
    }

    const category = await Category.create({ name, icon })
    res.status(201).json(category)
  } catch (error) {
    sendError(res, error, "Failed to create category")
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { name, icon } = req.body ?? {}

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { ...(name !== undefined && { name }), ...(icon !== undefined && { icon }) },
      { new: true, runValidators: true }
    )

    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.status(200).json(category)
  } catch (error) {
    sendError(res, error, "Failed to update category")
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }
    res.status(200).json({ message: "Category deleted successfully", category })
  } catch (error) {
    sendError(res, error, "Failed to delete category")
  }
}
