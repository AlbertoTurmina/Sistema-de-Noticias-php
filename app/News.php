<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'data',
        'titulo',
        'fonte',
        'resumo',
        'texto',
        'img'
    ];
}
