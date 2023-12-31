import { Injectable } from '@angular/core';
import { Invoice } from './invoice';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InvoiceGeneration } from './invoice-generation';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }
  showInvoicePrompts = false;
  private apiUrlDev = 'https://localhost:7184'; 
  private apiBuildUrl = 'http://localhost:5000'; 
  private apiUrl = "https://invoicegeneratorapi.azurewebsites.net";
  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/api/invoices`, invoice);
  }

  fillInTemplateWithInvoice(invoiceId: number, invoiceTemplateId: number): Observable<InvoiceGeneration> {
    let invoiceGeneration: InvoiceGeneration = {
      invoiceId: invoiceId,
      invoiceTemplateId: invoiceTemplateId,
    };
    return this.http.post<InvoiceGeneration>(`${this.apiUrl}/api/excel`, invoiceGeneration);
  }


}
