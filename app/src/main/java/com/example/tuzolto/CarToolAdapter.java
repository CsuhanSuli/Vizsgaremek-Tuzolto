package com.example.tuzolto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class CarToolAdapter extends RecyclerView.Adapter<CarToolAdapter.ToolViewHolder> {

    private List<Tool> tools;
    private OnToolActionListener listener;
    private boolean isAdmin;

    public interface OnToolActionListener {
        void onDetails(Tool tool);
        void onEdit(Tool tool);
        void onDelete(Tool tool);
    }

    public CarToolAdapter(List<Tool> tools, boolean isAdmin, OnToolActionListener listener) {
        this.tools = tools;
        this.isAdmin = isAdmin;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ToolViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_car_tool, parent, false);
        return new ToolViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ToolViewHolder holder, int position) {
        Tool tool = tools.get(position);
        holder.tvName.setText(tool.name);
        holder.tvPlace.setText(tool.car_place != null ? tool.car_place.place : "Ismeretlen hely");
        holder.tvReviewDate.setText("Legutóbbi felülvizsgálat: " + (tool.reviewDate != null ? tool.reviewDate : "Nincs adat"));

        holder.adminActions.setVisibility(isAdmin ? View.VISIBLE : View.GONE);
        
        holder.btnDetails.setOnClickListener(v -> listener.onDetails(tool));
        holder.btnEdit.setOnClickListener(v -> listener.onEdit(tool));
        holder.btnDelete.setOnClickListener(v -> listener.onDelete(tool));
    }

    @Override
    public int getItemCount() {
        return tools.size();
    }

    public void updateData(List<Tool> newTools) {
        this.tools = newTools;
        notifyDataSetChanged();
    }

    static class ToolViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvPlace, tvReviewDate;
        Button btnDetails, btnEdit, btnDelete;
        View adminActions;

        public ToolViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvToolName);
            tvPlace = itemView.findViewById(R.id.tvToolPlace);
            tvReviewDate = itemView.findViewById(R.id.tvReviewDate);
            btnDetails = itemView.findViewById(R.id.btnDetails);
            btnEdit = itemView.findViewById(R.id.btnEditTool);
            btnDelete = itemView.findViewById(R.id.btnDeleteTool);
            adminActions = itemView.findViewById(R.id.adminToolActions);
        }
    }
}