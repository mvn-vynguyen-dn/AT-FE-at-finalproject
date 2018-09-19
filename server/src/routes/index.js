const express = require('express');
const router = express.Router();

const articleRoute = require('./ArticleRoutes');
const categoryRoute = require('./CategoryRoutes');
const commentrRoute = require('./CommentRoutes');
const destinationRoute = require('./DestinationRoutes');
const pictureRoute = require('./PictureRoutes');
const planRoute = require('./PlanRoutes');
const siteRoute = require('./SiteRoutes');
const userRoute = require('./UserRoutes');
const loginRoute = require('./LoginRoutes');
const forgotPassword = require('./ForgotRoutes');

router.use('/articles', articleRoute);
router.use('/categorys', categoryRoute);
router.use('/comments', commentrRoute);
router.use('/destinations', destinationRoute);
router.use('/pictures', pictureRoute);
router.use('/plans', planRoute);
router.use('/sites', siteRoute);
router.use('/users', userRoute);
router.use('/login', loginRoute);
router.use('/forgot', forgotPassword);

module.exports = router;
