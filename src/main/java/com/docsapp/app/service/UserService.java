package com.docsapp.app.service;

import com.docsapp.app.aspect.Loggable;
import com.docsapp.app.model.CommentEntity;
import com.docsapp.app.model.UsersEntity;
import com.docsapp.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

@Loggable
    public Optional<UsersEntity> findByLogin(String name) {
        return Optional.of(repository.findByLogin(name).get());
    }

    @Loggable
    public UsersEntity getById(int id) {
        return repository.findById(id).get();
    }

    @Loggable
    public UsersEntity findByNameAndPassword(String name, String pass) {
        return repository.findByLoginAndPassword(name, pass).get();
    }

    @Loggable
    public List getAll() {
        return (List) repository.findAll();
    }

    @Loggable
    public void save(UsersEntity userModel) {
        userModel.setRole(0);
        userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));
        repository.save(userModel);
    }
}
