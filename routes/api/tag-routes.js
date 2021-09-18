const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ 
      incldue: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, { 
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tags) {
      res.status(404).json({ message: 'No tags found. :['});
      return;
    };
    res.status(200).json(alltags);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const alltags = await Tag.create(req.body);
    res.status(200).json(alltags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tags = await Tag.update(req.body,
      {
        where: { 
          id: req.params.id
        },
      });

      if (!tags) {
        res.status(404).json({ message:"No tag found. :[" });
        return;
      }
      res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tags = await Tag.destroy({ 
      where: { 
        id: req.params.id,
      },
    });

    if (!tags) {
      res.status(404).json({ message: "No tag found. :["});
      return;
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
