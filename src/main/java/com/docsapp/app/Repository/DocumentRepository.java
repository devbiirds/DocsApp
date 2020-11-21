package com.docsapp.app.Repository;

import com.docsapp.app.model.Document;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DocumentRepository extends CrudRepository<Document, Long> {
    List<Document> findByTitle(String title);

    Document findById(Integer documentId);
    List<Document> getByAuthor(Id authorId);

    List<Document> getByDescription(String description)
}
