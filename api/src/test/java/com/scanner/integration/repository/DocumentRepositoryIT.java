package com.scanner.integration.repository;

import com.scanner.entity.Client;
import com.scanner.entity.Vendor;
import com.scanner.entity.document.Document;
import com.scanner.entity.document.Invoice;
import com.scanner.entity.document.Receipt;
import com.scanner.entity.product.InvoiceProduct;
import com.scanner.entity.product.ReceiptProduct;
import com.scanner.integration.IntegrationTestBase;
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

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
class DocumentRepositoryIT extends IntegrationTestBase {

}