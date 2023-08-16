import { Body, Controller, Post, Res } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { ReportDataObj } from 'src/utils/types';

@Controller()
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

  @Post('/generate-report')
  async generatePDF(@Body() body, @Res() res) {
    try {
        const {reportData} = body;
      const docs = await this.pdfGeneratorService.generatePdf(reportData);
      if (docs) {
        docs.pipe(res);
        return docs;
      } else
        return res.status(408).json({
          error: true,
          message: 'Request cannot be processed at the moment.',
        });
    } catch (error) {
      console.log('ERROR: ', error);
      return res
        .status(500)
        .send({ error: true, message: 'Something went wrong on Server.' });
    }
  }
}
