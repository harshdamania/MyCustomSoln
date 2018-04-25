'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const spsync = require('gulp-spsync-creds').sync;

const environmentInfo = {
  "username": "sp_farmadmin@postennorgeorg.onmicrosoft.com",
  "password": "pass#123",
  "tenant": "postennorgeorg",
  "cdnSite": "sites/MyLinkV1",
  "cdnLib": "CDN/Webpart"
}

build.task('upload-to-sharepoint', {
  execute: (config) => {
    environmentInfo.username = config.args['username'] || environmentInfo.username;
    environmentInfo.password = config.args['password'] || environmentInfo.password;
    environmentInfo.tenant = config.args['tenant'] || environmentInfo.tenant;
    environmentInfo.cdnSite = config.args['cdnsite'] || environmentInfo.cdnSite;
    environmentInfo.cdnLib = config.args['cdnlib'] || environmentInfo.cdnLib;

    return new Promise((resolve, reject) => {
      const deployFolder = require('./config/copy-assets.json');
      const folderLocation = `./${deployFolder.deployCdnPath}/**/*.*`;

      return gulp.src(folderLocation)
        .pipe(spsync({
          "username": environmentInfo.username,
          "password": environmentInfo.password,
          "site": `https://${environmentInfo.tenant}.sharepoint.com/${environmentInfo.cdnSite}`,
          "libraryPath": environmentInfo.cdnLib,
          "publish": true
        }))
        .on('finish', resolve);
    });
  }
});