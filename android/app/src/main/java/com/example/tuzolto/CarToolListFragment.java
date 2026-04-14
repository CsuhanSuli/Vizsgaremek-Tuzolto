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

public class CarToolListFragment extends Fragment implements CarToolAdapter.OnToolActionListener {

    private RecyclerView recyclerView;
    private CarToolAdapter adapter;
    private TextView tvEmpty, tvTitle;
    private Button btnAddTool;
    private ApiService apiService;
    private Car car;
    private boolean isAdmin = true;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_car_tool_list, container, false);

        if (getArguments() != null) {
            car = (Car) getArguments().getSerializable("car");
        }

        recyclerView = view.findViewById(R.id.recyclerViewTools);
        tvEmpty = view.findViewById(R.id.tvEmptyTools);
        tvTitle = view.findViewById(R.id.tvCarNameTitle);
        btnAddTool = view.findViewById(R.id.btnAddTool);

        if (car != null) {
            tvTitle.setText(car.name + " szerszámai");
        }

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new CarToolAdapter(new ArrayList<>(), isAdmin, this);
        recyclerView.setAdapter(adapter);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (isAdmin) {
            btnAddTool.setVisibility(View.VISIBLE);
            btnAddTool.setOnClickListener(v -> navigateToForm(null));
        }

        loadTools();

        return view;
    }

    private void loadTools() {
        if (car == null) return;

        tvEmpty.setVisibility(View.VISIBLE);
        tvEmpty.setText("Betöltés...");

        apiService.getToolsByCar(car.id).enqueue(new Callback<List<Tool>>() {
            @Override
            public void onResponse(Call<List<Tool>> call, Response<List<Tool>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Tool> tools = response.body();
                    enrichToolsWithReviewDates(tools);
                } else {
                    tvEmpty.setText("Hiba a betöltés során.");
                }
            }

            @Override
            public void onFailure(Call<List<Tool>> call, Throwable t) {
                tvEmpty.setText("Hálózati hiba.");
            }
        });
    }

    private void enrichToolsWithReviewDates(List<Tool> tools) {
        if (tools.isEmpty()) {
            tvEmpty.setVisibility(View.VISIBLE);
            tvEmpty.setText("Nincsenek szerszámok az autóhoz.");
            adapter.updateData(tools);
            return;
        }

        final int[] enrichedCount = {0};
        for (Tool tool : tools) {
            apiService.getLatestReviewDate(tool.id).enqueue(new Callback<ReviewDate>() {
                @Override
                public void onResponse(Call<ReviewDate> call, Response<ReviewDate> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        tool.reviewDate = response.body().reviewDate;
                    } else {
                        tool.reviewDate = "Nincs adat";
                    }
                    checkCompletion();
                }

                @Override
                public void onFailure(Call<ReviewDate> call, Throwable t) {
                    tool.reviewDate = "Nincs adat";
                    checkCompletion();
                }

                private void checkCompletion() {
                    enrichedCount[0]++;
                    if (enrichedCount[0] == tools.size()) {
                        adapter.updateData(tools);
                        tvEmpty.setVisibility(View.GONE);
                    }
                }
            });
        }
    }

    @Override
    public void onDetails(Tool tool) {
        ToolDetailsFragment fragment = new ToolDetailsFragment();
        Bundle args = new Bundle();
        args.putSerializable("tool", tool);
        fragment.setArguments(args);

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        
        requireActivity().setTitle("Eszköz részletei");
    }

    @Override
    public void onEdit(Tool tool) {
        navigateToForm(tool);
    }

    @Override
    public void onDelete(Tool tool) {
        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törli ezt az eszközt?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteTool(tool.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                loadTools();
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

    private void navigateToForm(Tool tool) {
        CarToolFormFragment fragment = new CarToolFormFragment();
        Bundle args = new Bundle();
        args.putSerializable("car", car);
        if (tool != null) {
            args.putSerializable("tool", tool);
        }
        fragment.setArguments(args);

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        
        requireActivity().setTitle(tool == null ? "Új szerszám hozzáadása" : "Szerszám módosítása");
    }
}