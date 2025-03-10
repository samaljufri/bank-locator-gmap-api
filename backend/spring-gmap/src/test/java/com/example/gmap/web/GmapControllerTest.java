package com.example.gmap.web;

import com.example.gmap.domain.Location;
import com.example.gmap.domain.LocationService;
import com.example.gmap.domain.User;
import com.example.gmap.domain.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import static org.mockito.BDDMockito.given;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(GmapController.class)
class GmapControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockitoBean
    LocationService locationService;

    @MockitoBean
    UserRepository userRepository;

    @Test
    void givenUnauthenticatedRequest_thenReturnUnauthorizedResponse() throws Exception {
        mockMvc.perform(get("/api/locations"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user1")
    void givenAuthenticatedRequest_thenReturnLocations() throws Exception {
        String username = "user1";
        String name = "Rich Coffee";
        var location = new Location(username, name,
                "KL", 123.10, 122.1222);
        Long id = 1L;
        ReflectionTestUtils.setField(location, "id", id);
        given(locationService.getLocations(username)).willReturn(List.of(location));
        mockMvc.perform(get("/api/locations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(id))
                .andExpect(jsonPath("$[0].name").value(name));
    }

    @Test
    @WithMockUser(username = "user1")
    void givenAuthenticatedRequest_thenReturnOnlyLocationsBelongToUser() throws Exception {
        String username = "user2";
        String name = "Rich Coffee";
        var location = new Location(username, name,
                "KL", 123.10, 122.1222);
        Long id = 1L;
        ReflectionTestUtils.setField(location, "id", id);
        given(locationService.getLocations(username)).willReturn(List.of(location));
        mockMvc.perform(get("/api/locations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }
}