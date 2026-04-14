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
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class ExamListFragment extends Fragment implements ExamAdapter.OnExamActionListener {

    private RecyclerView recyclerView;
    private ExamAdapter adapter;
    private TextView tvEmpty, tvTitle;
    private FloatingActionButton btnAdd;
    private ApiService apiService;
    private boolean isAdmin = false;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_exam_list, container, false);

        isAdmin = requireContext().getSharedPreferences("app", android.content.Context.MODE_PRIVATE).getBoolean("isAdmin", false);

        recyclerView = view.findViewById(R.id.recyclerViewExams);
        tvEmpty = view.findViewById(R.id.tvEmptyExams);
        tvTitle = view.findViewById(R.id.tvExamTitle);
        btnAdd = view.findViewById(R.id.btnAddExam);

        tvTitle.setText("Elérhető Vizsgák");

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new ExamAdapter(new ArrayList<>(), isAdmin, this);
        recyclerView.setAdapter(adapter);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (isAdmin) {
            btnAdd.setVisibility(View.VISIBLE);
            btnAdd.setOnClickListener(v -> navigateToForm());
        } else {
            btnAdd.setVisibility(View.GONE);
        }

        loadExams();

        return view;
    }

    private void loadExams() {
        tvEmpty.setVisibility(View.VISIBLE);
        tvEmpty.setText("Betöltés...");

        apiService.getExams().enqueue(new Callback<List<Exam>>() {
            @Override
            public void onResponse(Call<List<Exam>> call, Response<List<Exam>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Exam> exams = response.body();
                    adapter.updateData(exams);
                    tvEmpty.setVisibility(exams.isEmpty() ? View.VISIBLE : View.GONE);
                } else {
                    tvEmpty.setText("Hiba a betöltés során.");
                }
            }

            @Override
            public void onFailure(Call<List<Exam>> call, Throwable t) {
                tvEmpty.setText("Hálózati hiba.");
            }
        });
    }

    private void navigateToForm() {
        ExamFormFragment fragment = new ExamFormFragment();
        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        requireActivity().setTitle("Új vizsga létrehozása");
    }

    @Override
    public void onDelete(Exam exam) {
        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törli ezt a vizsgát?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteUserExam(exam.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                loadExams();
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
}