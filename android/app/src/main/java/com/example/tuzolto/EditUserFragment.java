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
import java.util.HashMap;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditUserFragment extends Fragment {

    private TextInputEditText etName, etPassword, etPasswordConfirm;
    private CheckBox cbFortyHours, cbIsAdmin;
    private Button btnUpdate, btnCancel;
    private ApiService apiService;
    private User user;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_edit_user, container, false);

        if (getArguments() != null) {
            user = (User) getArguments().getSerializable("user");
        }

        etName = view.findViewById(R.id.etEditUserName);
        etPassword = view.findViewById(R.id.etEditUserPassword);
        etPasswordConfirm = view.findViewById(R.id.etEditUserPasswordConfirm);
        cbFortyHours = view.findViewById(R.id.cbEditFortyHours);
        cbIsAdmin = view.findViewById(R.id.cbEditIsAdmin);
        btnUpdate = view.findViewById(R.id.btnUpdateUser);
        btnCancel = view.findViewById(R.id.btnCancelEditUser);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (user != null) {
            etName.setText(user.name);
            cbFortyHours.setChecked(user.fortyHours == 1);
            cbIsAdmin.setChecked(user.isAdmin == 1);
        }

        btnUpdate.setOnClickListener(v -> submitChanges());
        btnCancel.setOnClickListener(v -> getParentFragmentManager().popBackStack());

        return view;
    }

    private void submitChanges() {
        if (user == null) return;

        String name = etName.getText().toString();
        String password = etPassword.getText().toString();
        String confirm = etPasswordConfirm.getText().toString();
        int fortyHours = cbFortyHours.isChecked() ? 1 : 0;
        int isAdmin = cbIsAdmin.isChecked() ? 1 : 0;

        if (!password.isEmpty()) {
            if (password.length() < 4) {
                Toast.makeText(getContext(), "A jelszónak legalább 4 karakternek kell lennie!", Toast.LENGTH_SHORT).show();
                return;
            }
            if (!password.equals(confirm)) {
                Toast.makeText(getContext(), "A jelszavak nem egyeznek!", Toast.LENGTH_SHORT).show();
                return;
            }
        }

        Map<String, String> nameMap = new HashMap<>();
        nameMap.put("name", name);
        apiService.updateUserName(user.id, nameMap).enqueue(new SimpleCallback());

        if (!password.isEmpty()) {
            Map<String, String> passMap = new HashMap<>();
            passMap.put("password", password);
            passMap.put("password_confirmation", confirm);
            apiService.updateUserPassword(user.id, passMap).enqueue(new SimpleCallback());
        }

        Map<String, Integer> fortyMap = new HashMap<>();
        fortyMap.put("fortyHours", fortyHours);
        apiService.updateUserFortyHours(user.id, fortyMap).enqueue(new SimpleCallback());

        Map<String, Integer> adminMap = new HashMap<>();
        adminMap.put("isAdmin", isAdmin);
        apiService.updateUserAdminStatus(user.id, adminMap).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                Toast.makeText(getContext(), "Sikeres frissítés!", Toast.LENGTH_SHORT).show();
                getParentFragmentManager().popBackStack();
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(getContext(), "Hiba a mentés során!", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private class SimpleCallback implements Callback<Void> {
        @Override
        public void onResponse(Call<Void> call, Response<Void> response) {}
        @Override
        public void onFailure(Call<Void> call, Throwable t) {}
    }
}