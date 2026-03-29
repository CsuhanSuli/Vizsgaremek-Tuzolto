package com.example.tuzolto;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {
    @POST("user/login")
    Call<LoginResponse> login(@Body LoginRequest request);
}
