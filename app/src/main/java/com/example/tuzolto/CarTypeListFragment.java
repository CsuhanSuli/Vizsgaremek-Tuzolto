package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CarTypeListFragment extends Fragment implements CarTypeAdapter.OnCarTypeActionListener {

    private RecyclerView recyclerView;
    private CarTypeAdapter adapter;
    private TextView tvEmpty;
    private FloatingActionButton btnAdd;
    private ApiService apiService;
    private boolean isAdmin = false;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_car_type_list, container, false);

        isAdmin = requireContext().getSharedPreferences("app", android.content.Context.MODE_PRIVATE).getBoolean("isAdmin", false);

        recyclerView = view.findViewById(R.id.recyclerViewCarTypes);
        tvEmpty = view.findViewById(R.id.tvEmptyCarTypes);
        btnAdd = view.findViewById(R.id.btnAddCarType);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new CarTypeAdapter(new ArrayList<>(), isAdmin, this);
        recyclerView.setAdapter(adapter);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (isAdmin) {
            btnAdd.setVisibility(View.VISIBLE);
            btnAdd.setOnClickListener(v -> navigateToForm());
        } else {
            btnAdd.setVisibility(View.GONE);
        }

        loadCarTypes();

        return view;
    }

    private void loadCarTypes() {
        tvEmpty.setVisibility(View.VISIBLE);
        tvEmpty.setText("Betöltés...");

        apiService.getCarTypes().enqueue(new Callback<List<CarType>>() {
            @Override
            public void onResponse(Call<List<CarType>> call, Response<List<CarType>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<CarType> types = response.body();
                    adapter.updateData(types);
                    tvEmpty.setVisibility(types.isEmpty() ? View.VISIBLE : View.GONE);
                } else {
                    tvEmpty.setText("Hiba a betöltés során.");
                }
            }

            @Override
            public void onFailure(Call<List<CarType>> call, Throwable t) {
                tvEmpty.setText("Hálózati hiba.");
            }
        });
    }

    private void navigateToForm() {
        CarTypeFormFragment fragment = new CarTypeFormFragment();
        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        requireActivity().setTitle("Új jármű típus");
    }

    @Override
    public void onDelete(CarType type) {
        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törli ezt a típust?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteCarType(type.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                loadCarTypes();
                            } else {
                                Toast.makeText(getContext(), "Hiba a törlés során!", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<Void> call, Throwable t) {
                            Toast.makeText(getContext(), "Hálózati hiba!", Toast.LENGTH_SHORT).show();
                        }
                    });
                })
                .setNegativeButton("Mégse", null)
                .show();
    }
}