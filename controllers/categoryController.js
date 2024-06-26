const { Category } = require("../models/");

exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    // check validate input
    if (!categoryName) {
      return res.status(400).json({ error: "Category Name is required" });
    }

    // Create the new Brand
    const category = await Category.create({ categoryName });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the category" });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the category" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the category" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.destroy({ where: { id: req.params.id } });
    if (category) {
      res.status(202).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Category" });
  }
};
