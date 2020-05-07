import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/PostData', controller.home.myInterface);
  router.get('/Category', controller.home.getTest);
  router.get('/sendEmail', controller.home.sendEmail);
  router.post('/api/communication/sendSimpleEmail', controller.communication.sendSimpleEmail);
  router.post('/api/fly/note/insert', controller.note.insert);
  router.get('/api/fly/note/getData', controller.note.getData);
  router.post('/api/communication/autoListenerWebhook', controller.communication.autoListenerWebhook);
  // router.get('/Last', controller.cilent.index.getTest);
  // router.post('/MyNumber', controller.cilent.index.myInterface);
};
