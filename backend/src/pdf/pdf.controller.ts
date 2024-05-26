import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get(':id')
  async getUserPdf(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.pdfService.generateUserPdf(id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=user_${id}.pdf`,
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}
