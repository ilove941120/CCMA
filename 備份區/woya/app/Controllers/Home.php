<?php

namespace App\Controllers;

class Home extends BaseController
{
	public function index()
	{
		// 新消息
		// 查詢
		$query = $this->db->query("SELECT * FROM news ORDER BY cDay DESC");
		// $query = $this->db->query("SELECT * FROM news WHERE cTitle LIKE '%2%' ORDER BY cDay DESC");
		// 回傳到一個陣列
		$results = $query->getResult();
		$date['news'] =$results;
		unset($results);
		// banner
		// $query1 = $this->db->query('SELECT * FROM banner_title');
		// $results1 = $query1->getResult();
		$query = $this->db->query('SELECT * FROM banner_title');
		$results = $query->getResult();
		$date['banner_title'] =$results;
		unset($results);

		// echo base_url();
		// return view('hello',$date);
		return view('welecome',$date);
		// return $results;
	}
	public function newsList(){
		// $query = $this->db->query("SELECT * FROM news WHERE cTitle LIKE '%2%'");
		$query = $this->db->query("SELECT * FROM news");
		$results = $query->getResult();
		$date['news'] =$results;
		unset($results);
		return view('newsList',$date);
	}
	public function newsIn(){
		$i=$this->uri->getSegment(3,'all');
        $builder = $this->db->table("news")->where("cID=".$i);
		$query   = $builder->get(); 
		$results = $query->getResult();
        $date["news"] =$results;
		return view('newsIn',$date);

		
	}
}

