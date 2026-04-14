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

public class ForumListFragment extends Fragment implements ForumAdapter.OnForumActionListener {

    private RecyclerView recyclerView;
    private ForumAdapter adapter;
    private TextView tvEmpty;
    private Button btnAdd;
    private ApiService apiService;
    private boolean isAdmin = false;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_forum_list, container, false);

        recyclerView = view.findViewById(R.id.recyclerViewForum);
        tvEmpty = view.findViewById(R.id.tvEmptyForum);
        btnAdd = view.findViewById(R.id.btnAddForum);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new ForumAdapter(new ArrayList<>(), isAdmin, this);
        recyclerView.setAdapter(adapter);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        btnAdd.setOnClickListener(v -> navigateToForm(null));

        loadForums();

        return view;
    }

    private void loadForums() {
        tvEmpty.setVisibility(View.VISIBLE);
        tvEmpty.setText("Betöltés...");

        apiService.getForums().enqueue(new Callback<List<Forum>>() {
            @Override
            public void onResponse(Call<List<Forum>> call, Response<List<Forum>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Forum> forums = response.body();
                    adapter.updateData(forums);
                    tvEmpty.setVisibility(forums.isEmpty() ? View.VISIBLE : View.GONE);
                } else {
                    tvEmpty.setText("Hiba a betöltés során.");
                }
            }

            @Override
            public void onFailure(Call<List<Forum>> call, Throwable t) {
                tvEmpty.setText("Hálózati hiba.");
            }
        });
    }

    @Override
    public void onDetails(Forum forum) {
        ForumDetailsFragment fragment = new ForumDetailsFragment();
        Bundle args = new Bundle();
        args.putSerializable("forum", forum);
        fragment.setArguments(args);

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        requireActivity().setTitle("Bejegyzés részletei");
    }

    @Override
    public void onDelete(Forum forum) {
        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törli ezt a bejegyzést?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteForum(forum.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                loadForums();
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

    private void navigateToForm(Forum forum) {
        ForumFormFragment fragment = new ForumFormFragment();
        if (forum != null) {
            Bundle args = new Bundle();
            args.putSerializable("forum", forum);
            fragment.setArguments(args);
        }

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        requireActivity().setTitle(forum == null ? "Új bejegyzés" : "Bejegyzés módosítása");
    }
}