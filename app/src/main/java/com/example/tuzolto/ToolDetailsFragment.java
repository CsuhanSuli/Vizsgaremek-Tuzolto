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

public class ToolDetailsFragment extends Fragment {

    private TextView tvName, tvPlace;
    private RecyclerView recyclerView;
    private ReviewAdapter adapter;
    private View adminActions;
    private Button btnNew, btnUpdate, btnDelete;
    private ApiService apiService;
    private Tool tool;
    private List<ReviewDate> reviews = new ArrayList<>();
    private boolean isAdmin = true;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_tool_details, container, false);

        if (getArguments() != null) {
            tool = (Tool) getArguments().getSerializable("tool");
        }

        tvName = view.findViewById(R.id.tvToolDetailName);
        tvPlace = view.findViewById(R.id.tvToolDetailPlace);
        recyclerView = view.findViewById(R.id.recyclerViewReviews);
        adminActions = view.findViewById(R.id.adminReviewActions);
        btnNew = view.findViewById(R.id.btnNewReviewDate);
        btnUpdate = view.findViewById(R.id.btnUpdateLatestReview);
        btnDelete = view.findViewById(R.id.btnDeleteLatestReview);

        if (tool != null) {
            tvName.setText(tool.name);
            tvPlace.setText("Helye: " + (tool.car_place != null ? tool.car_place.place : "Ismeretlen"));
        }

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new ReviewAdapter(new ArrayList<>());
        recyclerView.setAdapter(adapter);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (isAdmin) {
            adminActions.setVisibility(View.VISIBLE);
            btnNew.setOnClickListener(v -> navigateToReviewForm(null));
            btnUpdate.setOnClickListener(v -> {
                if (!reviews.isEmpty()) {
                    navigateToReviewForm(reviews.get(reviews.size() - 1));
                }
            });
            btnDelete.setOnClickListener(v -> deleteLatestReview());
        }

        loadReviews();

        return view;
    }

    private void loadReviews() {
        if (tool == null) return;

        apiService.getAllReviewDates(tool.id).enqueue(new Callback<List<ReviewDate>>() {
            @Override
            public void onResponse(Call<List<ReviewDate>> call, Response<List<ReviewDate>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    reviews = response.body();
                    adapter.updateData(reviews);
                    btnUpdate.setEnabled(!reviews.isEmpty());
                    btnDelete.setEnabled(!reviews.isEmpty());
                }
            }

            @Override
            public void onFailure(Call<List<ReviewDate>> call, Throwable t) {
                Toast.makeText(getContext(), "Hiba a felülvizsgálatok betöltésekor", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void navigateToReviewForm(ReviewDate reviewDate) {
        ReviewFormFragment fragment = new ReviewFormFragment();
        Bundle args = new Bundle();
        args.putSerializable("tool", tool);
        if (reviewDate != null) {
            args.putSerializable("review", reviewDate);
        }
        fragment.setArguments(args);

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        
        requireActivity().setTitle(reviewDate == null ? "Új felülvizsgálati dátum" : "Dátum módosítása");
    }

    private void deleteLatestReview() {
        if (reviews.isEmpty()) return;
        ReviewDate latest = reviews.get(reviews.size() - 1);

        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törli az utolsó felülvizsgálati dátumot?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteReviewDate(latest.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                loadReviews();
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