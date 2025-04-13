<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request; // Tambahkan ini
use Inertia\Inertia;
use App\Models\Location; 

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $locations = Location::all();

        return Inertia::render('dashboard', [
            'locations' => $locations, // Mengirimkan data lokasi ke tampilan
        ]);
    })->name('dashboard');
});

Route::post('/locations', function (Request $request) {
    // Jika tidak ingin validasi, langsung simpan:
    Location::create($request->all());

    return redirect()->route('dashboard')->with('success', 'Location added successfully');
})->name('locations.store');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
