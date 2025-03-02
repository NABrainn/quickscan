package com.scanner.configuration;

import net.sourceforge.tess4j.Tesseract;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TesseractConfiguration {

    @Bean
    public Tesseract tesseract() {
        Tesseract tesseract = new Tesseract();
        tesseract.setLanguage("pol");
        tesseract.setDatapath("/usr/share/tesseract-ocr/5/tessdata/");
        tesseract.setVariable("user_defined_dpi", "300");
        return tesseract;
    }
}
