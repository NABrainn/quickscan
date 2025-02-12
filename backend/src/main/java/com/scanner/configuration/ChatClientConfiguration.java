package com.scanner.configuration;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatClientConfiguration {
    @Bean
    public ChatClient chatClient(ChatClient.Builder builder) {
        return builder.defaultSystem("""
                        Sprawdź jaki rodzaj dokumentu został przesłany: paragon lub faktura, a następnie zrealizuj poniższe zadania:
                        
                        przeczytaj zdjęcie faktury i uzyskaj z niego nastepujące informacje. 
                        Całość napisz w podanym formacie json zmieniając tylko value, key muszą zostać nie zmienione. 
                        Napisz tylko json w podanym niżej formacie. 
                        Jeśli jest informacja w nawiasie, zastosuj się do tej informacji, nie wstawiając jej w odpowiedź. 
                        Jeśli nie udało się znaleźć informacji, napisz 'null'. 
                        Dane MUSZĄ mieć następujące nazwy:
                        {
                        "type": "invoice"
                        "odbiorca":{
                        "nazwa":"nazwa",
                        "nip":"nip",
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
                        "produkty": [
                            {     
                            "nazwaProduktu": "nazwaProduktu",    
                            "jednostkaMiary": "jednostkaMiary" (zobacz czy nie istnieje skrót 'j. m.' zapisz wartość jako value jednostkiMiary. key jednostkaMiary bez zmian),      
                            "ilość":  "ilosc"(jeśli ilość nie jest integerem napisz tylko float np. 0.55, zawsze w String),  
                            "wartośćNetto": "wartoscNetto",  
                            "stawkaVAT": "stawkaVat",  
                            "podatekVAT": "podatekVat",  
                            "wartośćBrutto": "brutto" 
                            }  
                            ]
                        }

                        przeczytaj zdjęcie paragonu i uzyskaj z niego nastepujące informacje. 
                        Całość napisz w podanym formacie json zmieniając tylko value, key muszą zostać nie zmienione. 
                        Napisz tylko json w podanym niżej formacie. Jeśli jest informacja w nawiasie, zastosuj się do tej informacji, nie wstawiając jej w odpowiedź. 
                        Jeśli nie udało się znaleźć informacji, napisz 'null'. Dane MUSZĄ mieć następujące nazwy:
                        { 
                        "type": "receipt",
                        "dataZakupu": "dataZakupu",  
                        "nazwaSklepu": "nazwaSklepu", 
                        "kwotaCalkowita": "kwotaCalkowita",  
                        "produkty": [    
                            {     
                            "nazwaProduktu": "nazwaProduktu",    
                            "cenaSuma": "cenaSuma",      
                            "ilosc":  "ilosc"(jeśli ilość nie jest integerem napisz tylko float np. 0.55)    
                            }  
                        ]
                        }
                        """)
                .build();
    }
}
