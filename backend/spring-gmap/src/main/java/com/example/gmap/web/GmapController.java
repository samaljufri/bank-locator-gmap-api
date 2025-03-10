package com.example.gmap.web;

import com.example.gmap.domain.Location;
import com.example.gmap.domain.LocationService;
import com.example.gmap.domain.UserRepository;
import com.example.gmap.domain.dto.LocationDto;
import com.example.gmap.domain.dto.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class GmapController {
    private final LocationService locationService;
    private final UserRepository userRepository;

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return userRepository.findAll()
                .stream().map(user -> new UserDto(user.getUsername())).toList();
    }

    @GetMapping("/locations")
    public List<Location> getLocations(@AuthenticationPrincipal UserDetails user) {
        return locationService.getLocations(user.getUsername());
    }

    @PostMapping("/locations")
    public Location addLocation(@AuthenticationPrincipal UserDetails user,
                                @RequestBody LocationDto locationDto) {
        return locationService.addLocation(user.getUsername(), locationDto);
    }
}
