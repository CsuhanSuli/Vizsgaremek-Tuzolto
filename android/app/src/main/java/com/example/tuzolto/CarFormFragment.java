package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.google.android.material.textfield.TextInputEditText;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CarFormFragment extends Fragment {

    private TextInputEditText etName, etImageName;
    private Spinner spinnerType;
    private Button btnSubmit;
    private ApiService apiService;
    private Car existingCar;
    private List<CarType> carTypes = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_car_form, container, false);

        etName = view.findViewById(R.id.etCarName);
        etImageName = view.findViewById(R.id.etImageName);
        spinnerType = view.findViewById(R.id.spinnerCarType);
        btnSubmit = view.findViewById(R.id.btnSubmit);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (getArguments() != null) {
            existingCar = (Car) getArguments().getSerializable("car");
        }

        if (existingCar != null) {
            etName.setText(existingCar.name);
            etImageName.setText(existingCar.imageName);
            btnSubmit.setText("Mentés");
        } else {
            btnSubmit.setText("Hozzáadás");
        }

        loadCarTypes();

        btnSubmit.setOnClickListener(v -> submitForm());

        return view;
    }

    private void loadCarTypes() {
        apiService.getCarTypes().enqueue(new Callback<List<CarType>>() {
            @Override
            public void onResponse(Call<List<CarType>> call, Response<List<CarType>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    carTypes = response.body();
                    ArrayAdapter<CarType> adapter = new ArrayAdapter<>(requireContext(),
                            android.R.layout.simple_spinner_item, carTypes);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinnerType.setAdapter(adapter);

                    if (existingCar != null) {
                        for (int i = 0; i < carTypes.size(); i++) {
                            if (carTypes.get(i).id == existingCar.typeId) {
                                spinnerType.setSelection(i);
                                break;
                            }
                        }
                    }
                }
            }

            @Override
            public void onFailure(Call<List<CarType>> call, Throwable t) {
                Toast.makeText(getContext(), "Hiba a típusok betöltésekor", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void submitForm() {
        String name = etName.getText().toString();
        String imageName = etImageName.getText().toString();
        CarType selectedType = (CarType) spinnerType.getSelectedItem();

        if (name.isEmpty() || imageName.isEmpty() || selectedType == null) {
            Toast.makeText(getContext(), "Kérjük töltsön ki minden mezőt!", Toast.LENGTH_SHORT).show();
            return;
        }

        Car car = (existingCar != null) ? existingCar : new Car();
        car.name = name;
        car.imageName = imageName;
        car.typeId = selectedType.id;

        Call<Void> call;
        if (existingCar != null) {
            call = apiService.updateCar(existingCar.id, car);
        } else {
            call = apiService.storeCar(car);
        }

        call.enqueue(new Callback<Void>() {
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