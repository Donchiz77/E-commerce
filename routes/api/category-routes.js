const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const cat = await Category.findAll({
      include: [{ model: Product }],
     });
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cat = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!cat) {
      res.status(404).json({ message: "No Category found. :[" });
      return;
    }
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const cat = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!cat) {
      res.status(404).json({ message: "No category found. :[" });
      return;
    }

    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!cat) {
      res.status(404).json({ message: "No category found.:[" });
      return;
    }

    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }});

module.exports = router;
