package com.localcurrency.back.RequestDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LocationRequestDto {
    private double longitude;
    private double latitude;

    @Builder
    public LocationRequestDto(double longitude, double latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }
}
