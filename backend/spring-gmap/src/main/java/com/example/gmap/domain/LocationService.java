package com.example.gmap.domain;

import com.example.gmap.domain.dto.LocationDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    public List<Location> getLocations(String username) {
        return locationRepository.findByUsername(username);
    }

    public Location addLocation(String username, LocationDto locationDto) {
        return locationRepository.save(
                new Location(username,
                        locationDto.name(), locationDto.address(),
                        locationDto.latitude(), locationDto.longitude()));
    }
}
