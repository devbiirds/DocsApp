package com.docsapp.app.service;

import com.docsapp.app.aspect.Loggable;
import com.docsapp.app.model.documentEntity;
import com.docsapp.app.repository.documentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class documentService {

    @Autowired
    private documentRepository repository;

    @Loggable
    public List getByPage(int page, int counter) {
        Pageable pageable = PageRequest.of(page, counter);
        return repository.findAll(pageable).toList();
    }
    @Loggable
    public List getAll() {
        return (List) repository.findAll();
    }
    @Loggable

    public documentEntity getById(int id) {
        return repository.findById(id).get();
    }
    @Loggable
    public List getByTitle(String title) {
        return (List) repository.findAllByTitle(title);
    }

    @Loggable
    public List getByDescription(String description) {
        return (List) repository.findAllBydescription(genre);
    }

    @Loggable
    public List getByAuthor(Id authorId) {

        return (List) repository.findAllByAuthorId(authorId);
    }


    @Loggable
    public void save(documentEntity documentModel) {
        repository.save(documentModel);
    }
}
