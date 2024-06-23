const { OuterCartonPcs } = require('../models');

exports.createOuterCortonPcs = async (req, res) => {
    try {
      const { number_of_pcs } = req.body;
  
      // check validate input
      if (!number_of_pcs) {
        return res.status(400).json({ error: 'Outer Corton Pieces value is required' });
      }
  
    // Create the new fabric
    const outerCortonPcs = await OuterCartonPcs.create({ number_of_pcs });
  
      res.status(201).json(outerCortonPcs);
    } catch (error) {
      console.error('Error creating Outer Corton Pieces:', error);
      res.status(500).json({ error: 'An error occurred while creating the Outer Corton Pieces' });
    }
  };

exports.getAllOuterCortonPcs = async (req, res) => {
    try {
        const outerCorton = await OuterCartonPcs.findAll();
        res.status(200).json(outerCorton);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Outer Corton Pieces' });
      }
};

exports.getOuterCortonPcsById = async (req, res) => {
    try {
        const outerCorton = await OuterCartonPcs.findByPk(req.params.id);
        if (outerCorton) {
          res.status(200).json(outerCorton);
        } else {
          res.status(404).json({ error: 'Outer Corton Pieces not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Outer Corton Pieces' });
      }
}

exports.updateOuterCortonPcs = async (req, res) => {
    try {
        const [updated] = await OuterCartonPcs.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedOuterCorton = await OuterCartonPcs.findByPk(req.params.id);
          res.status(200).json(updatedOuterCorton);
        } else {
          res.status(404).json({ error: 'Outer Corton Pieces not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the Outer Corton Pieces' });
      }
}

exports.deleteOuterCortonPcs = async (req, res) => {
    try {
        const deleted = await OuterCartonPcs.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(202).json({ message: 'Outer Corton Pieces deleted successfully' });
        } else {
          res.status(404).json({ error: 'Outer Corton Pieces not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the Outer Corton Pieces' });
      }
}