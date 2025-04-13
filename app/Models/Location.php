<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Tambahkan baris ini
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dengan nama model
    protected $table = 'locations';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'title', 'desc', 'lat', 'lng'
    ];

    // Tentukan kolom yang tidak boleh diubah (untuk protection)
    protected $guarded = [];
}
