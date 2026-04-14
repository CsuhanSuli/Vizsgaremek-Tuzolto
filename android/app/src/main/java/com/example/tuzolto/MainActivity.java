package com.example.tuzolto;

import android.content.pm.ActivityInfo;
import android.os.Bundle;

import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.material.textfield.TextInputEditText;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);


        TextInputEditText emailInput = findViewById(R.id.EmailAddress);
        TextInputEditText passwordInput = findViewById(R.id.Password);
        Button loginBtn = findViewById(R.id.Login);

        loginBtn.setOnClickListener(v -> {
            String email = emailInput.getText().toString();
            String password = passwordInput.getText().toString();

            RetrofitClient.clearClient();
            ApiService api = RetrofitClient.getClient(MainActivity.this).create(ApiService.class);
            LoginRequest request = new LoginRequest(email, password);

            api.login(request).enqueue(new Callback<LoginResponse>() {
                @Override
                public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        String token = response.body().token;

                        if (token != null) {
                            SharedPreferences prefs = getSharedPreferences("app", MODE_PRIVATE);
                            prefs.edit()
                                .putString("token", token)
                                .putBoolean("isAdmin", response.body().user.isAdmin == 1)
                                .apply();

                            Toast.makeText(MainActivity.this, "Sikeres bejelentkezés!", Toast.LENGTH_SHORT).show();


                            Intent intent = new Intent(MainActivity.this, MainPageActivity.class);
                            startActivity(intent);
                            finish();
                        }

                    } else {
                        Toast.makeText(MainActivity.this, "Hibás adatok", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<LoginResponse> call, Throwable t) {
                    Toast.makeText(MainActivity.this, "Hálózati hiba", Toast.LENGTH_SHORT).show();
                }
            });
        });

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}