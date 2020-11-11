package com.docsapp.app.Repository;

import com.docsapp.app.model.Document;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DocumentRepository extends CrudRepository<Document, Long> {
    List<Document> findByTitle(String title);

    Document findById(Integer documentId);
}
