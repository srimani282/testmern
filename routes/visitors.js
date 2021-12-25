const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Visitor } = require("../models/visitor");
const { Entry } = require("../models/entry");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let visitor = await Visitor.findOne({ phone: req.body.phone });
  if (!visitor) return res.status(404).send(req.body.phone);

  let latestEntry = await Entry.findOne({ visitorId: visitor._id }).sort({
    createdAt: -1,
  });
  let final;
  if (!latestEntry) {
    final = await new Entry({
      visitorId: visitor._id,
    });
    final = await final.save();
    return res.send(final);
  }
  if (latestEntry.type == "In") {
    final = await new Entry({
      visitorId: visitor._id,
      type: "Out",
    });

    final = await final.save();
  } else {
    final = await new Entry({
      visitorId: visitor._id,
    });

    final = await final.save();
  }

  res.send(final);
});

router.post("/new", async (req, res) => {
  let visitor = await Visitor.findOne({ email: req.body.phone });
  if (visitor) return res.status(404).send("Visitor already exists");
  visitor = await new Visitor(req.body);
  visitor = await visitor.save();
  let entry = await new Entry({ visitorId: visitor._id });
  entry = await entry.save();
  res.send(entry);
});

module.exports = router;
