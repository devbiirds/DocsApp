package com.docsapp.app.controller;

import com.docsapp.app.Repository.DocumentRepository;
import com.docsapp.app.Repository.MessageRepository;
import com.docsapp.app.model.Document;
import com.docsapp.app.model.Message;
import com.docsapp.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Controller
@RequestMapping("/comments")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;
    private DocumentRepository documentRepository;

    @PostMapping
    public String addComment(
            @AuthenticationPrincipal User user,
            @RequestParam String text , Map<String, Object> model,
            @RequestParam Integer documentId
    ) {
        Document documentFind = new Document();
        Iterable<Document> documents = documentRepository.findAll();

     //   Message message = new Message(text, user, doc);

        //messageRepository.save(message);

       // Iterable<Message> messages = messageRepository.findByDocumentId(documentId);

        //model.put("messages", messages);

        return "main";
    }
    @GetMapping("{documentId}")
    public String GetComments(@PathVariable Integer documentId, Model model) {
        Iterable<Message> messages = messageRepository.findByDocumentId(documentId);

        model.addAttribute("messages", messages);
        model.addAttribute("documentId", documentId);
        return "comments";
    }
}
