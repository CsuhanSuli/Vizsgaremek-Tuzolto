package com.example.tuzolto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.button.MaterialButton;
import java.util.List;

public class CarTypeAdapter extends RecyclerView.Adapter<CarTypeAdapter.ViewHolder> {

    private List<CarType> types;
    private boolean isAdmin;
    private OnCarTypeActionListener listener;

    public interface OnCarTypeActionListener {
        void onDelete(CarType type);
    }

    public CarTypeAdapter(List<CarType> types, boolean isAdmin, OnCarTypeActionListener listener) {
        this.types = types;
        this.isAdmin = isAdmin;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_car_type, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        CarType type = types.get(position);
        holder.tvName.setText(type.typename);

        if (isAdmin) {
            holder.btnDelete.setVisibility(View.VISIBLE);
            holder.btnDelete.setOnClickListener(v -> listener.onDelete(type));
        } else {
            holder.btnDelete.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() {
        return types.size();
    }

    public void updateData(List<CarType> newTypes) {
        this.types = newTypes;
        notifyDataSetChanged();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName;
        MaterialButton btnDelete;

        ViewHolder(View view) {
            super(view);
            tvName = view.findViewById(R.id.tvCarTypeName);
            btnDelete = view.findViewById(R.id.btnDeleteCarType);
        }
    }
}