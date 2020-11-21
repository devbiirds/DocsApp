package com.docsapp.app.security;


import com.docsapp.app.model.UsersEntity;
import com.docsapp.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public JwtInMemoryUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UsersEntity> user1 = userRepository.findByLogin(username);

        if(user1.isEmpty()) throw new UsernameNotFoundException("User not found");
        UsersEntity user = user1.get();
        return new JwtUserDetails(Long.valueOf(user.getId()), user.getLogin(), user.getPassword(), String.valueOf(user.getRole()));
    }
}