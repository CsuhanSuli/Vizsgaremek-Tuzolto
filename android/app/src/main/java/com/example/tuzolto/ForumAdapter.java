package com.example.tuzolto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class ForumAdapter extends RecyclerView.Adapter<ForumAdapter.ForumViewHolder> {

    private List<Forum> forums;
    private OnForumActionListener listener;
    private boolean isAdmin;

    public interface OnForumActionListener {
        void onDetails(Forum forum);
        void onDelete(Forum forum);
    }

    public ForumAdapter(List<Forum> forums, boolean isAdmin, OnForumActionListener listener) {
        this.forums = forums;
        this.isAdmin = isAdmin;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ForumViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_forum, parent, false);
        return new ForumViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ForumViewHolder holder, int position) {
        Forum forum = forums.get(position);
        holder.tvHeader.setText(forum.header);
        holder.tvType.setText(forum.forum_type != null ? forum.forum_type.typeName : "Ismeretlen típus");
        holder.tvDate.setText(forum.date);

        holder.btnDelete.setVisibility(isAdmin ? View.VISIBLE : View.GONE);
        holder.btnDetails.setOnClickListener(v -> listener.onDetails(forum));
        holder.btnDelete.setOnClickListener(v -> listener.onDelete(forum));
    }

    @Override
    public int getItemCount() {
        return forums.size();
    }

    public void updateData(List<Forum> newForums) {
        this.forums = newForums;
        notifyDataSetChanged();
    }

    static class ForumViewHolder extends RecyclerView.ViewHolder {
        TextView tvHeader, tvType, tvDate;
        Button btnDetails, btnDelete;

        public ForumViewHolder(@NonNull View itemView) {
            super(itemView);
            tvHeader = itemView.findViewById(R.id.tvForumHeader);
            tvType = itemView.findViewById(R.id.tvForumType);
            tvDate = itemView.findViewById(R.id.tvForumDate);
            btnDetails = itemView.findViewById(R.id.btnForumDetails);
            btnDelete = itemView.findViewById(R.id.btnDeleteForum);
        }
    }
}