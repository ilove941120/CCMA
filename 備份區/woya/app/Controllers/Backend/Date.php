<?php

namespace App\Controllers\Backend;

use App\Controllers\BaseController;

class Date extends BaseController
{
    public function show(){
        // $builder = $this->db->table("news")->insert($data);
		// $builder = $this->db->table("news")->delete(['cTitle' => '第一次測試']);
		// $builder = $this->db->table("news")->like('cTitle','2')->update($data1);
		$this->_check_login();
		
		isset($_SESSION['some_name']);
        $builder = $this->db->table("news")->orderBy('cDay', 'DESC')->limit(99);
		$query   = $builder->get(); 
		$results = $query->getResult();
        
        $date["news"] =$results;
		
		return view('backend/showpage',$date);
    }
	


    public function add(){
		if(isset($_POST["action"])&&($_POST["action"]=="update")){
			$data = [
				'cTitle' => $_POST["cTitle"],
				'cDay' => $_POST["cDay"],
			];
			$builder = $this->db->table("news")->insert($data);
	        header("Location:" . base_url('Backend/Date/show'));
            die();

		}
		return view('backend/add');
    }
    public function updatePage(){
		// $i=$this->request->getGet("cID");
		// echo var_dump($i);
		// die('<br>不要理我');
		// $i=1;
		// $segments = ['Backend/Date', 'updatePage', $i];
		// echo index_page()."<br>";
		// echo site_url($segments)."<br>";
		$i=$this->uri->getSegment(4,'all');
        $builder = $this->db->table("news")->where("cID=".$i);
		$query   = $builder->get(); 
		$results = $query->getResult();
        $date["news"] =$results;

		if(isset($_POST["action"])&&($_POST["action"]=="update")){
			$data = [
				'cTitle' => $_POST["cTitle"],
				'cDay' => $_POST["cDay"],
			];
			$builder = $this->db->table("news")->where("cID=".$i)->update($data);
	        header("Location:" . base_url('Backend/Date/show'));
            die();

		}
		return view('backend/update',$date);

    }
	public function deletePage(){
		$i=$this->uri->getSegment(4,'all');
        $builder = $this->db->table("news")->where("cID=".$i);
		$query   = $builder->get(); 
		$results = $query->getResult();
        $date["news"] =$results;

		if(isset($_POST["action"])&&($_POST["action"]=="delete")){
			$builder = $this->db->table("news")->where("cID=".$i)->delete();
	        header("Location:" . base_url('Backend/Date/show'));
            die();
		}
		return view('backend/delete',$date);
    }

	public function loginPage(){
		// $i = $this->session->get('123');
		// echo $i;
		// die("不要理我");
		if(isset($_POST["action"])&&($_POST["action"]=="login")){
			echo "123";
			// return view('backend/login');
			// return view('backend/login');
	        header("location:" . base_url('Backend/Date/show'));
			// return view('backend/show');
			die();

		}

		return view('backend/login');
		// die('123');

	}
	var $id ="1";
	var $password = "1";
	public function check_login()
	{
		if( $this->request->getPost('ID') == false || $this->request->getPost('Password') == false ) die('操作錯誤');
		
		if( $this->request->getPost('ID') == $this->id && $this->request->getPost('Password') == $this->password)
		{
			$this->session->set('admin_login','login');
			header('location:' . base_url('Backend/Date/show'));
			die();
		}
		else{
			echo "帳號或密碼錯誤";
		}
	
	}
	private function _check_login()
	{
		if( session('admin_login') != 'login' )
		{
			header('location:' . base_url('Backend/Date/login') );
			//base_url('ctr/login');
		}
	}

}
?>