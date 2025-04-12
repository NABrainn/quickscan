package com.scanner.repository;

import com.scanner.entity.user.EntityUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<EntityUser, Long> {
    Optional<EntityUser> findByUsername(String username);
    Boolean existsByUsername(String username);
}
