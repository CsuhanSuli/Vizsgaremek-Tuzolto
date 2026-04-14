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
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ForumDetailsFragment extends Fragment {

    private TextView tvHeader, tvType, tvPlace, tvDescription;
    private View adminActions;
    private Button btnEdit, btnDelete, btnBack;
    private ApiService apiService;
    private Forum forum;
    private boolean isAdmin = true;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_forum_details, container, false);

        if (getArguments() != null) {
            forum = (Forum) getArguments().getSerializable("forum");
        }

        tvHeader = view.findViewById(R.id.tvForumDetailHeader);
        tvType = view.findViewById(R.id.tvForumDetailType);
        tvPlace = view.findViewById(R.id.tvForumDetailPlace);
        tvDescription = view.findViewById(R.id.tvForumDetailDescription);
        adminActions = view.findViewById(R.id.adminForumActions);
        btnEdit = view.findViewById(R.id.btnEditForum);
        btnDelete = view.findViewById(R.id.btnDeleteForumDetail);
        btnBack = view.findViewById(R.id.btnBackToForum);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (forum != null) {
            tvHeader.setText(forum.header);
            tvType.setText("Típus: " + (forum.forum_type != null ? forum.forum_type.typeName : "Ismeretlen"));
            tvPlace.setText("Helyszín: " + forum.place);
            tvDescription.setText(forum.description);
        }

        if (isAdmin) {
            adminActions.setVisibility(View.VISIBLE);
            btnEdit.setOnClickListener(v -> navigateToForm());
            btnDelete.setOnClickListener(v -> deleteForum());
        }

        btnBack.setOnClickListener(v -> getParentFragmentManager().popBackStack());

        return view;
    }

    private void navigateToForm() {
        ForumFormFragment fragment = new ForumFormFragment();
        Bundle args = new Bundle();
        args.putSerializable("forum", forum);
        fragment.setArguments(args);

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        requireActivity().setTitle("Bejegyzés módosítása");
    }

    private void deleteForum() {
        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törli ezt a bejegyzést?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteForum(forum.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                getParentFragmentManager().popBackStack();
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