<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class news extends Model
{
    use HasFactory;
    protected $table = 'news';
    protected $fillable = [ 
        'id_user',
        'name',
        'text',
        'timestart',
        'timeend',
        'addressstart',
        'addressend',
        'price',
        'ghe1',
        'ghe2',
        'ghe3',
        'ghe4',
        'ghe5',
        'ghe6',
        'status'
      
    ];
  
    
}
