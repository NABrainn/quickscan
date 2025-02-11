package com.scanner.integration.repository;

import com.scanner.entity.Client;
import com.scanner.entity.Vendor;
import com.scanner.entity.document.Document;
import com.scanner.entity.document.Invoice;
import com.scanner.entity.document.Receipt;
import com.scanner.entity.product.InvoiceProduct;
import com.scanner.entity.product.ReceiptProduct;
import com.scanner.integration.ITBase;
import com.scanner.repository.ClientRepository;
import com.scanner.repository.VendorRepository;
import com.scanner.repository.document.DocumentRepository;
import com.scanner.repository.document.InvoiceRepository;
import com.scanner.repository.document.ReceiptRepository;
import com.scanner.repository.product.InvoiceProductRepository;
import com.scanner.utility.DocumentTestFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
class DocumentRepositoryIT extends ITBase {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private InvoiceProductRepository productRepository;

    @Autowired
    TestEntityManager entityManager;


    @Test
    void shouldAddOneReceipt() {
        Document documentToSave = DocumentTestFactory.createReceipt();

        Document savedDocument = documentRepository.save(documentToSave);
        assertThat(entityManager.find(Document.class, documentToSave.getId())).isEqualTo(savedDocument);
        assertThat(documentRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    void shouldUpdateOneInvoice() {
        Invoice documentToSave = DocumentTestFactory.createInvoice();
        entityManager.persist(documentToSave);
        documentToSave.setCurrency("USD$$$$$");
        Set<InvoiceProduct> products = new HashSet<>();
        products.add(InvoiceProduct.builder()
                .productName("orzeh")
                .measureUnit("kilo")
                .quantity(42000)
                .netWorth(6543)
                .vatRate(21)
                .vatTax(588)
                .gross(33)
                .build());
        products.add(InvoiceProduct.builder()
                .productName("smiertana")
                .measureUnit("decybel")
                .quantity(28000)
                .netWorth(653)
                .vatRate(1)
                .vatTax(8)
                .gross(93)
                .build());

        documentToSave.setProducts(products);
        Invoice savedDocument = documentRepository.save(documentToSave);
        assertThat(entityManager.find(Invoice.class, documentToSave.getId()).getCurrency()).isEqualTo(savedDocument.getCurrency());
        assertThat(entityManager.find(Invoice.class, documentToSave.getId()).getProducts()).isEqualTo(savedDocument.getProducts());
        assertThat(productRepository.findAll().size()).isEqualTo(2);
        assertThat(documentRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    void shouldAddOneInvoiceWithAll() {
        Document documentToSave = Invoice.builder()
                .invoiceNumber("847254")
                .bankAccountNumber("92836342")
                .issueDate(new Date())
                .currency("ZŁ")
                .paymentMethod("KARTA")
                .saleDate(new Date())
                .totalGross(2100)
                .totalRate(3939)
                .totalNetto(393)
                .totalTax(32)
                .products(
                        Set.of(
                            InvoiceProduct.builder()
                                    .productName("mleko")
                                    .measureUnit("gram")
                                    .quantity(22)
                                    .netWorth(1111)
                                    .vatRate(21)
                                    .vatTax(31)
                                    .gross(2421)
                                    .build()
                        )
                )
                .vendor(Vendor.builder()
                        .nip("PL123123123")
                        .name("Bob")
                        .address("Warszawa")
                        .build()
                )
                .client(Client.builder()
                        .nip("PL123123123")
                        .name("Bob")
                        .address("Warszawa")
                        .build()
                )
                .build();
        Document savedDocument = documentRepository.save(documentToSave);
        assertThat(entityManager.find(Document.class, documentToSave.getId())).isEqualTo(savedDocument);
        assertThat(productRepository.findAll().size()).isEqualTo(1);
        assertThat(invoiceRepository.findAll().size()).isEqualTo(1);
        assertThat(clientRepository.findAll().size()).isEqualTo(1);
        assertThat(vendorRepository.findAll().size()).isEqualTo(1);
        assertThat(documentRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    void shouldAddOneInvoiceOneProduct() {
        Document receiptToSave = Receipt.builder()
                .storeName("biedronka")
                .totalAmount(21.37)
                .build();
        Document savedReceipt = documentRepository.save(receiptToSave);

        Invoice invoiceToSave = DocumentTestFactory.createInvoice();
        Invoice savedInvoice = documentRepository.save(invoiceToSave);

        assertThat(entityManager.find(Document.class, invoiceToSave.getId())).isEqualTo(savedInvoice);
        assertThat(entityManager.find(Document.class, receiptToSave.getId())).isEqualTo(savedReceipt);
        assertThat(documentRepository.findAll().size()).isEqualTo(2);
        assertThat(invoiceRepository.findAll().size()).isEqualTo(1);
        assertThat(receiptRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    void shouldUpdateOneReceipt() {
        Receipt receiptToSave = Receipt.builder()
                .storeName("biedronka")
                .totalAmount(21.37)
                .build();
        entityManager.persist(receiptToSave);
        Set<ReceiptProduct> products = new HashSet<>();
        products.add(ReceiptProduct.builder()
                .productName("nazwa")
                .sumPrice(34)
                .quantity(19)
                .build());
        receiptToSave.setProducts(products);
        Document savedReceipt = documentRepository.save(receiptToSave);
        assertThat(entityManager.find(Receipt.class, receiptToSave.getId())).isEqualTo(savedReceipt);
    }

    @Test
    void shouldRemoveOneDocument() {
        Invoice documentToSave = DocumentTestFactory.createInvoice();
                documentToSave.setProducts(
                        Set.of(
                            InvoiceProduct.builder()
                                    .productName("mleko")
                                    .measureUnit("gram")
                                    .quantity(22)
                                    .netWorth(1111)
                                    .vatRate(21)
                                    .vatTax(31)
                                    .gross(2421)
                                    .build()
                        )
                );
                documentToSave.setVendor(Vendor.builder()
                        .nip("PL123123123")
                        .name("Bob")
                        .address("Warszawa")
                        .build()
                );
                documentToSave.setClient(Client.builder()
                        .nip("PL123123123")
                        .name("Bob")
                        .address("Warszawa")
                        .build()
                );
        Document savedDocument = documentRepository.save(documentToSave);
        assertThat(documentRepository.findAll().size()).isEqualTo(1);
        assertThat(receiptRepository.findAll().size()).isEqualTo(0);
        assertThat(invoiceRepository.findAll().size()).isEqualTo(1);
        assertThat(vendorRepository.findAll().size()).isEqualTo(1);
        assertThat(clientRepository.findAll().size()).isEqualTo(1);

        documentRepository.delete(savedDocument);
        assertThat(documentRepository.findAll().size()).isEqualTo(0);
        assertThat(receiptRepository.findAll().size()).isEqualTo(0);
        assertThat(invoiceRepository.findAll().size()).isEqualTo(0);
        assertThat(vendorRepository.findAll().size()).isEqualTo(0);
        assertThat(clientRepository.findAll().size()).isEqualTo(0);
    }

    @Test
    void shouldAddTenDocuments() {
        for (int i = 0; i < 5; i++) {
            Invoice invoice = DocumentTestFactory.createInvoice();
            Receipt receipt = DocumentTestFactory.createReceipt();

            entityManager.persist(invoice);
            entityManager.persist(receipt);
        }
        assertThat(invoiceRepository.findAll().size()).isEqualTo(5);
        assertThat(receiptRepository.findAll().size()).isEqualTo(5);
        assertThat(documentRepository.findAll().size()).isEqualTo(10);
    }
}