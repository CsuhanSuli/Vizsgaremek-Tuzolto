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

public class ExamTypeListFragment extends Fragment implements ExamTypeAdapter.OnTypeActionListener {

    private RecyclerView recyclerView;
    private ExamTypeAdapter adapter;
    private TextView tvEmpty;
    private Button btnAddType;
    private ApiService apiService;
    private boolean isAdmin = true;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_exam_type_list, container, false);

        recyclerView = view.findViewById(R.id.recyclerViewExamTypes);
        tvEmpty = view.findViewById(R.id.tvEmptyExamTypes);
        btnAddType = view.findViewById(R.id.btnAddExamType);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new ExamTypeAdapter(new ArrayList<>(), isAdmin, this);
        recyclerView.setAdapter(adapter);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (isAdmin) {
            btnAddType.setVisibility(View.VISIBLE);
            btnAddType.setOnClickListener(v -> navigateToForm());
        }

        loadTypes();

        return view;
    }

    private void loadTypes() {
        tvEmpty.setVisibility(View.VISIBLE);
        tvEmpty.setText("Betöltés...");

        apiService.getExamTypes().enqueue(new Callback<List<ExamType>>() {
            @Override
            public void onResponse(Call<List<ExamType>> call, Response<List<ExamType>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<ExamType> types = response.body();
                    adapter.updateData(types);
                    tvEmpty.setVisibility(types.isEmpty() ? View.VISIBLE : View.GONE);
                } else {
                    tvEmpty.setText("Hiba a betöltés során.");
                }
            }

            @Override
            public void onFailure(Call<List<ExamType>> call, Throwable t) {
                tvEmpty.setText("Hálózati hiba.");
            }
        });
    }

    @Override
    public void onDelete(ExamType type) {
        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törli ezt a vizsgatípust?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteExamType(type.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                loadTypes();
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

    private void navigateToForm() {
        ExamTypeFormFragment fragment = new ExamTypeFormFragment();
        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        requireActivity().setTitle("Új vizsga típus");
    }
}