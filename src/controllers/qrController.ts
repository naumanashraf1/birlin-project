import { NextFunction, Request, Response, Application } from 'express';
import ejs from 'ejs';
import path from 'path';
import { pdfMaker } from '../services/pdfGenerator';
import ErrorHandler from '../utils/ErrorHandler';
import { toDataURL } from 'qrcode';

export const generatePdf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const iteration = req.params.iteration || 10;
  const qrCodeDataUrl = await toDataURL(
    process.env.url || ('asdsad' as string)
  );

  try {
    ejs.renderFile(
      path.join(process.cwd(), 'views', 'index.ejs'),
      { qrCodeDataUrl, numDivs: iteration },
      async (err, data) => {
        if (err) {
          next(
            new ErrorHandler('problem in ejs template creation try again', 400)
          );
        } else {
          const buffer: Buffer = await pdfMaker(data, Number(42), next);

          const base64 = Buffer.from(buffer).toString('base64');
          return res.send(base64);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
