package com.scanner.utility;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class StringUtils {
    public static String jsonFromText(String input) {

        int start = 0;
        int end = 0;
        int counter = 0;

        Scanner textScanner = new Scanner(input);
        List<String> lines =  new ArrayList<>();

        while (textScanner.hasNextLine()) {
            String next = textScanner.nextLine();
            if(next.equals("{"))
                start = counter;
            if(next.equals("}"))
                end = counter + 1;
            lines.add(next);
            counter++;
        }

        StringBuilder stringBuilder = new StringBuilder();
        List<String> jsonList = lines.subList(start, end);

        jsonList.forEach(s -> stringBuilder
                .append(s)
                .append("\n"));
        return stringBuilder.toString();
    }
}
