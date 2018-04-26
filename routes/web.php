<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', ['uses' => 'NewsController@index', 'as' => 'news.index']);

$router->get('/news/index', ['uses' => 'NewsController@index', 'as' => 'news.index']);


$router->get('/news/new', ['uses' => 'NewsController@new','as' => 'news.new']);
$router->get('/news/{id}', ['uses' => 'NewsController@single','as' => 'news.single']);
$router->post('/news/new', ['uses' => 'NewsController@save','as' => 'news.save']);
$router->get('/news/delete/{id}', ['uses' => 'NewsController@delete','as' => 'news.delete']);
