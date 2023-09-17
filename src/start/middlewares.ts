import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import ExpressMongoSanitize from 'express-mongo-sanitize';

export default function (app: Application) {
  // Logging with morgan and wintons

  // Enabling cors
  app.use(cors());

  // Helment for various http headers
  app.use(helmet());

  // Setting public folder
  // app.use(express.static('public'));
  app.use(express.static('public'));

  //sanitizing the body the having mongo operators
  app.use(ExpressMongoSanitize());
  // Parsing req bodies
  app.use(bodyParser.text());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.set('view engine', 'ejs');

  //   res.render('simple', {
  //     name: 'NOman',
  //     position: 'frontend Dev',
  //     firstName: 'Abdul',
  //     lastName: 'Aziz',
  //     countryName: 'Canada',
  //     city: 'torrento',
  //     address: 'walls street san andereas',
  //     postalCode: '513102',
  //     birthPlace: 'hospital',
  //     drivingLicense: 'no license',
  //     profile:
  //       '<p>i amd a mern stack developer tried my hard to build new application and grow with comapny</p>',
  //     sectionsOrder: [],
  //     workExperiences: [
  //       {
  //         title: 'Node dev',
  //         employer: 'noman',
  //         city: 'lahore',
  //         description: 'my name is noman',
  //         position: 'node developer',
  //         reasonForResignation: 'i was afraid',
  //         _id: '635a503d87a660b8fc0ebbe9',
  //       },
  //       {
  //         title: 'Node dev',
  //         employer: 'noman',
  //         city: 'lahore',
  //         description: 'my name is noman',
  //         position: 'node developer',
  //         reasonForResignation: 'i was afraid',
  //         _id: '635a503d87a660b8fc0ebbea',
  //       },
  //       {
  //         title: 'Node dev',
  //         employer: 'noman',
  //         city: 'lahore',
  //         description: 'my name is noman',
  //         position: 'node developer',
  //         reasonForResignation: 'i was afraid',
  //         _id: '635a503d87a660b8fc0ebbeb',
  //       },
  //     ],
  //     educations: [
  //       {
  //         school: 'Node dev',
  //         degree: 'noman',
  //         city: 'lahore',
  //         description: 'my name is noman',
  //         _id: '635a503d87a660b8fc0ebbec',
  //       },
  //     ],
  //     skills: [
  //       {
  //         skill: 'coding',
  //         level: 2,
  //         _id: '635a503d87a660b8fc0ebbed',
  //       },
  //       {
  //         skill: 'Html',
  //         level: 3,
  //         _id: '635a503d87a660b8fc0ebbee',
  //       },
  //     ],
  //     hobbies: ['sports', 'horse riding'],
  //     _id: '635a503d87a660b8fc0ebbe8',
  //     courses: [],
  //     internships: [],
  //     activities: [],
  //     languages: [
  //       {
  //         language: 'sad',
  //         level: 2,
  //       },
  //     ],
  //     socialProfiles: [],
  //   });
  // });
}
