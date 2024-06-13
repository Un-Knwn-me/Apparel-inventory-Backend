const { Color } = require("../models/");

exports.createColor = async (req, res) => {
  try {
    const { colorName } = req.body;

    // check validate input
    if (!colorName) {
      return res.status(400).json({ error: "Color Name is required" });
    }

    // Create the new Brand
    const color = await Color.create({ colorName });

    res.status(201).json(color);
  } catch (error) {
    console.error("Error creating color:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the color" });
  }
};

exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.status(200).json(colors);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the colors" });
  }
};

exports.getColorById = async (req, res) => {
  try {
    const color = await Color.findByPk(req.params.id);
    if (color) {
      res.status(200).json(color);
    } else {
      res.status(404).json({ error: "Color not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Color" });
  }
};

exports.updateColor = async (req, res) => {
  try {
    const [updated] = await Color.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedColor = await Color.findByPk(req.params.id);
      res.status(200).json(updatedColor);
    } else {
      res.status(404).json({ error: "Color not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the color" });
  }
};

exports.deleteColor = async (req, res) => {
  try {
    const deleted = await Color.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Color not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the color" });
  }
};
