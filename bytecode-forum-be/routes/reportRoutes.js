const express = require('express');
const router = express.Router();
const Report = require('../models/ReportModel');

// Report a post
router.post('/post', async (req, res) => {
  try {
    const { postId, userId, reason } = req.body;

    const newReport = new Report({
      postId,
      userId,
      reason,
      type: 'post',
      date: new Date(),
      status: 'pending', // Default report status
    });

    await newReport.save();
    res.status(201).json({ message: 'Post reported successfully', report: newReport });
  } catch (err) {
    res.status(500).json({ message: 'Error reporting post', error: err.message });
  }
});

// Report a user
router.post('/user', async (req, res) => {
  try {
    const { reportedUserId, userId, reason } = req.body;

    const newReport = new Report({
      reportedUserId,
      userId,
      reason,
      type: 'user',
      date: new Date(),
      status: 'pending', // Default report status
    });

    await newReport.save();
    res.status(201).json({ message: 'User reported successfully', report: newReport });
  } catch (err) {
    res.status(500).json({ message: 'Error reporting user', error: err.message });
  }
});

// Get all reports (Admin only)
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().populate('postId reportedUserId userId');

    if (!reports.length) {
      return res.status(404).json({ message: 'No reports found' });
    }

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports', error: err.message });
  }
});

module.exports = router;
