// import Chromium from 'chrome-aws-lambda';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import puppeteer from 'puppeteer';
import { ReportDataObj } from 'src/utils/types';
import { Readable } from 'stream';

const compilePDFTemplate = async (data: any) => {
  const html = readFileSync(
    path.join(__dirname + '/../../../src/utils/templates/summary-pdf.html'),
    'utf8',
  );
  return Handlebars.compile(html)(data);
};

Handlebars.registerHelper(
  'ifCond',
  function (v1: any, operator: any, v2: any, options: any) {
    switch (operator) {
      case '==':
        //@ts-ignore
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      case '===':
        //@ts-ignore
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case '!=':
        //@ts-ignore
        return v1 != v2 ? options.fn(this) : options.inverse(this);
      case '!==':
        //@ts-ignore
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case '<':
        //@ts-ignore
        return v1 < v2 ? options.fn(this) : options.inverse(this);
      case '<=':
        //@ts-ignore
        return v1 <= v2 ? options.fn(this) : options.inverse(this);
      case '>':
        //@ts-ignore
        return v1 > v2 ? options.fn(this) : options.inverse(this);
      case '>=':
        //@ts-ignore
        return v1 >= v2 ? options.fn(this) : options.inverse(this);
      case '&&':
        //@ts-ignore
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case '||':
        //@ts-ignore
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        //@ts-ignore
        return options.inverse(this);
    }
  },
);

export class PdfGeneratorService {
  async generatePdf(data: ReportDataObj[]) {
    const browser = await puppeteer.launch({ headless: "new" });
    // Chromium.puppeteer.launch({
    //   args: Chromium.args,
    //   defaultViewport: Chromium.defaultViewport,
    //   executablePath: await Chromium.executablePath,
    //   headless: Chromium.headless,
    //   ignoreHTTPSErrors: true,
    // }); 
    const page = await browser.newPage();
    const content = await compilePDFTemplate({
      dataEntries: data,
    });
    await page.setContent(content);
    await page.emulateMediaType('print');
    const genDoc = await page.pdf({
      format: 'A4',
      scale: 0.8,
      printBackground: true,
    });
    const docs = new Readable({
      read() {
        this.push(genDoc);
        this.push(null);
      },
    });
    await browser.close();
    return docs;
  }
}
