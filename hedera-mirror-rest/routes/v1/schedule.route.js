import {Router} from '@awaitjs/express';
import {ScheduleController} from '../../controllers/index.js';

const router = Router();
const resource = 'schedules';

router.getAsync(`/`, ScheduleController.getSchedules);
router.getAsync(`/:scheduleId`, ScheduleController.getScheduleById);

export {
  resource,
  router,
};
