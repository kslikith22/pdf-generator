import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { User } from 'src/users/schema/user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PdfService {
  constructor(private readonly userService: UsersService) {}

  async generateUserPdf(id: string): Promise<Buffer> {
    const user: User = await this.userService.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {});

    doc.fontSize(25).text(`User Details`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Phone Number: ${user.phone}`);
    doc.text(`Address: ${user.address}`);
    doc.end();

    return new Promise((resolve, reject) => {
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      doc.on('error', reject);
    });
  }
}
