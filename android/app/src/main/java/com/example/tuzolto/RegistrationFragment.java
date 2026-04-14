package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.google.android.material.textfield.TextInputEditText;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegistrationFragment extends Fragment {

    private TextInputEditText etName, etEmail, etPassword, etPasswordConfirm;
    private CheckBox cbIsAdmin, cbFortyHours;
    private Button btnRegister;
    private ApiService apiService;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_registration, container, false);

        etName = view.findViewById(R.id.etRegName);
        etEmail = view.findViewById(R.id.etRegEmail);
        etPassword = view.findViewById(R.id.etRegPassword);
        etPasswordConfirm = view.findViewById(R.id.etRegPasswordConfirm);
        cbIsAdmin = view.findViewById(R.id.cbRegIsAdmin);
        cbFortyHours = view.findViewById(R.id.cbRegFortyHours);
        btnRegister = view.findViewById(R.id.btnSubmitRegistration);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        btnRegister.setOnClickListener(v -> submitRegistration());

        return view;
    }

    private void submitRegistration() {
        String name = etName.getText().toString();
        String email = etEmail.getText().toString();
        String password = etPassword.getText().toString();
        String confirm = etPasswordConfirm.getText().toString();
        int isAdmin = cbIsAdmin.isChecked() ? 1 : 0;
        int fortyHours = cbFortyHours.isChecked() ? 1 : 0;

        if (name.isEmpty() || email.isEmpty() || password.isEmpty() || confirm.isEmpty()) {
            Toast.makeText(getContext(), "Kérjük töltsön ki minden mezőt!", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!password.equals(confirm)) {
            Toast.makeText(getContext(), "A jelszavak nem egyeznek!", Toast.LENGTH_SHORT).show();
            return;
        }

        RegisterRequest request = new RegisterRequest(name, email, password, confirm, isAdmin, fortyHours);

        apiService.register(request).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(getContext(), "Sikeres regisztráció!", Toast.LENGTH_SHORT).show();
                    etName.setText("");
                    etEmail.setText("");
                    etPassword.setText("");
                    etPasswordConfirm.setText("");
                    cbIsAdmin.setChecked(false);
                    cbFortyHours.setChecked(false);
                } else {
                    Toast.makeText(getContext(), "Sikeres regisztráció!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(getContext(), "Hálózati hiba!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}