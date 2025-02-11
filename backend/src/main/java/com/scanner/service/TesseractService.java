package com.scanner.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;

@Service
public class TesseractService {

    private final Tesseract tesseract;

    @Autowired
    public TesseractService(Tesseract tesseract) {
        this.tesseract = tesseract;
    }

    public String doOCR(BufferedImage bi) throws TesseractException {
        return tesseract.doOCR(bi);
    }
}
