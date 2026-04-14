package com.example.tuzolto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class CarAdapter extends RecyclerView.Adapter<CarAdapter.CarViewHolder> {

    private List<Car> cars;
    private OnCarActionListener listener;
    private boolean isAdmin;

    public interface OnCarActionListener {
        void onItemClick(Car car);
        void onEdit(Car car);
        void onDelete(Car car);
    }

    public CarAdapter(List<Car> cars, boolean isAdmin, OnCarActionListener listener) {
        this.cars = cars;
        this.isAdmin = isAdmin;
        this.listener = listener;
    }

    @NonNull
    @Override
    public CarViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_car, parent, false);
        return new CarViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CarViewHolder holder, int position) {
        Car car = cars.get(position);
        holder.tvName.setText(car.name);
        holder.tvType.setText(car.cartypes != null ? car.cartypes.typename : "Ismeretlen típus");

        holder.itemView.setOnClickListener(v -> listener.onItemClick(car));
        holder.adminActions.setVisibility(isAdmin ? View.VISIBLE : View.GONE);
        holder.btnEdit.setOnClickListener(v -> listener.onEdit(car));
        holder.btnDelete.setOnClickListener(v -> listener.onDelete(car));
    }

    @Override
    public int getItemCount() {
        return cars.size();
    }

    public void updateData(List<Car> newCars) {
        this.cars = newCars;
        notifyDataSetChanged();
    }

    static class CarViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvType;
        Button btnEdit, btnDelete;
        View adminActions;

        public CarViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvCarName);
            tvType = itemView.findViewById(R.id.tvCarType);
            btnEdit = itemView.findViewById(R.id.btnEdit);
            btnDelete = itemView.findViewById(R.id.btnDelete);
            adminActions = itemView.findViewById(R.id.adminActions);
        }
    }
}