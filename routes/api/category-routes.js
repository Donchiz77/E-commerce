const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  try {
    const cat = Category.findAll({
      include: [{ model: Product }],
     });
    res.status(200).json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const cat = Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!cat) {
      res.status(404).json({ message: "No Category found. :[" });
      return;
    }
    res.status(200).json(cat);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const cat = Category.create(req.body);
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const cat = Category.update(
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
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const cat = Category.destroy({
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
    console.log(err)
    res.status(500).json(err);
  }});

module.exports = router;
