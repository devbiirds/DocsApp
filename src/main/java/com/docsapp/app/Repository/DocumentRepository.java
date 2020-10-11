package com.docsapp.app.Repository;

import com.docsapp.app.model.Document;
import org.springframework.data.repository.CrudRepository;

public interface DocumentRepository extends CrudRepository<Document, Long> {

}
