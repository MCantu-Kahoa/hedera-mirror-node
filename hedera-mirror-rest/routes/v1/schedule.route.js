const {Router} = require('@awaitjs/express');
const {ScheduleController} = require('../../controllers');

const router = Router();
const resource = 'schedules';

router.getAsync(`/`, ScheduleController.getSchedules);
router.getAsync(`/:scheduleId`, ScheduleController.getScheduleById);

module.exports = {
  resource,
  router,
};
