const express = require('express');
const router = express.Router();

const article = require('./ArticleRoutes');
const category = require('./CategoryRoutes');
const comment = require('./CommentRoutes');
const destination = require('./DestinationRoutes');
const picture = require('./PictureRoutes');
const plan = require('./PlanRoutes');
const site = require('./SiteRoutes');
const user = require('./UserRoutes');

router.use('/articles', article);
router.use('/categorys', category);
router.use('/comments', comment);
router.use('/destinations', destination);
router.use('/pictures', picture);
router.use('/plans', plan);
router.use('/sites', site);
router.use('/users', user);
