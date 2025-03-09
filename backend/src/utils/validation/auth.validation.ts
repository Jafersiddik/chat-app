import { body } from "express-validator";

export const singnInValidator = [
  body('name').notEmpty().withMessage('Name is Required')
    .trim(),

    body('password').notEmpty().withMessage('Password is required')
    .trim(),
];

export const singnUpValidator = [
    body('name').notEmpty().withMessage('Name is Required')
      .trim(),
  
      body('password').notEmpty().withMessage('Password is required')
      .trim(),
  ];
  
  
  
