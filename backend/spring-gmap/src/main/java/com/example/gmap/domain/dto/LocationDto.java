package com.example.gmap.domain.dto;

public record LocationDto(
        String name,
        String address,
        double latitude,
        double longitude
) {
}
