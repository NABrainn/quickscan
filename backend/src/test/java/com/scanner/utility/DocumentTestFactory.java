package com.scanner.utility;

import com.scanner.entity.document.Invoice;
import com.scanner.entity.document.Receipt;

import java.util.Date;

public class DocumentTestFactory {
    public static Invoice createInvoice() {
        return Invoice.builder()
                .invoiceNumber("847254")
                .bankAccountNumber("93836")
                .issueDate(new Date())
                .currency("ZŁ")
                .paymentMethod("KARTA")
                .saleDate(new Date())
                .totalGross(2100)
                .totalRate(3939)
                .totalNetto(393)
                .totalTax(32)
                .build();
    }

    public static Receipt createReceipt() {
        return Receipt.builder()
                .storeName("biedronka")
                .totalAmount(21.37)
                .build();
    }


}
