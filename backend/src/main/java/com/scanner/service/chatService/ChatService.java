package com.scanner.service.chatService;

import io.github.amithkoujalgi.ollama4j.core.OllamaAPI;
import io.github.amithkoujalgi.ollama4j.core.exceptions.OllamaBaseException;
import io.github.amithkoujalgi.ollama4j.core.models.OllamaResult;
import io.github.amithkoujalgi.ollama4j.core.types.OllamaModelType;
import io.github.amithkoujalgi.ollama4j.core.utils.OptionsBuilder;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


import java.io.File;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChatService {
    private final OllamaAPI ollamaAPI;

    public String generateContent(File image) throws IOException, OllamaBaseException, InterruptedException {
        OllamaResult result = ollamaAPI.generateWithImageFiles(OllamaModelType.LLAVA,
        """
            Sprawdź jaki rodzaj dokumentu został przesłany: paragon lub faktura, a następnie:

            jeżeli rodzaj dokumantu to faktura:
            przeczytaj zdjęcie faktury i uzyskaj z niego nastepujące informacje.
            Całość napisz w podanym formacie json zmieniając tylko value, key muszą zostać nie zmienione.
            Napisz tylko json w podanym niżej formacie.
            Jeśli jest informacja w nawiasie, zastosuj się do tej informacji, nie wstawiając jej w odpowiedź.
            Jeśli nie udało się znaleźć informacji, napisz 'null'.
            Dane MUSZĄ mieć następujące nazwy:
            {
                "type": "invoice" (nie zczytuj z faktury, po prostu wpisz "invoice")
                "odbiorca":{
                    "nazwa": "nazwa",
                    "nip": "nip",
                    "adres":"adres"
                },
                "sprzedawca":{
                    "nazwa":"nazwa",
                    "nip":"nip",
                    "adres":"adres"
                },
                "numerFaktury": "numerFaktury",
                "nrRachunkuBankowego": "nrRachunkuBankowego",
                "dataWystawienia": "dataWystawienia",
                "dataSprzedaży": "dataSprzedazy",
                "razemNetto": "razemNetto",
                "razemStawka": "razemStawka",
                "razemPodatek": "razemPodatek",
                "razemBrutto": "razemBrutto",
                "waluta": "waluta",
                "formaPłatności": "formaPlatnosci",
                "produkty": [   (jeśli tablica jest pusta, wpisz "[]")
                        {
                            "nazwaProduktu": "nazwaProduktu",
                            "jednostkaMiary": "jednostkaMiary" (zobacz czy nie istnieje skrót 'j. m.' zapisz wartość jako value jednostkiMiary. key jednostkaMiary bez zmian),
                            "ilość":  "ilość"(jeśli ilość nie jest integerem napisz tylko float np. 0.55, zawsze w String),
                            "wartośćNetto": "wartoscNetto",
                            "stawkaVAT": "stawkaVat",
                            "podatekVAT": "podatekVat",
                            "wartośćBrutto": "brutto"
                        }
                ]
            }

            jeżeli rodzaj dokumentu to paragon:
            przeczytaj zdjęcie paragonu i uzyskaj z niego nastepujące informacje.
            Całość napisz w podanym formacie json zmieniając tylko value, key muszą zostać nie zmienione.
            Napisz tylko json w podanym niżej formacie. Jeśli jest informacja w nawiasie, zastosuj się do tej informacji, nie wstawiając jej w odpowiedź.
            Jeśli nie udało się znaleźć informacji, napisz 'null'. Dane MUSZĄ mieć następujące nazwy:
            {
                "type": "receipt", (nie zczytuj z paragonu, po prostu wpisz "receipt")
                "dataZakupu": "dataZakupu",
                "nazwaSklepu": "nazwaSklepu",
                "kwotaCałkowita": "kwotaCałkowita",
                "produkty": [
                    {
                        "nazwaProduktu": "nazwaProduktu",
                        "cenaSuma": "cenaSuma",
                        "ilość":  "ilość"(jeśli ilość nie jest integerem napisz tylko float np. 0.55)
                    }
                ]
            }
            """,
        List.of(image),
        new OptionsBuilder()
                .build()
        );
        return result.getResponse();
    }
}
