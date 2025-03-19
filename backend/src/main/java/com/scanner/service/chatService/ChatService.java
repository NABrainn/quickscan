package com.scanner.service.chatService;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;


import java.util.Objects;

import static com.scanner.utility.StringUtils.jsonFromText;

@RequiredArgsConstructor
@Service
public class ChatService {
    private final ChatClient chatClient;

    public String generateContent(String message, ContentType type) {
        String content =  chatClient.prompt().user(message).call().content();
        if (Objects.requireNonNull(type) == ContentType.JSON) {
            return jsonFromText(content);
        }
        return null;
    }
}
