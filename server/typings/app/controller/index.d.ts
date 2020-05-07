// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCommunication from '../../../app/controller/communication';
import ExportHome from '../../../app/controller/home';
import ExportNote from '../../../app/controller/note';

declare module 'egg' {
  interface IController {
    communication: ExportCommunication;
    home: ExportHome;
    note: ExportNote;
  }
}
