package com.scanner.configuration;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatClientConfiguration {
    @Bean
    public ChatClient chatClient(ChatClient.Builder builder) {
        return builder.defaultSystem("""
                        Twoim zadaniem jest skanowanie paragonów. Każdy paragon zamieniaj na JSON w podanym formacie:
                        { 
                        "dataZakupu": "dataZakupu",  
                        "nazwaSklepu": "nazwaSklepu", 
                        "kwotaCalkowita": "kwotaCalkowita",  
                        "produkty": [    
                            {     
                                "nazwaProduktu": "nazwaProduktu",    
                                "cenaSuma": "cenaJednostkowa",      
                                "ilosc": "ilosc" (jeśli ilość nie jest integerem napisz tylko float np. 0.55)    
                            }  
                        ]
                    }
                        """)
                .build();
    }
}
