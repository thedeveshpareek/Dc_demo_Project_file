package com.multipixeltec.dcservice.util;

import com.multipixeltec.dcservice.model.User;
import com.multipixeltec.dcservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;


    @Override
    public AppUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userService.findByEmail(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User " + username + " not found");
        }
        return new AppUserDetails(user.get());
    }
}
