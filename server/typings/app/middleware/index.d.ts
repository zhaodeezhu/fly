// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportImpose from '../../../app/middleware/impose';
import ExportResponse from '../../../app/middleware/response';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    impose: typeof ExportImpose;
    response: typeof ExportResponse;
  }
}
