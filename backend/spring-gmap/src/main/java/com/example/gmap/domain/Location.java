package com.example.gmap.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="locations")
@NoArgsConstructor
@Getter
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String name;
    private String address;
    private double latitude;
    private double longitude;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Location(String username, String name, String address, double latitude, double longitude) {
        this.username = username;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
