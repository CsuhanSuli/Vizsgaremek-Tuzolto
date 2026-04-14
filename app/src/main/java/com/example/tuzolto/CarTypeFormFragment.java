package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CarTypeFormFragment extends Fragment {

    private TextInputEditText etName;
    private MaterialButton btnSubmit;
    private ApiService apiService;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_car_type_form, container, false);

        etName = view.findViewById(R.id.etCarTypeName);
        btnSubmit = view.findViewById(R.id.btnSubmitCarType);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        btnSubmit.setOnClickListener(v -> submitForm());

        return view;
    }

    private void submitForm() {
        String name = etName.getText().toString();

        if (name.isEmpty()) {
            Toast.makeText(getContext(), "Kérjük adja meg a típus nevét!", Toast.LENGTH_SHORT).show();
            return;
        }

        CarType carType = new CarType();
        carType.typename = name;

        apiService.storeCarType(carType).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(getContext(), "Sikeres mentés!", Toast.LENGTH_SHORT).show();
                    getParentFragmentManager().popBackStack();
                } else {
                    Toast.makeText(getContext(), "Hiba a mentés során!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(getContext(), "Hálózati hiba!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}