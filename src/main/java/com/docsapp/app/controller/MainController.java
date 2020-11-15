package com.docsapp.app.controller;

import com.docsapp.app.Repository.DocumentRepository;
import com.docsapp.app.Repository.MessageRepository;
import com.docsapp.app.model.Document;
import com.docsapp.app.model.Message;
import com.docsapp.app.model.Role;
import com.docsapp.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.print.Doc;
import javax.validation.Valid;
import javax.xml.ws.Binding;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Controller
public class MainController {
    @Autowired
    private DocumentRepository documentRepository;

    @Value("${upload.path}")
    private String uploadPath;

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
            @Valid Document document,
            BindingResult bindingResult,
            Model model,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        if(bindingResult.hasErrors()){
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);

            model.mergeAttributes(errorsMap);
            model.addAttribute("document", document);
        }
        else{
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }

            String uuidFile = UUID.randomUUID().toString();
            String resultFilename = uuidFile + "." + file.getOriginalFilename();

            file.transferTo(new File(uploadPath + "/" + resultFilename));

            document.setFilename(resultFilename);
        }
        model.addAttribute("document",null);
        documentRepository.save(document);
        }

        Iterable<Document> documents = documentRepository.findAll();

        model.addAttribute("documents", documents);

        return "main";
    }



}
