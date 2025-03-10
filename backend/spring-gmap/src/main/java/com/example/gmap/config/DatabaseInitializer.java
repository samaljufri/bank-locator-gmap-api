package com.example.gmap.config;

import com.example.gmap.domain.Location;
import com.example.gmap.domain.LocationRepository;
import com.example.gmap.domain.User;
import com.example.gmap.domain.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Configuration
@AllArgsConstructor
public class DatabaseInitializer {
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initData() {
        List<User> users = new ArrayList<>();
        if (userRepository.count() == 0) {
            IntStream.range(1, 4).forEach(i -> {
                users.add(new User("user" + i,
                        passwordEncoder.encode("user" + i)));
            });
            userRepository.saveAll(users);
        }

        if (locationRepository.count() == 0 ) {
            Location loc1 = new Location("user1", "Maybank Tower", "100, Jalan Tun Perak, Bukit Bintang, 50050 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur", 3.147507354939186, 101.69956122750533);
            locationRepository.save(loc1);
            Location loc2 = new Location("user2", "RHB Center", "1/68f, Jln Tun Razak, Titiwangsa, 50450 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur", 3.1442606042477075,  101.723039497265);
            locationRepository.save(loc2);
        }
    }


}
