package com.docsapp.app.controller;

import com.docsapp.app.Repository.DocumentRepository;
import com.docsapp.app.model.Document;
import com.docsapp.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.print.Doc;
import java.util.Map;


@Controller
public class MainController {
    @Autowired
    private DocumentRepository documentRepository;

    @GetMapping("/")
    public String greeting(Map<String, Object> model) {
        return "start";
    }

    @GetMapping("/main")
    public String main(@RequestParam(required = false, defaultValue = "") String filter, Model model) {
        Iterable<Document> documents = documentRepository.findAll();

        if (filter != null && !filter.isEmpty()) {
            documents = documentRepository.findByTitle(filter);
        } else {
            documents = documentRepository.findAll();
        }

        model.addAttribute("documents", documents);
        model.addAttribute("filter", filter);

        return "main";
    }

    @PostMapping("/main")
    public String add(
            @RequestParam String title,
            @RequestParam String description, Map<String, Object> model
    ) {
        Document document = new Document(title, description);

        documentRepository.save(document);

        Iterable<Document> documents = documentRepository.findAll();

        model.put("documents", documents);

        return "main";
    }

}
