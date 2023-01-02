const ReportController = require('../controllers/report_controller')
const UtilsController = require('../controllers/utils_controller')
const MainviewController = require('../controllers/mainview_controller')
const AuthController = require('../controllers/auth_controller')
const middlewareAuth = require('../middleware/auth')

const Router = require('express-group-router');
let router = new Router();

router.group([middlewareAuth.isLoginAuthorized], (router) => {
  router.get('/login', AuthController.viewLogin)
  router.post('/doLogin', AuthController.doLogin)
  router.get('/doLogout', AuthController.doLogout)
})

router.group([middlewareAuth.isAuthorized], (router) => {
  router.get('/', MainviewController.viewHome);
  router.get('/set_language', UtilsController.setLanguage);

  router.post('/getLocation', UtilsController.getLocation);
  router.post('/getCustomer', UtilsController.getCustomer);



  router.group('/report', (router) => {
    router.get('/handlingin', MainviewController.viewInbound);
    router.get('/handlingout', MainviewController.viewOutbound);
    router.get('/inventoryblc', MainviewController.viewInventory);

    router.post('/sn_data', ReportController.getSnData);
    router.post('/handlingin_data', ReportController.getHandlinginData);
    router.post('/handlingin_detail_data', ReportController.getExportHandlinginDataDetail);

    router.post('/handlingout_data', ReportController.getHandlingoutData);
    router.post('/handlingout_detail_data', ReportController.getExportHandlingoutDataDetail);

    router.post('/inventory_data', ReportController.getInventoryData);
    router.get('/inventory_data_to_database', ReportController.getInventoryDataToDatabase);
  })
});
// define the home page route

let listRoutes = router.init();
module.exports = listRoutes;