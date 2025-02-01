const express = require('express');
const router = express.Router();
const Notification = require('../models/NotificationModel');

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Logic to create a new notification
    const newNotification = new Notification({
      userId,
      message,
      date: new Date(),
      isRead: false,  // Initially, notifications are not read
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
  } catch (err) {
    res.status(500).json({ message: 'Error creating notification', error: err.message });
  }
});

// Get notifications for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ date: -1 });

    if (!notifications.length) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
});

// Mark notification as read
router.put('/:notificationId/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.notificationId, { isRead: true }, { new: true });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ message: 'Error marking notification as read', error: err.message });
  }
});

module.exports = router;
