package com.docsapp.app.Repository;

import com.docsapp.app.model.Document;
import com.docsapp.app.model.Message;
import com.docsapp.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, Long> {
    List<Message> getAllCommentBydocumentId(Integer DocumentId);
    Message findById(Integer messageId);
    
}
