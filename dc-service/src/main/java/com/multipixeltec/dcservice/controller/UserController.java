package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.dto.UserDto;
import com.multipixeltec.dcservice.exceptions.InvalidUserRoleException;
import com.multipixeltec.dcservice.exceptions.UserAlreadyExistException;
import com.multipixeltec.dcservice.exceptions.UserNotFoundException;
import com.multipixeltec.dcservice.model.Role;
import com.multipixeltec.dcservice.model.User;
import com.multipixeltec.dcservice.service.RoleService;
import com.multipixeltec.dcservice.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Transactional
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1")
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @PutMapping("/user")
    public User save(@RequestBody UserDto dto) throws Exception {
        Optional<User> optionalUser = userService.findByEmail(dto.getEmail());
        if (optionalUser.isPresent()) {
            throw new UserAlreadyExistException("User Already Exist in Provided Email!");
        } else {
            User user = new User();
            user.setId(dto.getId());
            user.setFirstName(dto.getFirstName());
            user.setLastName(dto.getLastName());
            user.setEmail(dto.getEmail());
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
            user.setEnabled(dto.isEnabled());
            if (dto.getRoleId() != null) {
                Optional<Role> optional = roleService.find(dto.getRoleId());
                optional.ifPresent(role -> user.setRoles(Stream.of(role).collect(Collectors.toSet())));
            } else {
                throw new InvalidUserRoleException("User Role Not Found!");
            }
            return userService.save(user);
        }
    }

    @PostMapping("/user")
    public User update(@RequestBody UserDto dto) {
        Optional<User> optionalUser = userService.findByEmail(dto.getEmail());
        if (!optionalUser.isPresent()) {
            throw new UserNotFoundException(1L);
        } else {
            User user = optionalUser.get();
            user.setId(dto.getId());
            user.setFirstName(dto.getFirstName());
            user.setLastName(dto.getLastName());
            user.setEmail(dto.getEmail());
            if (dto.getPassword() != null && !dto.getPassword().trim().isEmpty()){
                user.setPassword(passwordEncoder.encode(dto.getPassword()));
            }
            user.setEnabled(dto.isEnabled());
            if (dto.getRoleId() != null) {
                Optional<Role> optional = roleService.find(dto.getRoleId());
                optional.ifPresent(role -> user.setRoles(Stream.of(role).collect(Collectors.toSet())));
            } else {
                throw new InvalidUserRoleException("User Role Not Found!");
            }
            return userService.save(user);
        }
    }

    @GetMapping("/user/{id}")
    public Optional<User> getById(@PathVariable(value = "id") Long id) {
        Optional<User> optionalUser = userService.find(id);
        if (optionalUser.isPresent()) {
            return optionalUser;
        } else {
            throw new UserNotFoundException(id);
        }
    }

    @GetMapping("/user")
    public List<User> getAll() {
        return userService.findAll();
    }

    @DeleteMapping("/user/{id}")
    public void deleteById(@PathVariable(value = "id") Long id) {
        userService.delete(id);
    }

    @DeleteMapping("/user")
    public void deleteAll() {
        userService.deleteAll();
    }

    @GetMapping("/user/count")
    public long count() {
        return userService.count();
    }

    @PostMapping("/user/advanced")
    public PageDetails getAll(@RequestBody PageDetails page) {
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), Sort.by("id").descending());
        Page<User> agentPage;
        if (page.getText() == null || page.getText().isEmpty()) {
            agentPage = userService.findAll(pageable);
        } else {
            agentPage = userService.findAllByText(page, pageable);
        }
        List<User> content = agentPage.getContent().stream().filter(user -> !user.hasRole("SUPER_ADMIN")).collect(Collectors.toList());
        page.setData(content);
        page.setTotal(agentPage.getTotalElements());
        return page;
    }
}
