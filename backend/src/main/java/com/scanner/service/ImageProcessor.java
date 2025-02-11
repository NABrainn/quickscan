package com.scanner.service;

import org.imgscalr.Scalr;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.awt.image.BufferedImage;

@Component
public class ImageProcessor {

    public BufferedImage resizeImage(BufferedImage image, double multiplier) {
        return Scalr.resize(image, Scalr.Method.ULTRA_QUALITY, (int) (image.getWidth() * multiplier));
    }

    public BufferedImage greyscaleImage(BufferedImage coloredImage) {
        BufferedImage gsImage = new BufferedImage(coloredImage.getWidth(), coloredImage.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
        Graphics graphics = gsImage.getGraphics();
        graphics.drawImage(coloredImage, 0, 0, null);
        graphics.dispose();
        return gsImage;
    }
}
