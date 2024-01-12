const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const validator = require("./validator");

const Form = require("../model/Form");

router.post("", validator.createForm, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    let form = await Form.findOne({
      title: req.body.title,
    });
    if (form) {
      return res.status(400).json({
        msg: "Form Already Exists",
      });
    }

    form = new Form({
      ...req.body,
    });

    await form.save();

    res.status(200).json({
      message: "Form created in the database",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
});

router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    if (!forms?.length) return res.status(404).send("Not found any forms");
    res.json(forms);
  } catch (e) {
    res.send({ message: "Error in Fetching forms" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).send("Form does not exists.");
    res.json(form);
  } catch (e) {
    res.send({ message: "Error in Fetching form" });
  }
});

router.put("/:id", validator.updateForm, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form)
      return res.status(404).json({
        message: "Form does Not Exist",
      });

    const isExist = await Form.findOne({
      title: req.body.title,
      _id: { $ne: req.params.id },
    });
    if (isExist)
      return res.status(404).json({
        message: "Form already Exist",
      });
    await form.set({ ...req.body }).save();
    res.status(200).json({
      message: "Form updated successfully.",
    });
  } catch (e) {
    res.status(500).send("Error in updating the form");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form)
      return res.status(404).json({
        message: "Form does Not Exist",
      });
    await form.delete();
    res.status(200).json({
      message: "Form deleted successfully.",
    });
  } catch (error) {
    res.status(500).send("Error in deleting the form");
  }
});

module.exports = router;
