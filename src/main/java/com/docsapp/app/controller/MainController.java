package com.docsapp.app.controller;

import com.docsapp.app.Repository.DocumentRepository;
import com.docsapp.app.model.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;


@Controller
public class MainController {
    @Autowired
    private DocumentRepository docRepository;

    @GetMapping("/")
    public String start(Map<String, Object> model) {
        return "start";
    }



    @GetMapping("/main")
    public String main(@RequestParam(required = false, defaultValue = "") String filter, Model model) {
        Iterable<Document> documents = docRepository.findAll();

        if (filter != null && !filter.isEmpty()) {
            documents = docRepository.findByTitle(filter);
        } else {
            documents = docRepository.findAll();
        }

        model.addAttribute("documents", documents);
        model.addAttribute("filter", filter);

        return "main";
    }






}
