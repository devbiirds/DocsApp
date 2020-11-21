package com.docsapp.app.service;

import com.docsapp.app.aspect.Loggable;
import com.docsapp.app.model.CommentEntity;
import com.docsapp.app.model.documentEntity;
import com.docsapp.app.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private MessageRepository repository;

    @Autowired
    public CommentService(CommentRepository repository) {
        this.repository = repository;
    }

    @Loggable
    public CommentEntity getById(int id) {
        return repository.findById(id).get();
    }
    @Loggable
    public List getAll() {
        return (List) repository.findAll();
    }

    @Loggable
    public void save(CommentEntity commentModel) {
        repository.save(commentModel);
    }

    @Loggable
    public List<CommentEntity> getAllCommentBydocumentId(Integer id){
        return repository.findCommentEntityBydocumentId(id);
    }
}
