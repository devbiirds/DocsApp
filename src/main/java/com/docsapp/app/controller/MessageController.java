package com.docsapp.app.controller;

import com.docsapp.app.Repository.DocumentRepository;
import com.docsapp.app.Repository.MessageRepository;
import com.docsapp.app.aspect.Loggable;
import com.docsapp.app.model.Document;
import com.docsapp.app.model.Message;
import com.docsapp.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Controller
@RequestMapping("/comments")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private DocumentRepository documentRepository;


    @PostMapping
    @Loggable
    public ModelAndView addComment(
            @AuthenticationPrincipal User user,
            @RequestParam String text,
            @RequestParam Integer number , Map<String, Object> model,
            @RequestParam("documentId") Integer documentId
    ) {
        ModelAndView modelAndView = new ModelAndView("redirect:/comments/" + documentId);
        Message message = new Message(text, user, number,documentRepository.findById(documentId));

        messageRepository.save(message);

       Iterable<Message> messages = messageRepository.findByDocumentId(documentId);

        model.put("messages", messages);

        return modelAndView;
    }
    @GetMapping("{documentId}")
    public String GetComments(@PathVariable Integer documentId, Model model) {
        Iterable<Message> messages = messageRepository.findByDocumentId(documentId);
        model.addAttribute("message",new Message());
        model.addAttribute("messages", messages);
        model.addAttribute("documentId", documentId);
        return "comments";
    }
}
