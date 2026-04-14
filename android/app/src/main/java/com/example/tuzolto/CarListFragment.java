package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CarListFragment extends Fragment implements CarAdapter.OnCarActionListener {

    private RecyclerView recyclerView;
    private CarAdapter adapter;
    private TextView tvEmpty;
    private Button btnAddCar;
    private ApiService apiService;
    private boolean isAdmin = true; 

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_car_list, container, false);

        recyclerView = view.findViewById(R.id.recyclerViewCars);
        tvEmpty = view.findViewById(R.id.tvEmpty);
        btnAddCar = view.findViewById(R.id.btnAddCar);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new CarAdapter(new ArrayList<>(), isAdmin, this);
        recyclerView.setAdapter(adapter);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (isAdmin) {
            btnAddCar.setVisibility(View.VISIBLE);
            btnAddCar.setOnClickListener(v -> navigateToForm(null));
        }

        loadCars();

        return view;
    }

    private void loadCars() {
        tvEmpty.setVisibility(View.VISIBLE);
        tvEmpty.setText("Betöltés...");

        apiService.getCars().enqueue(new Callback<List<Car>>() {
            @Override
            public void onResponse(Call<List<Car>> call, Response<List<Car>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Car> cars = response.body();
                    adapter.updateData(cars);
                    tvEmpty.setVisibility(cars.isEmpty() ? View.VISIBLE : View.GONE);
                    if (cars.isEmpty()) tvEmpty.setText("Nincs elérhető autó.");
                } else {
                    tvEmpty.setText("Hiba a betöltés során.");
                }
            }

            @Override
            public void onFailure(Call<List<Car>> call, Throwable t) {
                tvEmpty.setText("Hálózati hiba.");
            }
        });
    }

    @Override
    public void onItemClick(Car car) {
        CarToolListFragment fragment = new CarToolListFragment();
        Bundle args = new Bundle();
        args.putSerializable("car", car);
        fragment.setArguments(args);

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
    }

    @Override
    public void onEdit(Car car) {
        navigateToForm(car);
    }

    @Override
    public void onDelete(Car car) {
        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törli ezt az autót?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteCar(car.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                loadCars();
                            }
                        }

                        @Override
                        public void onFailure(Call<Void> call, Throwable t) {
                            Toast.makeText(getContext(), "Hiba a törlés során!", Toast.LENGTH_SHORT).show();
                        }
                    });
                })
                .setNegativeButton("Mégse", null)
                .show();
    }

    private void navigateToForm(Car car) {
        CarFormFragment fragment = new CarFormFragment();
        if (car != null) {
            Bundle args = new Bundle();
            args.putSerializable("car", car);
            fragment.setArguments(args);
        }
        
        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        
        requireActivity().setTitle(car == null ? "Új autó hozzáadása" : "Autó módosítása");
    }
}