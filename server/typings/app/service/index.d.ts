// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportNote from '../../../app/service/note';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    note: ExportNote;
  }
}
