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

public class CarToolFormFragment extends Fragment {

    private TextInputEditText etName;
    private Spinner spinnerPlace, spinnerCar;
    private View carLayout;
    private Button btnSubmit;
    private ApiService apiService;
    private Car currentCar;
    private Tool existingTool;
    private List<CarPlace> places = new ArrayList<>();
    private List<Car> cars = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_car_tool_form, container, false);

        etName = view.findViewById(R.id.etToolName);
        spinnerPlace = view.findViewById(R.id.spinnerToolPlace);
        spinnerCar = view.findViewById(R.id.spinnerCarSelect);
        carLayout = view.findViewById(R.id.layoutCarSelect);
        btnSubmit = view.findViewById(R.id.btnSubmitTool);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (getArguments() != null) {
            currentCar = (Car) getArguments().getSerializable("car");
            existingTool = (Tool) getArguments().getSerializable("tool");
        }

        if (existingTool != null) {
            etName.setText(existingTool.name);
            btnSubmit.setText("Módosítás");
            carLayout.setVisibility(View.VISIBLE);
            loadCars();
        } else {
            btnSubmit.setText("Hozzáadás");
        }

        loadPlaces();

        btnSubmit.setOnClickListener(v -> submitForm());

        return view;
    }

    private void loadPlaces() {
        apiService.getCarPlaces().enqueue(new Callback<List<CarPlace>>() {
            @Override
            public void onResponse(Call<List<CarPlace>> call, Response<List<CarPlace>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    places = response.body();
                    ArrayAdapter<CarPlace> adapter = new ArrayAdapter<>(requireContext(),
                            android.R.layout.simple_spinner_item, places);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinnerPlace.setAdapter(adapter);

                    if (existingTool != null) {
                        for (int i = 0; i < places.size(); i++) {
                            if (places.get(i).id == existingTool.placeId) {
                                spinnerPlace.setSelection(i);
                                break;
                            }
                        }
                    }
                }
            }

            @Override
            public void onFailure(Call<List<CarPlace>> call, Throwable t) {
                Toast.makeText(getContext(), "Hiba a helyek betöltésekor", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void loadCars() {
        apiService.getCars().enqueue(new Callback<List<Car>>() {
            @Override
            public void onResponse(Call<List<Car>> call, Response<List<Car>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    cars = response.body();
                    ArrayAdapter<Car> adapter = new ArrayAdapter<>(requireContext(),
                            android.R.layout.simple_spinner_item, cars);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinnerCar.setAdapter(adapter);

                    if (existingTool != null) {
                        for (int i = 0; i < cars.size(); i++) {
                            if (cars.get(i).id == existingTool.carId) {
                                spinnerCar.setSelection(i);
                                break;
                            }
                        }
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Car>> call, Throwable t) {}
        });
    }

    private void submitForm() {
        String name = etName.getText().toString();
        CarPlace selectedPlace = (CarPlace) spinnerPlace.getSelectedItem();

        if (name.isEmpty() || selectedPlace == null) {
            Toast.makeText(getContext(), "Kérjük töltsön ki minden mezőt!", Toast.LENGTH_SHORT).show();
            return;
        }

        Tool tool = (existingTool != null) ? existingTool : new Tool();
        tool.name = name;
        tool.placeId = selectedPlace.id;
        
        if (existingTool != null) {
            Car selectedCar = (Car) spinnerCar.getSelectedItem();
            if (selectedCar != null) tool.carId = selectedCar.id;
        } else {
            tool.carId = currentCar.id;
        }

        Call<Void> call;
        if (existingTool != null) {
            call = apiService.updateTool(existingTool.id, tool);
        } else {
            call = apiService.storeTool(tool);
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