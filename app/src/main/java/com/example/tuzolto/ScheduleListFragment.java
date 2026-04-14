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
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ScheduleListFragment extends Fragment implements ScheduleAdapter.OnScheduleClickListener {

    private RecyclerView recyclerView;
    private ScheduleAdapter adapter;
    private TextView tvEmpty;
    private Button btnAdd;
    private ApiService apiService;
    private boolean isAdmin = true;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_schedule_list, container, false);

        recyclerView = view.findViewById(R.id.recyclerViewSchedule);
        tvEmpty = view.findViewById(R.id.tvEmptySchedule);
        btnAdd = view.findViewById(R.id.btnAddSchedule);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new ScheduleAdapter(new ArrayList<>(), this);
        recyclerView.setAdapter(adapter);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (isAdmin) {
            btnAdd.setVisibility(View.VISIBLE);
            btnAdd.setOnClickListener(v -> navigateToForm(null));
        }

        loadSchedules();

        return view;
    }

    private void loadSchedules() {
        tvEmpty.setVisibility(View.VISIBLE);
        tvEmpty.setText("Betöltés...");

        apiService.getSchedules().enqueue(new Callback<List<Schedule>>() {
            @Override
            public void onResponse(Call<List<Schedule>> call, Response<List<Schedule>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Schedule> schedules = response.body();
                    adapter.updateData(schedules);
                    tvEmpty.setVisibility(schedules.isEmpty() ? View.VISIBLE : View.GONE);
                } else {
                    tvEmpty.setText("Hiba a betöltés során.");
                }
            }

            @Override
            public void onFailure(Call<List<Schedule>> call, Throwable t) {
                tvEmpty.setText("Hálózati hiba.");
            }
        });
    }

    @Override
    public void onScheduleClick(Schedule schedule) {
        if (isAdmin) {
            navigateToForm(schedule);
        }
    }

    private void navigateToForm(Schedule schedule) {
        ScheduleFormFragment fragment = new ScheduleFormFragment();
        if (schedule != null) {
            Bundle args = new Bundle();
            args.putSerializable("schedule", schedule);
            fragment.setArguments(args);
        }

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        
        requireActivity().setTitle(schedule == null ? "Új beosztás" : "Beosztás módosítása");
    }
}