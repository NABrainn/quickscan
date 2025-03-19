package com.scanner.configuration;

import io.github.amithkoujalgi.ollama4j.core.OllamaAPI;
import io.github.amithkoujalgi.ollama4j.core.exceptions.OllamaBaseException;
import io.github.amithkoujalgi.ollama4j.core.models.OllamaResult;
import io.github.amithkoujalgi.ollama4j.core.models.chat.OllamaChatMessageRole;
import io.github.amithkoujalgi.ollama4j.core.models.chat.OllamaChatRequestBuilder;
import io.github.amithkoujalgi.ollama4j.core.models.chat.OllamaChatRequestModel;
import io.github.amithkoujalgi.ollama4j.core.models.chat.OllamaChatResult;
import io.github.amithkoujalgi.ollama4j.core.types.OllamaModelType;

import io.github.amithkoujalgi.ollama4j.core.utils.OptionsBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.util.List;

@Configuration
public class ChatClientConfiguration {
    @Bean
    public OllamaAPI ollamaAPIConfig() throws OllamaBaseException, IOException, URISyntaxException, InterruptedException {
        OllamaAPI ollamaAPI = new OllamaAPI("http://localhost:11434");
        ollamaAPI.setRequestTimeoutSeconds(20);
        ollamaAPI.pullModel(OllamaModelType.LLAVA);
        return ollamaAPI;

    }
}
