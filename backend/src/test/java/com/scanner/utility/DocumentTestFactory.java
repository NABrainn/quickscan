package com.scanner.utility;

import com.scanner.entity.Client;
import com.scanner.entity.Vendor;
import com.scanner.entity.document.Invoice;
import com.scanner.entity.document.Receipt;
import com.scanner.entity.product.InvoiceProduct;

import java.util.*;

public class DocumentTestFactory {
    public static Invoice createInvoice() {
        return Invoice.builder()
                .invoiceNumber("847254")
                .bankAccountNumber("93836")
                .issueDate("today")
                .currency("ZŁ")
                .paymentMethod("KARTA")
                .saleDate("tomorrow")
                .totalGross("2100")
                .totalRate("3939")
                .totalNetto("393")
                .totalTax("32%")
                .build();
    }

    public static Invoice createInvoiceWithMappings() {
        Set<InvoiceProduct> products = new HashSet<>();
        products.add(
                InvoiceProduct.builder()
                        .productName("smiertana")
                        .measureUnit("decybel")
                        .quantity("28000")
                        .netWorth("653")
                        .vatRate("1")
                        .vatTax("8%")
                        .gross("93")
                        .build()
        );
        Invoice invoice = createInvoice();
        invoice.setClient(Client.builder()
                .nip("PL123123123")
                .name("odbiorca")
                .address("Warszawa")
                .build()
        );
        invoice.setProducts(products);
        invoice.setVendor(Vendor.builder()
                .nip("PL123123123")
                .name("sprzedawca")
                .address("Gdańsk")
                .build());
        return invoice;
    }

    public static Receipt createReceipt() {
        return Receipt.builder()
                .storeName("biedronka")
                .totalAmount("21.37")
                .build();
    }

    public static List<Invoice> createTenInvoices() {
        List<Invoice> invoices = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Invoice document = createInvoice();
            invoices.add(document);
        }
        return invoices;
    }

    public static List<Receipt> createTenReceipts() {
        List<Receipt> receipts = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Receipt document = createReceipt();
            receipts.add(document);
        }
        return receipts;
    }


}
